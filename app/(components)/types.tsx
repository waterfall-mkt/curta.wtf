import type { GolfCourse, Puzzle, User, UserInfo } from '@prisma/client';

export type PuzzleValue = Puzzle & {
  author: User & { info: UserInfo | null };
  firstSolver: (User & { info: UserInfo | null }) | null;
  _count: { solves: number };
};

export type GolfCourseValue = GolfCourse & {
  leader: (User & { info: UserInfo | null }) | null;
  _count: { solves: number };
};
