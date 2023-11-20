import type { FC } from 'react';

import type { DbTeamMemberApproval } from '@/lib/types/api';

import { Button, Input } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleInfoSolutionFormTeamControlSwitchProps = {
  approvals: DbTeamMemberApproval[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleInfoSolutionFormTeamControlSwitch: FC<PuzzleInfoSolutionFormTeamControlSwitchProps> = ({
  approvals,
}) => {
  return (
    <div className="flex flex-col p-4">
      <div>
        <Input className="w-full rounded-b-none" placeholder="Find or create a team" />
      </div>
      {approvals.length === 0 ? (
        <div className="border-t border-stroke p-4">
          <Button className="w-full" size="lg">
            Select
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default PuzzleInfoSolutionFormTeamControlSwitch;
