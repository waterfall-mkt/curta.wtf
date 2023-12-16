'use server';

import type { PostgrestError } from '@supabase/supabase-js';

import supabase from '@/lib/services/supabase';
import type { DbGolfCourse } from '@/lib/types/api';
import type { GolfCourse, PartialUser } from '@/lib/types/protocol';

type CoursesResponse = {
  data: GolfCourse[];
  status: number;
  error: PostgrestError | null;
};

/**
 * Fetches and returns all Courses from all chains from the database.
 * @returns An object containing data for the Courses, the status code, and the
 * error in the shape `{ data: GolfCourse[], status: number, error: PostgrestError | null }`.
 */
const fetchCourses = async (): Promise<CoursesResponse> => {
  const { data, status, error } = await supabase
    .from('golf_courses')
    .select('*, leader:users(*), event:events(id)')
    .not('address', 'is', null)
    .filter('disabled', 'not.is', 'true')
    .order('addedTimestamp', { ascending: false })
    .returns<DbGolfCourse[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return { data: [], status, error };
  }

  const courses: GolfCourse[] = [];
  for (const course of data) {
    courses.push({
      // Identifier
      id: course.id,
      chainId: course.chainId,
      // Course static information
      address: course.address,
      name: course.name,
      description: course.description,
      // Course dynamic information
      numLeaders: course.numLeaders,
      numSolved: course.numSolved,
      allowedOpcodes: course.allowedOpcodes,
      github: course.github,
      disabled: course.disabled,
      event: course.event,
      // Course leader information
      leader: { ...course.leader } as PartialUser,
      leaderBlock: course.leaderBlock,
      leaderGas: course.leaderGas,
      leaderTimestamp: course.leaderTimestamp,
      leaderTx: course.leaderTx,
      // Course source code
      bytecode: course.bytecode,
      solidity: course.solidity,
      huff: course.huff,
      // Added information
      addedBlock: course.addedBlock,
      addedTimestamp: course.addedTimestamp,
      addedTx: course.addedTx,
    });
  }

  return { data: courses, status, error };
};

export default fetchCourses;
