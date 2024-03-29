import createMDX from '@next/mdx';
import rehypeKatex from 'rehype-katex';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex, rehypeMdxCodeProps],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: true },
  images: {
    domains: ['ipfs.io', 'arweave.net'],
  },
  reactStrictMode: true,
  swcMinify: false,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  redirects: async () => [
    {
      source: '/farcaster',
      destination: 'https://warpcast.com/~/channel/curta',
      permanent: true,
    },
    {
      source: '/docs/overview',
      destination: '/docs',
      permanent: true,
    },
    {
      source: '/docs/puzzles',
      destination: '/docs/puzzles/overview',
      permanent: true,
    },
    // Mainnet contract redirects
    {
      source: '/(1|eth)\\:(puzzles|flag)',
      destination: 'https://etherscan.io/address/0x0000000006bC8D9e5e9d436217B88De704a9F307',
      permanent: true,
    },
    {
      source: '/(1|eth)\\:(authorship)',
      destination: 'https://etherscan.io/address/0xC0ffeEb30F5aAA18Cd0a799F6dA1bdcb46f63C44',
      permanent: true,
    },
    // Base contract redirects
    {
      source: '/(8453|base)\\:(puzzles|flag)',
      destination: 'https://basescan.org/address/0x00000000d1329c5cd5386091066d49112e590969',
      permanent: true,
    },
    {
      source: '/(8453|base)\\:(authorship)',
      destination: 'https://basescan.org/address/0xC0FFEE8b8e502403e51f37030E32c52bA4b37f7d',
      permanent: true,
    },
    {
      source: '/(8453|base)\\:(golf|king)',
      destination: 'https://basescan.org/address/0x8cCd70b1B74eA505dbA39d2D11C3aB6a2CB14A8c',
      permanent: true,
    },
    {
      source: '/(8453|base)\\:(par)',
      destination: 'https://basescan.org/address/0xDe26C7d0A4aE6956Bfb893c80C4418D84e389Aca',
      permanent: true,
    },
  ],
  webpack: (config) => {
    config.experiments.asyncWebAssembly = true;
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    config.resolve.fallback = { fs: false, net: false, tls: false };

    return config;
  },
};

export default withMDX(nextConfig);
