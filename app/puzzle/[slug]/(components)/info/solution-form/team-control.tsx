'use client';

import { type FC, Fragment, useEffect, useState } from 'react';

import { ArrowLeftRight } from 'lucide-react';
import useSWR from 'swr';
import { useAccount } from 'wagmi';

import type { Team } from '@/lib/types/protocol';
import { getChainInfo } from '@/lib/utils';

import Avatar from '@/components/templates/avatar';
import { Button, IconButton, Modal, Tooltip } from '@/components/ui';

const PuzzleInfoSolutionFormTeamControl: FC = () => {
  const { address } = useAccount();
  const { data, error, isLoading } = useSWR<Team>(
    `/api/user-team?address=${address}`,
    (url: string) => fetch(url).then((res) => res.json()),
  );
  const [mounted, setMounted] = useState<boolean>(false);
  const [open, isOpen] = useState<boolean>(false);

  // Set mounted.
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex h-11 grow items-center justify-between rounded-b-xl border border-t-0 border-gray-300 pl-4 pr-2">
      {!error && !isLoading && mounted && data?.id ? (
        <Fragment>
          <div className="flex items-center gap-1 text-gray-150">
            <span className="text-sm">Submitting for</span>
            <Tooltip content={`#${data.id}`}>
              <button className="flex h-5 items-center gap-1 rounded bg-gray-450 px-1.5 transition-colors hover:bg-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-250">
                <Avatar src={data.avatar ?? ''} alt={`Team #${data.id}`} size={16} />
                <span className="text-xs font-medium leading-4">
                  {data.name ?? `Team #${data.id}`}
                </span>
              </button>
            </Tooltip>
          </div>
          <IconButton
            size="sm"
            variant="outline"
            intent="neutral"
            className="bg-gray-600 active:bg-gray-450"
            href={`https://${getChainInfo(8453).blockExplorer}/address/${
              getChainInfo(8453).teamRegistry
            }`}
            newTab
          >
            <ArrowLeftRight />
          </IconButton>
        </Fragment>
      ) : isLoading || !mounted ? (
        <Fragment>
          <div className="h-6 w-36 animate-pulse rounded bg-gray-350" />
          <div className="h-7 w-7 animate-pulse rounded-lg bg-gray-350" />
        </Fragment>
      ) : (
        <Fragment>
          <div className="text-sm text-gray-150">Submitting individually</div>
          <Button
            size="sm"
            variant="outline"
            intent="neutral"
            className="bg-gray-600 active:bg-gray-450"
            href={`https://${getChainInfo(8453).blockExplorer}/address/${
              getChainInfo(8453).teamRegistry
            }`}
            newTab
          >
            Join
          </Button>
        </Fragment>
      )}
    </div>
  );
};

export default PuzzleInfoSolutionFormTeamControl;
