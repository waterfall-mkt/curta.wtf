'use server';

import type { PostgrestError } from '@supabase/supabase-js';
import type { Address } from 'viem';

import supabase from '@/lib/services/supabase';
import type { DbPuzzleSolve, DbTeam, DbTeamMember } from '@/lib/types/api';
import type { Phase, PuzzleSolve, PuzzleSolver, Team } from '@/lib/types/protocol';

export type LeaderboardPuzzlesResponse = {
  data: {
    data: PuzzleSolver[];
    puzzles: number;
    solvers: number;
    solves: number;
    filter: string;
  };
  status: number;
  error: PostgrestError | null;
};

/**
 * Returns leaderboard results for [**Curta Puzzles**](https://curta.wtf/docs/puzzles/overview),
 * across all chains ranked by the method described [**here**](https://www.curta.wtf/docs/leaderboard#curta-puzzles).
 * @param param0 An object containing the minimum and maximum puzzle IDs to
 * fetch solves for in the shape `{ minPuzzleIndex: number; maxPuzzleIndex: number; filter: string; excludeEvents?: boolean; }`.
 */
const fetchLeaderboardPuzzles = async ({
  minPuzzleIndex,
  maxPuzzleIndex,
  filter,
  excludeEvents,
  eventSlug,
}: {
  minPuzzleIndex: number;
  maxPuzzleIndex: number;
  filter: string;
  excludeEvents?: boolean;
  eventSlug?: string;
}): Promise<LeaderboardPuzzlesResponse> => {
  // Fetch solves.
  const { data, status, error } = await supabase
    .from('puzzles_solves')
    .select('*, solver:users(*)')
    .order('solveTimestamp', { ascending: true })
    .returns<DbPuzzleSolve[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return {
      data: { data: [], puzzles: 0, solvers: 0, solves: 0, filter },
      status,
      error,
    };
  }

  // Fetch puzzles.
  const { data: puzzles } = await supabase
    .from('puzzles')
    .select('id, chainId, name, author:users(*), numberSolved, addedTimestamp, eventId:events(*)')
    .not('address', 'is', null)
    .order('addedTimestamp', { ascending: true })
    .returns<(Required<PuzzleSolve>['puzzle'] & { eventId?: null | { slug: string } })[]>();

  const solversObject: { [key: string]: PuzzleSolver } = {};
  const puzzleMap: Map<string, Required<PuzzleSolve>['puzzle'] & { index: number }> = new Map();

  // Go through the list of puzzles to make them addressable via puzzle ID and
  // chain ID.
  puzzles?.forEach((puzzle, index) => {
    // Exclude events if specified, or if the puzzle is not in the queried
    // range.
    if (
      (excludeEvents && puzzle.eventId) ||
      index < minPuzzleIndex ||
      index > maxPuzzleIndex ||
      (eventSlug && puzzle.eventId?.slug !== eventSlug)
    ) {
      return;
    }

    // Set puzzle solve count.
    puzzleMap.set(`${puzzle.id}|${puzzle.chainId}`, { ...puzzle, index: index + 1 });
  });

  // Fetch team and team members if event leaderboard.
  let teams: DbTeam[] = [];
  let teamMembers: DbTeamMember[] = [];
  if (eventSlug) {
    const { data: dbTeamMembers } = await supabase
      .from('team_members')
      .select('*')
      .returns<DbTeamMember[]>();
    const { data: dbTeams } = await supabase
      .from('teams')
      .select('*, leader:users(*)')
      .returns<DbTeam[]>();

    teams = dbTeams ?? [];
    teamMembers = dbTeamMembers ?? [];
  }

  // The keys are in the form `teamId`. We ignore `chainId` here. Then, make a
  // mapping of the teams.
  const teamMap = new Map<number, Team>();
  const memberToTeamMap: Map<Address, number> = new Map();
  teams.forEach((team) => {
    teamMap.set(team.id, {
      id: team.id,
      chainId: team.chainId,
      leader: team.leader,
      name: team.name,
      avatar: team.avatar,
      members: [],
    });
  });
  teamMembers.forEach((member) => {
    memberToTeamMap.set(member.user, member.teamid);
    const team = teamMap.get(member.teamid);
    if (team) {
      teamMap.set(member.teamid, {
        ...team,
        members: [...team.members, { address: member.user }],
      });
    }
  });

  // The keys are in the form `${teamId}_${puzzleId}_${chainId}`.
  const teamPuzzlesSolved = new Set<string>();
  // Keep track of unique solvers (addresses).
  const uniqueSolvers = new Set<Address>();
  // Filter solves within query.
  const filteredData = data.filter((item) => puzzleMap.has(`${item.puzzleId}|${item.chainId}`));
  filteredData.forEach((item) => {
    const solver = item.solver.address.toLowerCase() as Address;
    // Keep track of unique solvers.
    uniqueSolvers.add(solver);
    // Aggregate scores by team (`0` means individual).
    const teamId = memberToTeamMap.get(solver) ?? 0;
    const solverKey = teamId > 0 ? `team_${teamId}` : solver;
    if (teamId > 0) {
      const teamPuzzleKey = `${teamId}_${item.puzzleId}_${item.chainId}`;

      // If the team has already solved the puzzle, skip.
      if (teamPuzzlesSolved.has(teamPuzzleKey)) return;
      teamPuzzlesSolved.add(teamPuzzleKey);
    }

    // Initialize solver object if it doesn't exist.
    if (!solversObject[solverKey]) {
      solversObject[solverKey] = {
        rank: 0,
        solver: solver,
        count: { phase0: 0, phase1: 0, phase2: 0, total: 0 },
        points: 0,
        speedScore: 0,
        solves: [],
        team: teamMap.get(teamId),
      };
    }

    // Increment solves count, points, and solves.
    switch (item.phase) {
      case 0:
        solversObject[solverKey].count.phase0++;
        solversObject[solverKey].points += 3;
        break;
      case 1:
        solversObject[solverKey].count.phase1++;
        solversObject[solverKey].points += 2;
        break;
      case 2:
        solversObject[solverKey].count.phase2++;
        solversObject[solverKey].points += 1;
        break;
    }
    solversObject[solverKey].count.total++;
    solversObject[solverKey].solves.push({
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

  // Sort solvers by speed score, then by points. Then, return the top 100 w/
  // rank.
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
      puzzles: puzzleMap.size,
      solvers: uniqueSolvers.size,
      solves: filteredData.length,
      filter,
    },
    status,
    error,
  };
};

export default fetchLeaderboardPuzzles;
