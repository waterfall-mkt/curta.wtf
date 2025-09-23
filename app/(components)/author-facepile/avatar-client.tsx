'use client';

import { useEffect, useState } from 'react';

import type { UserInfo } from '@prisma/client';

import { ethereumClient } from '@/lib/client';

import UserAvatar from '@/components/templates/user-avatar';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type AuthorFacepileAvatarClientProps = {
  user: UserInfo;
  ensName?: string | null;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const AuthorFacepileAvatarClient: React.FC<AuthorFacepileAvatarClientProps> = ({
  user,
  ensName,
}) => {
  const [ensAvatar, setEnsAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (ensName) {
      ethereumClient
        .getEnsAvatar({ name: ensName })
        .then((avatar) => setEnsAvatar(avatar))
        .catch(() => setEnsAvatar(null));
    }
  }, [ensName]);

  return <UserAvatar size={44} image={ensAvatar} name={user.displayName ?? user.address} />;
};

export default AuthorFacepileAvatarClient;
