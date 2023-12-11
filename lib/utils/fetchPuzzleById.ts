'use server';

import { cache } from 'react';

import type { PostgrestError } from '@supabase/supabase-js';

import { ethereumClient } from '@/lib/client';
import supabase from '@/lib/services/supabase';
import type { DbPuzzle } from '@/lib/types/api';
import type { PartialUser, Puzzle } from '@/lib/types/protocol';

type PuzzleResponse = {
  data: Puzzle | null;
  status: number;
  error: PostgrestError | null;
};

/**
 * Returns a Puzzle from the database with the given ID and chain ID.
 * @param id The ID of the puzzle.
 * @param chainId The ID of the chain the puzzle is on.
 * @returns An object containing data for the Puzzle, the status code, and the
 * error in the shape `{ data: Puzzle | null, status: number, error: PostgrestError | null }`.
 */
const fetchPuzzleById = async (id: number, chainId: number): Promise<PuzzleResponse> => {
  const { data, status, error } = await supabase
    .from('puzzles')
    .select('*, author:users(*), eventId:events(id)')
    .not('address', 'is', null)
    .eq('id', id)
    .eq('chainId', chainId)
    .limit(1)
    .returns<DbPuzzle[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return { data: null, status, error };
  }

  const puzzleData = data[0];

  const [authorEnsName, firstSolverEnsName] = await Promise.all([
    cache(async () => await ethereumClient.getEnsName({ address: puzzleData.author.address }))(),
    cache(async () =>
      puzzleData.firstSolver
        ? await ethereumClient.getEnsName({ address: puzzleData.firstSolver })
        : undefined,
    )(),
  ]);

  const puzzle: Puzzle = {
    // Identifier
    id: puzzleData.id,
    chainId: puzzleData.chainId,
    // Puzzle static information
    address: puzzleData.address,
    author: {
      ...puzzleData.author,
      ensName: authorEnsName || undefined,
    } as PartialUser,
    name: puzzleData.name,
    // Puzzle dynamic information
    numberSolved: puzzleData.numberSolved,
    solution: puzzleData.solution,
    github: puzzleData.github,
    disabled: puzzleData.disabled,
    event: puzzleData.eventId,
    // Puzzle source code
    bytecode: puzzleData.bytecode,
    solidity: puzzleData.solidity,
    huff: puzzleData.huff,
    // Added information
    addedBlock: puzzleData.addedBlock,
    addedTimestamp: puzzleData.addedTimestamp,
    addedTx: puzzleData.addedTx,
    // First solve information
    firstSolveBlock: puzzleData.firstSolveBlock,
    firstSolver: puzzleData.firstSolver,
    firstSolverEnsName: firstSolverEnsName ?? undefined,
    firstSolveTime: puzzleData.firstSolveTimestamp
      ? puzzleData.firstSolveTimestamp - puzzleData.addedTimestamp
      : 0,
    firstSolveTimestamp: puzzleData.firstSolveTimestamp,
    firstSolveTx: puzzleData.firstSolveTx,
  };

  return { data: puzzle, status: 200, error: null };
};

export default fetchPuzzleById;
