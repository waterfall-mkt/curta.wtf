import type { Address, Hash } from 'viem';

// -----------------------------------------------------------------------------
// General types
// -----------------------------------------------------------------------------

/**
 * Type for an object representing a Curta user stored in the database's `users`
 * table.
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
 */
export type DbUser = {
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
};

// -----------------------------------------------------------------------------
// Curta Puzzles types
// -----------------------------------------------------------------------------

/**
 * Type for an object representing a [**Curta Puzzle**](https://curta.wtf/docs/puzzles/overview)
 * stored in the database's `puzzles` table.
 * @param id The puzzle's ID.
 * @param chainId The ID of the chain the puzzle is on.
 * @param address The puzzle's contract address.
 * @param author The puzzle's author.
 * @param name The puzzle's name.
 * @param numberSolved The number of addresses that have solved the puzzle.
 * @param solution A link to the the author's provided solution/write-up for the
 * puzzle.
 * @param github A link to the puzzle's GitHub repository.
 * @param disabled Whether or not the puzzle should be displayed on the
 * frontend.
 * @param isEvent Whether or not the puzzle is part of an event.
 * @param eventId The ID of the event the puzzle is part of.
 * @param sponsorshipId The ID of the sponsorship relevant to the puzzle.
 * @param bytecode The puzzle's contract bytecode.
 * @param solidity The puzzle's Solidity source code.
 * @param huff The puzzle's Huff source code.
 * @param addedBlock The block number the puzzle was added at.
 * @param addedTimestamp The blockchain timestamp the puzzle was added at.
 * @param addedTx The transaction hash of the transaction that added the puzzle.
 * @param firstSolveBlock The block number the puzzle was first solved at.
 * @param firstSolver The address of the first solver.
 * @param firstSolveTimestamp The blockchain timestamp the puzzle was first
 * solved at.
 * @param firstSolveTx The transaction hash of the transaction that first solved
 * the puzzle.
 */
export type DbPuzzle = {
  // Primary key
  id: number;
  chainId: number;
  // Puzzle static information
  address: Address;
  author: Pick<DbUser, 'address'> & Partial<DbUser>;
  name: string;
  // Puzzle dynamic information
  numberSolved: number;
  solution?: string;
  github?: string;
  disabled?: boolean;
  isEvent?: boolean;
  eventId?: string;
  sponsorshipId?: string;
  // Puzzle source code
  bytecode: Hash;
  solidity?: string;
  huff?: string;
  // Added information
  addedBlock: number;
  addedTimestamp: number;
  addedTx: Hash;
  // First solve information
  firstSolveBlock?: number;
  firstSolver?: Address;
  firstSolveTimestamp: number;
  firstSolveTx?: Hash;
};

/**
 * Type for an object representing an onchain solve on a [**Curta Puzzle**](https://curta.wtf/docs/puzzles/overview)
 * solve stored in the database's `puzzles_solves` table.
 * @param puzzleId The ID of the puzzle the solve is for.
 * @param chainId The ID of the chain the puzzle is on.
 * @param solver The user that solved the puzzle.
 * @param rank The position the solver was in when they solved the puzzle.
 * @param phase The [**Phase**](https://curta.wtf/docs/puzzles/overview#submission-period)
 * the puzzle was solved in.
 * @param solution The solution the solver submitted as a hexstring.
 * @param solveTx The transaction hash of the transaction that solved the
 * puzzle.
 * @param solveTimestamp The blockchain timestamp the puzzle was solved at.
 */
export type DbPuzzleSolve = {
  // Primary key
  puzzleId: number;
  chainId: number;
  solver: Pick<DbUser, 'address'> & Partial<DbUser>;
  // Solve information
  rank: number;
  phase: number;
  solution: Hash;
  // Solve transaction information
  solveTx: Hash;
  solveTimestamp: number;
};

// -----------------------------------------------------------------------------
// Miscellanous types
// -----------------------------------------------------------------------------

export type Error = {
  message: string;
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
