import type { Phase } from '@/lib/types/protocol';

const getPuzzleTimeLeft = (value: number): { phase: Phase; timeLeft: number } => {
  if (value === 0) return { phase: 0, timeLeft: 0 };

  const timeLeft = Date.now() / 1000 - value;
  if (timeLeft > 432_000) return { phase: 3, timeLeft: 0 };
  else if (timeLeft > 172_800) return { phase: 2, timeLeft: timeLeft - 172_800 };

  return { phase: 1, timeLeft };
};

export default getPuzzleTimeLeft;
