'use client';

import type { ComponentPropsWithoutRef, FC } from 'react';

import type { Address } from 'viem';

import AddressLinkClient from '@/components/templates/address-link-client';
import ENSAvatarClient from '@/components/templates/ens-avatar-client';
import UserHoverCard from '@/components/templates/user-hover-card';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type AddressDisplayClientProps = {
  address: Address;
  label?: string;
  prefetchedEnsName?: string;
  prefetchedEnsAvatar?: string;
  hoverCardProps?: Omit<ComponentPropsWithoutRef<typeof UserHoverCard>, 'address' | 'trigger'>;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const AddressDisplayClient: FC<AddressDisplayClientProps> = ({
  address,
  label,
  prefetchedEnsName,
  prefetchedEnsAvatar,
  hoverCardProps,
}) => {
  return (
    <div className="flex items-center gap-3.5">
      <div className="overflow-hidden rounded-full">
        <ENSAvatarClient
          nameOrAddress={prefetchedEnsName ?? address}
          prefetchedEnsAvatar={prefetchedEnsAvatar}
        />
      </div>
      <UserHoverCard
        address={address}
        trigger={
          <AddressLinkClient
            className="text-sm text-gray-100"
            address={address}
            prefetchedEnsName={prefetchedEnsName}
            label={label}
          />
        }
        {...hoverCardProps}
      />
    </div>
  );
};

export default AddressDisplayClient;
