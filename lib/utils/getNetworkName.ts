/**
 * Return the name of the network for a given chain.
 * @dev If the chain is not supported, the function returns the network name for
 * Ethereum (`eth`).
 * @param chainId The ID of the chain
 * @returns The network name.
 */
const getNetworkName = (chainId: number): string => {
  if (chainId === 8453) return 'base';

  // Return Ethereum's network name by default.
  return 'eth';
};

export default getNetworkName;
