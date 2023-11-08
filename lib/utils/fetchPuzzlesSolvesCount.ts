import type { PostgrestError } from '@supabase/supabase-js';
import { getAddress } from 'viem';

import supabase from '@/lib/services/supabase';
import type { DbPuzzleSolve } from '@/lib/types/api';

type SolvesCountResponse = {
  data: { solves: number; solvers: number };
  status: number;
  error: PostgrestError | null;
};

const fetchPuzzlesSolvesCount = async (): Promise<SolvesCountResponse> => {
  const { data, status, error } = await supabase
    .from('puzzles_solves')
    .select('*, solver:users(address)')
    .returns<DbPuzzleSolve[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return { data: { solves: 0, solvers: 0 }, status, error };
  }

  const uniqueSolvers = new Set();
  const solvers = data.reduce((acc, solve) => {
    if (!uniqueSolvers.has(getAddress(solve.solver.address))) {
      uniqueSolvers.add(getAddress(solve.solver.address));
      return acc + 1;
    }

    return acc;
  }, 0);

  return { data: { solves: data.length, solvers }, status, error };
};

export default fetchPuzzlesSolvesCount;
