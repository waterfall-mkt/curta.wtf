import type { Metadata } from 'next';
import { Fira_Code, Inter, Poppins } from 'next/font/google';
import type { ReactNode } from 'react';

import '@rainbow-me/rainbowkit/styles.css';
import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';

import '@/styles/globals.css';

import Web3Provider from '@/lib/providers/Web3Provider';

import Footer from '@/components/common/footer';
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

export const metadata: Metadata = {
  title: {
    template: '%s | Curta',
    default: 'Curta',
  },
  keywords: ['ethereum', 'blockchain', 'ctf', 'on-chain', 'security', 'puzzle', 'game', 'nft'],
  themeColor: '#0D1017',
  colorScheme: 'dark',
  manifest: '/manifest.json',
  openGraph: {
    siteName: 'curta.wtf',
    url: 'https://curta.wtf',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@curta_ctf',
    siteId: '1604186457165406210',
    creator: '@waterfall_mkt',
    creatorId: '1466508083929223176',
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
          <main className="relative flex w-full grow overflow-hidden">{children}</main>
          <Footer />
        </Web3Provider>
      </body>

      <Analytics />
    </html>
  );
}
