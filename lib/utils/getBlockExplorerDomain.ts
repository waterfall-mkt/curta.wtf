/**
 * Return a block explorer domain for a given chain.
 * @dev If the chain is not supported, the function returns a domain for
 * Ethereum (`etherscan.io`).
 * @param chainId The ID of the chain.
 * @returns The block explorer domain (without the `https://` prefix).
 */
const getBlockExplorerDomain = (chainId: number): string => {
  if (chainId === 8453) return 'basescan.org';

  // Return Ethereum's block explorer by default.
  return 'etherscan.io';
};

export default getBlockExplorerDomain;
