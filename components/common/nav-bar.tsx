'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useCallback, useEffect, useState } from 'react';

import ConnectButton from './connect-button';
import Logo from './logo';
import clsx from 'clsx';
import { ExternalLink, Menu, Power } from 'lucide-react';
import { useAccount, useDisconnect, useEnsName } from 'wagmi';

import { NAVBAR_PAGES, SOCIAL_LINKS } from '@/lib/constants/site';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { getChainInfo, getShortenedAddress } from '@/lib/utils';

import { Button, IconButton, Modal } from '@/components/ui';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type NavBarInternalProps = {
  selected?: string;
  yScroll?: number;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const NavBarInternal: React.FC = () => {
  const [yScroll, setYScroll] = useState<number>(0);

  // Update scroll position
  const handleNavigation = useCallback((e: Event) => {
    const window = e.currentTarget as Window;
    setYScroll(window.scrollY);
  }, []);

  useEffect(() => {
    setYScroll(window.scrollY);
    window.addEventListener('scroll', handleNavigation);

    return () => window.removeEventListener('scroll', handleNavigation);
  }, [handleNavigation]);

  // Selected slug determination
  const pathname = usePathname();
  const path = pathname.split('/');
  const selected = `/${!path || path.length < 1 ? '' : path[1]}`;

  return (
    <Fragment>
      <NavBarDesktop selected={selected} yScroll={yScroll} />
      <NavBarMobile yScroll={yScroll} />
    </Fragment>
  );
};

const NavBarDesktop: React.FC<NavBarInternalProps> = ({ selected, yScroll }) => {
  return (
    <nav
      className={clsx(
        'sticky top-0 z-popover hidden h-[4.5rem] w-full items-center bg-gray-900 px-10 lg:flex',
        yScroll && yScroll > 0 && 'border-b border-stroke',
      )}
    >
      <div className="flex flex-1 grow items-center">
        <Logo size="md" className="mr-4" />
        {NAVBAR_PAGES.map((page) => {
          const pageIsSelected = selected === page.slug;

          return (
            <Button
              key={page.slug}
              href={page.slug}
              size="lg"
              variant="text"
              intent="neutral"
              disabled={pageIsSelected}
              className={clsx('ml-4', pageIsSelected ? 'bg-gray-450 text-gray-100' : '')}
            >
              {page.name}
            </Button>
          );
        })}
      </div>

      <div className="flex flex-1 justify-end">
        <ConnectButton />
      </div>
    </nav>
  );
};

const NavBarMobile: React.FC<NavBarInternalProps> = ({ yScroll }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const isSmallScreen = useMediaQuery('(max-width: 1024px)'); // `lg` breakpoint

  useEffect(() => setMounted(true), []);

  const { data, isError, isLoading } = useEnsName({
    address,
    chainId: 1, // Always fetch name from Ethereum
  });

  return (
    <Fragment>
      <Modal.Root open={isOpen && isSmallScreen} onOpenChange={() => setIsOpen(!isOpen)}>
        <nav
          className={clsx(
            'pointer-events-auto sticky top-0 z-popover flex h-14 bg-gray-900 px-4 lg:hidden',
            yScroll && yScroll > 0 && 'border-b border-stroke',
          )}
        >
          <div className="flex h-14 w-full items-center justify-between">
            <Logo size="sm" />
            <div className="z-popover flex">
              <Modal.Trigger asChild>
                <IconButton intent="neutral" variant="text" aria-label="Open navigation menu.">
                  <Menu />
                </IconButton>
              </Modal.Trigger>
            </div>
          </div>
        </nav>
        <Modal.Content className="flex flex-col gap-4 p-4" breakpoint="lg">
          <div className="grow">
            {isConnected || address ? (
              <div className="flex grow items-center justify-between">
                <div>
                  <label className="text-xs text-gray-200" htmlFor="connected-address-link">
                    Connected as
                  </label>
                  <a
                    id="connected-address-link"
                    className="line-clamp-1 text-ellipsis font-medium text-gray-100 transition-colors hover:underline"
                    // Always link to Ethereum's block explorer
                    href={`https://${getChainInfo(1).blockExplorer}/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {mounted && !isError && !isLoading && data
                      ? data
                      : address
                      ? getShortenedAddress(address)
                      : '–'}
                  </a>
                </div>
                <div className="flex gap-2">
                  {[
                    {
                      // Always link to Ethereum's block explorer
                      href: `https://${getChainInfo(1).blockExplorer}/address/${address}`,
                      newTab: true,
                      children: <ExternalLink />,
                    },
                    {
                      title: 'Disconnect wallet',
                      onClick: () => disconnect(),
                      children: <Power />,
                    },
                  ].map((props, index) => (
                    <IconButton
                      key={index}
                      variant="secondary"
                      intent="neutral"
                      size="sm"
                      {...props}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <ConnectButton className="pointer-events-auto z-popover w-full" />
            )}
          </div>

          {NAVBAR_PAGES.map((page) => (
            <Link
              key={page.slug}
              className="-mx-1.5 block rounded-md px-1.5 text-xl font-medium text-gray-100 hover:underline"
              href={page.slug}
              onClick={() => setIsOpen(false)}
            >
              {page.name}
            </Link>
          ))}

          <hr className="border-t border-stroke" />

          {SOCIAL_LINKS.map((item) => (
            <Link
              key={item.name}
              className="-mx-1.5 flex items-center justify-between rounded-md px-1.5 text-gray-150 transition-colors hover:text-gray-100"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{item.name}</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          ))}
        </Modal.Content>
      </Modal.Root>
    </Fragment>
  );
};

export default NavBarInternal;
