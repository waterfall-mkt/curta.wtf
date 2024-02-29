import type { PuzzleValue } from '../types';
import PuzzleInfoFirstSolver from './first-solver';
import PuzzleInfoForkSolveDocs from './fork-solve-docs';
import PuzzleInfoSolutionForm from './solution-form';
import PuzzleInfoTimeLeft from './time-left';

import { getPuzzleTimeLeft } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleInfoProps = {
  puzzle: PuzzleValue;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleInfo: React.FC<PuzzleInfoProps> = ({ puzzle }) => {
  const phase = puzzle.firstSolveTimestamp
    ? getPuzzleTimeLeft(puzzle.firstSolveTimestamp).phase
    : 0;

  return (
    <div className="flex h-fit w-full flex-col justify-center rounded-[1.25rem] border border-stroke bg-gray-600 md:min-w-[20rem] md:max-w-[20rem]">
      <PuzzleInfoFirstSolver puzzle={puzzle} />
      <hr className="w-full border-t border-stroke" role="separator" />
      <PuzzleInfoTimeLeft puzzle={puzzle} />
      <hr className="w-full border-t border-stroke" role="separator" />
      {phase < 3 ? <PuzzleInfoSolutionForm puzzle={puzzle} /> : <PuzzleInfoForkSolveDocs />}
    </div>
  );
};

export default PuzzleInfo;
