'use client';

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
// Children
// -----------------------------------------------------------------------------

const HomeTableTabs: FC<HomeTableTabsProps> = ({ className, puzzles, courses }) => {
  const TABS = ['Puzzles', 'Golf'];

  return (
    <Tabs.Root defaultValue={TABS[0]}>
      <Card className={twMerge(clsx('rounded-t-2xl', className))}>
        <Card.Header className="flex h-11 items-center gap-3" noPadding>
          <Tabs.List className="border-none pl-2 md:pl-2">
            {TABS.map((item) => (
              <Tabs.Trigger key={item} value={item}>
                {item}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Card.Header>
        <Card.Body noPadding>
          <Tabs.Content className="focus-visible:rounded-b-[1.25rem]" value={TABS[0]}>
            <PuzzleTable data={puzzles} />
          </Tabs.Content>
          <Tabs.Content className="focus-visible:rounded-b-[1.25rem]" value={TABS[1]}>
            <CourseTable data={courses} />
          </Tabs.Content>
        </Card.Body>
      </Card>
    </Tabs.Root>
  );
};

export default HomeTableTabs;
