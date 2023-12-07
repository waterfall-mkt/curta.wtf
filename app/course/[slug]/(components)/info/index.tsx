import type { FC } from 'react';

import CourseInfoLeader from './leader';

import type { GolfCourse } from '@/lib/types/protocol';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseInfoProps = { course: GolfCourse };

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseInfo: FC<CourseInfoProps> = ({ course }) => {
  return (
    <div className="flex h-fit w-full flex-col justify-center rounded-[1.25rem] border border-stroke bg-gray-600 md:min-w-[20rem] md:max-w-[20rem]">
      <CourseInfoLeader course={course} />
      <hr className="w-full border-t border-stroke" role="separator" />
    </div>
  );
};

export default CourseInfo;
