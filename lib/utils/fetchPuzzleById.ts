import { cache } from 'react';

import type { PostgrestError } from '@supabase/supabase-js';

import { publicClient } from '@/lib/client';
import { PRESET_COLORS } from '@/lib/constants/presetColors';
import supabase from '@/lib/services/supabase';
import type { SupabasePuzzle } from '@/lib/types/api';
import type { Author, Puzzle } from '@/lib/types/protocol';

type PuzzleResponse = {
  data: Puzzle | null;
  status: number;
  error: PostgrestError | null;
};

const fetchPuzzleById = async (id: number): Promise<PuzzleResponse> => {
  const { data, status, error } = await supabase
    .from('puzzles')
    .select('*, author:authors(*)')
    .eq('id', id)
    .limit(1)
    .returns<SupabasePuzzle[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return { data: null, status, error };
  }

  const puzzleData = data[0];

  const puzzle: Puzzle = {
    // Protocol
    id: puzzleData.id,
    address: puzzleData.address,
    author: {
      ...puzzleData.author,
      ensName:
        (await cache(
          async () => await publicClient.getEnsName({ address: puzzleData.author.address }),
        )()) || undefined,
    } as Author,
    addedTx: puzzleData.addedTx,
    addedTimestamp: puzzleData.addedTimestamp,
    addedBlock: puzzleData.addedBlock,
    // Metadata
    name: puzzleData.name,
    flagConfig: { ...PRESET_COLORS[0] },
    // Solve
    firstSolveTimestamp: puzzleData.firstSolveTimestamp,
    firstSolver: puzzleData.firstSolver,
    firstSolverEnsName:
      (puzzleData.firstSolver &&
        (await publicClient.getEnsName({ address: puzzleData.firstSolver }))) ||
      undefined,
    firstSolveBlock: puzzleData.firstSolveBlock,
    solveTime: puzzleData.firstSolveTimestamp
      ? puzzleData.firstSolveTimestamp - puzzleData.addedTimestamp
      : 0,
    numberSolved: puzzleData.numberSolved,
    solveTx: puzzleData.solveTx,
    // Problem
    bytecode: puzzleData.bytecode,
    solidity: puzzleData.solidity,
    huff: puzzleData.huff,
    // Solution
    github: puzzleData.github,
    solution: puzzleData.solution,
    // Misc
    disabled: puzzleData.disabled,
  };

  return { data: puzzle, status: 200, error: null };
};

export default fetchPuzzleById;