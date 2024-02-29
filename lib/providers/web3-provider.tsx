'use client';

import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { base, baseGoerli, baseSepolia, mainnet, sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// -----------------------------------------------------------------------------
// RainbowKit + Wagmi config
// -----------------------------------------------------------------------------

const { chains, publicClient, webSocketPublicClient } = configureChains(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  process.env.NEXT_PUBLIC_IS_TESTNET ? [baseGoerli, baseSepolia, sepolia] : [base, mainnet],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }), publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'Curta',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID,
  chains,
});

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

export default function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider theme={darkTheme()} modalSize="compact" chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
