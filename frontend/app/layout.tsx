import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jimmy Pedraza · GitHub Profile',
  description: 'Perfil de GitHub de Jimmy Pedraza — Electronic Engineer & Full Stack Developer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
