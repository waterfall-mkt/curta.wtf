'use client';

import { usePathname } from 'next/navigation';
import type { FC, ReactNode } from 'react';

import { Tabs } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseTabsNavProps = {
  slug: string;
  hasDescription: boolean;
  children: ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseTabs: FC<CourseTabsNavProps> = ({ slug, children }) => {
  const pathname = usePathname();
  const normalizedSlug = decodeURIComponent(slug.toLowerCase());

  return (
    <Tabs.Root defaultValue={pathname} activationMode="manual">
      <Tabs.List className="sticky top-14 z-popover mx-auto mt-2 max-w-[90rem] border-none bg-gray-900 px-4 lg:top-[4.5rem] lg:px-20">
        {[
          { name: 'Golf', href: `/golf/${normalizedSlug}`, disabled: false },
          /* { name: 'Details', href: `/golf/${normalizedSlug}/details`, disabled: !hasDescription }, */
          // TODO: uncomment the above once details page is implemented
          { name: 'Details', href: `/golf/${normalizedSlug}/details`, disabled: true },
          { name: 'Leaderboard', href: `/golf/${normalizedSlug}/leaderboard`, disabled: false },
          { name: 'Progression', href: `/golf/${normalizedSlug}/progression`, disabled: false },
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

export default CourseTabs;
