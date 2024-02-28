'use client';

import { usePathname } from 'next/navigation';

import { Tabs } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleTabsNavProps = {
  slug: string;
  hasWriteup: boolean;
  children: React.ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleTabs: React.FC<PuzzleTabsNavProps> = ({ slug, hasWriteup, children }) => {
  const pathname = usePathname();
  const normalizedSlug = decodeURIComponent(slug.toLowerCase());

  return (
    <Tabs.Root defaultValue={pathname} activationMode="manual">
      <Tabs.List className="sticky top-14 z-popover mx-auto mt-2 max-w-[90rem] border-none bg-gray-900 px-4 lg:top-[4.5rem] lg:px-20">
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
      <hr
        className="sticky top-[6.25rem] z-popover border-t border-stroke lg:top-[7.25rem]"
        role="separator"
      />
      {children}
    </Tabs.Root>
  );
};

export default PuzzleTabs;
