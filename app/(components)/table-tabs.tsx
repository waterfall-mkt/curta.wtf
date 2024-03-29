'use client';

import { useSearchParams } from 'next/navigation';

import GolfCourseDataTable from './golf-course-data-table';
import PuzzleDataTable from './puzzle-data-table';
import type { GolfCourseValue, PuzzleValue } from './types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Card, Tabs } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type HomeTableTabsProps = {
  className?: string;
  puzzles: PuzzleValue[];
  courses: GolfCourseValue[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const HomeTableTabs: React.FC<HomeTableTabsProps> = ({ className, puzzles, courses }) => {
  const searchParams = useSearchParams();

  const tabs = [
    { name: 'Puzzles', value: 'puzzles', content: <PuzzleDataTable data={puzzles} /> },
    { name: 'Golf', value: 'golf', content: <GolfCourseDataTable data={courses} /> },
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
