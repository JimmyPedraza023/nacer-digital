import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GithubService {
  private readonly baseUrl = 'https://api.github.com';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getHeaders() {
    const token = this.configService.get<string>('GITHUB_TOKEN');
    return {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async getUserProfile(username: string) {
    try {
      const headers = this.getHeaders();

      const [userRes, reposRes] = await Promise.all([
        firstValueFrom(
          this.httpService.get(`${this.baseUrl}/users/${username}`, { headers }),
        ),
        firstValueFrom(
          this.httpService.get(
            `${this.baseUrl}/users/${username}/repos?per_page=100&sort=updated`,
            { headers },
          ),
        ),
      ]);

      const user = userRes.data;
      const repos: any[] = reposRes.data;

      const topRepos = repos
        .filter((r) => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
        .map((r) => ({
          name: r.name,
          description: r.description,
          stars: r.stargazers_count,
          forks: r.forks_count,
          language: r.language,
          url: r.html_url,
          updated_at: r.updated_at,
        }));

      return {
        login: user.login,
        name: user.name,
        bio: user.bio,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        location: user.location,
        company: user.company,
        blog: user.blog,
        twitter_username: user.twitter_username,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        created_at: user.created_at,
        repos: topRepos,
      };
    } catch (error: unknown) {
        const err = error as { response?: { status?: number } };

        if (err.response?.status === 404) {
          throw new HttpException(
            `User "${username}" not found on GitHub`,
            HttpStatus.NOT_FOUND,
          );
        }
        if (err.response?.status === 403) {
          throw new HttpException(
            'GitHub API rate limit exceeded',
            HttpStatus.TOO_MANY_REQUESTS,
          );
        }
        throw new HttpException(
          'Failed to fetch GitHub data',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
  }
}
