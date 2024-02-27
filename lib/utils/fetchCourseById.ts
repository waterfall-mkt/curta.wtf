import type { PostgrestError } from '@supabase/supabase-js';

import { ethereumClient } from '@/lib/client';
import supabase from '@/lib/services/supabase';
import type { DbGolfCourse } from '@/lib/types/api';
import type { GolfCourse, PartialUser } from '@/lib/types/protocol';

type CourseResponse = {
  data: GolfCourse | null;
  status: number;
  error: PostgrestError | null;
};

/**
 * Returns a Course from the database with the given ID and chain ID.
 * @param id The ID of the course.
 * @param chainId The ID of the chain the course is on.
 * @returns An object containing data for the Course, the status code, and the
 * error in the shape `{ data: GolfCourse | null, status: number, error: PostgrestError | null }`.
 */
const fetchCourseById = async (id: number, chainId: number): Promise<CourseResponse> => {
  const { data, status, error } = await supabase
    .from('golf_courses')
    .select('*, leader:users(*), event:events(id)')
    .not('address', 'is', null)
    .eq('id', id)
    .eq('chainId', chainId)
    .limit(1)
    .returns<DbGolfCourse[]>()
    .single();

  if ((error && status !== 406) || !data) {
    return { data: null, status, error };
  }

  const leaderEnsName = data.leader
    ? await ethereumClient.getEnsName({ address: data.leader.address })
    : undefined;

  const course: GolfCourse = {
    // Identifier
    id: data.id,
    chainId: data.chainId,
    // Course static information
    address: data.address,
    name: data.name,
    description: data.description,
    // Course dynamic information
    numLeaders: data.numLeaders,
    numSolved: data.numSolved,
    allowedOpcodes: data.allowedOpcodes,
    github: data.github,
    disabled: data.disabled,
    event: data.event,
    // Course leader information
    leader: {
      ...data.leader,
      ensName: leaderEnsName || undefined,
    } as PartialUser,
    leaderBlock: data.leaderBlock,
    leaderGas: data.leaderGas,
    leaderTimestamp: data.leaderTimestamp,
    leaderTx: data.leaderTx,
    // Course source code
    bytecode: data.bytecode,
    solidity: data.solidity,
    huff: data.huff,
    // Added information
    addedBlock: data.addedBlock,
    addedTimestamp: data.addedTimestamp,
    addedTx: data.addedTx,
  };

  return { data: course, status: 200, error: null };
};

export default fetchCourseById;
