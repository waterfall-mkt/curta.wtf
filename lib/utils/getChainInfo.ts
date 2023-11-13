import type { Address } from 'viem';
import { base, mainnet } from 'wagmi/chains';

type ChainInfo = {
  name: string;
  id: number;
  network: string;
  blockExplorer: string;
  // Curta Puzzles-specific
  puzzlesAddress?: Address;
};

const getChainInfo = (chainId: number): ChainInfo => {
  if (chainId === 8453) {
    return {
      name: base.name,
      id: base.id,
      network: base.network,
      blockExplorer: base.blockExplorers.etherscan.url,
      // Curta Puzzles-specific
      puzzlesAddress: undefined,
    };
  }

  // Return Ethereum by default.
  return {
    name: mainnet.name,
    id: mainnet.id,
    network: mainnet.network,
    blockExplorer: mainnet.blockExplorers.etherscan.url,
    puzzlesAddress: '0x0000000006bC8D9e5e9d436217B88De704a9F307',
    // Curta Puzzles-specific
  };
};

export default getChainInfo;
