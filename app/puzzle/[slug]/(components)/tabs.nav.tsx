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
      <Tabs.List>
        {[
          { name: 'Solve', href: `/puzzle/${slug}` },
          { name: 'Solutions', href: `/puzzle/${slug}/solves` },
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
      {children}
    </Tabs.Root>
  );
};

export default PuzzleTabs;
