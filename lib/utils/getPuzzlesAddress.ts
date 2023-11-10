import type { Address } from 'viem';

/**
 * Return the Puzzles contract address for a given chain.
 * @dev If the chain is not supported, the function returns the deploy on
 * Ethereum.
 * @param chainId The ID of the chain.
 * @returns The address of the Puzzles contract.
 */
const getPuzzlesAddress = (chainId: number): Address => {
  if (chainId === 8453) return '0x0000000006bC8D9e5e9d436217B88De704a9F307'; // TODO: replace

  // Return the deploy on Ethereum by default.
  return '0x0000000006bC8D9e5e9d436217B88De704a9F307';
};

export default getPuzzlesAddress;
