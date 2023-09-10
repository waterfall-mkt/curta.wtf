'use client';

import { type FC, useEffect, useState } from 'react';

import clsx from 'clsx';

import { getPuzzleTimeLeft, getTimeLeftString } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleTableCountdownProps = {
  firstSolveTimestamp: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PHASE_TO_COLOR = ['bg-tw-green', 'bg-tw-yellow', 'bg-tw-orange', 'bg-tw-red'];

const PuzzleTableCountdown: FC<PuzzleTableCountdownProps> = ({ firstSolveTimestamp }) => {
  const { phase, timeLeft: timePassed } = getPuzzleTimeLeft(firstSolveTimestamp);
  const totalTime = [0, 172_800, 259_200, 0][phase];
  const [mounted, setMounted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(totalTime - timePassed);

  // Set `mounted` to true on page load
  useEffect(() => setMounted(true), []);

  // Update `timeLeft` every second
  useEffect(() => {
    const timer = setTimeout(
      () => setTimeLeft(totalTime - getPuzzleTimeLeft(firstSolveTimestamp).timeLeft),
      1000,
    );

    return () => clearTimeout(timer);
  }, [firstSolveTimestamp, timeLeft, totalTime]);

  if (!mounted) {
    return (
      <div className="flex w-24 flex-col gap-1" title={`Phase ${phase}`}>
        <div className="h-5 w-16 animate-pulse rounded-md bg-gray-350" />
        <div className="h-2 w-24 animate-pulse rounded-full bg-gray-350" />
      </div>
    );
  }

  if (phase === 0 || phase === 3) {
    return (
      <div className="text-left" title={`Phase ${phase}`}>
        ∞
      </div>
    );
  }

  return (
    <div className="w-fit" title={`Phase ${phase}`}>
      <div className="text-left">{getTimeLeftString(timeLeft)}</div>
      <div className="mt-1 h-2 w-24 rounded-full bg-gray-350">
        <div
          className={clsx('h-2 rounded-full text-left', PHASE_TO_COLOR[phase])}
          style={{ width: `${(100 * (totalTime - timeLeft)) / totalTime}%`, minWidth: '0.5rem' }}
        />
      </div>
    </div>
  );
};

export default PuzzleTableCountdown;
