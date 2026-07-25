import { GitHubProfile } from './types';
import ProfileCard from './components/ProfileCard';
import RepoCard from './components/RepoCard';
import LanguageBar from './components/LanguageBar';

const GITHUB_USERNAME = 'JimmyPedraza023';
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function getProfile(): Promise<GitHubProfile | null> {
  try {
    const res = await fetch(`${API_URL}/user/${GITHUB_USERNAME}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Home() {
  const profile = await getProfile();

  if (!profile) {
    return (
      <main style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-base)',
      }}>
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          maxWidth: '400px',
        }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⚠️</p>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            No se pudo cargar el perfil
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Verificá que el backend esté corriendo en{' '}
            <code style={{ color: 'var(--accent-blue)', fontFamily: 'JetBrains Mono, monospace' }}>
              {API_URL}
            </code>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-base)',
      padding: '2rem 1rem',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{
            fontSize: '0.72rem',
            fontFamily: 'JetBrains Mono, monospace',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            github profile
          </p>
        </div>

        {/* Profile */}
        <ProfileCard profile={profile} />

        {/* Stack Fingerprint */}
        {profile.repos.length > 0 && (
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            marginBottom: '1.5rem',
          }}>
            <LanguageBar repos={profile.repos} />
          </div>
        )}

        {/* Repos */}
        {profile.repos.length > 0 && (
          <div>
            <h2 style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginBottom: '0.75rem',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              Repositorios destacados
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '0.75rem',
            }}>
              {profile.repos.map((repo) => (
                <RepoCard key={repo.name} repo={repo} />
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: '2.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
            Datos via GitHub API · Reto técnico Nacer Digital
          </p>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </main>
  );
}
