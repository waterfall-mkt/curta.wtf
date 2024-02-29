'use client';

import { useEffect, useState } from 'react';

import type { Phase } from '@/lib/types/protocol';
import { getPuzzleTimeLeft, getTimeLeftString } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleInfoTimeLeftCountdownProps = {
  phase: Phase;
  firstSolveTimestamp: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleInfoTimeLeftCountdown: React.FC<PuzzleInfoTimeLeftCountdownProps> = ({
  phase,
  firstSolveTimestamp,
}) => {
  const timePassed = getPuzzleTimeLeft(firstSolveTimestamp).timeLeft;
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
      <div
        className="h-8 w-24 animate-pulse rounded-md bg-gray-200 text-2xl font-medium"
        title={`Phase ${phase}`}
      />
    );
  }

  return (
    <div className="h-8 text-2xl font-medium text-gray-50" title={`Phase ${phase}`}>
      {phase === 0 || phase === 3 ? '—' : getTimeLeftString(timeLeft)}
    </div>
  );
};

export default PuzzleInfoTimeLeftCountdown;
