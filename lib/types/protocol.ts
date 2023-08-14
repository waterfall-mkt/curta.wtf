export type Author = {
  address: `0x${string}`;
  ensName?: string;
  avatar?: string;
  name?: string;
  twitter?: string;
  github?: string;
};

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
  address: `0x${string}`;
  author: Author;
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

export type Token = {
  id: number;
  puzzleAddress: `0x${string}`;
  owner: `0x${string}`;
  tokenImage: string;
};

export type Solve = {
  solver: `0x${string}`;
  solverEnsName?: string;
  solverEnsAvatar?: string;
  solveTime: number;
  puzzle: Puzzle;
  phase: Phase;
  rank: number;
  tx: `0x${string}`;
};
