import { cache } from 'react';

import clsx from 'clsx';
import { Github } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import type { Address } from 'viem';

import { ethereumClient } from '@/lib/client';
import { db } from '@/lib/db';
import { getShortenedAddress } from '@/lib/utils';

import LogoIcon from '@/components/common/logo-icon';
import AddressLink from '@/components/templates/address-link';
import Avatar from '@/components/templates/avatar';
import ENSAvatar from '@/components/templates/ens-avatar';
import UserHoverCard from '@/components/templates/user-hover-card';
import { ButtonGroup, IconButton } from '@/components/ui';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type UserDisplayProps = {
  className?: string;
  address: Address;
  displaySocials?: boolean;
  children?: React.ReactNode;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

export default async function UserDisplay({
  className,
  address,
  displaySocials = true,
  children,
}: UserDisplayProps) {
  const ensName = await cache(async () => await ethereumClient.getEnsName({ address }))();
  const userInfo = await cache(
    async () => await db.userInfo.findFirst({ where: { address: address.toLowerCase() } }),
  )();
  const displayName = userInfo?.displayName ?? ensName ?? getShortenedAddress(address);

  return (
    <div key={address} className={twMerge(clsx('flex items-center justify-between', className))}>
      <div className="flex items-center gap-3.5">
        <div className="h-10 w-10 overflow-hidden rounded-full border border-stroke bg-gray-600">
          {ensName ? (
            <ENSAvatar name={ensName} size={40} />
          ) : (
            <Avatar src="" alt={address} size={40} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 font-medium leading-5 text-gray-100">
            {displayName}
            {children}
          </div>
          <UserHoverCard
            address={address}
            trigger={
              <AddressLink className="w-fit text-sm leading-4" address={address} chainId={1} />
            }
          />
        </div>
      </div>
      {displaySocials && (userInfo?.twitter || userInfo?.github) ? (
        <ButtonGroup>
          {userInfo?.twitter ? (
            <IconButton
              variant="outline"
              intent="neutral"
              href={`https://twitter.com/${userInfo.twitter}`}
              newTab
            >
              <LogoIcon.X />
            </IconButton>
          ) : null}
          {userInfo?.github ? (
            <IconButton
              variant="outline"
              intent="neutral"
              href={`https://github.com/${userInfo.github}`}
              newTab
            >
              <Github />
            </IconButton>
          ) : null}
        </ButtonGroup>
      ) : null}
    </div>
  );
}
