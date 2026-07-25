'use client';

import Image from 'next/image';
import { GitHubProfile } from '../types';

interface StatProps {
  label: string;
  value: number;
}

function Stat({ label, value }: StatProps) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        fontFamily: 'JetBrains Mono, monospace',
      }}>
        {value.toLocaleString()}
      </p>
      <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </p>
    </div>
  );
}

interface Props {
  profile: GitHubProfile;
}

export default function ProfileCard({ profile }: Props) {
  const joinYear = new Date(profile.created_at).getFullYear();

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
    }}>
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}>
        {/* Avatar */}
        <div style={{ flexShrink: 0 }}>
          <Image
            src={profile.avatar_url}
            alt={profile.login}
            width={96}
            height={96}
            style={{
              borderRadius: '50%',
              border: '2px solid var(--border)',
            }}
          />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ marginBottom: '0.75rem' }}>
            {profile.name && (
              <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                {profile.name}
              </h1>
            )}
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              @{profile.login}
            </p>
          </div>

          {profile.bio && (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              {profile.bio}
            </p>
          )}

          {/* Meta */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {profile.location && (
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                📍 {profile.location}
              </span>
            )}
            {profile.company && (
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                🏢 {profile.company}
              </span>
            )}
            {profile.blog && (
              <a href={profile.blog} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '0.78rem', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}>
                🔗 {profile.blog.replace(/^https?:\/\//, '')}
              </a>
            )}
            {profile.twitter_username && (
              <a href={`https://twitter.com/${profile.twitter_username}`} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '0.78rem', color: 'var(--accent-blue)', textDecoration: 'none' }}>
                𝕏 @{profile.twitter_username}
              </a>
            )}
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Miembro desde {joinYear}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          padding: '1rem 1.25rem',
          backgroundColor: 'var(--bg-base)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          alignSelf: 'flex-start',
          flexShrink: 0,
        }}>
          <Stat label="Repos" value={profile.public_repos} />
          <div style={{ width: '1px', backgroundColor: 'var(--border)' }} />
          <Stat label="Seguidores" value={profile.followers} />
          <div style={{ width: '1px', backgroundColor: 'var(--border)' }} />
          <Stat label="Siguiendo" value={profile.following} />
        </div>
      </div>

      {/* GitHub link */}
      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        <a
          href={profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            padding: '0.35rem 0.75rem',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            transition: 'border-color 0.15s, color 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)';
            (e.currentTarget as HTMLElement).style.color = 'var(--accent-blue)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
            (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
          Ver perfil en GitHub
        </a>
      </div>
    </div>
  );
}
