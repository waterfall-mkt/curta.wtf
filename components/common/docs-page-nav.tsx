'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import type { Page } from '@/lib/types/site';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type DocsPageNavProps = {
  sections: { name: string; groups: ({ name: string; pages: Page[] } | Page)[] }[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const DocsPageNav: React.FC<DocsPageNavProps> = ({ sections }) => {
  const pathname = usePathname();
  const pages = useMemo(
    () =>
      sections.flatMap((section) =>
        section.groups.flatMap((group) => ('pages' in group ? group.pages : [group])),
      ),
    [sections],
  );
  const prevPage = useMemo(() => {
    const index = pages.findIndex((page) => page.slug === pathname);

    return index > 0 ? pages[index - 1] : null;
  }, [pages, pathname]);
  const nextPage = useMemo(() => {
    const index = pages.findIndex((page) => page.slug === pathname);

    if (index === -1) return null;
    return index !== -1 && index < pages.length - 1 ? pages[index + 1] : null;
  }, [pages, pathname]);

  return (
    <div className="flex w-full items-center justify-between">
      {prevPage ? (
        <Link
          className="-mr-0.5 flex items-center space-x-1 rounded-sm pr-0.5 text-sm text-gray-200 no-underline transition-colors hover:text-gray-50"
          href={prevPage.slug}
        >
          <ArrowLeft className="h-4 w-4" />
          <div>{prevPage.name}</div>
        </Link>
      ) : (
        <div />
      )}
      {nextPage ? (
        <Link
          className="-ml-0.5 flex items-center space-x-1 rounded-sm pl-0.5 text-sm text-gray-200 no-underline transition-colors hover:text-gray-50"
          href={nextPage.slug}
        >
          <div>{nextPage.name}</div>
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default DocsPageNav;
