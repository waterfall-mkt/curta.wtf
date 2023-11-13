import { type Address, zeroAddress } from 'viem';

type ChainInfo = {
  name: string;
  id: number;
  network: string;
  blockExplorer: string;
  // Curta Puzzles-specific
  puzzles: Address;
};

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
    puzzles: '0x0000000006bC8D9e5e9d436217B88De704a9F307',
    // Curta Puzzles-specific
  };
};

export default getChainInfo;
