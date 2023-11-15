'use client';

import { type FC, Fragment, type ReactNode } from 'react';

import AddressLinkClient from './address-link-client';
import ENSAvatarClient from './ens-avatar-client';
import { ExternalLink, Github } from 'lucide-react';
import useSWR from 'swr';
import type { Address } from 'viem';

import { DbUser } from '@/lib/types/api';
import { getChainInfo } from '@/lib/utils';

import LogoIcon from '@/components/common/logo-icon';
import { ButtonGroup, HoverCard, IconButton } from '@/components/ui';

type UserHoverCardProps = {
  address: Address;
  trigger: ReactNode;
};

const UserHoverCard: FC<UserHoverCardProps> = ({ address, trigger }) => {
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
      }}
      hasArrow={false}
    >
      {!error || !isLoading || data !== undefined ? (
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
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-gray-50">{data?.displayName}</span>
            <AddressLinkClient className="text-sm font-normal text-gray-200" address={address} />
          </div>
          {data?.bio ? <div className="text-sm text-gray-100">{data.bio}</div> : null}
        </Fragment>
      ) : null}
    </HoverCard>
  );
};

export default UserHoverCard;
