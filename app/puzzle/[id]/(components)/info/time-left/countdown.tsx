'use client';

import { type FC, useEffect, useState } from 'react';

import type { Phase } from '@/lib/types/protocol';
import { getTimeLeftString } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleInfoTimeLeftCountdownProps = {
  phase: Phase;
  timeLeft: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleInfoTimeLeftCountdown: FC<PuzzleInfoTimeLeftCountdownProps> = ({
  phase,
  timeLeft: timePassed,
}) => {
  const totalTime = [0, 172_800, 259_200, 0][phase];
  const [mounted, setMounted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(totalTime - timePassed);

  // Set `mounted` to true on page load
  useEffect(() => setMounted(true), []);

  // Update `timeLeft` every second
  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft((prevState) => prevState - 1), 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

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
