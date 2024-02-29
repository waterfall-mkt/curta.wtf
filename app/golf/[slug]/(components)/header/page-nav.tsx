'use client';

import type { GolfCourseValue } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { ButtonGroup, IconButton } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseHeaderPageNavProps = {
  prevCourse: GolfCourseValue | null;
  nextCourse: GolfCourseValue | null;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseHeaderPageNav: React.FC<CourseHeaderPageNavProps> = ({ prevCourse, nextCourse }) => {
  return (
    <ButtonGroup className="hidden sm:flex">
      <IconButton
        className={!nextCourse ? 'z-[2]' : 'z-[1]'}
        size="lg"
        intent="neutral"
        variant="outline"
        disabled={!prevCourse}
        href={prevCourse ? `/golf/${prevCourse.chainId}:${prevCourse.id}` : undefined}
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
        href={nextCourse ? `/golf/${nextCourse.chainId}:${nextCourse.id}` : undefined}
        aria-label="Navigate to next course on the same chain."
      >
        <ChevronRight />
      </IconButton>
    </ButtonGroup>
  );
};

export default CourseHeaderPageNav;
