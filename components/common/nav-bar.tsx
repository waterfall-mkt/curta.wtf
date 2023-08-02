'use client';

import { usePathname } from 'next/navigation';
import { type FC, Fragment, useCallback, useEffect, useState } from 'react';

import ConnectButton from './connect-button';
import Logo from './logo';
import clsx from 'clsx';

import { NAVBAR_PAGES } from '@/lib/constants/site';

import { Button } from '@/components/ui';

/* Props */
export type NavBarInternalProps = {
  selected?: string;
  yScroll?: number;
};

/* Component */
const NavBar: FC = () => {
  const [yScroll, setYScroll] = useState<number>(0);

  // ---------------------------------------------------------------------------
  // Update scroll position
  // ---------------------------------------------------------------------------

  const handleNavigation = useCallback((e: Event) => {
    const window = e.currentTarget as Window;
    setYScroll(window.scrollY);
  }, []);

  useEffect(() => {
    setYScroll(window.scrollY);
    window.addEventListener('scroll', handleNavigation);

    return () => window.removeEventListener('scroll', handleNavigation);
  }, [handleNavigation]);

  // ---------------------------------------------------------------------------
  // Selected slug determination
  // ---------------------------------------------------------------------------

  const pathname = usePathname();
  const path = pathname.split('/');
  const selected = `/${!path || path.length < 1 ? '' : path[1]}`;

  return (
    <Fragment>
      <NavBarDesktop selected={selected} yScroll={yScroll} />
    </Fragment>
  );
};

const NavBarDesktop: FC<NavBarInternalProps> = ({ selected, yScroll }) => {
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

export default NavBar;
