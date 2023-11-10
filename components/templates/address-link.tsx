import { cache, type FC } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Address } from 'viem';

import { ethereumClient } from '@/lib/client';
import { getBlockExplorerDomain, getShortenedAddress } from '@/lib/utils';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

export type AddressLinkProps = {
  className?: string;
  address?: Address;
  chainId?: number;
  href?: string;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const AddressLink: FC<AddressLinkProps> = async ({ className, address, chainId = 1, href }) => {
  const ensName = address
    ? await cache(async () => await ethereumClient.getEnsName({ address }))()
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
      href={href ?? `https://${getBlockExplorerDomain(chainId)}/address/${address}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {addressDisplay}
    </a>
  );
};

AddressLink.displayName = 'AddressLink';

export default AddressLink;
