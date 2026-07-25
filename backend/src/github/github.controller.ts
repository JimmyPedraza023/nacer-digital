import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller()
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('user/:username')
  getUser(@Param('username') username: string) {
    return this.githubService.getUserProfile(username);
  }
}
