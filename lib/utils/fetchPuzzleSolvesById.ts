import type { PostgrestError } from '@supabase/supabase-js';

import supabase from '@/lib/services/supabase';
import type { SupabaseSolve } from '@/lib/types/api';
import type { Phase, Solve } from '@/lib/types/protocol';

type PuzzleSolvesResponse = {
  data: Solve[];
  status: number;
  error: PostgrestError | null;
};

const fetchPuzzleSolvesById = async (id: number): Promise<PuzzleSolvesResponse> => {
  const { data, status, error } = await supabase
    .from('solves')
    .select('*', { count: 'exact' })
    .eq('puzzleId', id)
    .order('solveTimestamp', { ascending: true })
    .returns<SupabaseSolve[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return { data: [], status, error };
  }

  const solves: Solve[] = [];
  for (let i = 0; i < data.length; ++i) {
    const solve = data[i];

    solves.push({
      chainId: 1, // TODO: use fetched data from new database.
      solver: solve.solver,
      solveTimestamp: solve.solveTimestamp,
      puzzleId: solve.puzzleId,
      phase: solve.phase as Phase,
      rank: i + 1,
      tx: solve.solveTx,
    });
  }

  return { data: solves, status: 200, error: null };
};

export default fetchPuzzleSolvesById;
