CREATE TYPE "public"."role" AS ENUM('ADMIN', 'MODERATOR', 'USER');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" varchar(255) PRIMARY KEY DEFAULT 'cuid_1758298956872_ybpibzufi' NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "chains" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"is_testnet" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" varchar(255) PRIMARY KEY DEFAULT 'cuid_1758298956872_w25fggt1t' NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" varchar(255),
	"description" text,
	"website" varchar(255),
	"twitter" varchar(255),
	"github" varchar(255),
	"farcaster" varchar(255),
	"address" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" varchar(255) PRIMARY KEY DEFAULT 'cuid_1758298956872_efovdrso3' NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"image" varchar(255),
	"description" text,
	"link" varchar(255),
	"location" varchar(255),
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"group_puzzles" boolean DEFAULT false NOT NULL,
	"is_testnet" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "golf_course_commits" (
	"chain_id" integer NOT NULL,
	"key" varchar(255) NOT NULL,
	"user_address" varchar(255) NOT NULL,
	"commit_block" integer NOT NULL,
	"commit_timestamp" integer NOT NULL,
	"commit_tx" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "golf_course_commits_chain_id_key_pk" PRIMARY KEY("chain_id","key")
);
--> statement-breakpoint
CREATE TABLE "golf_course_solves" (
	"course_id" integer NOT NULL,
	"chain_id" integer NOT NULL,
	"solver_address" varchar(255) NOT NULL,
	"submit_tx" varchar(255) NOT NULL,
	"gas_used" integer NOT NULL,
	"solution" text NOT NULL,
	"submit_block" integer NOT NULL,
	"submit_timestamp" integer NOT NULL,
	"target" varchar(255) NOT NULL,
	"is_record" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "golf_course_solves_course_id_chain_id_solver_address_submit_tx_pk" PRIMARY KEY("course_id","chain_id","solver_address","submit_tx")
);
--> statement-breakpoint
CREATE TABLE "golf_courses" (
	"id" integer NOT NULL,
	"chain_id" integer NOT NULL,
	"address" varchar(255),
	"curta_golf_address" varchar(255),
	"name" varchar(255),
	"description" text,
	"allowed_opcodes" varchar(255),
	"bytecode" text,
	"solidity" text,
	"huff" text,
	"github" varchar(255),
	"leader_address" varchar(255),
	"leader_block" integer,
	"leader_gas" integer,
	"leader_timestamp" integer,
	"leader_tx" varchar(255),
	"added_block" integer,
	"added_timestamp" integer,
	"added_tx" varchar(255),
	"disabled" boolean DEFAULT false NOT NULL,
	"event_id" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "golf_courses_id_chain_id_pk" PRIMARY KEY("id","chain_id")
);
--> statement-breakpoint
CREATE TABLE "puzzle_solves" (
	"puzzle_id" integer NOT NULL,
	"chain_id" integer NOT NULL,
	"solver_address" varchar(255) NOT NULL,
	"rank" integer,
	"phase" integer,
	"solution" varchar(255),
	"solve_block" integer,
	"solve_timestamp" integer,
	"solve_tx" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "puzzle_solves_puzzle_id_chain_id_solver_address_pk" PRIMARY KEY("puzzle_id","chain_id","solver_address")
);
--> statement-breakpoint
CREATE TABLE "puzzles" (
	"id" integer NOT NULL,
	"chain_id" integer NOT NULL,
	"address" varchar(255) NOT NULL,
	"author_address" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"bytecode" text NOT NULL,
	"solidity" text,
	"huff" text,
	"added_block" integer NOT NULL,
	"added_timestamp" integer NOT NULL,
	"added_tx" varchar(255) NOT NULL,
	"first_solver_address" varchar(255),
	"first_solve_block" integer,
	"first_solve_timestamp" integer,
	"first_solve_tx" varchar(255),
	"solution_link" varchar(255),
	"github" varchar(255),
	"disabled" boolean DEFAULT false NOT NULL,
	"event_id" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "puzzles_id_chain_id_pk" PRIMARY KEY("id","chain_id")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar(255) PRIMARY KEY DEFAULT 'cuid_1758298956873_enhz4utz0' NOT NULL,
	"session_token" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "sessions_session_token_unique" UNIQUE("session_token")
);
--> statement-breakpoint
CREATE TABLE "team_member_approvals" (
	"team_id" integer NOT NULL,
	"chain_id" integer NOT NULL,
	"user_address" varchar(255) NOT NULL,
	"approved" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "team_member_approvals_team_id_chain_id_user_address_pk" PRIMARY KEY("team_id","chain_id","user_address")
);
--> statement-breakpoint
CREATE TABLE "team_transfers" (
	"id" varchar(255) PRIMARY KEY DEFAULT 'cuid_1758298956872_re63rnayh' NOT NULL,
	"user_address" varchar(255) NOT NULL,
	"chain_id" integer NOT NULL,
	"from_team_id" integer,
	"to_team_id" integer NOT NULL,
	"block" integer NOT NULL,
	"timestamp" integer NOT NULL,
	"tx" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"team_id" integer NOT NULL,
	"chain_id" integer NOT NULL,
	"leader_address" varchar(255) NOT NULL,
	"name" varchar(255),
	"image" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "teams_team_id_chain_id_pk" PRIMARY KEY("team_id","chain_id")
);
--> statement-breakpoint
CREATE TABLE "user_info" (
	"address" varchar(255) PRIMARY KEY NOT NULL,
	"username" varchar(255) DEFAULT 'cuid_1758298956871_5qd7p6jyq' NOT NULL,
	"display_name" varchar(255),
	"bio" text,
	"image" varchar(255),
	"twitter" varchar(255),
	"github" varchar(255),
	"farcaster" varchar(255),
	"website" varchar(255),
	"is_puzzle_author" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_info_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY DEFAULT 'cuid_1758298956873_zvln1pesh' NOT NULL,
	"name" varchar(255),
	"address" varchar(255) NOT NULL,
	"email" varchar(255),
	"email_verified" timestamp,
	"image" varchar(255),
	"role" "role" DEFAULT 'USER' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_address_unique" UNIQUE("address"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification_tokens" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verification_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE INDEX "accounts_user_id_idx" ON "accounts" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_unique" ON "accounts" USING btree ("provider","provider_account_id");--> statement-breakpoint
CREATE UNIQUE INDEX "events_slug_is_testnet_unique" ON "events" USING btree ("slug","is_testnet");--> statement-breakpoint
CREATE INDEX "golf_course_commits_user_address_idx" ON "golf_course_commits" USING btree ("user_address");--> statement-breakpoint
CREATE INDEX "golf_course_commits_commit_block_idx" ON "golf_course_commits" USING btree ("commit_block");--> statement-breakpoint
CREATE INDEX "golf_course_commits_chain_id_idx" ON "golf_course_commits" USING btree ("chain_id");--> statement-breakpoint
CREATE INDEX "golf_course_solves_course_id_chain_id_idx" ON "golf_course_solves" USING btree ("course_id","chain_id");--> statement-breakpoint
CREATE INDEX "golf_course_solves_chain_id_idx" ON "golf_course_solves" USING btree ("chain_id");--> statement-breakpoint
CREATE INDEX "golf_course_solves_solver_address_idx" ON "golf_course_solves" USING btree ("solver_address");--> statement-breakpoint
CREATE INDEX "golf_courses_leader_address_idx" ON "golf_courses" USING btree ("leader_address");--> statement-breakpoint
CREATE INDEX "golf_courses_chain_id_idx" ON "golf_courses" USING btree ("chain_id");--> statement-breakpoint
CREATE INDEX "golf_courses_event_id_idx" ON "golf_courses" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "puzzle_solves_puzzle_id_chain_id_idx" ON "puzzle_solves" USING btree ("puzzle_id","chain_id");--> statement-breakpoint
CREATE INDEX "puzzle_solves_chain_id_idx" ON "puzzle_solves" USING btree ("chain_id");--> statement-breakpoint
CREATE INDEX "puzzle_solves_solver_address_idx" ON "puzzle_solves" USING btree ("solver_address");--> statement-breakpoint
CREATE INDEX "puzzles_author_address_idx" ON "puzzles" USING btree ("author_address");--> statement-breakpoint
CREATE INDEX "puzzles_first_solver_address_idx" ON "puzzles" USING btree ("first_solver_address");--> statement-breakpoint
CREATE INDEX "puzzles_chain_id_idx" ON "puzzles" USING btree ("chain_id");--> statement-breakpoint
CREATE INDEX "puzzles_event_id_idx" ON "puzzles" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "team_member_approvals_chain_id_idx" ON "team_member_approvals" USING btree ("chain_id");--> statement-breakpoint
CREATE INDEX "team_member_approvals_team_id_chain_id_idx" ON "team_member_approvals" USING btree ("team_id","chain_id");--> statement-breakpoint
CREATE INDEX "team_member_approvals_user_address_idx" ON "team_member_approvals" USING btree ("user_address");--> statement-breakpoint
CREATE INDEX "team_transfers_chain_id_idx" ON "team_transfers" USING btree ("chain_id");--> statement-breakpoint
CREATE INDEX "team_transfers_user_address_idx" ON "team_transfers" USING btree ("user_address");--> statement-breakpoint
CREATE INDEX "team_transfers_from_team_id_chain_id_idx" ON "team_transfers" USING btree ("from_team_id","chain_id");--> statement-breakpoint
CREATE INDEX "team_transfers_to_team_id_chain_id_idx" ON "team_transfers" USING btree ("to_team_id","chain_id");--> statement-breakpoint
CREATE INDEX "teams_chain_id_idx" ON "teams" USING btree ("chain_id");--> statement-breakpoint
CREATE INDEX "teams_leader_address_idx" ON "teams" USING btree ("leader_address");--> statement-breakpoint
CREATE INDEX "user_info_address_idx" ON "user_info" USING btree ("address");--> statement-breakpoint
CREATE UNIQUE INDEX "verification_tokens_identifier_token_unique" ON "verification_tokens" USING btree ("identifier","token");