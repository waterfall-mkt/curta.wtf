import { cache, type FC } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Address } from 'viem';

import { ethereumClient } from '@/lib/client';
import { getChainInfo, getShortenedAddress } from '@/lib/utils';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

export type AddressLinkProps = {
  className?: string;
  address?: Address;
  chainId?: number;
  href?: string;
  label?: string;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const AddressLink: FC<AddressLinkProps> = async ({
  className,
  address,
  chainId = 1,
  href,
  label,
}) => {
  const ensName = address
    ? await cache(async () => await ethereumClient.getEnsName({ address }))()
    : undefined;
  const content = ensName ?? label ?? (address ? getShortenedAddress(address) : '–');

  return (
    <a
      className={twMerge(
        clsx(
          '-mx-0.5 line-clamp-1 text-ellipsis rounded-md px-0.5 text-gray-200 transition-colors hover:text-gray-100 hover:underline',
          className,
        ),
      )}
      href={href ?? `https://${getChainInfo(chainId).blockExplorer}/address/${address}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  );
};

AddressLink.displayName = 'AddressLink';

export default AddressLink;
