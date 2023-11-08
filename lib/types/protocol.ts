import type { Address } from 'viem';

// -----------------------------------------------------------------------------
// General types
// -----------------------------------------------------------------------------

/**
 * Type for a user object representing a Curta user.
 * @param address The user's Ethereum address (hex, should be all lowercase).
 * @param username The user's unique username. If the user never set a username,
 * it will be a randomly generated `uuid`.
 * @param bio A short description about the user.
 * @param displayName The user's display name/nickname.
 * @param twitter The user's Twitter username.
 * @param github The user's GitHub username.
 * @param puzzlesSolved The number of [**Curta Puzzles**](https://curta.wtf/docs/puzzles/overview)
 * the user has solved.
 * @param isPuzzleAuthor Whether or not the user has authored and added any
 * [**Curta Puzzles**](https://curta.wtf/docs/puzzles/overview).
 * @param ensName User's prefetched ENS name.
 */
export type User = {
  // Primary key
  address: Address;
  // User information
  username: string;
  bio?: string;
  displayName?: string;
  twitter?: string;
  github?: string;
  // Curta Puzzles-specific
  puzzlesSolved: number;
  isPuzzleAuthor: boolean;
  // Frontend-specific
  ensName?: string;
};

// -----------------------------------------------------------------------------
// Curta Puzzles types
// -----------------------------------------------------------------------------

export type FlagConfig = {
  border: string;
  bg: string;
  text: string;
  subtext: string;
  canvas: string;
};

export type Phase = 0 | 1 | 2 | 3;

export type Puzzle = {
  // Protocol
  id: number;
  chainId: number;
  address: `0x${string}`;
  author: User;
  addedTx: `0x${string}`;
  addedTimestamp: number;
  addedBlock: number;
  // Metadata
  name: string;
  flagConfig: FlagConfig;
  // Solve
  firstSolveTimestamp: number;
  firstSolver?: `0x${string}`;
  firstSolverEnsName?: string;
  firstSolveBlock?: number;
  solveTx?: `0x${string}`;
  solveTime?: number;
  numberSolved: number;
  // Problem
  bytecode: string;
  solidity?: string;
  huff?: string;
  tokenRenderer?: string;
  // Solution
  github?: string;
  solution?: string;
  // Misc
  disabled?: boolean;
};

export type Solve = {
  chainId: number;
  solver: `0x${string}`;
  solverEnsName?: string;
  solverEnsAvatar?: string;
  solveTimestamp: number;
  puzzleId: number;
  phase: Phase;
  rank: number;
  tx: `0x${string}`;
  puzzle?: Pick<Puzzle, 'id' | 'name' | 'author' | 'numberSolved' | 'addedTimestamp'>;
};

export type Solver = {
  rank: number;
  solver: `0x${string}`;
  solverEnsName?: string;
  solverEnsAvatar?: string;
  count: {
    phase0: number;
    phase1: number;
    phase2: number;
    total: number;
  };
  points: number;
  speedScore: number;
  solves: Solve[];
};
