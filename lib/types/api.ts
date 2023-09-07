export type Error = {
  message: string;
};

export type SupabaseAuthor = {
  address: `0x${string}`;
  avatar?: string;
  name?: string;
  github?: string;
  twitter?: string;
};

export type SupabasePuzzle = {
  id: number;
  address: `0x${string}`;
  author: SupabaseAuthor;
  firstSolveTimestamp: number;
  firstSolver?: `0x${string}`;
  solution?: string;
  addedTx: `0x${string}`;
  solveTx?: `0x${string}`;
  firstSolveBlock?: number;
  name: string;
  addedTimestamp: number;
  addedBlock: number;
  numberSolved: number;
  bytecode: string;
  solidity?: string;
  huff?: string;
  github?: string;
  created_at: number;
  disabled?: boolean;
};

export type SupabaseSolve = {
  id: string; // string because it's a hex-string
  puzzleId: number;
  solver: `0x${string}`;
  solveTx: `0x${string}`;
  tokenImage: string;
  solution: `0x${string}`;
  phase: number;
  created_at: number;
  solveTimestamp: number;
};
