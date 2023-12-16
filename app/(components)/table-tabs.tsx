'use client';

import { useSearchParams } from 'next/navigation';
import type { FC } from 'react';

import CourseTable from './courses-table';
import PuzzleTable from './puzzles-table';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { GolfCourse, Puzzle } from '@/lib/types/protocol';

import { Card, Tabs } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type HomeTableTabsProps = {
  className?: string;
  puzzles: Puzzle[];
  courses: GolfCourse[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const HomeTableTabs: FC<HomeTableTabsProps> = ({ className, puzzles, courses }) => {
  const searchParams = useSearchParams();

  const tabs = [
    { name: 'Puzzles', value: 'puzzles', content: <PuzzleTable data={puzzles} /> },
    { name: 'Golf', value: 'golf', content: <CourseTable data={courses} /> },
  ];

  const defaultValue = searchParams.get('tab')?.toLowerCase() ?? tabs[0].value;

  return (
    <Tabs.Root defaultValue={defaultValue}>
      <Card className={twMerge(clsx('rounded-t-2xl', className))}>
        <Card.Header className="flex h-11 items-center gap-3" noPadding>
          <Tabs.List className="border-none pl-2 md:pl-3">
            {tabs.map(({ name, value }) => (
              <Tabs.Trigger key={value} value={value}>
                {name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Card.Header>
        <Card.Body noPadding>
          {tabs.map(({ value, content }) => (
            <Tabs.Content key={value} className="focus-visible:rounded-b-[1.25rem]" value={value}>
              {content}
            </Tabs.Content>
          ))}
        </Card.Body>
      </Card>
    </Tabs.Root>
  );
};

export default HomeTableTabs;
