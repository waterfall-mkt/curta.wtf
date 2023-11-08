import type { PostgrestError } from '@supabase/supabase-js';
import type { Address } from 'viem';

import supabase from '@/lib/services/supabase';
import type { SupabaseSolve } from '@/lib/types/api';
import type { Phase, Puzzle, Solver } from '@/lib/types/protocol';

export type LeaderboardPuzzlesResponse = {
  data: {
    data: Solver[];
    solvers: number;
    solves: number;
    minPuzzleId: number;
    maxPuzzleId: number;
  };
  status: number;
  error: PostgrestError | null;
};

const fetchLeaderboardPuzzles = async (
  {
    minPuzzleId = 0,
    maxPuzzleId = Number.MAX_SAFE_INTEGER,
  }: {
    minPuzzleId?: number;
    maxPuzzleId?: number;
  } = { minPuzzleId: 0, maxPuzzleId: Number.MAX_SAFE_INTEGER },
): Promise<LeaderboardPuzzlesResponse> => {
  // Fetch solves.
  const { data, status, error } = await supabase
    .from('solves')
    .select('*')
    .gte('puzzleId', minPuzzleId)
    .lte('puzzleId', maxPuzzleId)
    .order('solveTimestamp', { ascending: true })
    .returns<SupabaseSolve[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return {
      data: { data: [], solvers: 0, solves: 0, minPuzzleId, maxPuzzleId },
      status,
      error,
    };
  }

  // Fetch puzzles.
  const { data: puzzles } = await supabase
    .from('puzzles')
    .select('id, name, author:authors(*), numberSolved, addedTimestamp')
    .returns<Pick<Puzzle, 'id' | 'name' | 'author' | 'numberSolved' | 'addedTimestamp'>[]>();

  const solversObject: { [key: string]: Solver } = {};
  const puzzleSolveRanks: Map<number, number> = new Map();

  data.forEach((item) => {
    const solver = item.solver.toLowerCase() as Address;
    const puzzle = puzzles?.find((p) => p.id === item.puzzleId);
    const rank = (puzzleSolveRanks.get(item.puzzleId) ?? 0) + 1;

    // Initialize solver object if it doesn't exist.
    if (!solversObject[solver]) {
      solversObject[solver] = {
        rank: 0,
        solver,
        count: { phase0: 0, phase1: 0, phase2: 0, total: 0 },
        points: 0,
        speedScore: 0,
        solves: [],
      };
    }

    // Increment solves count, points, and solves.
    switch (item.phase) {
      case 0:
        solversObject[solver].count.phase0++;
        solversObject[solver].points += 3;
        break;
      case 1:
        solversObject[solver].count.phase1++;
        solversObject[solver].points += 2;
        break;
      case 2:
        solversObject[solver].count.phase2++;
        solversObject[solver].points += 1;
        break;
    }
    solversObject[solver].count.total++;
    solversObject[solver].solves.push({
      chainId: 1, // TODO: use fetched data from new database.
      solver: { address: item.solver },
      solution: '0x', // TODO: use fetched data from new database.
      solveTimestamp: item.solveTimestamp,
      puzzleId: item.puzzleId,
      phase: item.phase as Phase,
      solveTx: item.solveTx,
      rank,
      puzzle,
    });

    // Increment puzzle solve rank.
    puzzleSolveRanks.set(item.puzzleId, rank);
  });

  // Sort solvers by speed score, then rank, then return the top 100.
  const solvers: Solver[] = Object.values(solversObject)
    .map((item) => {
      const sum = item.solves.reduce(
        (a, b) => a + (b.rank - 1) / Math.max(1, (puzzleSolveRanks.get(b.puzzleId) ?? 1) - 1),
        0,
      );

      return {
        ...item,
        speedScore: Math.round(10000 * (1 - sum / item.solves.length)) / 100,
      };
    })
    .sort((a, b) => b.speedScore - a.speedScore)
    .sort((a, b) => b.points - a.points);

  return {
    data: {
      data: solvers.slice(0, 100).map((item, index) => ({ ...item, rank: index + 1 })),
      solvers: solvers.length,
      solves: data.length,
      minPuzzleId,
      maxPuzzleId,
    },
    status,
    error,
  };
};

export default fetchLeaderboardPuzzles;
