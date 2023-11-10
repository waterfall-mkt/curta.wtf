'use client';

import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { Puzzle } from '@/lib/types/protocol';

import { ButtonGroup, IconButton } from '@/components/ui';

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
    <ButtonGroup className="hidden sm:flex">
      <IconButton
        className="z-[2]"
        size="lg"
        intent="neutral"
        variant="outline"
        disabled={!prevPuzzle}
        onClick={
          prevPuzzle
            ? () => router.push(`/puzzle/${prevPuzzle.chainId}:${prevPuzzle.id}`)
            : undefined
        }
        aria-label="Navigate to previous puzzle on the same chain."
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        intent="neutral"
        size="lg"
        variant="outline"
        disabled={!nextPuzzle}
        onClick={
          nextPuzzle
            ? () => router.push(`/puzzle/${nextPuzzle.chainId}:${nextPuzzle.id}`)
            : undefined
        }
        aria-label="Navigate to next puzzle on the same chain."
      >
        <ChevronRight />
      </IconButton>
    </ButtonGroup>
  );
};

export default PuzzleHeaderPageNav;
