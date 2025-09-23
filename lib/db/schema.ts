import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

import { enumToPgEnum } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Enums
// -----------------------------------------------------------------------------

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

export const userRoleEnum = pgEnum('role', enumToPgEnum(UserRole));

// -----------------------------------------------------------------------------
// Auth
// -----------------------------------------------------------------------------

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  role: userRoleEnum('role').notNull().default(UserRole.USER),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const verifications = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

// -----------------------------------------------------------------------------
// User profile
// -----------------------------------------------------------------------------

export const userInfo = pgTable(
  'user_info',
  {
    address: text('address').primaryKey(),
    username: text('username').unique().notNull(),
    displayName: text('display_name'),
    bio: text('bio'),
    image: text('image'),
    twitter: text('twitter'),
    github: text('github'),
    farcaster: text('farcaster'),
    website: text('website'),
    isPuzzleAuthor: boolean('is_puzzle_author').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (userInfo) => [index('user_info_address_idx').on(userInfo.address)],
);

// -----------------------------------------------------------------------------
// General
// -----------------------------------------------------------------------------

export const chains = pgTable('chains', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  isTestnet: boolean('is_testnet').default(false).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const companies = pgTable('companies', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  image: text('image'),
  description: text('description'),
  website: text('website'),
  twitter: text('twitter'),
  github: text('github'),
  farcaster: text('farcaster'),
  address: text('address'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const events = pgTable(
  'events',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    image: text('image'),
    description: text('description'),
    link: text('link'),
    location: text('location'),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    groupPuzzles: boolean('group_puzzles').notNull().default(false),
    isTestnet: boolean('is_testnet').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (event) => [uniqueIndex('events_slug_is_testnet_unique').on(event.slug, event.isTestnet)],
);

// -----------------------------------------------------------------------------
// Golf
// -----------------------------------------------------------------------------

export const golfCourses = pgTable(
  'golf_courses',
  {
    // On-chain identifier
    id: integer('id').notNull(),
    chainId: integer('chain_id').notNull(),
    address: text('address'),
    curtaGolfAddress: text('curta_golf_address'),
    // Metadata
    name: text('name'),
    description: text('description'),
    allowedOpcodes: text('allowed_opcodes'),
    bytecode: text('bytecode'),
    solidity: text('solidity'),
    huff: text('huff'),
    github: text('github'),
    // Leader information
    leaderAddress: text('leader_address'),
    leaderBlock: integer('leader_block'),
    leaderGas: integer('leader_gas'),
    leaderTimestamp: integer('leader_timestamp'),
    leaderTx: text('leader_tx'),
    // Added information
    addedBlock: integer('added_block'),
    addedTimestamp: integer('added_timestamp'),
    addedTx: text('added_tx'),
    // Miscellaneous
    disabled: boolean('disabled').notNull().default(false),
    eventId: text('event_id'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (course) => [
    primaryKey({ columns: [course.id, course.chainId] }),
    index('golf_courses_leader_address_idx').on(course.leaderAddress),
    index('golf_courses_chain_id_idx').on(course.chainId),
    index('golf_courses_event_id_idx').on(course.eventId),
  ],
);

export const golfCourseCommits = pgTable(
  'golf_course_commits',
  {
    chainId: integer('chain_id').notNull(),
    key: text('key').notNull(),
    userAddress: text('user_address').notNull(),
    commitBlock: integer('commit_block').notNull(),
    commitTimestamp: integer('commit_timestamp').notNull(),
    commitTx: text('commit_tx').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (commit) => [
    primaryKey({ columns: [commit.chainId, commit.key] }),
    index('golf_course_commits_user_address_idx').on(commit.userAddress),
    index('golf_course_commits_commit_block_idx').on(commit.commitBlock),
    index('golf_course_commits_chain_id_idx').on(commit.chainId),
  ],
);

export const golfCourseSolves = pgTable(
  'golf_course_solves',
  {
    // On-chain identifier
    courseId: integer('course_id').notNull(),
    chainId: integer('chain_id').notNull(),
    solverAddress: text('solver_address').notNull(),
    submitTx: text('submit_tx').notNull(),
    // Submission information
    gasUsed: integer('gas_used').notNull(),
    solution: text('solution').notNull(),
    submitBlock: integer('submit_block').notNull(),
    submitTimestamp: integer('submit_timestamp').notNull(),
    // Metadata
    target: text('target').notNull(),
    isRecord: boolean('is_record').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (solve) => [
    primaryKey({ columns: [solve.courseId, solve.chainId, solve.solverAddress, solve.submitTx] }),
    index('golf_course_solves_course_id_chain_id_idx').on(solve.courseId, solve.chainId),
    index('golf_course_solves_chain_id_idx').on(solve.chainId),
    index('golf_course_solves_solver_address_idx').on(solve.solverAddress),
  ],
);

// -----------------------------------------------------------------------------
// Puzzles
// -----------------------------------------------------------------------------

export const puzzles = pgTable(
  'puzzles',
  {
    // On-chain identifier
    id: integer('id').notNull(),
    chainId: integer('chain_id').notNull(),
    address: text('address').notNull(),
    // Author
    authorAddress: text('author_address').notNull(),
    // Metadata
    name: text('name').notNull(),
    bytecode: text('bytecode').notNull(),
    solidity: text('solidity'),
    huff: text('huff'),
    // Added information
    addedBlock: integer('added_block').notNull(),
    addedTimestamp: integer('added_timestamp').notNull(),
    addedTx: text('added_tx').notNull(),
    // First solve information
    firstSolverAddress: text('first_solver_address'),
    firstSolveBlock: integer('first_solve_block'),
    firstSolveTimestamp: integer('first_solve_timestamp'),
    firstSolveTx: text('first_solve_tx'),
    // Solution
    solutionLink: text('solution_link'),
    github: text('github'),
    // Miscellaneous
    disabled: boolean('disabled').notNull().default(false),
    eventId: text('event_id'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (puzzle) => [
    primaryKey({ columns: [puzzle.id, puzzle.chainId] }),
    index('puzzles_author_address_idx').on(puzzle.authorAddress),
    index('puzzles_first_solver_address_idx').on(puzzle.firstSolverAddress),
    index('puzzles_chain_id_idx').on(puzzle.chainId),
    index('puzzles_event_id_idx').on(puzzle.eventId),
  ],
);

export const puzzleSolves = pgTable(
  'puzzle_solves',
  {
    // On-chain identifier
    puzzleId: integer('puzzle_id').notNull(),
    chainId: integer('chain_id').notNull(),
    solverAddress: text('solver_address').notNull(),
    // Solve information
    rank: integer('rank'),
    phase: integer('phase'),
    solution: text('solution'),
    solveBlock: integer('solve_block'),
    solveTimestamp: integer('solve_timestamp'),
    solveTx: text('solve_tx'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (solve) => [
    primaryKey({ columns: [solve.puzzleId, solve.chainId, solve.solverAddress] }),
    index('puzzle_solves_puzzle_id_chain_id_idx').on(solve.puzzleId, solve.chainId),
    index('puzzle_solves_chain_id_idx').on(solve.chainId),
    index('puzzle_solves_solver_address_idx').on(solve.solverAddress),
  ],
);

// -----------------------------------------------------------------------------
// Teams
// -----------------------------------------------------------------------------

export const teams = pgTable(
  'teams',
  {
    // On-chain identifier
    id: integer('team_id').notNull(),
    chainId: integer('chain_id').notNull(),
    // Metadata
    leaderAddress: text('leader_address').notNull(),
    name: text('name'),
    image: text('image'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (team) => [
    primaryKey({ columns: [team.id, team.chainId] }),
    index('teams_chain_id_idx').on(team.chainId),
    index('teams_leader_address_idx').on(team.leaderAddress),
  ],
);

export const teamMemberApprovals = pgTable(
  'team_member_approvals',
  {
    teamId: integer('team_id').notNull(),
    chainId: integer('chain_id').notNull(),
    userAddress: text('user_address').notNull(),
    approved: boolean('approved').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (approval) => [
    primaryKey({ columns: [approval.teamId, approval.chainId, approval.userAddress] }),
    index('team_member_approvals_chain_id_idx').on(approval.chainId),
    index('team_member_approvals_team_id_chain_id_idx').on(approval.teamId, approval.chainId),
    index('team_member_approvals_user_address_idx').on(approval.userAddress),
  ],
);

export const teamTransfers = pgTable(
  'team_transfers',
  {
    id: text('id').primaryKey(),
    userAddress: text('user_address').notNull(),
    chainId: integer('chain_id').notNull(),
    fromTeamId: integer('from_team_id'),
    toTeamId: integer('to_team_id').notNull(),
    block: integer('block').notNull(),
    timestamp: integer('timestamp').notNull(),
    tx: text('tx').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (transfer) => [
    index('team_transfers_chain_id_idx').on(transfer.chainId),
    index('team_transfers_user_address_idx').on(transfer.userAddress),
    index('team_transfers_from_team_id_chain_id_idx').on(transfer.fromTeamId, transfer.chainId),
    index('team_transfers_to_team_id_chain_id_idx').on(transfer.toTeamId, transfer.chainId),
  ],
);

// -----------------------------------------------------------------------------
// Relations
// -----------------------------------------------------------------------------

export const userInfoRelations = relations(userInfo, ({ many }) => ({
  authoredPuzzles: many(puzzles),
  firstSolvePuzzles: many(puzzles),
  puzzleSolves: many(puzzleSolves),
  leadingTeams: many(teams),
  teamTransfers: many(teamTransfers),
  teamApprovals: many(teamMemberApprovals),
  leadingGolfCourses: many(golfCourses),
  golfCommits: many(golfCourseCommits),
  golfSolves: many(golfCourseSolves),
}));

export const chainsRelations = relations(chains, ({ many }) => ({
  puzzles: many(puzzles),
  puzzleSolves: many(puzzleSolves),
  golfCourses: many(golfCourses),
  teams: many(teams),
  teamMemberApprovals: many(teamMemberApprovals),
  teamTransfers: many(teamTransfers),
  golfCommits: many(golfCourseCommits),
  golfSolves: many(golfCourseSolves),
}));

export const eventsRelations = relations(events, ({ many }) => ({
  puzzles: many(puzzles),
  golfCourses: many(golfCourses),
}));

export const golfCoursesRelations = relations(golfCourses, ({ one, many }) => ({
  leader: one(userInfo, {
    fields: [golfCourses.leaderAddress],
    references: [userInfo.address],
  }),
  chain: one(chains, {
    fields: [golfCourses.chainId],
    references: [chains.id],
  }),
  event: one(events, {
    fields: [golfCourses.eventId],
    references: [events.id],
  }),
  solves: many(golfCourseSolves),
}));

export const golfCourseCommitsRelations = relations(golfCourseCommits, ({ one }) => ({
  chain: one(chains, {
    fields: [golfCourseCommits.chainId],
    references: [chains.id],
  }),
  user: one(userInfo, {
    fields: [golfCourseCommits.userAddress],
    references: [userInfo.address],
  }),
}));

export const golfCourseSolvesRelations = relations(golfCourseSolves, ({ one }) => ({
  course: one(golfCourses, {
    fields: [golfCourseSolves.courseId, golfCourseSolves.chainId],
    references: [golfCourses.id, golfCourses.chainId],
  }),
  chain: one(chains, {
    fields: [golfCourseSolves.chainId],
    references: [chains.id],
  }),
  solver: one(userInfo, {
    fields: [golfCourseSolves.solverAddress],
    references: [userInfo.address],
  }),
}));

export const puzzlesRelations = relations(puzzles, ({ one, many }) => ({
  author: one(userInfo, {
    fields: [puzzles.authorAddress],
    references: [userInfo.address],
  }),
  firstSolver: one(userInfo, {
    fields: [puzzles.firstSolverAddress],
    references: [userInfo.address],
  }),
  chain: one(chains, {
    fields: [puzzles.chainId],
    references: [chains.id],
  }),
  event: one(events, {
    fields: [puzzles.eventId],
    references: [events.id],
  }),
  solves: many(puzzleSolves),
}));

export const puzzleSolvesRelations = relations(puzzleSolves, ({ one }) => ({
  puzzle: one(puzzles, {
    fields: [puzzleSolves.puzzleId, puzzleSolves.chainId],
    references: [puzzles.id, puzzles.chainId],
  }),
  chain: one(chains, {
    fields: [puzzleSolves.chainId],
    references: [chains.id],
  }),
  solver: one(userInfo, {
    fields: [puzzleSolves.solverAddress],
    references: [userInfo.address],
  }),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
  chain: one(chains, {
    fields: [teams.chainId],
    references: [chains.id],
  }),
  leader: one(userInfo, {
    fields: [teams.leaderAddress],
    references: [userInfo.address],
  }),
  fromTransfers: many(teamTransfers, { relationName: 'team_transfers_from' }),
  toTransfers: many(teamTransfers, { relationName: 'team_transfers_to' }),
  memberApprovals: many(teamMemberApprovals),
}));

export const teamMemberApprovalsRelations = relations(teamMemberApprovals, ({ one }) => ({
  chain: one(chains, {
    fields: [teamMemberApprovals.chainId],
    references: [chains.id],
  }),
  team: one(teams, {
    fields: [teamMemberApprovals.teamId, teamMemberApprovals.chainId],
    references: [teams.id, teams.chainId],
  }),
  user: one(userInfo, {
    fields: [teamMemberApprovals.userAddress],
    references: [userInfo.address],
  }),
}));

export const teamTransfersRelations = relations(teamTransfers, ({ one }) => ({
  chain: one(chains, {
    fields: [teamTransfers.chainId],
    references: [chains.id],
  }),
  user: one(userInfo, {
    fields: [teamTransfers.userAddress],
    references: [userInfo.address],
  }),
  from: one(teams, {
    fields: [teamTransfers.fromTeamId, teamTransfers.chainId],
    references: [teams.id, teams.chainId],
    relationName: 'team_transfers_from',
  }),
  to: one(teams, {
    fields: [teamTransfers.toTeamId, teamTransfers.chainId],
    references: [teams.id, teams.chainId],
    relationName: 'team_transfers_to',
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  info: one(userInfo),
  accounts: many(accounts),
  sessions: many(sessions),
  authoredPuzzles: many(puzzles),
  firstSolvePuzzles: many(puzzles),
  puzzleSolves: many(puzzleSolves),
  leadingTeams: many(teams),
  teamTransfers: many(teamTransfers),
  teamApprovals: many(teamMemberApprovals),
  leadingGolfCourses: many(golfCourses),
  golfCommits: many(golfCourseCommits),
  golfSolves: many(golfCourseSolves),
}));

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type User = typeof users.$inferSelect;
export type UserInfo = typeof userInfo.$inferSelect;
export type Chain = typeof chains.$inferSelect;
export type Event = typeof events.$inferSelect;
export type GolfCourse = typeof golfCourses.$inferSelect;
export type GolfCourseCommit = typeof golfCourseCommits.$inferSelect;
export type GolfCourseSolve = typeof golfCourseSolves.$inferSelect;
export type Puzzle = typeof puzzles.$inferSelect;
export type PuzzleSolve = typeof puzzleSolves.$inferSelect;
export type Team = typeof teams.$inferSelect;
export type TeamMemberApproval = typeof teamMemberApprovals.$inferSelect;
export type TeamTransfer = typeof teamTransfers.$inferSelect;
