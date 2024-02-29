import { cache } from 'react';

import type { PuzzleValue } from '../types';
import { ExternalLink } from 'lucide-react';

import { ethereumClient } from '@/lib/client';
import { getChainInfo, getShortenedAddress, getTimeLeftString } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleInfoFirstSolverProps = {
  puzzle: PuzzleValue;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleInfoFirstSolver: React.FC<PuzzleInfoFirstSolverProps> = async ({ puzzle }) => {
  const firstSolverEnsName =
    puzzle.firstSolverAddress !== null
      ? await cache(async () =>
          ethereumClient.getEnsName({
            address: puzzle.firstSolverAddress as `0x${string}`,
          }),
        )()
      : null;

  return (
    <div className="flex grow flex-col items-center gap-2 p-4">
      {puzzle.firstSolverAddress ? (
        <a
          className="relative flex w-full flex-col items-center justify-center rounded-lg bg-tw-green py-2.5"
          href={`https://${getChainInfo(puzzle.chainId).blockExplorer}/tx/${puzzle.firstSolveTx}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="text-center text-sm font-book text-[#09491E]">First Blood</div>
          <div className="text-2xl font-medium text-gray-50">
            {firstSolverEnsName ?? getShortenedAddress(puzzle.firstSolverAddress as `0x${string}`)}
          </div>
          <ExternalLink className="absolute right-2 top-2 h-3 w-3 text-[#09491E]" />
        </a>
      ) : (
        <div className="group relative flex w-full flex-col items-center justify-center rounded-lg bg-gray-350 py-2.5">
          <div className="text-center text-sm font-book text-gray-150">First Blood</div>
          <div className="text-2xl font-medium text-gray-50">—</div>
        </div>
      )}
      {[
        {
          name: 'Solve Time',
          value: puzzle.firstSolveTimestamp
            ? getTimeLeftString(puzzle.firstSolveTimestamp - puzzle.addedTimestamp)
            : '—',
          title: puzzle.firstSolveTimestamp
            ? new Date(puzzle.firstSolveTimestamp * 1000).toString()
            : '',
        },
        { name: 'Total Solves', value: puzzle._count.solves },
      ].map(({ name, value, title }) => {
        const nameId = `stat-name-${name.replace(' ', '-').toLowerCase()}`;
        const valueId = `stat-value-${name.replace(' ', '-').toLowerCase()}`;

        return (
          <div key={name} className="flex w-full items-center justify-between text-sm">
            <label id={nameId} htmlFor={valueId} className="text-gray-200">
              {name}
            </label>
            <div id={valueId} className="text-gray-100" title={title} aria-describedby={nameId}>
              {value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PuzzleInfoFirstSolver;
