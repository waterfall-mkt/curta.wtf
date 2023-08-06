'use client';

import type { FC } from 'react';

import { ConnectButton as RainbowConnect } from '@rainbow-me/rainbowkit';

import { Button } from '@/components/ui';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type ConnectButtonProps = {
  className?: string;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const ConnectButton: FC<ConnectButtonProps> = ({ className }) => {
  return (
    <RainbowConnect.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            className={className}
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    className={className}
                    variant="secondary"
                    intent="primary"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    className={className}
                    intent="fail"
                    onClick={openChainModal}
                    type="button"
                  >
                    Switch network
                  </Button>
                );
              }

              return (
                <Button
                  className={className}
                  variant="secondary"
                  intent="neutral"
                  onClick={openAccountModal}
                  type="button"
                >
                  {account.displayName}
                </Button>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnect.Custom>
  );
};

ConnectButton.displayName = 'ConnectButton';

export default ConnectButton;
