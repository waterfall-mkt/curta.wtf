'use client';

import { type FC, Fragment, useEffect, useState } from 'react';

import PuzzleInfoSolutionFormTeamControlManageTeam from './manage-team';
import { ArrowLeftRight } from 'lucide-react';
import useSWR from 'swr';
import { useAccount } from 'wagmi';

import type { Team } from '@/lib/types/protocol';

import Avatar from '@/components/templates/avatar';
import { Button, IconButton, Modal, Tooltip } from '@/components/ui';

const PuzzleInfoSolutionFormTeamControl: FC = () => {
  const { address } = useAccount();
  const {
    data: team,
    error,
    isLoading,
  } = useSWR<Team>(`/api/user-team?address=${address}`, (url: string) =>
    fetch(url).then((res) => res.json()),
  );
  const { data: members, mutate } = useSWR<Team['members']>(
    `/api/team-members?id=${team?.id}`,
    (url: string) => fetch(url).then((res) => res.json()),
    { revalidateOnMount: false },
  );
  const [mounted, setMounted] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  // Set mounted.
  useEffect(() => setMounted(true), []);

  // Modal open/close.
  const onModalOpenChange = () => {
    setOpen((prev) => !prev);
    mutate();
  };

  const combinedTeam = team ? { ...team, members: members ?? team.members } : undefined;
  const isTeamLeader =
    address && combinedTeam?.id && combinedTeam.leader?.address === address.toLowerCase();

  return (
    <div className="flex h-11 grow items-center justify-between rounded-b-xl border border-t-0 border-gray-300 pl-4 pr-2">
      {!error && !isLoading && mounted ? (
        <Fragment>
          <div className="flex items-center gap-1 text-gray-150">
            {team?.id ? (
              <Fragment>
                <span className="text-sm">Submitting for</span>
                <Tooltip content={`#${team.id}`}>
                  <button className="flex h-5 items-center gap-1 rounded bg-gray-450 px-1.5 transition-colors hover:bg-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-250">
                    <Avatar src={team.avatar ?? ''} alt={`Team #${team.id}`} size={16} />
                    <span className="text-xs font-medium leading-4">
                      {team.name ?? `Team #${team.id}`}
                    </span>
                  </button>
                </Tooltip>
              </Fragment>
            ) : (
              <div className="text-sm text-gray-150">Submitting individually</div>
            )}
          </div>
          <Modal.Root open={open} onOpenChange={onModalOpenChange}>
            <Modal.Trigger asChild>
              {team?.id ? (
                <IconButton
                  size="sm"
                  variant="outline"
                  intent="neutral"
                  className="bg-gray-600 active:bg-gray-450"
                >
                  <ArrowLeftRight />
                </IconButton>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  intent="neutral"
                  className="bg-gray-600 active:bg-gray-450"
                >
                  Join
                </Button>
              )}
            </Modal.Trigger>
            <Modal.Content>
              <Modal.Header align="center">
                <Modal.Title>{isTeamLeader ? 'Manage your team' : 'Choose a team'}</Modal.Title>
                <Modal.Close />
              </Modal.Header>
              <Modal.Body noPadding>
                <div className="p-4">
                  {isTeamLeader ? (
                    <PuzzleInfoSolutionFormTeamControlManageTeam
                      connectedAddress={address}
                      team={combinedTeam}
                    />
                  ) : null}
                </div>
                {!isTeamLeader ? (
                  <div className="flex grow border-t border-stroke p-4">
                    <Button className="w-full" size="lg" variant="primary" intent="primary">
                      Select
                    </Button>
                  </div>
                ) : null}
              </Modal.Body>
            </Modal.Content>
          </Modal.Root>
        </Fragment>
      ) : (
        <Fragment>
          <div className="h-6 w-36 animate-pulse rounded bg-gray-350" />
          <div className="h-7 w-7 animate-pulse rounded-lg bg-gray-350" />
        </Fragment>
      )}
    </div>
  );
};

export default PuzzleInfoSolutionFormTeamControl;
