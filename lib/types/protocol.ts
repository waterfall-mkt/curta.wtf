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

export type Solve = {
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
