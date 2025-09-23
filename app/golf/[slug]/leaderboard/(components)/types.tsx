import type { GolfCourseSolve, User, UserInfo } from '@/lib/db/schema';

export type CourseLeaderboardValue = GolfCourseSolve & {
  solver: User & { info: UserInfo | null };
  rank: number;
};
