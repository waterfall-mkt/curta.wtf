'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type FC, Fragment, type UIEvent, useMemo, useState } from 'react';

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
    <aside
      className="hide-scrollbar sticky top-[6.5rem] -mx-0.5 -ml-3 hidden min-w-[14rem] max-w-[14rem] flex-col overflow-x-hidden overflow-y-scroll px-0.5 focus-visible:outline-none lg:top-[7.5rem] lg:flex"
      style={{ height: 'calc(100vh - 11rem)' }}
      tabIndex={-1}
    >
      <div className="relative flex grow flex-col">
        <div className="sticky top-0 z-30 mb-2 bg-gray-900">
          <Link
            className="-mr-1 ml-2 rounded-md px-1 text-lg no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-250"
            href="/docs"
          >
            <span className="font-semibold tracking-tighter text-gray-50">Curta</span>{' '}
            <span className="text-gray-150">| Docs</span>
          </Link>
          <div className="px-3">
            <hr
              className="mt-2 h-[1px] w-full rounded-full border-t border-stroke"
              role="separator"
            />
          </div>
        </div>
        <DocsNavBarInternal sections={sections} selected={selected} />
      </div>
    </aside>
  );
};

const DocsNavBarMobile: FC<DocsNavBarInternalProps> = ({ sections, selected }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrollIsAtLeft, setScrollIsAtLeft] = useState<boolean>(true);
  const [scrollIsAtRight, setScrollIsAtRight] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery('(max-width: 1024px)'); // `lg` breakpoint

  const [selectedSectionName, selectedGroupName, selectedPageName] = useMemo(() => {
    for (let i = 0; i < sections.length; ++i) {
      const section = sections[i];
      for (let j = 0; j < section.groups.length; ++j) {
        const group = section.groups[j];
        if ('pages' in group) {
          const page = group.pages.find((page) => page.slug === selected);
          if (page) return [section.name, group.name, page.name];
        } else if (group.slug === selected) {
          return [section.name, '', group.name];
        }
      }
    }

    return ['', '', ''];
  }, [sections, selected]);

  // Function for setting scroll values to conditionally render gradient
  // overflows.
  const onScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const scrollLeft = target.scrollLeft;
    const scrollWidth = target.scrollWidth;
    const clientWidth = target.clientWidth;

    setScrollIsAtLeft(scrollLeft === 0);
    setScrollIsAtRight(scrollWidth - scrollLeft < clientWidth);
  };

  return (
    <Dialog.Root open={isOpen && isSmallScreen} onOpenChange={setIsOpen}>
      <div className="pointer-events-auto sticky top-14 z-popover mb-4 flex h-12 w-full items-center border-b border-stroke bg-gray-900 px-4 lg:hidden">
        <Dialog.Trigger asChild>
          <button
            className="rounded-full bg-gray-450 px-3 py-1.5 text-xs text-gray-100 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-250 active:scale-100"
            type="button"
            aria-label={isOpen ? 'Close docs nav bar' : 'Open docs nav bar'}
          >
            Menu
          </button>
        </Dialog.Trigger>
        <div className="hide-scrollbar relative ml-4 grow overflow-x-scroll">
          <div className="hide-scrollbar relative grow overflow-x-scroll" onScroll={onScroll}>
            <ol className="flex text-sm">
              {selectedSectionName.length > 0 ? (
                <li className="flex items-center text-gray-200">
                  {selectedSectionName}
                  <ChevronRight className="mx-1 h-4 w-4" />
                </li>
              ) : null}
              {selectedGroupName.length > 0 ? (
                <li className="flex items-center text-gray-200">
                  {selectedGroupName}
                  <ChevronRight className="mx-1 h-4 w-4" />
                </li>
              ) : null}
              <li className="whitespace-nowrap font-medium text-gray-100">{selectedPageName}</li>
            </ol>
          </div>
          <div
            className={clsx(
              'pointer-events-none absolute left-0 top-0 h-5 w-4 bg-gradient-to-r from-gray-900 transition-opacity',
              scrollIsAtLeft ? 'opacity-0' : 'opacity-100',
            )}
          />
          <div
            className={clsx(
              'pointer-events-none absolute right-0 top-0 h-5 w-4 bg-gradient-to-l from-gray-900 transition-opacity',
              scrollIsAtRight ? 'opacity-0' : 'opacity-100',
            )}
          />
        </div>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-overlay outline-none backdrop-brightness-50 animate-in fade-in-50 focus:outline-none lg:hidden" />
        <Dialog.Content onOpenAutoFocus={(e: Event) => e.preventDefault()} asChild>
          <nav className="hide-scrollbar fixed inset-0 z-overlay overflow-y-scroll bg-gray-900 p-4 pt-[7.5rem] animate-in slide-in-from-top-1 lg:hidden">
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
          {section.name.length > 0 ? (
            <div className={clsx('ml-3 font-medium text-gray-100', index > 0 ? 'mt-4' : '')}>
              {section.name}
            </div>
          ) : null}
          {section.groups.map((group, groupIndex) => {
            if ('pages' in group) {
              const groupSelected =
                group.pages.find((page) => page.slug === selected) !== undefined;

              return (
                <Accordion.Root
                  key={groupIndex}
                  type="single"
                  defaultValue={groupSelected ? group.name : undefined}
                  collapsible
                >
                  <Accordion.Item value={group.name} className="w-full">
                    <Accordion.Trigger asChild>
                      <Button
                        className={clsx(
                          'group w-full justify-between',
                          groupSelected ? 'data-variant-text:text-gray-100' : '',
                          section.name.length > 0 || groupIndex > 0 ? 'mt-1' : '',
                        )}
                        variant="text"
                        intent="neutral"
                        rightIcon={
                          <ChevronRight className="transition-transform group-data-[state='open']:rotate-90" />
                        }
                      >
                        {group.name}
                      </Button>
                    </Accordion.Trigger>
                    <Accordion.Content className="-mb-1 -mr-1 overflow-hidden pb-1 pl-4 pr-1 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      {group.pages.map((page, pageIndex) => (
                        <DocsNavBarInternalButton
                          key={pageIndex}
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
                marginTop={section.name.length > 0 || groupIndex > 0}
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
  marginTop?: boolean;
  selected?: string;
  setIsOpen?: (isOpen: boolean) => void;
}> = ({ page, marginTop = true, selected, setIsOpen }) => {
  const pageSelected = selected === page.slug;

  return (
    <div className={marginTop ? 'mt-1' : undefined}>
      <Button
        className={clsx(
          'w-full justify-start',
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
