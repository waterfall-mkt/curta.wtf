'use client';

import type { PuzzleValue } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { ButtonGroup, IconButton } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleHeaderPageNavProps = {
  prevPuzzle: PuzzleValue | null;
  nextPuzzle: PuzzleValue | null;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleHeaderPageNav: React.FC<PuzzleHeaderPageNavProps> = ({ prevPuzzle, nextPuzzle }) => {
  return (
    <ButtonGroup className="hidden sm:flex">
      <IconButton
        className={!nextPuzzle ? 'z-[2]' : 'z-[1]'}
        size="lg"
        intent="neutral"
        variant="outline"
        disabled={!prevPuzzle}
        href={prevPuzzle ? `/puzzle/${prevPuzzle.chainId}:${prevPuzzle.id}` : undefined}
        aria-label="Navigate to previous puzzle on the same chain."
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        className={!prevPuzzle ? 'z-[2]' : 'z-[1]'}
        intent="neutral"
        size="lg"
        variant="outline"
        disabled={!nextPuzzle}
        href={nextPuzzle ? `/puzzle/${nextPuzzle.chainId}:${nextPuzzle.id}` : undefined}
        aria-label="Navigate to next puzzle on the same chain."
      >
        <ChevronRight />
      </IconButton>
    </ButtonGroup>
  );
};

export default PuzzleHeaderPageNav;
