'use server';

import type { PostgrestError } from '@supabase/supabase-js';

import supabase from '@/lib/services/supabase';
import type { DbPuzzle } from '@/lib/types/api';
import type { PartialUser, Puzzle } from '@/lib/types/protocol';

type PuzzlesResponse = {
  data: Puzzle[];
  status: number;
  error: PostgrestError | null;
};

/**
 * Fetches and returns all Puzzles from all chains from the database.
 * @returns An object containing data for the Puzzles, the status code, and the
 * error in the shape `{ data: Puzzle[], status: number, error: PostgrestError | null }`.
 */
const fetchPuzzles = async (): Promise<PuzzlesResponse> => {
  const { data, status, error } = await supabase
    .from('puzzles')
    .select('*, author:users(*), eventId:events(id)')
    .not('address', 'is', null)
    .filter('disabled', 'not.is', 'true')
    .order('addedTimestamp', { ascending: false })
    .returns<DbPuzzle[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return { data: [], status, error };
  }

  const puzzles: Puzzle[] = [];
  for (const puzzle of data) {
    puzzles.push({
      // Identifier
      id: puzzle.id,
      chainId: puzzle.chainId,
      // Puzzle static information
      address: puzzle.address,
      author: { ...puzzle.author } as PartialUser,
      name: puzzle.name,
      // Puzzle dynamic information
      numberSolved: puzzle.numberSolved,
      solution: puzzle.solution,
      github: puzzle.github,
      disabled: puzzle.disabled,
      // Puzzle source code
      bytecode: puzzle.bytecode,
      solidity: puzzle.solidity,
      huff: puzzle.huff,
      event: puzzle.eventId,
      // Added information
      addedBlock: puzzle.addedBlock,
      addedTimestamp: puzzle.addedTimestamp,
      addedTx: puzzle.addedTx,
      // First solve information
      firstSolveBlock: puzzle.firstSolveBlock,
      firstSolver: puzzle.firstSolver,
      firstSolveTime: puzzle.firstSolveTimestamp
        ? puzzle.firstSolveTimestamp - puzzle.addedTimestamp
        : 0,
      firstSolveTimestamp: puzzle.firstSolveTimestamp,
      firstSolveTx: puzzle.firstSolveTx,
    });
  }

  return { data: puzzles, status, error };
};

export default fetchPuzzles;
