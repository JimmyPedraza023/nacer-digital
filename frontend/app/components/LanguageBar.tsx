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
  C: '#555555',
  Shell: '#89E051',
  Kotlin: '#A97BFF',
  Swift: '#FA7343',
  Dart: '#00B4AB',
  Vue: '#41B883',
  Svelte: '#FF3E00',
};

interface Props {
  repos: Repo[];
}

export default function LanguageBar({ repos }: Props) {
  const counts: Record<string, number> = {};

  repos.forEach((repo) => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    }
  });

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--text-secondary)',
        marginBottom: '0.75rem',
        fontFamily: 'JetBrains Mono, monospace',
      }}>
        Stack Fingerprint
      </h2>

      {/* Barra de lenguajes */}
      <div style={{
        display: 'flex',
        height: '8px',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '0.75rem',
        gap: '2px',
      }}>
        {sorted.map(([lang, count]) => (
          <div
            key={lang}
            title={`${lang}: ${Math.round((count / total) * 100)}%`}
            style={{
              width: `${(count / total) * 100}%`,
              backgroundColor: LANGUAGE_COLORS[lang] || '#8B949E',
              borderRadius: '2px',
            }}
          />
        ))}
      </div>

      {/* Leyenda */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {sorted.map(([lang, count]) => (
          <div key={lang} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: LANGUAGE_COLORS[lang] || '#8B949E',
              flexShrink: 0,
            }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {lang}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
              {Math.round((count / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
