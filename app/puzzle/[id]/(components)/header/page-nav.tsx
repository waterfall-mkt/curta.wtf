'use client';

import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import type { Puzzle } from '@/lib/types/protocol';

import { IconButton } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleHeaderPageNavProps = {
  prevPuzzle: Puzzle | null;
  nextPuzzle: Puzzle | null;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleHeaderPageNav: FC<PuzzleHeaderPageNavProps> = ({ prevPuzzle, nextPuzzle }) => {
  const router = useRouter();

  return (
    <div className="flex w-fit">
      <IconButton
        className="flex h-8 w-8 items-center justify-center rounded-full md:h-10 md:w-10"
        intent="neutral"
        disabled={!prevPuzzle}
        onClick={prevPuzzle ? () => router.push(`/puzzle/${prevPuzzle.id}`) : undefined}
      >
        <ArrowLeft />
      </IconButton>
      <IconButton
        className="ml-2 flex h-8 w-8 items-center justify-center rounded-full md:h-10 md:w-10"
        intent="neutral"
        disabled={!nextPuzzle}
        onClick={nextPuzzle ? () => router.push(`/puzzle/${nextPuzzle.id}`) : undefined}
      >
        <ArrowRight />
      </IconButton>
    </div>
  );
};

export default PuzzleHeaderPageNav;
