import {
  baseClient,
  baseGoerliClient,
  baseSepoliaClient,
  ethereumClient,
  sepoliaClient,
} from '@/lib/client';

/**
 * Return a public client for interfacing with a given chain.
 * @dev If the chain is not supported, the function returns a public client for
 * Ethereum.
 * @param chainId The ID of the chain.
 * @returns The public client.
 */
const getPublicClient = (chainId: number) => {
  if (chainId === 8453) return baseClient;
  else if (chainId === 84531) return baseGoerliClient;
  else if (chainId === 84532) return baseSepoliaClient;
  else if (chainId === 11155111) return sepoliaClient;

  // Return a public client for Ethereum.
  return ethereumClient;
};

export default getPublicClient;
