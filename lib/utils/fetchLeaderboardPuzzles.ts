import type { PostgrestError } from '@supabase/supabase-js';
import type { Address } from 'viem';

import supabase from '@/lib/services/supabase';
import type { DbPuzzleSolve } from '@/lib/types/api';
import type { Phase, PuzzleSolve, PuzzleSolver } from '@/lib/types/protocol';

export type LeaderboardPuzzlesResponse = {
  data: {
    data: PuzzleSolver[];
    solvers: number;
    solves: number;
    minPuzzleIndex: number;
    maxPuzzleIndex: number;
  };
  status: number;
  error: PostgrestError | null;
};

/**
 * Returns leaderboard results for [**Curta Puzzles**](https://curta.wtf/docs/puzzles/overview),
 * across all chains ranked by the method described [**here**](https://www.curta.wtf/docs/leaderboard#curta-puzzles).
 * @param param0 An object containing the minimum and maximum puzzle IDs to
 * fetch solves for i the shape `{ minPuzzleIndex?: number, maxPuzzleIndex?: number }`.
 * @returns An object containing data for the solves, the status code, and the
 * error in the shape `{ data: { data: PuzzleSolve[], solvers: number, solves: number, minPuzzleIndex: number, maxPuzzleIndex: number }, status: number, error: PostgrestError | null }`.
 */
const fetchLeaderboardPuzzles = async (
  {
    minPuzzleIndex = 0,
    maxPuzzleIndex = Number.MAX_SAFE_INTEGER,
  }: {
    minPuzzleIndex?: number;
    maxPuzzleIndex?: number;
  } = { minPuzzleIndex: 0, maxPuzzleIndex: Number.MAX_SAFE_INTEGER },
): Promise<LeaderboardPuzzlesResponse> => {
  // Fetch solves.
  const { data, status, error } = await supabase
    .from('puzzles_solves')
    .select('*, solver:users(*)')
    .order('solveTimestamp', { ascending: true })
    .returns<DbPuzzleSolve[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return {
      data: { data: [], solvers: 0, solves: 0, minPuzzleIndex, maxPuzzleIndex },
      status,
      error,
    };
  }

  // Fetch puzzles.
  const { data: puzzles } = await supabase
    .from('puzzles')
    .select('id, chainId, name, author:users(*), numberSolved, addedTimestamp')
    .order('addedTimestamp', { ascending: true })
    .returns<Required<PuzzleSolve>['puzzle'][]>();

  const solversObject: { [key: string]: PuzzleSolver } = {};
  const puzzleMap: Map<string, Required<PuzzleSolve>['puzzle'] & { index: number }> = new Map();

  // Go through the list of puzzles to make them addressable via puzzle ID and
  // chain ID.
  puzzles?.forEach((puzzle, index) => {
    // Set puzzle solve count.
    puzzleMap.set(`${puzzle.id}|${puzzle.chainId}`, { ...puzzle, index: index + 1 });
  });

  data
    .filter((item) => {
      const puzzleIndex =
        // Include all solves within range; exclude any puzzle not found in the
        // map.
        puzzleMap.get(`${item.puzzleId}|${item.chainId}`)?.index ?? Number.MAX_SAFE_INTEGER;
      return puzzleIndex >= minPuzzleIndex && puzzleIndex <= maxPuzzleIndex;
    })
    .forEach((item) => {
      const solver = item.solver.address.toLowerCase() as Address;

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
        // Identifier
        puzzleId: item.puzzleId,
        chainId: item.chainId,
        solver: item.solver,
        // Solve information
        rank: item.rank,
        phase: item.phase as Phase,
        solution: item.solution,
        puzzle: puzzleMap.get(`${item.puzzleId}|${item.chainId}`),
        // Solve transaction information
        solveTimestamp: item.solveTimestamp,
        solveTx: item.solveTx,
      });
    });

  // Sort solvers by speed score, then rank, then return the top 100.
  const solvers: PuzzleSolver[] = Object.values(solversObject)
    .map((item) => {
      const sum = item.solves.reduce(
        (a, b) =>
          a +
          (b.rank - 1) /
            Math.max(1, (puzzleMap.get(`${b.puzzleId}|${b.chainId}`)?.numberSolved ?? 1) - 1),
        0,
      );

      return {
        ...item,
        speedScore: Math.round(10000 * (1 - sum / item.solves.length)) / 100,
      };
    })
    .sort((a, b) => b.speedScore - a.speedScore)
    .sort((a, b) => b.points - a.points)
    .slice(0, 100)
    .map((item, index) => ({ ...item, rank: index + 1 }));

  return {
    data: {
      data: solvers,
      solvers: solvers.length,
      solves: data.length,
      minPuzzleIndex,
      maxPuzzleIndex,
    },
    status,
    error,
  };
};

export default fetchLeaderboardPuzzles;
