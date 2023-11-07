import type { FC } from 'react';

import { ExternalLink } from 'lucide-react';

import type { Puzzle } from '@/lib/types/protocol';
import { getBlockExplorerDomain, getShortenedAddress, getTimeLeftString } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleInfoFirstSolverProps = {
  puzzle: Puzzle;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleInfoFirstSolver: FC<PuzzleInfoFirstSolverProps> = ({ puzzle }) => {
  return (
    <div className="flex grow flex-col items-center gap-2 p-4">
      {puzzle.firstSolver ? (
        <a
          className="relative flex w-full flex-col items-center justify-center rounded-lg bg-tw-green py-2.5"
          href={`https://${getBlockExplorerDomain(puzzle.chainId)}/tx/${puzzle.solveTx}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="text-center text-sm font-book text-[#09491E]">First Blood</div>
          <div className="text-2xl font-medium text-gray-50">
            {puzzle.firstSolverEnsName ?? getShortenedAddress(puzzle.firstSolver)}
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
          value: puzzle.solveTime ? getTimeLeftString(puzzle.solveTime) : '—',
          title: puzzle.firstSolveTimestamp
            ? new Date(puzzle.firstSolveTimestamp * 1000).toString()
            : '',
        },
        { name: 'Total Solves', value: puzzle.numberSolved },
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
