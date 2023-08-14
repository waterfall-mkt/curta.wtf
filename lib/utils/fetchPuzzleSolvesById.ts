import { cache } from 'react';

import fetchPuzzleById from './fetchPuzzleById';
import type { PostgrestError } from '@supabase/supabase-js';

import { publicClient } from '@/lib/client';
import supabase from '@/lib/services/supabase';
import type { SupabaseSolve } from '@/lib/types/api';
import type { Phase, Solve } from '@/lib/types/protocol';

type PuzzleSolvesResponse = {
  data: Solve[];
  status: number;
  error: PostgrestError | null;
};

const fetchPuzzleSolvesById = async (id: number): Promise<PuzzleSolvesResponse> => {
  const { data: puzzle } = await fetchPuzzleById(id);

  const { data, status, error } = await supabase
    .from('solves')
    .select('*', { count: 'exact' })
    .eq('puzzleId', id)
    .order('solveTimestamp', { ascending: true })
    .returns<SupabaseSolve[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0) || !puzzle) {
    return { data: [], status, error };
  }

  const solves: Solve[] = [];
  for (let i = 0; i < data.length; ++i) {
    const solve = data[i];
    const solverEnsName =
      (await cache(async () => await publicClient.getEnsName({ address: solve.solver }))()) ||
      undefined;
    const solverEnsAvatar =
      (await cache(async () =>
        solverEnsName ? await publicClient.getEnsAvatar({ name: solverEnsName }) : undefined,
      )()) || undefined;

    solves.push({
      solver: solve.solver,
      solverEnsName,
      solverEnsAvatar,
      solveTime: solve.solveTimestamp - puzzle.addedTimestamp,
      puzzle,
      phase: solve.phase as Phase,
      rank: i + 1,
      tx: solve.solveTx,
    });
  }

  return { data: solves, status: 200, error: null };
};

export default fetchPuzzleSolvesById;
