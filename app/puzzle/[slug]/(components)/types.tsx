import type { Event, Puzzle, User, UserInfo } from '@prisma/client';

export type PuzzleValue = Puzzle & {
  author: User & { info: UserInfo | null };
  firstSolver: (User & { info: UserInfo | null }) | null;
  event: Event | null;
  _count: { solves: number };
};
