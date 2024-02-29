/* 'use client';

import { useEffect, useState } from 'react';

import * as RadioGroup from '@radix-ui/react-radio-group';
import clsx from 'clsx';
import { ExternalLink, HelpCircle, UserPlus } from 'lucide-react';
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
  useWaitForTransaction,
} from 'wagmi';

import { TEAM_REGISTRY_ABI } from '@/lib/constants/abi';
import type { Team, TeamMemberApproval } from '@/lib/types/protocol';
import { getChainInfo } from '@/lib/utils';

import ConnectButton from '@/components/common/connect-button';
import { Callout } from '@/components/templates/mdx';
import TeamDisplayClient from '@/components/templates/team-display-client';
import { Badge, Button, Input, useToast } from '@/components/ui';

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

const PuzzleInfoSolutionFormTeamControlSwitch: React.FC<
  PuzzleInfoSolutionFormTeamControlSwitchProps
> = ({ userTeam, approvals }) => {
  const [search, setSearch] = useState<string>('');
  const [teamId, setTeamId] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);
  const { toast } = useToast();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  // Set `mounted` to true on page load.
  useEffect(() => setMounted(true), []);

  const oldTeamId = userTeam?.id ?? 0;
  const newTeamId = teamId ? Number(teamId) : undefined;
  const newTeam = approvals.find((approval) => newTeamId === approval.team.id)?.team;
  const individualDisabled = oldTeamId === 0;

  // ---------------------------------------–-----------------------------------
  // Chain interaction
  // ---------------------------------------–-----------------------------------

  // Always use Base or Base Sepolia for the Team Registry.
  const chainId = process.env.NEXT_PUBLIC_IS_TESTNET ? 84532 : 8453;

  const { config } = usePrepareContractWrite({
    address: getChainInfo(chainId).teamRegistry,
    abi: TEAM_REGISTRY_ABI,
    functionName: 'transferTeam',
    args: [newTeamId],
    chainId,
  });
  const { data, write } = useContractWrite({
    ...config,
    onError: (error) =>
      toast({ intent: 'fail', title: 'Transaction error', description: error?.message }),
    onSuccess: (data) =>
      toast({
        title: 'Transaction sent',
        description: 'Your transaction has been sent.',
        intent: 'primary',
        action: (
          <Button
            size="sm"
            href={`https://${getChainInfo(chainId).blockExplorer}/tx/${data.hash}`}
            rightIcon={<ExternalLink />}
            intent="primary"
            newTab
          >
            View
          </Button>
        ),
      }),
  });
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onError(error) {
      toast({
        title: 'Transaction fail',
        description: error.message,
        intent: 'fail',
        action: data ? (
          <Button
            size="sm"
            href={`https://${getChainInfo(chainId).blockExplorer}/tx/${data.hash}`}
            rightIcon={<ExternalLink />}
            intent="fail"
            newTab
          >
            View
          </Button>
        ) : undefined,
      });
    },
    onSuccess(data) {
      toast({
        title: 'Transferred teams',
        description: `Transferred to team ${newTeamId} successfully.`,
        intent: 'success',
        action: data ? (
          <Button
            size="sm"
            href={`https://${getChainInfo(chainId).blockExplorer}/tx/${data.transactionHash}`}
            rightIcon={<ExternalLink />}
            intent="success"
            newTab
          >
            View
          </Button>
        ) : undefined,
      });
    },
  });

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
              'flex h-12 grow items-center justify-between border-x border-gray-300',
              individualDisabled
                ? 'cursor-not-allowed'
                : 'cursor-pointer transition-colors hover:bg-gray-450',
              teamId === '0' ? 'bg-gray-450' : '',
            )}
          >
            <label
              className={clsx(
                'flex h-full w-full items-center py-3 pl-3 text-sm font-medium text-gray-100',
                individualDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
              )}
              htmlFor="r0"
            >
              Submit as individual.
            </label>
            <RadioGroup.Item value="0" id="r0" disabled={individualDisabled} asChild>
              <button className="m-0.5 flex items-center p-2.5 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-250">
                <RadioGroup.Indicator className="focus:outline-none">
                  <Badge variant="secondary" intent="primary">
                    Selected
                  </Badge>
                </RadioGroup.Indicator>
              </button>
            </RadioGroup.Item>
            {individualDisabled ? (
              <Badge className="my-3 mr-3 min-w-fit" variant="secondary" intent="neutral">
                Current
              </Badge>
            ) : null}
          </div>
          {approvals
            .filter(
              ({ team }) => search.length === 0 || (team.name && team.name.indexOf(search) > -1),
            )
            .map((approval, index) => {
              const disabled = oldTeamId === approval.teamId;
              const selected = newTeamId === approval.teamId;

              return (
                <div
                  key={index}
                  className={clsx(
                    'flex items-center justify-between border-x border-t border-gray-300 last:rounded-b-lg last:border-b',
                    disabled
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer transition-colors hover:bg-gray-450',
                    selected ? 'bg-gray-450' : '',
                  )}
                >
                  <label
                    className="h-full grow py-3 pl-3 text-gray-100"
                    htmlFor={`r${approval.teamId}`}
                  >
                    <TeamDisplayClient team={approval.team} hoverCardProps={{ inPortal: true }} />
                  </label>
                  <RadioGroup.Item
                    value={`${approval.teamId}`}
                    id={`r${approval.teamId}`}
                    disabled={disabled}
                    asChild
                  >
                    <button className="m-0.5 flex items-center p-2.5 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-250">
                      <RadioGroup.Indicator>
                        <Badge className="my-3" variant="secondary" intent="primary">
                          Selected
                        </Badge>
                      </RadioGroup.Indicator>
                    </button>
                  </RadioGroup.Item>
                  {disabled ? (
                    <Badge className="my-3 mr-3 min-w-fit" variant="secondary" intent="neutral">
                      Current
                    </Badge>
                  ) : null}
                </div>
              );
            })}
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
        {teamId && oldTeamId !== newTeamId ? (
          <Callout size="sm" intent="warning" className="mb-0 mt-2">
            <span>
              All solves will be transferred from{' '}
              <span className="font-medium">
                {userTeam?.id ? userTeam.name ?? `Team #${userTeam.id}` : 'yourself'}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {newTeam ? newTeam?.name ?? `Team #${newTeam.id}` : 'yourself'}
              </span>
              .
            </span>
          </Callout>
        ) : null}
      </div>
      {approvals.length > 0 ? (
        <div className="border-t border-stroke p-4">
          {!chain || !mounted ? (
            <ConnectButton className="w-full" />
          ) : chain.id !== chainId ? (
            <Button
              className="w-full"
              size="lg"
              variant="secondary"
              type="button"
              onClick={() => switchNetwork?.(chainId)}
            >
              Switch network
            </Button>
          ) : (
            <Button
              className="w-full"
              size="lg"
              type="button"
              disabled={!teamId || oldTeamId === newTeamId || isLoading || !write}
              onClick={() => write?.()}
            >
              Select
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
};

const NewTeamForm: React.FC<{ name: string }> = ({ name }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { toast } = useToast();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  // Set `mounted` to true on page load.
  useEffect(() => setMounted(true), []);

  // ---------------------------------------–-----------------------------------
  // Chain interaction
  // ---------------------------------------–-----------------------------------

  // Always use Base or Base Sepolia for the Team Registry.
  const chainId = process.env.NEXT_PUBLIC_IS_TESTNET ? 84532 : 8453;

  const { config } = usePrepareContractWrite({
    address: getChainInfo(chainId).teamRegistry,
    abi: TEAM_REGISTRY_ABI,
    functionName: 'createTeam',
    args: [[]],
    chainId,
  });
  const { data, write } = useContractWrite({
    ...config,
    onError: (error) =>
      toast({ intent: 'fail', title: 'Transaction error', description: error?.message }),
    onSuccess: (data) =>
      toast({
        title: 'Transaction sent',
        description: 'Your transaction has been sent.',
        intent: 'primary',
        action: (
          <Button
            size="sm"
            href={`https://${getChainInfo(chainId).blockExplorer}/tx/${data.hash}`}
            rightIcon={<ExternalLink />}
            intent="primary"
            newTab
          >
            View
          </Button>
        ),
      }),
  });
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onError(error) {
      toast({
        title: 'Transaction fail',
        description: error.message,
        intent: 'fail',
        action: data ? (
          <Button
            size="sm"
            href={`https://${getChainInfo(chainId).blockExplorer}/tx/${data.hash}`}
            rightIcon={<ExternalLink />}
            intent="fail"
            newTab
          >
            View
          </Button>
        ) : undefined,
      });
    },
    onSuccess(data) {
      toast({
        title: 'Created team',
        description: 'Successfully created a new team.',
        intent: 'success',
        action: data ? (
          <Button
            size="sm"
            href={`https://${getChainInfo(chainId).blockExplorer}/tx/${data.transactionHash}`}
            rightIcon={<ExternalLink />}
            intent="success"
            newTab
          >
            View
          </Button>
        ) : undefined,
      });
    },
  });

  return (
    <div className="flex flex-col gap-3 rounded-b-lg border border-gray-300 py-3">
      <div className="flex items-center justify-between gap-2 px-3">
        <div className="flex items-center gap-3.5 overflow-hidden">
          <div className="h-10 w-10 min-w-[40px] rounded-full border border-stroke" />
          <div className="max-w-fill -mb-0.5 -ml-4 -mr-2.5 overflow-hidden px-4 pb-0.5">
            <div className="line-clamp-1 overflow-hidden text-ellipsis text-sm text-gray-100">
              {name}
            </div>
            <button
              className="-mx-1 flex items-center gap-0.5 rounded-sm px-1 text-xs leading-4 text-gray-200 underline decoration-dashed transition-colors hover:text-gray-100 focus:outline-none focus-visible:text-gray-100 focus-visible:ring-2 focus-visible:ring-blue-250"
              onClick={() =>
                window.open(
                  `https://${getChainInfo(chainId).blockExplorer}/address/${
                    getChainInfo(chainId).blockExplorer
                  }`,
                  '_blank',
                )
              }
            >
              <span>Invite members</span>
              <UserPlus className="h-3 w-3" />
            </button>
          </div>
        </div>
        <Badge className="min-w-fit" variant="secondary" intent="success">
          New
        </Badge>
      </div>
      <div className="px-3">
        {!chain || !mounted ? (
          <ConnectButton className="w-full" />
        ) : chain.id !== chainId ? (
          <Button
            className="w-full"
            variant="secondary"
            type="button"
            onClick={() => switchNetwork?.(chainId)}
          >
            Switch network
          </Button>
        ) : (
          <Button
            className="w-full"
            variant="outline"
            intent="neutral"
            type="button"
            disabled={isLoading || !write}
            onClick={() => write?.()}
          >
            Create new team
          </Button>
        )}
      </div>
    </div>
  );
};

export default PuzzleInfoSolutionFormTeamControlSwitch;
 */
