'use client';

import { usePathname } from 'next/navigation';
import { type FC, Fragment, useMemo, useState } from 'react';

import * as Accordion from '@radix-ui/react-accordion';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';

import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import type { Page } from '@/lib/types/site';

import { Button } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type DocsNavBarProps = {
  sections: { name: string; groups: ({ name: string; pages: Page[] } | Page)[] }[];
};

type DocsNavBarInternalProps = {
  sections: { name: string; groups: ({ name: string; pages: Page[] } | Page)[] }[];
  selected?: string;
  setIsOpen?: (isOpen: boolean) => void;
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
      className="hide-scrollbar sticky top-[6.5rem] -ml-3 hidden min-w-[14rem] max-w-[14rem] flex-col overflow-y-scroll px-0.5 md:flex lg:top-[7.5rem]"
      style={{ height: 'calc(100vh - 11rem)' }}
    >
      <DocsNavBarInternal sections={sections} selected={selected} />
    </nav>
  );
};

const DocsNavBarMobile: FC<DocsNavBarInternalProps> = ({ sections, selected }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // `md` breakpoint

  const [selectedSectionName, selectedPageName] = useMemo(() => {
    for (let i = 0; i < sections.length; ++i) {
      const section = sections[i];
      const page = section.groups
        .flatMap((group) => ('pages' in group ? group.pages : [group]))
        .find((page) => page.slug === selected);

      if (page) return [section.name, page.name];
    }

    return ['', ''];
  }, [sections, selected]);

  return (
    <Dialog.Root open={isOpen && isSmallScreen} onOpenChange={setIsOpen}>
      <div className="pointer-events-auto sticky top-14 z-popover mb-4 flex h-12 w-full items-center border-b border-stroke bg-gray-900 px-4 md:hidden">
        <Dialog.Trigger asChild>
          <button
            className="rounded-full bg-gray-450 px-3 py-1.5 text-xs text-gray-100 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-250 active:scale-100"
            type="button"
            aria-label={isOpen ? 'Close docs nav bar' : 'Open docs nav bar'}
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
        <Dialog.Content onOpenAutoFocus={(e: Event) => e.preventDefault()} asChild>
          <nav className="hide-scrollbar fixed inset-0 z-overlay overflow-y-scroll bg-gray-900 p-4 pt-[7.5rem] animate-in slide-in-from-top-1 md:hidden">
            <DocsNavBarInternal sections={sections} selected={selected} setIsOpen={setIsOpen} />
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

// -----------------------------------------------------------------------------
// Internal components
// -----------------------------------------------------------------------------

const DocsNavBarInternal: FC<DocsNavBarInternalProps> = ({ sections, selected, setIsOpen }) => {
  return (
    <Fragment>
      {sections.map((section, index) => (
        <Fragment key={index}>
          <div className={clsx('ml-3 font-medium text-gray-100', index > 0 ? 'mt-4' : '')}>
            {section.name}
          </div>
          {section.groups.map((group, index) => {
            if ('pages' in group) {
              return (
                <Accordion.Root key={index} type="single" collapsible>
                  <Accordion.Item value={group.name} className="w-full">
                    <Accordion.Trigger asChild>
                      <Button
                        className="group w-full justify-between data-[state='open']:text-gray-100"
                        variant="text"
                        intent="neutral"
                        rightIcon={
                          <ChevronRight className="transition-transform group-data-[state='open']:rotate-90" />
                        }
                      >
                        {group.name}
                      </Button>
                    </Accordion.Trigger>
                    <Accordion.Content className="overflow-hidden pl-4 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      {group.pages.map((page, index) => (
                        <DocsNavBarInternalButton
                          key={index}
                          page={page}
                          selected={selected}
                          setIsOpen={setIsOpen}
                        />
                      ))}
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              );
            }

            return (
              <DocsNavBarInternalButton
                key={index}
                page={group}
                selected={selected}
                setIsOpen={setIsOpen}
              />
            );
          })}
        </Fragment>
      ))}
    </Fragment>
  );
};

const DocsNavBarInternalButton: FC<{
  page: Page;
  selected?: string;
  setIsOpen?: (isOpen: boolean) => void;
}> = ({ page, selected, setIsOpen }) => {
  const pageSelected = selected === page.slug;

  return (
    <div>
      <Button
        className={clsx(
          'mt-1 w-full justify-start',
          pageSelected ? 'cursor-default bg-blue-800 text-blue-200' : '',
        )}
        variant="text"
        intent="neutral"
        href={page.slug}
        onClick={() => setIsOpen?.(false)}
        disabled={pageSelected}
      >
        {page.name}
      </Button>
    </div>
  );
};

export default DocsNavBar;
