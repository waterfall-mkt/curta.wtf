#!/usr/bin/env tsx

import { drizzle as drizzlePlanetScale } from 'drizzle-orm/planetscale-serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { Client } from '@planetscale/database';
import * as schema from '../lib/db/schema';
import 'dotenv/config';

// Initialize PlanetScale connection
const planetscaleUrl = process.env.PLANETSCALE_DATABASE_URL || process.env.OLD_DATABASE_URL;
if (!planetscaleUrl) {
  console.error('Error: PLANETSCALE_DATABASE_URL or OLD_DATABASE_URL environment variable is required');
  process.exit(1);
}

const planetscaleClient = new Client({
  url: planetscaleUrl,
});

const sourceDb = drizzlePlanetScale(planetscaleClient);

// Initialize Neon connection
const neonUrl = process.env.DATABASE_URL;
if (!neonUrl) {
  console.error('Error: DATABASE_URL environment variable is required for Neon');
  process.exit(1);
}

const neonClient = neon(neonUrl);
const targetDb = drizzleNeon(neonClient);

// Tables in order of dependencies (no foreign keys first, then dependent tables)
const tablesToMigrate = [
  // Independent tables first
  { name: 'users', table: schema.users },
  { name: 'chains', table: schema.chains },
  { name: 'companies', table: schema.companies },
  { name: 'events', table: schema.events },
  { name: 'user_info', table: schema.userInfo },
  { name: 'verifications', table: schema.verifications },
  
  // Tables with foreign keys
  { name: 'sessions', table: schema.sessions },
  { name: 'accounts', table: schema.accounts },
  { name: 'puzzles', table: schema.puzzles },
  { name: 'puzzle_solves', table: schema.puzzleSolves },
  { name: 'golf_courses', table: schema.golfCourses },
  { name: 'golf_course_commits', table: schema.golfCourseCommits },
  { name: 'golf_course_solves', table: schema.golfCourseSolves },
  { name: 'teams', table: schema.teams },
  { name: 'team_member_approvals', table: schema.teamMemberApprovals },
  { name: 'team_transfers', table: schema.teamTransfers },
];

async function migrateTable(tableName: string, tableSchema: any) {
  try {
    console.log(`\nMigrating ${tableName}...`);
    
    // Fetch all data from source
    const data = await sourceDb.select().from(tableSchema).execute();
    console.log(`  Found ${data.length} records in ${tableName}`);
    
    if (data.length === 0) {
      console.log(`  No data to migrate for ${tableName}`);
      return;
    }
    
    // Delete existing data in target (optional - remove if you want to append)
    await targetDb.delete(tableSchema).execute();
    console.log(`  Cleared existing data in target ${tableName}`);
    
    // Insert in batches to avoid hitting limits
    const batchSize = 1000;
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      await targetDb.insert(tableSchema).values(batch).execute();
      console.log(`  Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(data.length / batchSize)}`);
    }
    
    console.log(`✓ Successfully migrated ${data.length} records to ${tableName}`);
  } catch (error) {
    console.error(`✗ Error migrating ${tableName}:`, error);
    throw error;
  }
}

async function runMigration() {
  console.log('Starting migration from PlanetScale to Neon...\n');
  
  const planetscaleUrl = process.env.PLANETSCALE_DATABASE_URL || process.env.OLD_DATABASE_URL;
  const neonUrl = process.env.DATABASE_URL;
  
  if (!planetscaleUrl) {
    console.error('Error: PLANETSCALE_DATABASE_URL or OLD_DATABASE_URL environment variable is required');
    console.error('Please set one of these in your .env file with your PlanetScale connection string');
    process.exit(1);
  }
  
  if (!neonUrl) {
    console.error('Error: DATABASE_URL environment variable is required');
    console.error('Please set this in your .env file with your Neon connection string');
    process.exit(1);
  }
  
  // Log sanitized URLs for debugging
  console.log('Source DB (PlanetScale):', planetscaleUrl.substring(0, 20) + '...');
  console.log('Target DB (Neon):', neonUrl.substring(0, 20) + '...\n');
  
  try {
    // Migrate tables in order
    for (const { name, table } of tablesToMigrate) {
      await migrateTable(name, table);
    }
    
    console.log('\n✓ Migration completed successfully!');
  } catch (error) {
    console.error('\n✗ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
runMigration();