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
  varchar,
} from 'drizzle-orm/pg-core';

// -----------------------------------------------------------------------------
// Enums
// -----------------------------------------------------------------------------

export const roleEnum = pgEnum('role', ['ADMIN', 'MODERATOR', 'USER']);

// -----------------------------------------------------------------------------
// User profile
// -----------------------------------------------------------------------------

export const userInfo = pgTable(
  'user_info',
  {
    address: varchar('address', { length: 255 }).primaryKey(),
    username: varchar('username', { length: 255 }).unique().notNull().default(generateCuid()),
    displayName: varchar('display_name', { length: 255 }),
    bio: text('bio'),
    image: varchar('image', { length: 255 }),
    twitter: varchar('twitter', { length: 255 }),
    github: varchar('github', { length: 255 }),
    farcaster: varchar('farcaster', { length: 255 }),
    website: varchar('website', { length: 255 }),
    isPuzzleAuthor: boolean('is_puzzle_author').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    addressIdx: index('user_info_address_idx').on(table.address),
  }),
);

// -----------------------------------------------------------------------------
// General
// -----------------------------------------------------------------------------

export const chains = pgTable('chains', {
  id: integer('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  isTestnet: boolean('is_testnet').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const companies = pgTable('companies', {
  id: varchar('id', { length: 255 }).primaryKey().default(generateCuid()),
  name: varchar('name', { length: 255 }).notNull(),
  image: varchar('image', { length: 255 }),
  description: text('description'),
  website: varchar('website', { length: 255 }),
  twitter: varchar('twitter', { length: 255 }),
  github: varchar('github', { length: 255 }),
  farcaster: varchar('farcaster', { length: 255 }),
  address: varchar('address', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const events = pgTable(
  'events',
  {
    id: varchar('id', { length: 255 }).primaryKey().default(generateCuid()),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull(),
    image: varchar('image', { length: 255 }),
    description: text('description'),
    link: varchar('link', { length: 255 }),
    location: varchar('location', { length: 255 }),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    groupPuzzles: boolean('group_puzzles').default(false).notNull(),
    isTestnet: boolean('is_testnet').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    slugTestnetUnique: uniqueIndex('events_slug_is_testnet_unique').on(table.slug, table.isTestnet),
  }),
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
    address: varchar('address', { length: 255 }),
    curtaGolfAddress: varchar('curta_golf_address', { length: 255 }),
    // Metadata
    name: varchar('name', { length: 255 }),
    description: text('description'),
    allowedOpcodes: varchar('allowed_opcodes', { length: 255 }),
    bytecode: text('bytecode'),
    solidity: text('solidity'),
    huff: text('huff'),
    github: varchar('github', { length: 255 }),
    // Leader information
    leaderAddress: varchar('leader_address', { length: 255 }),
    leaderBlock: integer('leader_block'),
    leaderGas: integer('leader_gas'),
    leaderTimestamp: integer('leader_timestamp'),
    leaderTx: varchar('leader_tx', { length: 255 }),
    // Added information
    addedBlock: integer('added_block'),
    addedTimestamp: integer('added_timestamp'),
    addedTx: varchar('added_tx', { length: 255 }),
    // Miscellaneous
    disabled: boolean('disabled').default(false).notNull(),
    eventId: varchar('event_id', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id, table.chainId] }),
    leaderAddressIdx: index('golf_courses_leader_address_idx').on(table.leaderAddress),
    chainIdIdx: index('golf_courses_chain_id_idx').on(table.chainId),
    eventIdIdx: index('golf_courses_event_id_idx').on(table.eventId),
  }),
);

export const golfCourseCommits = pgTable(
  'golf_course_commits',
  {
    chainId: integer('chain_id').notNull(),
    key: varchar('key', { length: 255 }).notNull(),
    userAddress: varchar('user_address', { length: 255 }).notNull(),
    commitBlock: integer('commit_block').notNull(),
    commitTimestamp: integer('commit_timestamp').notNull(),
    commitTx: varchar('commit_tx', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.chainId, table.key] }),
    userAddressIdx: index('golf_course_commits_user_address_idx').on(table.userAddress),
    commitBlockIdx: index('golf_course_commits_commit_block_idx').on(table.commitBlock),
    chainIdIdx: index('golf_course_commits_chain_id_idx').on(table.chainId),
  }),
);

