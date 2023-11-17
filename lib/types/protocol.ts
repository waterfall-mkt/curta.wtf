import type { Address, Hash } from 'viem';

// -----------------------------------------------------------------------------
// General types
// -----------------------------------------------------------------------------

/**
 * Type for an object representing a Curta event.
 * @param slug The event's slug (unique).
 * @param name The event's name.
 * @param description A short description about the event.
 * @param link External link relevant to the event.
 * @param image An image relevant to the event.
 * @param startDate The timestamp the event starts at.
 * @param endDate The timestamp the event ends at.
 * @param location The location of the event.
 */
export type Event = {
  // Identifier
  slug: string;
  // Event information
  name: string;
  description?: string;
  link?: string;
  image?: string;
  startDate: number;
  endDate: number;
  location?: string;
};

/**
 * Type for an object representing a Curta user.
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
  // Identifier
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

/**
 * Type for an object representing a [**Curta Puzzles author**](https://www.curta.wtf/docs/puzzles/becoming-an-author).
 * @dev The type is the same as the `User` type, except every field is optional,
 * except for `address`.
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
export type Author = Pick<User, 'address'> & Partial<User>;

/**
 * Type for an object containing information about a [**Flag NFT**](https://www.curta.wtf/docs/puzzles/writing-puzzles#customizing-art)'s
 * color scheme.
 * @param border The color of the stroke that outlines the card.
 * @param bg The color of the card's backgorund color.
 * @param text The color of the main text elements (header and stats).
 * @param subtext The color of the secondary text elements (labels).
 * @param canvas The color of the portion behind the card
 */
export type FlagColorConfig = {
  border: `#${string}`;
  bg: `#${string}`;
  text: `#${string}`;
  subtext: `#${string}`;
  canvas: `#${string}`;
};

/**
 * Type for the [**Phase**](https://www.curta.wtf/docs/puzzles/overview#submission-period)
 * a [**Puzzle**](https://www.curta.wtf/docs/puzzles/overview) is in.
 */
export type Phase = 0 | 1 | 2 | 3;

/**
 * Type for an object representing a [**Curta Puzzle**](https://curta.wtf/docs/puzzles/overview).
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
 * @param bytecode The puzzle's contract bytecode.
 * @param solidity The puzzle's Solidity source code.
 * @param huff The puzzle's Huff source code.
 * @param addedBlock The block number the puzzle was added at.
 * @param addedTimestamp The blockchain timestamp the puzzle was added at.
 * @param addedTx The transaction hash of the transaction that added the puzzle.
 * @param firstSolveBlock The block number the puzzle was first solved at.
 * @param firstSolver The address of the first solver.
 * @param firstSolverEnsName Prefetched ENS name of the first solver.
 * @param firstSolveTime The time (in seconds) it took for the puzzle to first
 * be solved.
 * @param firstSolveTimestamp The blockchain timestamp the puzzle was first
 * solved at.
 * @param firstSolveTx The transaction hash of the transaction that first solved
 * the puzzle.
 */
export type Puzzle = {
  // Identifier
  id: number;
  chainId: number;
  // Puzzle static information
  address: Address;
  author: Author;
  name: string;
  // Puzzle dynamic information
  numberSolved: number;
  solution?: string;
  github?: string;
  disabled?: boolean;
  isEvent?: boolean;
  // Puzzle source code
  bytecode: string;
  solidity?: string;
  huff?: string;
  // Added information
  addedBlock: number;
  addedTimestamp: number;
  addedTx: Hash;
  // First solve information
  firstSolveBlock?: number;
  firstSolver?: Address;
  firstSolverEnsName?: string;
  firstSolveTime?: number;
  firstSolveTimestamp: number;
  firstSolveTx?: Hash;
};

/**
 * Type for an object representing an onchain solve on a [**Curta Puzzle**](https://curta.wtf/docs/puzzles/overview).
 * @param puzzleId The ID of the puzzle the solve is for.
 * @param chainId The ID of the chain the puzzle is on.
 * @param solver The user that solved the puzzle.
 * @param solverEnsName Prefetched ENS name of the solver.
 * @param solverEnsAvatar Prefetched ENS avatar of the solver.
 * @param rank The finishing position of the solve on the Puzzle.
 * @param phase The [**Phase**](https://curta.wtf/docs/puzzles/overview#submission-period)
 * the Puzzle was solved in.
 * @param solution The solution the solver submitted (as a hex-string).
 * @param puzzle Partial information about the Puzzle the solve is for.
 * @param solveTimestamp The blockchain timestamp the puzzle was solved at.
 * @param solveTx The transaction hash of the transaction that solved the puzzle.
 */
export type PuzzleSolve = {
  // Identifier
  puzzleId: number;
  chainId: number;
  solver: Pick<User, 'address'> & Partial<User>;
  solverEnsName?: string;
  solverEnsAvatar?: string;
  // Solve information
  rank: number;
  phase: Phase;
  solution: Hash;
  puzzle?: Pick<Puzzle, 'id' | 'chainId' | 'name' | 'author' | 'numberSolved' | 'addedTimestamp'>;
  // Solve transaction information
  solveTimestamp: number;
  solveTx: Hash;
};

/**
 * Type for an object representing a [**Curta Puzzle**](https://curta.wtf/docs/puzzles/overview)
 * solver.
 * @param solver The user that solved the puzzle.
 * @param rank The player's position on the [**Curta Puzzles leaderboard**](https://www.curta.wtf/docs/leaderboard#curta-puzzles).
 * @param count An object containing the breakdown of the player's solves by
 * [**Phase**](https://curta.wtf/docs/puzzles/overview#submission-period).
 * @param points The player's total [**points**](https://www.curta.wtf/docs/leaderboard#points).
 * @param speedScore The player's [**speed score**](https://www.curta.wtf/docs/leaderboard#speed-score).
 * @param solverEnsName Prefetched ENS name of the solver.
 * @param solverEnsAvatar Prefetched ENS avatar of the solver.
 * @param solves An array of the player's solves.
 */
export type PuzzleSolver = {
  // Identifier
  solver: Address;
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
  // Miscellanous information
  solverEnsName?: string;
  solverEnsAvatar?: string;
  solves: PuzzleSolve[];
};
