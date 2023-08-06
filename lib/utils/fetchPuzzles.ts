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

  const puzzles: Puzzle[] = data.map((item) => {
    return {
      // Protocol
      id: item.id,
      address: item.address,
      author: item.author as Author,
      addedTx: item.addedTx,
      addedTimestamp: item.addedTimestamp,
      addedBlock: item.addedBlock,
      // Metadata
      name: item.name,
      flagConfig: { ...PRESET_COLORS[0] },
      // Solve
      firstSolveTimestamp: item.firstSolveTimestamp,
      firstSolver: item.firstSolver,
      firstSolveBlock: item.firstSolveBlock,
      solveTx: item.solveTx,
      solveTime: item.firstSolveTimestamp ? item.firstSolveTimestamp - item.addedTimestamp : 0,
      numberSolved: item.numberSolved,
      // Problem
      bytecode: item.bytecode,
      solidity: item.solidity,
      huff: item.huff,
      // Solution
      github: item.github,
      solution: item.solution,
      // Misc
      disabled: item.disabled,
    };
  });

  return { data: puzzles, status, error };
};

export default fetchPuzzles;
