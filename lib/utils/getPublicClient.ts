import type { PublicClient } from 'viem';

import { baseClient, ethereumClient } from '@/lib/client';

/**
 * Return a public client for interfacing with a given chain.
 * @dev If the chain is not supported, the function returns a public client for
 * Ethereum.
 * @param chainId The ID of the chain.
 * @returns The public client.
 */
const getPublicClient = (chainId: number): PublicClient => {
  if (chainId === 8453) return baseClient;

  // Return a public client for Ethereum.
  return ethereumClient;
};

export default getPublicClient;
