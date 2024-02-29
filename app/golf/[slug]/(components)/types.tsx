import type { Event, GolfCourse, User, UserInfo } from '@prisma/client';

export type GolfCourseValue = GolfCourse & {
  leader: (User & { info: UserInfo | null }) | null;
  event: Event | null;
  _count: { solves: number };
};
