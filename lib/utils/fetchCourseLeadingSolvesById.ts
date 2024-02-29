'use server';

import { unstable_cache } from 'next/cache';

import { db } from '@/lib/db';

/**
 * Returns the solves for a Course from the database with the given ID and chain
 * ID.
 * @param id The ID of the course.
 * @param chainId The ID of the chain the course is on.
 */
const fetchCourseLeadingSolvesById = async (id: number, chainId: number) => {
  const data = await unstable_cache(
    async () =>
      await db.golfCourseSolve.findMany({
        where: { courseId: id, chainId, isRecord: true },
        include: { solver: { include: { info: true } } },
        orderBy: [{ gasUsed: 'asc' }, { submitTimestamp: 'asc' }],
      }),
    [`golf-course-leaderboard-${chainId}-${id}`],
    {
      tags: ['golf-courses', `golf-course-${chainId}-${id}`],
      revalidate: 300,
    },
  )();

  const solves: ((typeof data)[0] & { gasDiff?: number })[] = data.map((solve, i) => {
    return {
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
      // Metadata
      gasDiff: i < data.length - 1 ? data[i + 1].gasUsed - solve.gasUsed : undefined,
    };
  });

  return { data: solves, status: 200, error: null };
};

export default fetchCourseLeadingSolvesById;
