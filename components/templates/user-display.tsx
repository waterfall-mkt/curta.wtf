import { cache, type ReactNode } from 'react';

import { Github } from 'lucide-react';
import type { Address } from 'viem';

import { ethereumClient } from '@/lib/client';
import supabase from '@/lib/services/supabase';
import type { DbUser } from '@/lib/types/api';
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
  address: Address;
  displaySocials?: boolean;
  children?: ReactNode;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

export default async function UserDisplay({
  address,
  displaySocials = true,
  children,
}: UserDisplayProps) {
  const ensName = await cache(async () => await ethereumClient.getEnsName({ address }))();
  const { data: user } = await cache(
    async () =>
      await supabase
        .from('users')
        .select('*')
        .eq('address', address.toLowerCase())
        .returns<DbUser[]>()
        .single(),
  )();
  const displayName = user?.displayName ?? ensName ?? getShortenedAddress(address);

  return (
    <div key={address} className="flex items-center justify-between">
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
      {displaySocials && (user?.twitter || user?.github) ? (
        <ButtonGroup>
          {user?.twitter ? (
            <IconButton
              variant="outline"
              intent="neutral"
              href={`https://twitter.com/${user.twitter}`}
              newTab
            >
              <LogoIcon.X />
            </IconButton>
          ) : null}
          {user?.github ? (
            <IconButton
              variant="outline"
              intent="neutral"
              href={`https://github.com/${user.github}`}
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
