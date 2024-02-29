import { type Address, zeroAddress } from 'viem';

import LogoIcon from '@/components/common/logo-icon';

/**
 * Type to contain static information about a chain.
 * @param name The name of the chain.
 * @param id The ID of the chain.
 * @param network The network name of the chain.
 * @param logo The logo of the chain (formatted to be an icon).
 * @param blockExplorer The block explorer domain of the chain (without the
 * `https://` prefix).
 * @param golf The Curta Golf contract address on the chain (`address(0)` if
 * the chain doesn't have a deploy).
 * @param puzzles The Curta Puzzles contract address on the chain (`address(0)`
 * if the chain doesn't have a deploy).
 * @param teamRegistry The Team Registry contract address on the chain
 * (`address(0)` if the chain doesn't have a deploy).
 */
type ChainInfo = {
  name: string;
  id: number;
  network: string;
  logo: React.FC<React.SVGProps<SVGSVGElement>>;
  blockExplorer: string;
  // Curta Golf-specific
  golf: Address;
  // Curta Puzzles-specific
  puzzles: Address;
  // Team Registry-specific
  teamRegistry: Address;
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
      id: chainId,
      network: 'base',
      logo: LogoIcon.Base,
      blockExplorer: 'basescan.org',
      // Curta Golf-specific
      golf: '0x8ccd70b1b74ea505dba39d2d11c3ab6a2cb14a8c',
      // Curta Puzzles-specific
      puzzles: '0x00000000d1329c5cd5386091066d49112e590969',
      teamRegistry: '0xfacade0bcaebb9b48bd1f613d2fd9b9865a3e61d',
    };
  } else if (chainId === 84531) {
    return {
      name: 'Base Goerli',
      id: chainId,
      network: 'base-goerli',
      logo: LogoIcon.Base,
      blockExplorer: 'goerli.basescan.org',
      // Curta Golf-specific
      golf: '0x8936272ebecc127d21bdc0dbd35978dc7bb7f358',
      // Curta Puzzles-specific
      puzzles: '0x00000000d1329c5cd5386091066d49112e590969',
      teamRegistry: '0xfacade0bcaebb9b48bd1f613d2fd9b9865a3e61d',
    };
  } else if (chainId === 84532) {
    return {
      name: 'Base Sepolia',
      id: chainId,
      network: 'base-sepolia',
      logo: LogoIcon.Base,
      blockExplorer: 'sepolia.basescan.org',
      // Curta Golf-specific
      golf: '0x1070e238650a95f24193f1c3fbf4c5dc7805b668',
      // Curta Puzzles-specific
      puzzles: '0x00000000d1329c5cd5386091066d49112e590969',
      teamRegistry: '0xfacade0bcaebb9b48bd1f613d2fd9b9865a3e61d',
    };
  } else if (chainId === 11155111) {
    return {
      name: 'Sepolia',
      id: chainId,
      network: 'sepolia',
      logo: LogoIcon.Ethereum,
      blockExplorer: 'sepolia.etherscan.io',
      // Curta Golf-specific
      golf: zeroAddress,
      // Curta Puzzles-specific
      puzzles: zeroAddress,
      teamRegistry: zeroAddress,
    };
  }

  // Return Ethereum by default.
  return {
    name: 'Ethereum',
    id: 1,
    network: 'eth',
    logo: LogoIcon.Ethereum,
    blockExplorer: 'etherscan.io',
    // Curta Golf-specific
    golf: zeroAddress,
    // Curta Puzzles-specific
    puzzles: '0x0000000006bC8D9e5e9d436217B88De704a9F307',
    teamRegistry: zeroAddress,
  };
};

export default getChainInfo;
