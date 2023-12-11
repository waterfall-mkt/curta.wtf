'use client';

import type { FC } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { GolfCourse } from '@/lib/types/protocol';

import { ButtonGroup, IconButton } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseHeaderPageNavProps = {
  prevCourse: GolfCourse | null;
  nextCourse: GolfCourse | null;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseHeaderPageNav: FC<CourseHeaderPageNavProps> = ({ prevCourse, nextCourse }) => {
  return (
    <ButtonGroup className="hidden sm:flex">
      <IconButton
        className={!nextCourse ? 'z-[2]' : 'z-[1]'}
        size="lg"
        intent="neutral"
        variant="outline"
        disabled={!prevCourse}
        href={prevCourse ? `/course/${prevCourse.chainId}:${prevCourse.id}` : undefined}
        aria-label="Navigate to previous course on the same chain."
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        className={!prevCourse ? 'z-[2]' : 'z-[1]'}
        intent="neutral"
        size="lg"
        variant="outline"
        disabled={!nextCourse}
        href={nextCourse ? `/course/${nextCourse.chainId}:${nextCourse.id}` : undefined}
        aria-label="Navigate to next course on the same chain."
      >
        <ChevronRight />
      </IconButton>
    </ButtonGroup>
  );
};

export default CourseHeaderPageNav;
