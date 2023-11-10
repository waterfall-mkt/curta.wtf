import type { PostgrestError } from '@supabase/supabase-js';

import supabase from '@/lib/services/supabase';
import type { DbPuzzleSolve } from '@/lib/types/api';
import type { Phase, PuzzleSolve } from '@/lib/types/protocol';

type PuzzleSolvesResponse = {
  data: PuzzleSolve[];
  status: number;
  error: PostgrestError | null;
};

/**
 * Returns the solves for a Puzzle from the database with the given ID and chain
 * ID.
 * @param id The ID of the puzzle.
 * @param chainId The ID of the chain the puzzle is on.
 * @returns An object containing data for the solves, the status code, and the
 * error in the shape `{ data: PuzzleSolve[], status: number, error: PostgrestError | null }`.
 */
const fetchPuzzleSolvesById = async (
  id: number,
  chainId: number,
): Promise<PuzzleSolvesResponse> => {
  const { data, status, error } = await supabase
    .from('puzzles_solves')
    .select('*, solver:users(*)', { count: 'exact' })
    .eq('puzzleId', id)
    .eq('chainId', chainId)
    .order('solveTimestamp', { ascending: true })
    .returns<DbPuzzleSolve[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return { data: [], status, error };
  }

  const solves: PuzzleSolve[] = data.map((solve) => ({
    // Primary key
    puzzleId: solve.puzzleId,
    chainId: solve.chainId,
    solver: solve.solver,
    // Solve information
    rank: solve.rank,
    phase: solve.phase as Phase,
    solution: solve.solution,
    // Solve transaction information
    solveTimestamp: solve.solveTimestamp,
    solveTx: solve.solveTx,
  }));

  return { data: solves, status: 200, error: null };
};

export default fetchPuzzleSolvesById;
