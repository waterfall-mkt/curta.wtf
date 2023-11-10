/**
 * Return the name of a chain.
 * @dev If the chain is not supported, the function returns Ethereum.
 * @param chainId The ID of the chain.
 * @returns The chain name.
 */
const getNetworkName = (chainId: number): string => {
  if (chainId === 8453) return 'Base';

  // Return Ethereum by default.
  return 'Ethereum';
};

export default getNetworkName;
