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
 * Type for an object representing a partial Curta user object.
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
export type PartialUser = Pick<User, 'address'> & Partial<User>;

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
// Curta Golf types
// -----------------------------------------------------------------------------

/**
 * Type for an object representing a [**Curta Golf Course**](https://www.curta.wtf/docs/golf/overview).
 * @param id The course's ID.
 * @param chainId The ID of the chain the course is on.
 * @param address The course's contract address.
 * @param name The course's name.
 * @param description A short description about the course.
 * @param numLeaders The number of leaders the course has had in the past.
 * @param numSolved The number of addresses that have solved the course.
 * @param allowedOpcodes A hex-string of a bitmap of allowed opcodes, where a
 * `1` at the LSb position equal to the opcode's value indicates that the opcode
 * is allowed.
 * @param github A link to the course's GitHub repository.
 * @param disabled Whether or not the course should be displayed on the
 * frontend.
 * @param eventId The ID of the event the course is part of.
 * @param leader The course's leader.
 * @param leaderBlock The block number the course's leader was set at.
 * @param leaderGas The gas used by the current leading solution.
 * @param leaderTimestamp The blockchain timestamp the course's record was set
 * at.
 * @param leaderTx The transaction hash of the transaction that set the course
 * record.
 * @param bytecode The course's contract bytecode.
 * @param solidity The course's Solidity source code.
 * @param huff The course's Huff source code.
 * @param addedBlock The block number the course was added at.
 * @param addedTimestamp The blockchain timestamp the course was added at.
 * @param addedTx The transaction hash of the transaction that added the course.
 */
export type GolfCourse = {
  // Identifier
  id: number;
  chainId: number;
  // Course static information
  address: Address;
  name: string;
  description?: string;
  // Course dynamic information
  numLeaders: number;
  numSolved: number;
  allowedOpcodes: Hash;
  github?: string;
  disabled?: boolean;
  event?: Event;
  // Course leader information
  leader?: PartialUser;
  leaderBlock?: number;
  leaderGas?: number;
  leaderTimestamp?: number;
  leaderTx?: Hash;
  // Course source code
  bytecode: Hash;
  solidity?: string;
  huff?: string;
  // Added information
  addedBlock: number;
  addedTimestamp: number;
  addedTx: Hash;
};

/**
 * Type for an object representing a [**Curta Golf Course**](https://www.curta.wtf/docs/golf/overview).
 * @param courseId The ID of the course the solve is for.
 * @param chainId The ID of the chain the course is on.
 * @param solver The user that solved the course.
 * @param gasUsed The gas used by the solver's solution.
 * @param target The address of the solver's deployed solution.
 * @param solution The bytecode of the solution.
 * @param submitBlock The block number the solution was submitted at.
 * @param submitTimestamp The blockchain timestamp the solution was submitted
 * at.
 * @param submitTx The transaction hash of the transaction that submitted the
 * solution to the course.
 * @param isRecord Whether or not the solution set a new record at the time of
 * submission.
 * @param gasDiff The difference in gas between the submitted solution and the
 * previous record.
 */
export type GolfCourseSolve = {
  // Identifier
  courseId: number;
  chainId: number;
  solver: PartialUser;
  submitTx: Hash;
  // Solve information
  gasUsed: number;
  target: Address;
  solution: Hash;
  submitBlock: number;
  submitTimestamp: number;
  isRecord?: boolean;
  // Metadata
  gasDiff?: number;
};

/**
 * Type for an object representing a [**Curta Golf Course**](https://www.curta.wtf/docs/golf/overview)
 * solver.
 * @param courseId The ID of the course the solve is for.
 * @param chainId The ID of the chain the course is on.
 * @param solver The user that solved the course.
 * @param gasUsed The gas used by the solver's solution.
 * @param target The address of the solver's deployed solution.
 * @param solution The bytecode of the solution.
 * @param submitBlock The block number the solution was submitted at.
 * @param submitTimestamp The blockchain timestamp the solution was submitted
 * at.
 * @param submitTx The transaction hash of the transaction that submitted the
 * solution to the course.
 * @param isRecord Whether or not the solution set a new record at the time of
 * submission.
 * @param gasDiff The difference in gas between the submitted solution and the
 * previous record.
 * @param rank The rank of the solver on the [**Curta Golf leaderboard**](https://www.curta.wtf/docs/leaderboard#curta-golf).
 */
export type GolfCourseSolver = GolfCourseSolve & {
  rank: number;
};

// -----------------------------------------------------------------------------
// Curta Puzzles types
// -----------------------------------------------------------------------------

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
 * @param event The event the puzzle is for (if any).
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
  author: PartialUser;
  name: string;
  // Puzzle dynamic information
  numberSolved: number;
  solution?: string;
  github?: string;
  disabled?: boolean;
  event?: Event;
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
 * @param team The player's team (if any).
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
  team?: Team;
  solverEnsName?: string;
  solverEnsAvatar?: string;
  solves: PuzzleSolve[];
};

// -----------------------------------------------------------------------------
// Team Registry-specific types
// -----------------------------------------------------------------------------

/**
 * Type for an object representing a Curta team.
 * @param id The team's ID.
 * @param chainId The ID of the chain the team is on.
 * @param leader The team's leader.
 * @param name The team's name.
 * @param avatar A link to the team's avatar image.
 * @param members An array of the team's members.
 */
export type Team = {
  // Identifier
  id: number;
  chainId: number;
  // Team information
  leader?: Pick<User, 'address'> & Partial<User>;
  name?: string;
  avatar?: string;
  members: (Pick<User, 'address'> & Partial<User>)[];
};

/**
 * Type for an object representing an approval to join a Curta team.
 * @param teamId The ID of the team the approval is for.
 * @param chainId The ID of the chain the team is on.
 * @param member The user.
 * @param approved Whether or not the user is approved to join the team or not.
 * @param team Partial information about the team the approval is for.
 */
export type TeamMemberApproval = {
  // Identifier
  teamId: number;
  chainId: number;
  member: Pick<User, 'address'> & Partial<User>;
  // Approval information
  approved: boolean;
  team: Team;
};
