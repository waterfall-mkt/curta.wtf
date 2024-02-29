'use server';

import { unstable_cache } from 'next/cache';

import { db } from '@/lib/db';

const fetchCourseLeaderboardById = async (id: number, chainId: number) => {
  const data = await unstable_cache(
    async () =>
      await db.golfCourseSolve.findMany({
        where: { courseId: id, chainId },
        include: { solver: { include: { info: true } } },
        orderBy: [{ gasUsed: 'asc' }, { submitTimestamp: 'asc' }],
      }),
    [`golf-course-leaderboard-${chainId}-${id}`],
    {
      tags: ['golf-courses', `golf-course-${chainId}-${id}`],
      revalidate: 300,
    },
  )();

  const bestSolvesObject: { [key: string]: (typeof data)[0] } = {};

  data.map((solve) => {
    const key = solve.solverAddress.toLowerCase();

    if (!bestSolvesObject[key]) {
      bestSolvesObject[key] = {
        // Identifier
        courseId: solve.courseId,
        chainId: solve.chainId,
        solverAddress: solve.solverAddress,
        solver: solve.solver,
        submitTx: solve.submitTx,
        // Submission information
        gasUsed: solve.gasUsed,
        solution: solve.solution,
        submitBlock: solve.submitBlock,
        submitTimestamp: solve.submitTimestamp,
        // Metadata
        target: solve.target,
        isRecord: solve.isRecord,
        createdAt: solve.createdAt,
      };
    }
  });

  return Object.values(bestSolvesObject).map((solve, i) => ({ ...solve, rank: i + 1 }));
};

export default fetchCourseLeaderboardById;
