import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Praesidium',
  description: 'Advanced emergency management and civil protection platform',
  icons: {
    icon: '/protezione-civile-logo.png',
    shortcut: '/protezione-civile-logo.png',
    apple: '/protezione-civile-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={inter.className}>{children}</body>
    </html>
  );
}