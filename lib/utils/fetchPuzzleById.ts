import { cache } from 'react';

import type { PostgrestError } from '@supabase/supabase-js';

import { publicClient } from '@/lib/client';
import supabase from '@/lib/services/supabase';
import type { SupabasePuzzle } from '@/lib/types/api';
import type { Author, Puzzle } from '@/lib/types/protocol';

type PuzzleResponse = {
  data: Puzzle | null;
  status: number;
  error: PostgrestError | null;
};

const fetchPuzzleById = async (id: number, chainId: number): Promise<PuzzleResponse> => {
  console.log(chainId); // TODO: put into query
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

  const [authorEnsName, firstSolverEnsName] = await Promise.all([
    cache(async () => await publicClient.getEnsName({ address: puzzleData.author.address }))(),
    cache(async () =>
      puzzleData.firstSolver
        ? await publicClient.getEnsName({ address: puzzleData.firstSolver })
        : undefined,
    )(),
  ]);

  const puzzle: Puzzle = {
    // Protocol
    id: puzzleData.id,
    chainId: 1, // TODO: use fetched data from new database.
    address: puzzleData.address,
    author: {
      ...puzzleData.author,
      ensName: authorEnsName || undefined,
    } as Author,
    addedTx: puzzleData.addedTx,
    addedTimestamp: puzzleData.addedTimestamp,
    addedBlock: puzzleData.addedBlock,
    // Metadata
    name: puzzleData.name,
    // Solve
    firstSolveTimestamp: puzzleData.firstSolveTimestamp,
    firstSolver: puzzleData.firstSolver,
    firstSolverEnsName: firstSolverEnsName ?? undefined,
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
