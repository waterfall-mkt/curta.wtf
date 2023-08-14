import type { FC } from 'react';

import PuzzleInfoTimeLeftAccordion from './accordion';
import PuzzleInfoTimeLeftCountdown from './countdown';
import { ArrowUpRight, Box } from 'lucide-react';

import type { Puzzle } from '@/lib/types/protocol';
import { getPuzzleTimeLeft, getShortenedAddress } from '@/lib/utils';

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
  const { phase, timeLeft } = getPuzzleTimeLeft(puzzle.firstSolveTimestamp);

  const COLORS = { PHASE_0: '#22C55E', PHASE_1: '#FACC15', PHASE_2: '#F97316', PHASE_3: '#EF4444' };

  // The height of the unfilled portion of the timeline, adjusting for the small
  // gaps between the end of segments between circles and the circles. Note that
  // we don't render any portion of the unfilled timeline when `phase === 3`, so
  // the expression below assumes `phase` is bounded to `[0, 2]`. Helpful notes:
  //     * `Math.sqrt(35)` is the `y` coordinate of the circle when `x = 1`:
  //       `y**2 + x**2 = 6**2 => y = sqrt(35)`. Then, since the radius of each
  //       circle is 6, the aforementioned "small gaps" are each `sqrt(35)`
  //       pixels tall.
  //     * 44 is 6 less than the `y` coordinate of the middle of Phase 1's
  //       indicator circle.
  //     * 88 is 6 less than the `y` coordinate of the middle of Phase 2's
  //       indicator circle.
  const unfilledTimelineHeight =
    phase === 2
      ? 44 - Math.sqrt(35) + (44 - 2 * Math.sqrt(35)) * (1 - timeLeft / 259_200)
      : phase === 1
      ? 88 - Math.sqrt(35) + (44 - 2 * Math.sqrt(35)) * (1 - timeLeft / 172_800)
      : 132; // Entire thing is filled if `phase === 0`.

  return (
    <div className="flex grow flex-col items-center gap-2 p-4">
      <div className="group relative flex w-full flex-col items-center justify-center rounded-lg bg-gray-350 py-2.5">
        <div className="text-center text-sm font-book text-gray-150">Time Left</div>
        <PuzzleInfoTimeLeftCountdown phase={phase} timeLeft={timeLeft} />
      </div>
      {/* We need a wrapper here because the accordion requires client-side
      interactions/hooks. */}
      <PuzzleInfoTimeLeftAccordion phase={phase}>
        <div className="flex w-full gap-2.5 rounded-b-lg border-x border-b border-gray-300 p-4">
          <div className="flex w-1/2 flex-col items-end gap-7 pt-0.5">
            {[
              { blockNumber: puzzle.addedBlock, disabled: false },
              { blockNumber: puzzle.firstSolveBlock, disabled: phase < 1 },
              { blockNumber: (puzzle.firstSolveBlock ?? 0) + 14_400, disabled: phase < 2 },
              { blockNumber: (puzzle.firstSolveBlock ?? 0) + 21_600, disabled: phase < 3 },
            ].map(({ blockNumber, disabled }) =>
              blockNumber && !disabled ? (
                <a
                  key={blockNumber}
                  className="flex h-4 items-center gap-0.5 text-xs text-gray-100 hover:underline"
                  href={`https://${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/block/${blockNumber}`}
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
                  <span>{blockNumber ?? '—'}</span>
                </span>
              ),
            )}
          </div>
          <div className="w-3">
            <svg
              width={12}
              height={168}
              viewBox="0 0 12 168"
              role="figure"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Gradient for the filled portion of the timeline with stops to
              lead into each of the circles properly (i.e. each "gradient"
              portion completely stops and resumes before/after encountering a
              circle's boundary). */}
                <linearGradient id="0" gradientTransform="rotate(90)">
                  {/* Circle 1 middle. */}
                  <stop offset={0} stop-color={COLORS.PHASE_0} />
                  {/* Circle 1 end. */}
                  <stop offset={6 / 132} stop-color={COLORS.PHASE_0} />
                  <stop offset={6 / 132} stop-color={COLORS.PHASE_0} />
                  {/* Circle 2 start. */}
                  <stop offset={38 / 132} stop-color={COLORS.PHASE_1} />
                  <stop offset={38 / 132} stop-color={COLORS.PHASE_1} />
                  {/* Circle 2 end. */}
                  <stop offset={50 / 132} stop-color={COLORS.PHASE_1} />
                  <stop offset={50 / 132} stop-color={COLORS.PHASE_1} />
                  {/* Circle 3 start. */}
                  <stop offset={82 / 132} stop-color={COLORS.PHASE_2} />
                  <stop offset={82 / 132} stop-color={COLORS.PHASE_2} />
                  {/* Circle 3 end. */}
                  <stop offset={94 / 132} stop-color={COLORS.PHASE_2} />
                  <stop offset={94 / 132} stop-color={COLORS.PHASE_2} />
                  {/* Circle 4 start. */}
                  <stop offset={126 / 132} stop-color={COLORS.PHASE_3} />
                  <stop offset={126 / 132} stop-color={COLORS.PHASE_3} />
                  {/* Circle 4 middle. */}
                  <stop offset={1} stop-color={COLORS.PHASE_3} />
                </linearGradient>
              </defs>
              {/* Filled portion of the timeline. We position both of the
            following portions of the timeline at x={5} because we want them
            horizontally centered.*/}
              <rect x={5} y={10} width={2} height={132} fill="url(#0)" />
              {/* Unfilled portion of the timeline. We position the rectangle at
            `y={142 - unfilledTimelineHeight}` because we want it offset by both
            the height of the filled portion of the timeline (given by
            `132px - unfilledTimelineHeight`) and the 10px top padding required
            to render it starting from the center of the first circle. Note that
            we don't render any unfilled portion if `phase >= 3` because this
            means the puzzle is over. */}
              {phase < 3 ? (
                <rect
                  className="fill-gray-350"
                  width={2}
                  height={unfilledTimelineHeight}
                  x={5}
                  y={142 - unfilledTimelineHeight}
                />
              ) : null}
              <circle className="fill-tw-green" cx={6} cy={10} r={6} />
              <circle
                className={phase > 0 ? 'fill-tw-yellow' : 'fill-gray-350'}
                cx={6}
                cy={54}
                r={6}
              />
              <circle
                className={phase > 1 ? 'fill-tw-orange' : 'fill-gray-350'}
                cx={6}
                cy={98}
                r={6}
              />
              <circle
                className={phase > 2 ? 'fill-tw-red' : 'fill-gray-350'}
                cx={6}
                cy={142}
                r={6}
              />
            </svg>
          </div>
          <div className="flex w-full flex-col gap-2">
            {[
              {
                name: 'Phase 0',
                value: `Added by ${
                  puzzle.author.ensName ?? getShortenedAddress(puzzle.author.address)
                }`,
                href: `https://${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/tx/${puzzle.addedTx}`,
              },
              {
                name: 'Phase 1',
                value: 'First blood',
                href: puzzle.solveTx
                  ? `https://${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/tx/${puzzle.solveTx}`
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
