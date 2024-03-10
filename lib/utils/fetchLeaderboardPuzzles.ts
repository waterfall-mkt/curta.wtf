'use server';

import type { Event, Puzzle, PuzzleSolve, Team, User, UserInfo } from '@prisma/client';

import { db } from '@/lib/db';

export type LeaderboardPuzzlesResponse = {
  data: LeaderboardPuzzleSolver[];
  puzzles: number;
  solvers: number;
  solves: number;
  filter: string;
};

export type LeaderboardPuzzleSolver = {
  // Identifier
  solverAddress: string;
  solver: User & { info: UserInfo | null };
  // Leaderboard information
  rank: number;
  count: {
    phase0: number;
    phase1: number;
    phase2: number;
    total: number;
  };
  points: number;
  speedScore: number;
  solves: (PuzzleSolve & {
    solver: User & { info: UserInfo | null };
    puzzle?: Pick<
      Puzzle,
      'id' | 'chainId' | 'name' | 'authorAddress' | 'addedTimestamp' | 'eventId'
    > & {
      author: User & { info: UserInfo | null };
      event: Event | null;
      index: number;
      _count: { solves: number };
    };
    // Miscellanous information
  })[];
  team?: Team & {
    leader: User & { info: UserInfo | null };
    members: (User & { info: UserInfo | null })[];
  };
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
  const solves = await db.puzzleSolve.findMany({
    where: { chain: { isTestnet: Boolean(process.env.NEXT_PUBLIC_IS_TESTNET) } },
    include: { solver: { include: { info: true } } },
    orderBy: { solveTimestamp: 'asc' },
  });

  if (solves.length === 0) {
    return { data: [], puzzles: 0, solvers: 0, solves: 0, filter };
  }

  // Fetch puzzles.
  const puzzles = await db.puzzle.findMany({
    where: { chain: { isTestnet: Boolean(process.env.NEXT_PUBLIC_IS_TESTNET) } },
    select: {
      id: true,
      chainId: true,
      name: true,
      authorAddress: true,
      author: { include: { info: true } },
      addedTimestamp: true,
      eventId: true,
      event: true,
      _count: { select: { solves: true } },
    },
    orderBy: { addedTimestamp: 'asc' },
  });

  const solversObject: { [key: string]: LeaderboardPuzzleSolver } = {};
  const puzzleMap: Map<string, (typeof puzzles)[0] & { index: number }> = new Map();

  // Fetch event to see if it exists.
  let event;
  if (eventSlug) {
    event = await db.event.findFirst({ where: { slug: eventSlug } });
  }

  // Go through the list of puzzles to make them addressable via puzzle ID and
  // chain ID.
  puzzles.forEach((puzzle, index) => {
    // Exclude events if specified, or if the puzzle is not in the queried
    // range.
    if (
      (excludeEvents && puzzle.eventId) ||
      index < minPuzzleIndex ||
      index > maxPuzzleIndex ||
      (eventSlug && puzzle.event?.slug !== eventSlug)
    ) {
      return;
    }

    // Set puzzle solve count.
    puzzleMap.set(`${puzzle.id}|${puzzle.chainId}`, { ...puzzle, index: index + 1 });
  });

  // Fetch team and team members if event leaderboard.
  let teams: (Team & { leader: User & { info: UserInfo | null } })[] = [];
  const teamMembers: (User & { info: UserInfo | null; teamId: number })[] = [];
  const teamMembershipSet: Set<string> = new Set();
  if (eventSlug && event?.groupPuzzles) {
    teams = await db.team.findMany({
      where: { chain: { isTestnet: Boolean(process.env.NEXT_PUBLIC_IS_TESTNET) } },
      include: {
        leader: { include: { info: true } },
      },
    });
    const teamTransfers = await db.teamTransfer.findMany({
      where: {
        chain: { isTestnet: Boolean(process.env.NEXT_PUBLIC_IS_TESTNET) },
        ...{ timestamp: { lte: new Date(event.endDate).valueOf() / 1000 } },
      },
      include: { user: { include: { info: true } } },
      orderBy: { timestamp: 'desc' },
    });
    teamTransfers.map((transfer) => {
      if (!teamMembershipSet.has(transfer.userAddress.toLowerCase())) {
        teamMembers.push({ ...transfer.user, teamId: transfer.toTeamId });
        teamMembershipSet.add(transfer.userAddress.toLowerCase());
      }
    });
  }

  // The keys are in the form `teamId`. We ignore `chainId` here. Then, make a
  // mapping of the teams.
  const teamMap = new Map<
    number,
    Team & {
      leader: User & { info: UserInfo | null };
      members: (User & { info: UserInfo | null })[];
    }
  >();
  const memberToTeamMap: Map<string, number> = new Map();
  teams.forEach((team) => {
    teamMap.set(team.id, {
      ...team,
      members: [],
    });
  });
  teamMembers.forEach((member) => {
    memberToTeamMap.set(member.address.toLowerCase(), member.teamId);
    const team = teamMap.get(member.teamId);
    if (team) {
      teamMap.set(member.teamId, {
        ...team,
        members: [...team.members, member],
      });
    }
  });

  // The keys are in the form `${teamId}_${puzzleId}_${chainId}`.
  const teamPuzzlesSolved = new Set<string>();
  // Keep track of unique solvers (addresses).
  const uniqueSolvers = new Set<string>();
  // Filter solves within query.
  const filteredData = solves.filter((item) => puzzleMap.has(`${item.puzzleId}|${item.chainId}`));
  filteredData.forEach((item) => {
    const solverAddress = item.solverAddress.toLowerCase();
    // Keep track of unique solvers.
    uniqueSolvers.add(solverAddress);
    // Aggregate scores by team (`0` means individual).
    const teamId = memberToTeamMap.get(solverAddress) ?? 0;
    const solverKey = teamId > 0 ? `team_${teamId}` : solverAddress;
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
        solverAddress: solverAddress,
        solver: item.solver,
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
      ...item,
      puzzle: puzzleMap.get(`${item.puzzleId}|${item.chainId}`),
    });
  });

  // Sort solvers by speed score, then by points. Then, return the top 100 w/
  // rank.
  const solvers: LeaderboardPuzzleSolver[] = Object.values(solversObject)
    .map((item) => {
      const sum = item.solves.reduce(
        (a, b) =>
          a +
          ((b.rank ?? 0) - 1) /
            Math.max(1, (puzzleMap.get(`${b.puzzleId}|${b.chainId}`)?._count.solves ?? 1) - 1),
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
    data: solvers,
    puzzles: puzzleMap.size,
    solvers: uniqueSolvers.size,
    solves: filteredData.length,
    filter,
  };
};

export default fetchLeaderboardPuzzles;