export const golfCourseSolves = pgTable(
  'golf_course_solves',
  {
    // On-chain identifier
    courseId: integer('course_id').notNull(),
    chainId: integer('chain_id').notNull(),
    solverAddress: varchar('solver_address', { length: 255 }).notNull(),
    submitTx: varchar('submit_tx', { length: 255 }).notNull(),
    // Submission information
    gasUsed: integer('gas_used').notNull(),
    solution: text('solution').notNull(),
    submitBlock: integer('submit_block').notNull(),
    submitTimestamp: integer('submit_timestamp').notNull(),
    // Metadata
    target: varchar('target', { length: 255 }).notNull(),
    isRecord: boolean('is_record').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.courseId, table.chainId, table.solverAddress, table.submitTx],
    }),
    courseIdChainIdIdx: index('golf_course_solves_course_id_chain_id_idx').on(
      table.courseId,
      table.chainId,
    ),
    chainIdIdx: index('golf_course_solves_chain_id_idx').on(table.chainId),
    solverAddressIdx: index('golf_course_solves_solver_address_idx').on(table.solverAddress),
  }),
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
    address: varchar('address', { length: 255 }).notNull(),
    // Author
    authorAddress: varchar('author_address', { length: 255 }).notNull(),
    // Metadata
    name: varchar('name', { length: 255 }).notNull(),
    bytecode: text('bytecode').notNull(),
    solidity: text('solidity'),
    huff: text('huff'),
    // Added information
    addedBlock: integer('added_block').notNull(),
    addedTimestamp: integer('added_timestamp').notNull(),
    addedTx: varchar('added_tx', { length: 255 }).notNull(),
    // First solve information
    firstSolverAddress: varchar('first_solver_address', { length: 255 }),
    firstSolveBlock: integer('first_solve_block'),
    firstSolveTimestamp: integer('first_solve_timestamp'),
    firstSolveTx: varchar('first_solve_tx', { length: 255 }),
    // Solution
    solutionLink: varchar('solution_link', { length: 255 }),
    github: varchar('github', { length: 255 }),
    // Miscellaneous
    disabled: boolean('disabled').default(false).notNull(),
    eventId: varchar('event_id', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id, table.chainId] }),
    authorAddressIdx: index('puzzles_author_address_idx').on(table.authorAddress),
    firstSolverAddressIdx: index('puzzles_first_solver_address_idx').on(table.firstSolverAddress),
    chainIdIdx: index('puzzles_chain_id_idx').on(table.chainId),
    eventIdIdx: index('puzzles_event_id_idx').on(table.eventId),
  }),
);

export const puzzleSolves = pgTable(
  'puzzle_solves',
  {
    // On-chain identifier
    puzzleId: integer('puzzle_id').notNull(),
    chainId: integer('chain_id').notNull(),
    solverAddress: varchar('solver_address', { length: 255 }).notNull(),
    // Solve information
    rank: integer('rank'),
    phase: integer('phase'),
    solution: varchar('solution', { length: 255 }),
    solveBlock: integer('solve_block'),
    solveTimestamp: integer('solve_timestamp'),
    solveTx: varchar('solve_tx', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.puzzleId, table.chainId, table.solverAddress] }),
    puzzleIdChainIdIdx: index('puzzle_solves_puzzle_id_chain_id_idx').on(
      table.puzzleId,
      table.chainId,
    ),
    chainIdIdx: index('puzzle_solves_chain_id_idx').on(table.chainId),
    solverAddressIdx: index('puzzle_solves_solver_address_idx').on(table.solverAddress),
  }),
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
    leaderAddress: varchar('leader_address', { length: 255 }).notNull(),
    name: varchar('name', { length: 255 }),
    image: varchar('image', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id, table.chainId] }),
    chainIdIdx: index('teams_chain_id_idx').on(table.chainId),
    leaderAddressIdx: index('teams_leader_address_idx').on(table.leaderAddress),
  }),
);

export const teamMemberApprovals = pgTable(
  'team_member_approvals',
  {
    teamId: integer('team_id').notNull(),
    chainId: integer('chain_id').notNull(),
    userAddress: varchar('user_address', { length: 255 }).notNull(),
    approved: boolean('approved').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.teamId, table.chainId, table.userAddress] }),
    chainIdIdx: index('team_member_approvals_chain_id_idx').on(table.chainId),
    teamIdChainIdIdx: index('team_member_approvals_team_id_chain_id_idx').on(
      table.teamId,
      table.chainId,
    ),
    userAddressIdx: index('team_member_approvals_user_address_idx').on(table.userAddress),
  }),
);

