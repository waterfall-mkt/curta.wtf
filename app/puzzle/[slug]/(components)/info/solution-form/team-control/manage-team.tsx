'use client';

import { useEffect, useState } from 'react';

import { ExternalLink, UserMinus, UserPlus } from 'lucide-react';
import type { Address } from 'viem';
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
  useWaitForTransaction,
} from 'wagmi';

import { TEAM_REGISTRY_ABI } from '@/lib/constants/abi';
import type { Team } from '@/lib/types/protocol';
import { getChainInfo, getShortenedAddress } from '@/lib/utils';

import AddressDisplayClient from '@/components/templates/address-display-client';
import { Callout } from '@/components/templates/mdx';
import TeamDisplayClient from '@/components/templates/team-display-client';
import { Badge, Button, ButtonGroup, IconButton, Tooltip, useToast } from '@/components/ui';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type PuzzleInfoSolutionFormTeamControlManageTeamProps = {
  connectedAddress: Address;
  team: Team;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const PuzzleInfoSolutionFormTeamControlManageTeam: React.FC<
  PuzzleInfoSolutionFormTeamControlManageTeamProps
> = ({ connectedAddress, team }) => {
  // Always use Base or Base Goerli for the Team Registry.
  const chainId = process.env.NEXT_PUBLIC_IS_TESTNET ? 84531 : 8453;

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-col rounded-lg border border-stroke">
        <div className="flex items-center justify-between rounded-t-lg border-b border-stroke bg-gray-450 p-3">
          <TeamDisplayClient team={team} hoverCardProps={{ inPortal: true }} />
          <ButtonGroup>
            <Button
              size="sm"
              variant="outline"
              intent="neutral"
              rightIcon={<UserPlus />}
              href={`https://${getChainInfo(chainId).blockExplorer}/address/${
                getChainInfo(chainId).teamRegistry
              }`}
              newTab
            >
              Invite
            </Button>
          </ButtonGroup>
        </div>
        <div className="hide-scrollbar flex max-h-64 flex-col overflow-y-scroll">
          <div className="flex items-center justify-between p-3">
            <AddressDisplayClient address={connectedAddress} hoverCardProps={{ inPortal: true }} />
            <Badge variant="secondary">You</Badge>
          </div>
          {team.members
            .filter((member) => member.address.toLowerCase() !== connectedAddress.toLowerCase())
            .map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-t border-stroke p-3"
              >
                <AddressDisplayClient
                  address={member.address}
                  hoverCardProps={{ inPortal: true }}
                />
                <UserActions member={member} />
              </div>
            ))}
        </div>
      </div>
      <Callout size="sm" intent="primary" className="my-0">
        To switch teams, you must transfer leadership.
      </Callout>
    </div>
  );
};

const UserActions: React.FC<{ member: Team['members'][0] }> = ({ member }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { toast } = useToast();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  // Set `mounted` to true on page load.
  useEffect(() => setMounted(true), []);

  // Always use Base or Base Goerli for the Team Registry.
  const chainId = process.env.NEXT_PUBLIC_IS_TESTNET ? 84531 : 8453;

  // ---------------------------------------–-----------------------------------
  // Remove member
  // ---------------------------------------–-----------------------------------

  const { config: removeMemberConfig } = usePrepareContractWrite({
    address: getChainInfo(chainId).teamRegistry,
    abi: TEAM_REGISTRY_ABI,
    functionName: 'removeMember',
    args: [member.address],
    chainId,
  });
  const { data: removeMemberData, write: removeMember } = useContractWrite({
    ...removeMemberConfig,
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
  const { isLoading: removeMemberIsLoading } = useWaitForTransaction({
    hash: removeMemberData?.hash,
    onError(error) {
      toast({
        title: 'Transaction fail',
        description: error.message,
        intent: 'fail',
        action: removeMemberData ? (
          <Button
            size="sm"
            href={`https://${getChainInfo(chainId).blockExplorer}/tx/${removeMemberData.hash}`}
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
        title: 'Removed member',
        description: `Removed ${getShortenedAddress(member.address)} successfully.`,
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

  // ---------------------------------------–-----------------------------------
  // Transfer leadership
  // ---------------------------------------–-----------------------------------

  const { config: transferLeadershipConfig } = usePrepareContractWrite({
    address: getChainInfo(chainId).teamRegistry,
    abi: TEAM_REGISTRY_ABI,
    functionName: 'transferTeamLeadership',
    args: [member.address],
    chainId,
  });
  const { data: transferLeadershipData, write: transferLeadership } = useContractWrite({
    ...transferLeadershipConfig,
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
  const { isLoading: transferLeadershipIsLoading } = useWaitForTransaction({
    hash: transferLeadershipData?.hash,
    onError(error) {
      toast({
        title: 'Transaction fail',
        description: error.message,
        intent: 'fail',
        action: transferLeadershipData ? (
          <Button
            size="sm"
            href={`https://${getChainInfo(chainId).blockExplorer}/tx/${
              transferLeadershipData.hash
            }`}
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
        title: 'Transfered leadership',
        description: `Transferred leadership to ${getShortenedAddress(
          member.address,
        )} successfully.`,
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

  return !chain || !mounted ? (
    <Badge size="sm" intent="fail">
      Connect wallet
    </Badge>
  ) : chain.id !== chainId ? (
    <Button size="sm" variant="secondary" type="button" onClick={() => switchNetwork?.(chainId)}>
      Switch network
    </Button>
  ) : (
    <div className="flex gap-2">
      <Tooltip content="Transfer leadership" side="left" triggerProps={{ asChild: true }}>
        <Button
          size="sm"
          variant="outline"
          intent="fail"
          type="button"
          disabled={!transferLeadership || transferLeadershipIsLoading}
          onClick={() => transferLeadership?.()}
        >
          Transfer
        </Button>
      </Tooltip>
      <Tooltip content="Remove member" side="left" triggerProps={{ asChild: true }}>
        <IconButton
          size="sm"
          variant="text"
          intent="neutral"
          type="button"
          disabled={!removeMember || removeMemberIsLoading}
          onClick={() => removeMember?.()}
        >
          <UserMinus />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default PuzzleInfoSolutionFormTeamControlManageTeam;
