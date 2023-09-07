import type { Address } from 'viem';

const getShortenedAddress = (address: Address, type: 'short' | 'long' = 'short'): string => {
  return type === 'short' ? address.slice(0, 9) : `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default getShortenedAddress;
