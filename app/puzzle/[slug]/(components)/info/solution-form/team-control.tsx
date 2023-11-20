'use client';

import { type FC, Fragment, useEffect, useState } from 'react';

import { ArrowLeftRight } from 'lucide-react';
import useSWR from 'swr';
import { useAccount } from 'wagmi';

import type { Team } from '@/lib/types/protocol';

import Avatar from '@/components/templates/avatar';
import TeamDisplayClient from '@/components/templates/team-display-client';
import { Badge, Button, IconButton, Modal, Tooltip } from '@/components/ui';

const PuzzleInfoSolutionFormTeamControl: FC = () => {
  const { address } = useAccount();
  const { data, error, isLoading } = useSWR<Team>(
    `/api/user-team?address=${address}`,
    (url: string) => fetch(url).then((res) => res.json()),
  );
  const [mounted, setMounted] = useState<boolean>(false);

  // Set mounted.
  useEffect(() => setMounted(true), []);

  const isTeamLeader = data?.id && data.leader?.address === address?.toLowerCase();

  return (
    <div className="flex h-11 grow items-center justify-between rounded-b-xl border border-t-0 border-gray-300 pl-4 pr-2">
      {!error && !isLoading && mounted ? (
        <Fragment>
          <div className="flex items-center gap-1 text-gray-150">
            {data?.id ? (
              <Fragment>
                <span className="text-sm">Submitting for</span>
                <Tooltip content={`#${data.id}`}>
                  <button className="flex h-5 items-center gap-1 rounded bg-gray-450 px-1.5 transition-colors hover:bg-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-250">
                    <Avatar src={data.avatar ?? ''} alt={`Team #${data.id}`} size={16} />
                    <span className="text-xs font-medium leading-4">
                      {data.name ?? `Team #${data.id}`}
                    </span>
                  </button>
                </Tooltip>
              </Fragment>
            ) : (
              <div className="text-sm text-gray-150">Submitting individually</div>
            )}
          </div>
          <Modal.Root>
            <Modal.Trigger asChild>
              {data?.id ? (
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
                    <div className="flex flex-col gap-3 rounded-lg border border-stroke p-3">
                      <div className="flex items-center justify-between">
                        <TeamDisplayClient team={data} />
                        <Badge size="sm" variant="secondary">
                          Leader
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button className="w-full" size="sm" variant="secondary" intent="primary">
                          Manage members
                        </Button>
                        <Button className="w-full" size="sm" variant="outline" intent="fail">
                          Transfer
                        </Button>
                      </div>
                    </div>
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
