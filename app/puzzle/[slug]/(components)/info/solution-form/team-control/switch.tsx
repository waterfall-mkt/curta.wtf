import { type FC, useState } from 'react';

import * as RadioGroup from '@radix-ui/react-radio-group';
import clsx from 'clsx';

import type { DbTeamMemberApproval } from '@/lib/types/api';

import { Badge, Button, Input } from '@/components/ui';

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
  const [search, setSearch] = useState<string>('');
  const [teamId, setTeamId] = useState<string>('0'); // TODO: default value

  return (
    <div className="flex flex-col">
      <div className="flex grow flex-col p-4">
        <Input
          className="w-full rounded-b-none"
          placeholder="Find or create a team"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <RadioGroup.Root className="flex flex-col" value={teamId} onValueChange={setTeamId}>
          <div
            className={clsx(
              'flex items-center justify-between border-x border-gray-300',
              teamId === '0' ? 'bg-gray-450' : '',
            )}
          >
            <label className="h-full w-full cursor-pointer py-3 pl-3 text-gray-100" htmlFor="r0">
              Submit as individual.
            </label>
            <RadioGroup.Item value="0" id="r0">
              <RadioGroup.Indicator asChild>
                <Badge className="my-3 mr-3" variant="secondary" intent="primary">
                  Selected
                </Badge>
              </RadioGroup.Indicator>
            </RadioGroup.Item>
          </div>
          {approvals.map((approval, index) => (
            <div
              key={index}
              className={clsx(
                'flex items-center justify-between border-x border-t border-gray-300 last:rounded-b-lg last:border-b',
                Number(teamId) === approval.teamId ? 'bg-gray-450' : '',
              )}
            >
              <label
                className="h-full w-full cursor-pointer py-3 pl-3 text-gray-100"
                htmlFor={`r${approval.teamId}`}
              >
                {approval.teamId}
              </label>
              <RadioGroup.Item value={`${approval.teamId}`} id={`r${approval.teamId}`}>
                <RadioGroup.Indicator asChild>
                  <Badge className="my-3 mr-3" variant="secondary" intent="primary">
                    Selected
                  </Badge>
                </RadioGroup.Indicator>
              </RadioGroup.Item>
            </div>
          ))}
        </RadioGroup.Root>
      </div>
      {approvals.length > 0 ? (
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
