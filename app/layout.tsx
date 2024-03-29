import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@rainbow-me/rainbowkit/styles.css';
import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';

import '@/styles/globals.css';

import Web3Provider from '@/lib/providers/web3-provider';

import Footer from '@/components/common/footer';
import NavBar from '@/components/common/nav-bar';
import { Toaster } from '@/components/ui';

// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin'],
  display: 'swap',
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
};

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx('dark', inter.className)} style={{ background: '#0D1017' }}>
      <body className={inter.variable}>
        <Web3Provider>
          <NavBar />
          <main className="relative flex w-full grow">{children}</main>
          <Footer />
          <Toaster />
        </Web3Provider>
      </body>

      <Analytics />
    </html>
  );
}
