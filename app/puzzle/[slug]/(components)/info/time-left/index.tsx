import type { FC } from 'react';

import PuzzleInfoTimeLeftAccordion from './accordion';
import PuzzleInfoTimeLeftCountdown from './countdown';
import PuzzleInfoTimeLeftTimeline from './timeline';
import { ArrowUpRight, Box } from 'lucide-react';

import type { Puzzle } from '@/lib/types/protocol';
import { getChainInfo, getPuzzleTimeLeft, getShortenedAddress } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleInfoTimeLeftProps = {
  puzzle: Puzzle;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleInfoTimeLeft: FC<PuzzleInfoTimeLeftProps> = ({ puzzle }) => {
  const { phase } = getPuzzleTimeLeft(puzzle.firstSolveTimestamp);

  return (
    <div className="flex grow flex-col items-center gap-2 p-4">
      <div className="group relative flex w-full flex-col items-center justify-center rounded-lg bg-gray-350 py-2.5">
        <div className="text-center text-sm font-book text-gray-150">Time Left</div>
        <PuzzleInfoTimeLeftCountdown
          phase={phase}
          firstSolveTimestamp={puzzle.firstSolveTimestamp}
        />
      </div>
      {/* We need a wrapper here because the accordion requires client-side
      interactions/hooks. */}
      <PuzzleInfoTimeLeftAccordion phase={phase}>
        <div className="flex w-full gap-2.5 rounded-b-lg border-x border-b border-gray-300 p-4">
          <div className="flex w-1/2 flex-col items-end gap-7 pt-0.5">
            {[
              { blockNumber: puzzle.addedBlock, disabled: false, hidden: false },
              {
                blockNumber: puzzle.firstSolveBlock ?? 0,
                disabled: phase < 1,
                hidden: !puzzle.firstSolveBlock,
              },
              {
                blockNumber: (puzzle.firstSolveBlock ?? 0) + 14_400,
                disabled: phase < 2,
                hidden: !puzzle.firstSolveBlock,
              },
              {
                blockNumber: (puzzle.firstSolveBlock ?? 0) + 21_600,
                disabled: phase < 3,
                hidden: !puzzle.firstSolveBlock,
              },
            ].map(({ blockNumber, disabled, hidden }) =>
              !disabled && !hidden ? (
                <a
                  key={blockNumber}
                  className="flex h-4 items-center gap-0.5 text-xs text-gray-100 hover:underline"
                  href={`https://${
                    getChainInfo(puzzle.chainId).blockExplorer
                  }/block/${blockNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <Box className="h-2.5 w-2.5" />
                  </span>
                  <span>{blockNumber}</span>
                </a>
              ) : (
                <span
                  key={blockNumber}
                  className="flex h-4 items-center gap-0.5 text-xs text-gray-200"
                >
                  <span>
                    <Box className="h-2.5 w-2.5" />
                  </span>
                  <span>{!hidden ? blockNumber : '–'}</span>
                </span>
              ),
            )}
          </div>
          <div className="w-3">
            <PuzzleInfoTimeLeftTimeline firstSolveTimestamp={puzzle.firstSolveTimestamp} />
          </div>
          <div className="flex w-full flex-col gap-2">
            {[
              {
                name: 'Phase 0',
                value: `Added by ${
                  puzzle.author.ensName ?? getShortenedAddress(puzzle.author.address)
                }`,
                href: `https://${getChainInfo(puzzle.chainId).blockExplorer}/tx/${puzzle.addedTx}`,
              },
              {
                name: 'Phase 1',
                value: 'First blood',
                href: puzzle.firstSolveTx
                  ? `https://${getChainInfo(puzzle.chainId).blockExplorer}/tx/${
                      puzzle.firstSolveTx
                    }`
                  : undefined,
              },
              {
                name: 'Phase 2',
                value: 'Solutions revealed',
                href: puzzle.solution ? puzzle.solution : undefined,
              },
              { name: 'Phase 3', value: 'Submissions closed' },
            ].map(({ name, value, href }) => (
              <div key={name}>
                <div className="h-5 text-sm text-gray-100">{name}</div>
                {href ? (
                  <a
                    className="relative flex h-4 w-fit gap-0.5 text-xs text-gray-200 transition-colors hover:text-gray-100 hover:underline"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="line-clamp-1 text-ellipsis break-all">{value}</span>
                    <span className="text-gray-200">
                      <ArrowUpRight className="h-2.5 w-2.5" />
                    </span>
                  </a>
                ) : (
                  <div className="line-clamp-1 h-4 text-ellipsis break-all text-xs text-gray-200">
                    {value}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </PuzzleInfoTimeLeftAccordion>
    </div>
  );
};

export default PuzzleInfoTimeLeft;
