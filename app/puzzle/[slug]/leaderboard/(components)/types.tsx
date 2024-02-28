import type { PuzzleSolve, User, UserInfo } from '@prisma/client';

export type PuzzleSolveValue = PuzzleSolve & {
  solver: User & {
    info: UserInfo | null;
  };
};
