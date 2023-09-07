'use client';

import { type FC, useEffect, useState } from 'react';

import { isAddress } from 'viem';
import { useEnsAvatar, useEnsName } from 'wagmi';

import Avatar from '@/components/templates/avatar';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type ENSAvatarClientProps = {
  className?: string;
  nameOrAddress: string;
  size?: number;
  prefetchedEnsAvatar?: string;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const ENSAvatarClient: FC<ENSAvatarClientProps> = ({
  className,
  nameOrAddress,
  size = 40,
  prefetchedEnsAvatar,
}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { data: ensName } = useEnsName({
    address: isAddress(nameOrAddress) ? nameOrAddress : undefined,
    enabled: isAddress(nameOrAddress),
  });
  const { data: ensAvatar } = useEnsAvatar({
    name: !isAddress(nameOrAddress) ? nameOrAddress : ensName,
  });

  useEffect(() => setMounted(true), []);

  const src = mounted ? ensAvatar ?? prefetchedEnsAvatar ?? '' : prefetchedEnsAvatar ?? '';

  return (
    <Avatar className={className} src={src} alt={`ENS avatar for ${nameOrAddress}`} size={size} />
  );
};

export default ENSAvatarClient;
