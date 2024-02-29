import type { GolfCourseSolve, User, UserInfo } from '@prisma/client';

export type CourseProgressionValue = GolfCourseSolve & {
  solver: User & { info: UserInfo | null };
  gasDiff?: number;
};
