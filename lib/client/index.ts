import { createPublicClient, fallback, http } from 'viem';
import { base, baseGoerli, mainnet, sepolia } from 'viem/chains';

const alchemyBase = http(
  `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
);

const alchemyBaseGoerli = http(
  `https://base-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
);

const alchemyEthereum = http(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
);

const alchemySepolia = http(
  `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
);

export const baseClient = createPublicClient({
  chain: base,
  transport: fallback([alchemyBase, http()]),
});

export const baseGoerliClient = createPublicClient({
  chain: baseGoerli,
  transport: fallback([alchemyBaseGoerli, http()]),
});

export const ethereumClient = createPublicClient({
  chain: mainnet,
  transport: fallback([alchemyEthereum, http()]),
});

export const sepoliaClient = createPublicClient({
  chain: sepolia,
  transport: fallback([alchemySepolia, http()]),
});
