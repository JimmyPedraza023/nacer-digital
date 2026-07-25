'use client';

import { Repo } from '../types';

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3572A5',
  Java: '#B07219',
  Go: '#00ADD8',
  Rust: '#DEA584',
  CSS: '#563D7C',
  HTML: '#E34C26',
  PHP: '#4F5D95',
  Ruby: '#701516',
  'C#': '#178600',
  'C++': '#F34B7D',
  Shell: '#89E051',
};

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </svg>
  );
}

interface Props {
  repo: Repo;
}

export default function RepoCard({ repo }: Props) {
  const updatedDate = new Date(repo.updated_at).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1rem',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        textDecoration: 'none',
        transition: 'border-color 0.15s ease, background-color 0.15s ease',
        cursor: 'pointer',
        minHeight: '110px',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)';
        (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-hover)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-card)';
      }}
    >
      <div>
        <p style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--accent-blue)',
          fontFamily: 'JetBrains Mono, monospace',
          marginBottom: '0.35rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {repo.name}
        </p>
        {repo.description && (
          <p style={{
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {repo.description}
          </p>
        )}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginTop: '0.75rem',
        flexWrap: 'wrap',
      }}>
        {repo.language && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{
              width: '10px', height: '10px', borderRadius: '50%',
              backgroundColor: LANGUAGE_COLORS[repo.language] || '#8B949E',
              flexShrink: 0,
            }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {repo.language}
            </span>
          </span>
        )}

        {repo.stars > 0 && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
            <StarIcon /> {repo.stars}
          </span>
        )}

        {repo.forks > 0 && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
            <ForkIcon /> {repo.forks}
          </span>
        )}

        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
          {updatedDate}
        </span>
      </div>
    </a>
  );
}
