'use client';

import { type FC, useEffect, useState } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Address } from 'viem';
import { useEnsName } from 'wagmi';

import { getChainInfo, getShortenedAddress } from '@/lib/utils';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type AddressLinkClientProps = {
  className?: string;
  address: Address;
  chainId?: number;
  prefetchedEnsName?: string;
  label?: string;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const AddressLinkClient: FC<AddressLinkClientProps> = ({
  className,
  address,
  chainId = 1,
  prefetchedEnsName,
  label,
}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { data: ensName } = useEnsName({ address, chainId: 1 });

  useEffect(() => setMounted(true), []);

  const content = mounted
    ? ensName ?? prefetchedEnsName ?? label ?? getShortenedAddress(address)
    : prefetchedEnsName ?? label ?? getShortenedAddress(address);

  return (
    <a
      className={twMerge(
        clsx(
          'line-clamp-1 w-fit text-ellipsis text-gray-200 transition-colors hover:text-gray-100 hover:underline',
          className,
        ),
      )}
      href={`https://${getChainInfo(chainId).blockExplorer}/address/${address}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      {content}
    </a>
  );
};

export default AddressLinkClient;