export const teamTransfers = pgTable(
  'team_transfers',
  {
    id: varchar('id', { length: 255 }).primaryKey().default(generateCuid()),
    userAddress: varchar('user_address', { length: 255 }).notNull(),
    chainId: integer('chain_id').notNull(),
    fromTeamId: integer('from_team_id'),
    toTeamId: integer('to_team_id').notNull(),
    block: integer('block').notNull(),
    timestamp: integer('timestamp').notNull(),
    tx: varchar('tx', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    chainIdIdx: index('team_transfers_chain_id_idx').on(table.chainId),
    userAddressIdx: index('team_transfers_user_address_idx').on(table.userAddress),
    fromTeamIdChainIdIdx: index('team_transfers_from_team_id_chain_id_idx').on(
      table.fromTeamId,
      table.chainId,
    ),
    toTeamIdChainIdIdx: index('team_transfers_to_team_id_chain_id_idx').on(
      table.toTeamId,
      table.chainId,
    ),
  }),
);

// -----------------------------------------------------------------------------
// Authentication (auth.js)
// -----------------------------------------------------------------------------

export const accounts = pgTable(
  'accounts',
  {
    id: varchar('id', { length: 255 }).primaryKey().default(generateCuid()),
    userId: varchar('user_id', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 }).notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
  },
  (table) => ({
    userIdIdx: index('accounts_user_id_idx').on(table.userId),
    providerProviderAccountIdUnique: uniqueIndex('accounts_provider_provider_account_id_unique').on(
      table.provider,
      table.providerAccountId,
    ),
  }),
);

export const sessions = pgTable(
  'sessions',
  {
    id: varchar('id', { length: 255 }).primaryKey().default(generateCuid()),
    sessionToken: varchar('session_token', { length: 255 }).unique().notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    expires: timestamp('expires').notNull(),
  },
  (table) => ({
    userIdIdx: index('sessions_user_id_idx').on(table.userId),
  }),
);

export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey().default(generateCuid()),
  name: varchar('name', { length: 255 }),
  address: varchar('address', { length: 255 }).unique().notNull(),
  email: varchar('email', { length: 255 }).unique(),
  emailVerified: timestamp('email_verified'),
  image: varchar('image', { length: 255 }),
  role: roleEnum('role').default('USER').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const verificationTokens = pgTable(
  'verification_tokens',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).unique().notNull(),
    expires: timestamp('expires').notNull(),
  },
  (table) => ({
    identifierTokenUnique: uniqueIndex('verification_tokens_identifier_token_unique').on(
      table.identifier,
      table.token,
    ),
  }),
);

// -----------------------------------------------------------------------------
// Relations
// -----------------------------------------------------------------------------

export const userInfoRelations = relations(userInfo, ({ one }) => ({
  user: one(users, {
    fields: [userInfo.address],
    references: [users.address],
  }),
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
  leader: one(users, {
    fields: [golfCourses.leaderAddress],
    references: [users.address],
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
  user: one(users, {
    fields: [golfCourseCommits.userAddress],
    references: [users.address],
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
  solver: one(users, {
    fields: [golfCourseSolves.solverAddress],
    references: [users.address],
  }),
}));

export const puzzlesRelations = relations(puzzles, ({ one, many }) => ({
  author: one(users, {
    fields: [puzzles.authorAddress],
    references: [users.address],
  }),
  firstSolver: one(users, {
    fields: [puzzles.firstSolverAddress],
    references: [users.address],
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
  solver: one(users, {
    fields: [puzzleSolves.solverAddress],
    references: [users.address],
  }),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
  chain: one(chains, {
    fields: [teams.chainId],
    references: [chains.id],
  }),
  leader: one(users, {
    fields: [teams.leaderAddress],
    references: [users.address],
  }),
  fromTransfers: many(teamTransfers, { relationName: 'team_tranfers_from' }),
  toTransfers: many(teamTransfers, { relationName: 'team_tranfers_to' }),
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
  user: one(users, {
    fields: [teamMemberApprovals.userAddress],
    references: [users.address],
  }),
}));

export const teamTransfersRelations = relations(teamTransfers, ({ one }) => ({
  chain: one(chains, {
    fields: [teamTransfers.chainId],
    references: [chains.id],
  }),
  user: one(users, {
    fields: [teamTransfers.userAddress],
    references: [users.address],
  }),
  from: one(teams, {
    fields: [teamTransfers.fromTeamId, teamTransfers.chainId],
    references: [teams.id, teams.chainId],
    relationName: 'team_tranfers_from',
  }),
  to: one(teams, {
    fields: [teamTransfers.toTeamId, teamTransfers.chainId],
    references: [teams.id, teams.chainId],
    relationName: 'team_tranfers_to',
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

// Helper function to generate cuid
function generateCuid(): string {
  // This is a placeholder - in production, use a proper cuid library like @paralleldrive/cuid2
  return `cuid_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}
