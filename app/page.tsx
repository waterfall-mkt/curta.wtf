import type { Metadata } from 'next';
import { Fragment } from 'react';

import ConnectButton from '@/components/common/connect-button';
import ContainerLayout from '@/components/layouts/container';

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
// Page
// -----------------------------------------------------------------------------

export default async function Home() {
  return (
    <Fragment>
      {/* Grid */}
      <div className="bg-grid pointer-events-none z-[-1]" />
      {/* Background ellipse */}
      <div
        className="pointer-events-none absolute left-1/2 top-[5.5rem] z-[-1] min-h-[52rem] min-w-[64rem] max-w-[128rem] -translate-x-1/2 overflow-hidden rounded-full blur-3xl saturate-150"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(8, 125, 252, 0.125) 0%, ' +
            'rgba(8, 125, 252, 0.5) 0%, rgba(8, 125, 252, 0.125) 0.01%, ' +
            'rgba(13, 13, 13, 0.125) 100%)',
        }}
      />

      {/* Content */}
      <ContainerLayout>
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="font-poppins text-5xl font-semibold leading-[6rem] tracking-tighter text-gray-50">
              Curta CTF
            </h1>
            <div className="text-xl text-gray-150 md:text-2xl">{description}</div>
          </div>
        </div>
        <ConnectButton />
        <ConnectButton />
        <ConnectButton />
      </ContainerLayout>
    </Fragment>
  );
}
