import { cache, type FC } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Address } from 'viem';

import { publicClient } from '@/lib/client';
import { getShortenedAddress } from '@/lib/utils';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

export type AddressLinkProps = {
  className?: string;
  address?: Address;
  href?: string;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const AddressLink: FC<AddressLinkProps> = async ({ className, address, href }) => {
  const ensName = address
    ? await cache(async () => await publicClient.getEnsName({ address }))()
    : undefined;
  const addressDisplay = ensName ?? (address ? getShortenedAddress(address) : '–');

  return (
    <a
      className={twMerge(
        clsx(
          'line-clamp-1 text-ellipsis text-gray-200 transition-colors hover:text-gray-100 hover:underline',
          className,
        ),
      )}
      href={href ?? `https://${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/address/${address}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {addressDisplay}
    </a>
  );
};

AddressLink.displayName = 'AddressLink';

export default AddressLink;
