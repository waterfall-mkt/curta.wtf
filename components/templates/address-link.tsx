import { cache, type FC, type ReactNode } from 'react';

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
  children?: ReactNode;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const AddressLink: FC<AddressLinkProps> = async ({
  className,
  address,
  chainId = 1,
  href,
  children,
}) => {
  const ensName =
    !children && address
      ? await cache(async () => await ethereumClient.getEnsName({ address }))()
      : undefined;
  const content = children ? children : ensName ?? (address ? getShortenedAddress(address) : '–');

  return (
    <a
      className={twMerge(
        clsx(
          'line-clamp-1 text-ellipsis text-gray-200 transition-colors hover:text-gray-100 hover:underline',
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
