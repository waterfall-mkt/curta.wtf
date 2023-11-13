import { type Address, zeroAddress } from 'viem';

/**
 * Type to contain static information about a chain.
 * @param name The name of the chain.
 * @param id The ID of the chain.
 * @param network The network name of the chain.
 * @param blockExplorer The block explorer domain of the chain (without the
 * `https://` prefix).
 * @param puzzles The Curta Puzzles contract address on the chain (`address(0)`
 * if the chain doesn't have a deploy).
 */
type ChainInfo = {
  name: string;
  id: number;
  network: string;
  blockExplorer: string;
  // Curta Puzzles-specific
  puzzles: Address;
};

/**
 * Return static information about a given chain.
 * @dev If the chain is not supported, the function returns information for
 * Ethereum.
 * @param chainId The ID of the chain.
 * @returns The chain information.
 */
const getChainInfo = (chainId: number): ChainInfo => {
  if (chainId === 8453) {
    return {
      name: 'Base',
      id: 8453,
      network: 'base',
      blockExplorer: 'basescan.org',
      // Curta Puzzles-specific
      puzzles: zeroAddress,
    };
  }

  // Return Ethereum by default.
  return {
    name: 'Ethereum',
    id: 1,
    network: 'eth',
    blockExplorer: 'etherscan.io',
    // Curta Puzzles-specific
    puzzles: '0x0000000006bC8D9e5e9d436217B88De704a9F307',
  };
};

export default getChainInfo;
