'use client';

import { usePathname } from 'next/navigation';
import type { FC, ReactNode } from 'react';

import { Tabs } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleTabsNavProps = {
  slug: string;
  children: ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleTabs: FC<PuzzleTabsNavProps> = ({ slug, children }) => {
  const pathname = usePathname();

  return (
    <Tabs.Root defaultValue={pathname} activationMode="manual">
      <Tabs.List className="mx-auto mt-2 max-w-[90rem] border-none px-4 lg:px-20">
        {[
          { name: 'Puzzle', href: `/puzzle/${slug}` },
          { name: 'Solves', href: `/puzzle/${slug}/solves` },
        ].map(({ name, href }) => (
          <Tabs.Trigger
            key={href}
            id={`trigger-${href}`}
            value={href}
            href={href}
            aria-controls={`content-${href}`}
          >
            {name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <hr className="border-t border-stroke" role="separator" />
      {children}
    </Tabs.Root>
  );
};

export default PuzzleTabs;
