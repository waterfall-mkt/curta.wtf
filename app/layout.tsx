import type { Metadata } from 'next';
import { Fira_Code, Inter, Poppins } from 'next/font/google';
import type { ReactNode } from 'react';

import '@rainbow-me/rainbowkit/styles.css';
import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';

import '@/styles/globals.css';

import Web3Provider from '@/lib/providers/Web3Provider';

import NavBar from '@/components/common/nav-bar';

// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin'],
});

const firaCode = Fira_Code({
  variable: '--fira-code-font',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--poppins-font',
  weight: ['600'],
  subsets: ['latin'],
});

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

const description = 'A CTF protocol, where players create and solve EVM puzzles to earn NFTs.';

export const metadata: Metadata = {
  title: 'Curta, a CTF protocol',
  description,
  keywords: ['ethereum', 'blockchain', 'ctf', 'on-chain', 'security', 'puzzle', 'game', 'nft'],
  themeColor: '#0D1017',
  colorScheme: 'dark',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Curta, a CTF protocol',
    description,
    siteName: 'curta.wtf',
    url: 'https://curta.wtf',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@curta_ctf',
    creator: '@waterfall_mkt',
  },
};

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={clsx('dark', inter.className)} style={{ background: '#0D1017' }}>
      <body className={clsx(inter.variable, firaCode.variable, poppins.variable)}>
        <Web3Provider>
          <NavBar />
          <main className="relative mx-auto flex w-full max-w-[90rem] grow flex-col overflow-hidden px-3 pb-6 pt-3 lg:px-20 lg:pb-16 lg:pt-12">
            {children}
          </main>
        </Web3Provider>
      </body>

      <Analytics />
    </html>
  );
}
