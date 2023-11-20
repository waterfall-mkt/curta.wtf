'use client';

import type { FC } from 'react';

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
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const AddressDisplayClient: FC<AddressDisplayClientProps> = ({
  address,
  label,
  prefetchedEnsName,
  prefetchedEnsAvatar,
}) => {
  return (
    <div className="flex items-center gap-3.5">
      <div className="overflow-hidden rounded-full">
        <ENSAvatarClient
          nameOrAddress={prefetchedEnsName ?? address}
          size={40}
          prefetchedEnsAvatar={prefetchedEnsAvatar}
        />
      </div>
      <UserHoverCard
        address={address}
        trigger={
          <AddressLinkClient
            className="text-gray-100"
            address={address}
            prefetchedEnsName={prefetchedEnsName}
            label={label}
          />
        }
      />
    </div>
  );
};

export default AddressDisplayClient;
