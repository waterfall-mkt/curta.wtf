'use client';

import { usePathname } from 'next/navigation';
import { type FC, Fragment, useMemo, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { ChevronRight, Menu, X } from 'lucide-react';

import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import type { Page } from '@/lib/types/site';

import { Button, IconButton } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type DocsNavBarProps = {
  sections: { name: string; pages: Page[] }[];
};

type DocsNavBarInternalProps = {
  sections: { name: string; pages: Page[] }[];
  selected?: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const DocsNavBar: FC<DocsNavBarProps> = ({ sections }) => {
  const pathname = usePathname();

  return (
    <Fragment>
      <DocsNavBarDesktop sections={sections} selected={pathname} />
      <DocsNavBarMobile sections={sections} selected={pathname} />
    </Fragment>
  );
};

const DocsNavBarDesktop: FC<DocsNavBarInternalProps> = ({ sections, selected }) => {
  return (
    <nav
      className="hide-scrollbar sticky top-[6.5rem] -ml-4 hidden min-w-[14rem] max-w-[14rem] flex-col overflow-y-scroll px-0.5 md:flex lg:top-[7.5rem]"
      style={{ height: 'calc(100vh - 11rem)' }}
    >
      <DocsNavBarInternal sections={sections} selected={selected} />
    </nav>
  );
};

const DocsNavBarMobile: FC<DocsNavBarInternalProps> = ({ sections, selected }) => {
  const [open, setOpen] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // `md` breakpoint

  const [selectedSectionName, selectedPageName] = useMemo(() => {
    for (let i = 0; i < sections.length; ++i) {
      const category = sections[i];
      const page = category.pages.find((page) => page.slug === selected);

      if (page) return [category.name, page.name];
    }

    return ['', ''];
  }, [sections, selected]);

  return (
    <Dialog.Root open={open && isSmallScreen} onOpenChange={setOpen}>
      <div className="pointer-events-auto sticky top-14 z-popover mb-4 flex h-12 w-full items-center border-b border-stroke bg-gray-900 px-4 md:hidden">
        <Dialog.Trigger asChild>
          <button
            className="rounded-full bg-gray-450 px-3 py-1.5 text-xs text-gray-100 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-250 active:scale-100"
            type="button"
            aria-label={open ? 'Close docs nav bar' : 'Open docs nav bar'}
          >
            Menu
          </button>
        </Dialog.Trigger>
        <ol className="ml-4 flex text-sm">
          <li className="flex items-center text-gray-200">
            {selectedSectionName}
            <ChevronRight className="mx-1 h-4 w-4" />
          </li>
          <li className="font-medium text-gray-100">{selectedPageName}</li>
        </ol>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-overlay outline-none backdrop-brightness-50 animate-in fade-in-50 focus:outline-none md:hidden" />
        <Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()} asChild>
          <nav className="hide-scrollbar fixed inset-0 z-overlay overflow-y-scroll bg-gray-900 p-4 pt-[7.5rem] animate-in slide-in-from-top-1 md:hidden">
            <DocsNavBarInternal sections={sections} selected={selected} />
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const DocsNavBarInternal: FC<DocsNavBarInternalProps> = ({ sections, selected }) => {
  return (
    <Fragment>
      {sections.map((category, index) => (
        <Fragment key={index}>
          <div className={clsx('ml-4 font-medium text-gray-100', index > 0 ? 'mt-4' : '')}>
            {category.name}
          </div>
          {category.pages.map((page) => {
            const pageSelected = selected === page.slug;

            return (
              <div key={page.slug}>
                <Button
                  className={clsx(
                    'mt-1 w-full justify-start',
                    pageSelected ? 'cursor-default bg-blue-800 text-blue-200' : '',
                  )}
                  variant="text"
                  intent="neutral"
                  href={page.slug}
                  disabled={pageSelected}
                >
                  {page.name}
                </Button>
              </div>
            );
          })}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default DocsNavBar;
