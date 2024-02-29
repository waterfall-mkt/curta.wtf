import type { GolfCourseValue } from '../types';
import CourseInfoLeader from './leader';
import CourseInfoSolutionForm from './solution-form';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseInfoProps = {
  course: GolfCourseValue;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseInfo: React.FC<CourseInfoProps> = ({ course }) => {
  return (
    <div className="flex h-fit w-full flex-col justify-center rounded-[1.25rem] border border-stroke bg-gray-600 md:min-w-[20rem] md:max-w-[20rem]">
      <CourseInfoLeader course={course} />
      <hr className="w-full border-t border-stroke" role="separator" />
      <CourseInfoSolutionForm course={course} />
    </div>
  );
};

export default CourseInfo;
