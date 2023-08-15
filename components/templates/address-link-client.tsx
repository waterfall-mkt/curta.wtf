'use client';

import { type FC, useEffect, useState } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Address } from 'viem';
import { useEnsName } from 'wagmi';

import { getShortenedAddress } from '@/lib/utils';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type AddressLinkClientProps = {
  className?: string;
  address: Address;
  prefetchedEnsName?: string;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const AddressLinkClient: FC<AddressLinkClientProps> = ({
  className,
  address,
  prefetchedEnsName,
}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { data: ensName } = useEnsName({ address });

  useEffect(() => setMounted(true), []);

  const addressDisplay = mounted
    ? ensName ?? prefetchedEnsName ?? getShortenedAddress(address)
    : prefetchedEnsName ?? getShortenedAddress(address);

  return (
    <a
      className={twMerge(
        clsx(
          'line-clamp-1 w-fit text-ellipsis text-gray-200 transition-colors hover:text-gray-100 hover:underline',
          className,
        ),
      )}
      href={`https://${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/address/${address}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      {addressDisplay}
    </a>
  );
};

export default AddressLinkClient;
