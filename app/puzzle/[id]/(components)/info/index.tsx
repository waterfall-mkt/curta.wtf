import type { FC } from 'react';

import PuzzleInfoFirstSolver from './first-solver';
import PuzzleInfoSolutionForm from './solution-form';
import PuzzleInfoTimeLeft from './time-left';

import type { Puzzle } from '@/lib/types/protocol';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleInfoProps = { puzzle: Puzzle };

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleInfo: FC<PuzzleInfoProps> = ({ puzzle }) => {
  return (
    <div className="flex h-fit w-full flex-col justify-center rounded-[1.25rem] border border-stroke bg-gray-600 md:min-w-[20rem] md:max-w-[20rem]">
      <PuzzleInfoFirstSolver puzzle={puzzle} />
      <hr className="w-full border-t border-stroke" role="separator" />
      <PuzzleInfoTimeLeft puzzle={puzzle} />
      <hr className="w-full border-t border-stroke" role="separator" />
      <PuzzleInfoSolutionForm puzzle={puzzle} />
    </div>
  );
};

export default PuzzleInfo;
