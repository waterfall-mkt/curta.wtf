import type { FC } from 'react';

import { Button } from '@/components/ui';

const PuzzleInfoSolutionFormTeamControl: FC = () => {
  return (
    <div className="flex h-11 grow items-center justify-between rounded-b-xl border border-t-0 border-gray-350 pl-4 pr-2">
      <div className="text-sm text-gray-150">Submitting individually</div>
      <Button
        size="sm"
        variant="outline"
        intent="neutral"
        className="bg-gray-600 active:bg-gray-450"
      >
        Join
      </Button>
    </div>
  );
};

export default PuzzleInfoSolutionFormTeamControl;
