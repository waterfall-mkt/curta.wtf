'use client';

import { useEffect, useState } from 'react';

import { ethereumClient } from '@/lib/client';
import { getShortenedAddress } from '@/lib/utils';

import UserAvatar from '@/components/templates/user-avatar';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ModalAvatarClientProps = {
  address: `0x${string}`;
  ensName?: string | null;
  displayName?: string | null;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ModalAvatarClient: React.FC<ModalAvatarClientProps> = ({ address, ensName, displayName }) => {
  const [ensAvatar, setEnsAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (ensName) {
      ethereumClient
        .getEnsAvatar({ name: ensName })
        .then((avatar) => setEnsAvatar(avatar))
        .catch(() => setEnsAvatar(null));
    }
  }, [ensName]);

  const name = displayName ?? ensName ?? getShortenedAddress(address);

  return <UserAvatar size={40} image={ensAvatar} name={name} />;
};

export default ModalAvatarClient;
