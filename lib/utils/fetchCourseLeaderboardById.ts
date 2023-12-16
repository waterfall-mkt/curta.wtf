'use server';

import type { PostgrestError } from '@supabase/supabase-js';

import supabase from '@/lib/services/supabase';
import type { DbGolfCourseSolve } from '@/lib/types/api';
import type { GolfCourseSolve, GolfCourseSolver } from '@/lib/types/protocol';

type CourseLeaderboardResponse = {
  data: GolfCourseSolver[];
  status: number;
  error: PostgrestError | null;
};

const fetchCourseLeaderboardById = async (
  id: number,
  chainId: number,
): Promise<CourseLeaderboardResponse> => {
  const { data, status, error } = await supabase
    .from('golf_courses_solves')
    .select('*, solver:users(*)', { count: 'exact' })
    .eq('isRecord', true)
    .eq('courseId', id)
    .eq('chainId', chainId)
    .order('submitTimestamp', { ascending: true })
    .returns<DbGolfCourseSolve[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return { data: [], status, error };
  }

  const bestSolvesObject: { [key: string]: GolfCourseSolve } = {};
  data.map((solve) => {
    const key = solve.solver.address.toLowerCase();

    if (!bestSolvesObject[key]) {
      bestSolvesObject[key] = {
        // Identifier
        courseId: solve.courseId,
        chainId: solve.chainId,
        solver: solve.solver,
        submitTx: solve.submitTx,
        // Solve information
        gasUsed: solve.gasUsed,
        target: solve.target,
        solution: solve.solution,
        submitBlock: solve.submitBlock,
        submitTimestamp: solve.submitTimestamp,
      };
    } else if (solve.gasUsed < bestSolvesObject[key].gasUsed) {
      bestSolvesObject[key] = {
        // Identifier
        courseId: solve.courseId,
        chainId: solve.chainId,
        solver: solve.solver,
        submitTx: solve.submitTx,
        // Solve information
        gasUsed: solve.gasUsed,
        target: solve.target,
        solution: solve.solution,
        submitBlock: solve.submitBlock,
        submitTimestamp: solve.submitTimestamp,
      };
    }
  });

  return {
    data: Object.values(bestSolvesObject).map((solve, i) => ({ ...solve, rank: i + 1 })),
    status: 200,
    error: null,
  };
};

export default fetchCourseLeaderboardById;
