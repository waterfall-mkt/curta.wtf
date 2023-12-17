'use server';

import type { PostgrestError } from '@supabase/supabase-js';

import supabase from '@/lib/services/supabase';
import type { DbGolfCourseSolve } from '@/lib/types/api';
import { GolfCourseSolve } from '@/lib/types/protocol';

type CourseSolvesResponse = {
  data: GolfCourseSolve[];
  status: number;
  error: PostgrestError | null;
};

/**
 * Returns the solves for a Course from the database with the given ID and chain
 * ID.
 * @param id The ID of the course.
 * @param chainId The ID of the chain the course is on.
 * @returns An object containing data for the solves, the status code, and the
 * error in the shape `{ data: GolfCourseSolve[], status: number, error: PostgrestError | null }`.
 */
const fetchCourseLeadingSolvesById = async (
  id: number,
  chainId: number,
): Promise<CourseSolvesResponse> => {
  const { data, status, error } = await supabase
    .from('golf_courses_solves')
    .select('*, solver:users(*)', { count: 'exact' })
    .eq('isRecord', true)
    .eq('courseId', id)
    .eq('chainId', chainId)
    .order('gasUsed', { ascending: false })
    .returns<DbGolfCourseSolve[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return { data: [], status, error };
  }

  const solves: GolfCourseSolve[] = data.map((solve, i) => {
    return {
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
      // Metadata
      gasDiff: i < data.length - 1 ? data[i + 1].gasUsed - solve.gasUsed : undefined,
    };
  });

  return { data: solves, status: 200, error: null };
};

export default fetchCourseLeadingSolvesById;
