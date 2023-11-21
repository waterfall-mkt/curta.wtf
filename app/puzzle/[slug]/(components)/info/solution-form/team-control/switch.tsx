'use client';

import { type FC, useState } from 'react';

import * as RadioGroup from '@radix-ui/react-radio-group';
import clsx from 'clsx';
import { HelpCircle } from 'lucide-react';

import type { Team, TeamMemberApproval } from '@/lib/types/protocol';

import TeamDisplayClient from '@/components/templates/team-display-client';
import { Badge, Button, Input } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleInfoSolutionFormTeamControlSwitchProps = {
  userTeam?: Team;
  approvals: TeamMemberApproval[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleInfoSolutionFormTeamControlSwitch: FC<PuzzleInfoSolutionFormTeamControlSwitchProps> = ({
  userTeam,
  approvals,
}) => {
  const [search, setSearch] = useState<string>('');
  const [teamId, setTeamId] = useState<string>('');

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
            <RadioGroup.Item value="0" id="r0" disabled={!userTeam}>
              <RadioGroup.Indicator asChild>
                {!userTeam ? (
                  <Badge className="my-3 mr-3" variant="secondary" intent="neutral">
                    Current
                  </Badge>
                ) : (
                  <Badge className="my-3 mr-3" variant="secondary" intent="primary">
                    Selected
                  </Badge>
                )}
              </RadioGroup.Indicator>
            </RadioGroup.Item>
          </div>
          {approvals
            .filter(
              ({ team }) => search.length === 0 || (team.name && team.name.indexOf(search) > -1),
            )
            .map((approval, index) => (
              <div
                key={index}
                className={clsx(
                  'flex items-center justify-between border-x border-t border-gray-300 last:rounded-b-lg last:border-b',
                  Number(teamId) === approval.teamId ? 'bg-gray-450' : '',
                )}
              >
                <label
                  className={clsx(
                    'h-full grow py-3 pl-3 text-gray-100',
                    userTeam && userTeam.id === approval.teamId
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer',
                  )}
                  htmlFor={`r${approval.teamId}`}
                >
                  <TeamDisplayClient team={approval.team} hoverCardProps={{ inPortal: true }} />
                </label>
                <RadioGroup.Item
                  value={`${approval.teamId}`}
                  id={`r${approval.teamId}`}
                  disabled={userTeam && userTeam.id === approval.teamId}
                >
                  <RadioGroup.Indicator asChild>
                    <Badge className="my-3 mr-3" variant="secondary" intent="primary">
                      Selected
                    </Badge>
                  </RadioGroup.Indicator>
                </RadioGroup.Item>
                {userTeam && userTeam.id === approval.teamId ? (
                  <Badge className="my-3 mr-3" variant="secondary" intent="neutral">
                    Current
                  </Badge>
                ) : null}
              </div>
            ))}
          {search.length > 0 ? <NewTeamForm name={search} /> : null}
        </RadioGroup.Root>
        {search.length + approvals.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-b-lg border border-gray-300 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-gray-450 text-gray-200">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="leading-4.5 text-sm font-medium text-gray-100">No teams to join</div>
              <div className="text-xs leading-4 text-gray-200">
                Create a team or ask to join a team.
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {approvals.length > 0 ? (
        <div className="border-t border-stroke p-4">
          <Button className="w-full" size="lg" disabled={!teamId}>
            Select
          </Button>
        </div>
      ) : null}
    </div>
  );
};

const NewTeamForm: FC<{ name: string }> = ({ name }) => {
  return (
    <div className="flex flex-col gap-3 rounded-b-lg border border-gray-300 py-3">
      <div className="flex items-center justify-between gap-2 px-3">
        <div className="flex items-center gap-3.5 overflow-hidden">
          <div className="h-10 w-10 min-w-[40px] rounded-full border border-stroke" />
          <div className="max-w-fill overflow-hidden">
            <div className="line-clamp-1 overflow-hidden text-ellipsis text-sm text-gray-100">
              {name}
            </div>
            <div className="text-xs text-gray-200">Create a new team</div>
          </div>
        </div>
        <Badge className="min-w-fit" variant="secondary" intent="success">
          New
        </Badge>
      </div>
      <div className="px-3">
        <Button className="w-full" variant="outline" intent="neutral">
          Create new team
        </Button>
      </div>
    </div>
  );
};

export default PuzzleInfoSolutionFormTeamControlSwitch;
