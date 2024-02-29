import type { GolfCourseSolve, User, UserInfo } from '@prisma/client';

export type CourseLeaderboardValue = GolfCourseSolve & {
  solver: User & { info: UserInfo | null };
  rank: number;
};
