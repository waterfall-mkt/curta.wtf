'use server';

import { unstable_cache } from 'next/cache';

import { db } from '@/lib/db';

/**
 * Fetches and returns all Courses from all chains from the database.
 */
const fetchCourses = async () => {
  const isTestnet = Boolean(process.env.NEXT_PUBLIC_IS_TESTNET);

  return await unstable_cache(
    async () =>
      await db.golfCourse.findMany({
        include: {
          leader: { include: { info: true } },
          _count: { select: { solves: true } },
        },
        where: { chain: { isTestnet }, disabled: false },
        orderBy: { addedTimestamp: 'desc' },
      }),
    [`courses-${isTestnet}`],
    { tags: ['courses'], revalidate: 3600 },
  )();
};

export default fetchCourses;
