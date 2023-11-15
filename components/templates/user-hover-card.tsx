'use client';

import { type FC, Fragment, type ReactNode } from 'react';

import AddressLinkClient from './address-link-client';
import ENSAvatarClient from './ens-avatar-client';
import { ArrowUpRight, ExternalLink, Github, Puzzle } from 'lucide-react';
import useSWR from 'swr';
import type { Address } from 'viem';

import { DbUser } from '@/lib/types/api';
import { getChainInfo, getShortenedAddress } from '@/lib/utils';

import LogoIcon from '@/components/common/logo-icon';
import { Button, ButtonGroup, HoverCard, IconButton } from '@/components/ui';

type UserHoverCardProps = {
  address: Address;
  trigger: ReactNode;
  triggerAsChild?: boolean;
  inPortal?: boolean;
};

const UserHoverCard: FC<UserHoverCardProps> = ({ address, trigger, triggerAsChild, inPortal }) => {
  const { data, error, isLoading, mutate } = useSWR<DbUser>(
    `/api/user?address=${address}`,
    (url) => fetch(url).then((res) => res.json()),
    {
      revalidateOnMount: false,
    },
  );

  return (
    <HoverCard
      className="flex w-[17.75rem] flex-col gap-3 rounded-[1.25rem] p-4"
      trigger={trigger}
      triggerProps={{
        onMouseEnter: () => mutate(),
        asChild: triggerAsChild,
      }}
      hasArrow={false}
      inPortal={inPortal}
      onClick={(e) => e.stopPropagation()}
    >
      {!error && !isLoading ? (
        <Fragment>
          <div className="flex items-center justify-between">
            <ENSAvatarClient nameOrAddress={address} size={52} />
            <ButtonGroup>
              {[
                {
                  href: `https://twitter.com/${data?.twitter}`,
                  icon: <LogoIcon.X />,
                  disabled: !data?.twitter,
                },
                {
                  href: `https://github.com/${data?.github}`,
                  icon: <Github />,
                  disabled: !data?.github,
                },
                {
                  href: `https://${getChainInfo(1).blockExplorer}/address/${address}`,
                  icon: <ExternalLink />,
                  disabled: false,
                },
              ].map((item, index) => {
                if (item.disabled) return null;

                return (
                  <IconButton
                    key={index}
                    intent="neutral"
                    variant="outline"
                    href={item.href}
                    newTab
                  >
                    {item.icon}
                  </IconButton>
                );
              })}
            </ButtonGroup>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex h-5 items-center gap-2">
              <span className="font-medium leading-5 text-gray-50">
                {data?.displayName ? data?.displayName : getShortenedAddress(address)}
              </span>
              {[
                {
                  children: 'Author',
                  display: data?.isPuzzleAuthor,
                },
              ].map((item, index) => {
                if (!item.display) return null;

                return (
                  <span
                    key={index}
                    className="flex h-5 items-center rounded bg-gray-450 px-1.5 text-xs text-gray-200"
                  >
                    {item.children}
                  </span>
                );
              })}
            </div>
            <span className="flex h-4 gap-0.5 text-sm font-book text-gray-200">
              <AddressLinkClient className="-mb-1 pb-1 leading-4 " address={address} />
              <ArrowUpRight className="h-2.5 w-2.5" />
            </span>
          </div>
          {data?.bio ? <div className="text-sm text-gray-100">{data.bio}</div> : null}
          <span className="flex items-center gap-1 text-sm font-book text-gray-200">
            <Puzzle className="h-3.5 w-3.5" />
            <span className="font-medium text-gray-100">{data?.puzzlesSolved ?? 0}</span>
            <span> solves</span>
          </span>
        </Fragment>
      ) : isLoading ? (
        <Fragment>
          <div className="flex items-center justify-between">
            <div className="h-[3.25rem] w-[3.25rem] animate-pulse rounded-full bg-gray-350" />
            <IconButton
              intent="neutral"
              variant="outline"
              href={`https://${getChainInfo(1).blockExplorer}/address/${address}`}
              newTab
            >
              <ExternalLink />
            </IconButton>
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-5 w-[4.5rem] animate-pulse rounded-md bg-gray-350" />
            <div className="h-4 w-[5.5rem] animate-pulse rounded-md bg-gray-350" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-[5rem] animate-pulse rounded-md bg-gray-350" />
            <div className="h-4 w-[5rem] animate-pulse rounded-md bg-gray-350" />
          </div>
        </Fragment>
      ) : (
        <div className="flex flex-col items-center">
          <div className="text-base font-medium text-gray-50">Fetch error</div>
          <div className="mb-2 text-sm text-gray-200">Unable to fetch user data.</div>
          <Button className="w-fit" variant="secondary" onClick={() => mutate()}>
            Try again
          </Button>
        </div>
      )}
    </HoverCard>
  );
};

export default UserHoverCard;
