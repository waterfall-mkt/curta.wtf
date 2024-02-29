import { unstable_cache } from 'next/cache';

import { db } from '@/lib/db';

/**
 * Returns a Course from the database with the given ID and chain ID.
 * @param id The ID of the course.
 * @param chainId The ID of the chain the course is on.
 */
const fetchCourseById = async (id: number, chainId: number) => {
  return await unstable_cache(
    async () =>
      await db.golfCourse.findUnique({
        where: {
          id_chainId: { id, chainId },
        },
        include: {
          leader: { include: { info: true } },
          event: true,
          _count: { select: { solves: true } },
        },
      }),
    [`golf-course-${chainId}-${id}`],
    {
      tags: ['golf-courses', `golf-courses-${chainId}`, `golf-course-${chainId}-${id}`],
      revalidate: 300,
    },
  )();
};

export default fetchCourseById;
