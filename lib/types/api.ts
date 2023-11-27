import type { Address, Hash } from 'viem';

// -----------------------------------------------------------------------------
// General types
// -----------------------------------------------------------------------------

/**
 * Type for an object representing a Curta event stored in the database's
 * `events` table.
 * @param id The event's ID (auto-generated `uuid`).
 * @param slug The event's slug (unique).
 * @param name The event's name.
 * @param description A short description about the event.
 * @param link External link relevant to the event.
 * @param image An image relevant to the event.
 * @param startDate The timestamp the event starts at.
 * @param endDate The timestamp the event ends at.
 * @param location The location of the event.
 */
export type DbEvent = {
  // Primary key
  id: string; // Auto-generated
  // Event information
  slug: string;
  name: string;
  description?: string;
  link?: string;
  image?: string;
  startDate: number;
  endDate: number;
  location?: string;
};

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
  eventId?: DbEvent;
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
 * @param solveTimestamp The blockchain timestamp the puzzle was solved at.
 * @param solveTx The transaction hash of the transaction that solved the
 * puzzle.
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
  solveTimestamp: number;
  solveTx: Hash;
};

// -----------------------------------------------------------------------------
// Curta Golf types
// -----------------------------------------------------------------------------

/**
 * Type for an object representing a [**Curta Golf**](https://curta.wtf/docs/golf/overview)
 * ``Course'' (i.e. challenge) stored in the database's `golf_courses` table.
 * @param id The course's ID.
 * @param chainId The ID of the chain the course is on.
 * @param address The course's contract address.
 * @param name The course's name.
 * @param description A description about the course.
 * @param numLeaders The number of times the gas record has been lowered.
 * @param numSolved The number of addresses that have solved the course.
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
export type DbGolfCourse = {
  // Primary key
  id: number;
  chainId: number;
  // Course static information
  address: Address;
  name: string;
  description: string;
  // Course dynamic information
  numLeaders: number;
  numSolved: number;
  github?: string;
  disabled?: boolean;
  eventId?: DbEvent;
  // Course leader information
  leader: Pick<DbUser, 'address'> & Partial<DbUser>;
  leaderBlock: number;
  leaderGas: number;
  leaderTimestamp: number;
  leaderTx: Hash;
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
 * Type for an object representing a commitment to submit a solution to a
 * [**Curta Golf**](https://curta.wtf/docs/golf/overview) ``Course'' (i.e.
 * challenge) during a 2-step commit-reveal process stored in the database's
 * `golf_courses_commits` table.
 * @param key A 32-byte hash of the commit's data computed as
 * `keccak256(abi.encodePacked(msg.sender, _solution, _salt))`, where
 * `msg.sender` is the address of the solver, `_solution` is the bytecode of the
 * solution, and `_salt` is some random, secret `uint256` number.
 * @param chainId The ID of the chain the course is on.
 * @param solver The user that committed the submission to the course.
 * @param courseId The ID of the course the commit is for.
 * @param commitBlock The block number the commit was made at.
 * @param commitTimestamp The blockchain timestamp the commit was made at.
 * @param commitTx The transaction hash of the transaction that committed the
 * submission to the course.
 */
export type DbGolfCourseCommit = {
  // Primary key
  key: Hash;
  chainId: number;
  // Commit information
  solver: Pick<DbUser, 'address'> & Partial<DbUser>;
  courseId: number;
  commitBlock: number;
  commitTimestamp: number;
  commitTx: Hash;
};

/**
 * Type for an object representing a solve to a [**Curta Golf**]((https://curta.wtf/docs/golf/overview)
 * ``Course'' (i.e. challenge) stored in the database's `golf_courses_solves`.
 * @param courseId The ID of the course the solve is for.
 * @param chainId The ID of the chain the course is on.
 * @param solver The user that solved the course.
 * @param gasUsed The gas used by the solver's solution.
 * @param target The address of the solver's deployed solution.
 * @param solution The bytecode of the solution.
 * @param submitTx The transaction hash of the transaction that submitted the
 * solution to the course.
 * @param submitTimestamp The blockchain timestamp the solution was submitted
 * at.
 * @param isRecord Whether or not the solution set a new record at the time of
 * submission.
 */
export type DbGolfCourseSolve = {
  // Primary key
  courseId: number;
  chainId: number;
  solver: Pick<DbUser, 'address'> & Partial<DbUser>;
  // Solve information
  gasUsed: number;
  target: Address;
  solution: Hash;
  submitTx: Hash;
  submitTimestamp: number;
  isRecord?: boolean;
};

// -----------------------------------------------------------------------------
// Team Registry-specific types
// -----------------------------------------------------------------------------

/**
 * Type for a team object representing a Curta Team stored in the database's
 * `teams` table.
 * @param id The team's ID.
 * @param chainId The ID of the chain the team is on.
 * @param leader The team's leader.
 * @param name The team's name.
 * @param avatar A link to the team's avatar image.
 */
export type DbTeam = {
  // Primary key
  id: number;
  chainId: number;
  // Team information
  leader: Pick<DbUser, 'address'> & Partial<DbUser>;
  name?: string;
  avatar?: string;
};

/**
 * Type for a team member representing a member inside a Curta Team stored in
 * the database's `team_members` view.
 * @param user The address of the user.
 * @param chainId The ID of the chain the team is on.
 * @param teamid The ID of the team the user is a member of.
 */
export type DbTeamMember = {
  // Identifier
  user: Address;
  chainId: number;
  // Team information
  teamid: number;
};

/**
 * Type for a team member approval object representing an onchain set approval
 * event on a Curta Team stored in the database's `team_member_approvals` table.
 * @param teamId The ID of the team the approval is for.
 * @param chainId The ID of the chain the team is on.
 * @param member The user.
 * @param approved Whether or not the user is approved to join the team or not.
 */
export type DbTeamMemberApproval = {
  // Primary key
  teamId: number;
  chainId: number;
  member: Pick<DbUser, 'address'> & Partial<DbUser>;
  // Approval information
  approved: boolean;
};

/**
 * Type for a team transfer object representing an onchain transfer event on a
 * Curta Team stored in the database's `team_transfers` table.
 * @param user The user.
 * @param chainId The ID of the chain the team is on.
 * @param from The ID of the team the user is transferring from.
 * @param to The ID of the team the user is transferring to.
 * @param timestamp The blockchain timestamp the transfer was made at.
 */
export type DbTeamTransfer = {
  // Primary key
  user: Pick<DbUser, 'address'> & Partial<DbUser>;
  chainId: number;
  // Transfer information
  from: number;
  to: number;
  timestamp: number;
};

// -----------------------------------------------------------------------------
// Miscellanous types
// -----------------------------------------------------------------------------

export type Error = {
  message: string;
};
