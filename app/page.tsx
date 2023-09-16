import type { Metadata } from 'next';

import AuthorsDisplay from './(components)/authors-display';
import LinksDisplay from './(components)/links-display';
import PuzzleTable from './(components)/puzzles-table';

import { fetchAuthors, fetchPuzzles } from '@/lib/utils';

import PhaseTable from '@/components/common/phase-table';
import ContainerLayout from '@/components/layouts/container';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

const description = 'A CTF protocol, where players create and solve EVM puzzles to earn NFTs.';

export const metadata: Metadata = {
  title: 'Curta',
  description,
  openGraph: {
    title: 'Curta, a CTF protocol',
    description,
    siteName: 'curta.wtf',
    url: 'https://curta.wtf',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    description,
    site: '@curta_ctf',
    siteId: '1604186457165406210',
    creator: '@waterfall_mkt',
    creatorId: '1466508083929223176',
  },
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Home() {
  const [{ data: authors }, { data: puzzles }] = await Promise.all([
    fetchAuthors(),
    fetchPuzzles(),
  ]);

  return (
    <div className="relative flex w-full grow overflow-hidden">
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
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="font-poppins text-5xl font-semibold leading-[6rem] tracking-tighter text-gray-50">
                Curta CTF
              </h1>
              <div className="text-xl text-gray-150 md:text-2xl">{description}</div>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0">
              <AuthorsDisplay data={authors} />
              <LinksDisplay />
            </div>
          </div>
          <PhaseTable className="mt-8 lg:ml-32 lg:mt-0" />
        </div>
        <div className="mt-12 w-full md:mt-16">
          <h2 className="mb-4 text-2xl font-bold tracking-tighter text-gray-50">Puzzles</h2>
          <PuzzleTable data={puzzles} />
        </div>
      </ContainerLayout>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 3600;
