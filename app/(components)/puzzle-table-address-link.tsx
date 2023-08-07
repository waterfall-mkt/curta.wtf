'use client';

import type { FC } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Address } from 'viem';

import { getShortenedAddress } from '@/lib/utils';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type PuzzleTableAddressLinkProps = {
  className?: string;
  address: Address;
  ensName?: string;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const PuzzleTableAddressLink: FC<PuzzleTableAddressLinkProps> = ({
  className,
  address,
  ensName,
}) => {
  return (
    <a
      className={twMerge(
        clsx(
          'line-clamp-1 text-ellipsis text-gray-200 transition-colors hover:text-gray-100 hover:underline',
          className,
        ),
      )}
      href={`https://${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/address/${address}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      aria-label={`View ${address} on ${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}`}
    >
      {ensName ?? getShortenedAddress(address)}
    </a>
  );
};

export default PuzzleTableAddressLink;
