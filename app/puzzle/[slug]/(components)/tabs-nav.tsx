'use client';

import { usePathname } from 'next/navigation';
import type { FC, ReactNode } from 'react';

import { Tabs } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleTabsNavProps = {
  slug: string;
  hasWriteup: boolean;
  children: ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleTabs: FC<PuzzleTabsNavProps> = ({ slug, hasWriteup, children }) => {
  const pathname = usePathname();
  const normalizedSlug = decodeURIComponent(slug.toLowerCase());

  return (
    <Tabs.Root defaultValue={pathname} activationMode="manual">
      <Tabs.List className="mx-auto mt-2 max-w-[90rem] border-none px-4 lg:px-20">
        {[
          { name: 'Puzzle', href: `/puzzle/${normalizedSlug}`, disabled: false },
          { name: 'Leaderboard', href: `/puzzle/${normalizedSlug}/leaderboard`, disabled: false },
          { name: 'Write-up', href: `/puzzle/${normalizedSlug}/write-up`, disabled: !hasWriteup },
        ].map(({ name, href, disabled }) =>
          !disabled ? (
            <Tabs.Trigger
              key={href}
              className="data-[state=active]:before:bottom-0"
              id={`trigger-${href}`}
              value={href}
              href={href}
              aria-controls={`content-${href}`}
            >
              {name}
            </Tabs.Trigger>
          ) : null,
        )}
      </Tabs.List>
      <hr className="border-t border-stroke" role="separator" />
      {children}
    </Tabs.Root>
  );
};

export default PuzzleTabs;
