import { createPublicClient, fallback, http } from 'viem';
import { base, mainnet } from 'viem/chains';

const alchemyBase = http(
  `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
);
const alchemyEthereum = http(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
);

export const baseClient = createPublicClient({
  chain: base,
  transport: fallback([alchemyBase, http()]),
});

export const ethereumClient = createPublicClient({
  chain: mainnet,
  transport: fallback([alchemyEthereum, http()]),
});
