import type { Metadata } from 'next';
import { Fragment } from 'react';

import AuthorsDisplay from './(components)/authors-display';
import LinksDisplay from './(components)/links-display';
import PhaseTable from './(components)/phase-table';
import PuzzleTable from './(components)/puzzles-table';

import { fetchAuthors, fetchPuzzles, fetchSolvesCount } from '@/lib/utils';

import ContainerLayout from '@/components/layouts/container';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

const description = 'A CTF protocol, where players create and solve EVM puzzles to earn NFTs.';

export async function generateMetadata(): Promise<Metadata> {
  const { data: authors } = await fetchAuthors();
  const { data: puzzles } = await fetchPuzzles();
  const { data: solvesCount } = await fetchSolvesCount();

  const ogImage = {
    url:
      'https://curta.wtf/api/og?authors=' +
      `${authors.length}&puzzles=${puzzles.length}&display=1` +
      `&solvers=${solvesCount.solvers}&solves=${solvesCount.solves}`,
    width: 1200,
    height: 600,
    alt: 'Curta Open-Graph image',
  };

  return {
    openGraph: {
      title: 'Curta, a CTF protocol',
      description,
      siteName: 'curta.wtf',
      url: 'https://curta.wtf',
      locale: 'en_US',
      images: [ogImage],
    },
    twitter: {
      images: [ogImage],
    },
  };
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Home() {
  const { data: authors } = await fetchAuthors();
  const { data: puzzles } = await fetchPuzzles();

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
          <PhaseTable />
        </div>
        <div className="mt-12 w-full md:mt-16">
          <h2 className="mb-4 text-2xl font-bold tracking-tighter text-gray-50">Puzzles</h2>
          <PuzzleTable data={puzzles} />
        </div>
      </ContainerLayout>
    </Fragment>
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 3600;
