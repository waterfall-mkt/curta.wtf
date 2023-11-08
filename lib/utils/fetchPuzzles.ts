import type { PostgrestError } from '@supabase/supabase-js';

import { PRESET_COLORS } from '@/lib/constants/presetColors';
import supabase from '@/lib/services/supabase';
import type { SupabasePuzzle } from '@/lib/types/api';
import type { Author, Puzzle } from '@/lib/types/protocol';

type PuzzlesResponse = {
  data: Puzzle[];
  status: number;
  error: PostgrestError | null;
};

const fetchPuzzles = async (): Promise<PuzzlesResponse> => {
  const { data, status, error } = await supabase
    .from('puzzles')
    .select('*, author:authors(*)')
    .filter('disabled', 'not.is', 'true')
    .order('id', { ascending: false })
    .returns<SupabasePuzzle[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return { data: [], status, error };
  }

  const puzzles: Puzzle[] = [];
  for (const puzzle of data) {
    puzzles.push({
      // Protocol
      id: puzzle.id,
      chainId: 1, // TODO: use fetched data from new database.
      address: puzzle.address,
      author: { ...puzzle.author } as Author,
      addedTx: puzzle.addedTx,
      addedTimestamp: puzzle.addedTimestamp,
      addedBlock: puzzle.addedBlock,
      // Metadata
      name: puzzle.name,
      flagColorConfig: { ...PRESET_COLORS[0] },
      // Solve
      firstSolveTimestamp: puzzle.firstSolveTimestamp,
      firstSolver: puzzle.firstSolver,
      firstSolveBlock: puzzle.firstSolveBlock,
      solveTx: puzzle.solveTx,
      solveTime: puzzle.firstSolveTimestamp
        ? puzzle.firstSolveTimestamp - puzzle.addedTimestamp
        : 0,
      numberSolved: puzzle.numberSolved,
      // Problem
      bytecode: puzzle.bytecode,
      solidity: puzzle.solidity,
      huff: puzzle.huff,
      // Solution
      github: puzzle.github,
      solution: puzzle.solution,
      // Misc
      disabled: puzzle.disabled,
    });
  }

  return { data: puzzles, status, error };
};

export default fetchPuzzles;
