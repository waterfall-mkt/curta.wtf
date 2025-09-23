import type { GolfCourseSolve, User, UserInfo } from '@/lib/db/schema';

export type CourseProgressionValue = GolfCourseSolve & {
  solver: User & { info: UserInfo | null };
  gasDiff?: number;
};
