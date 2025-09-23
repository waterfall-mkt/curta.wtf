#!/usr/bin/env tsx

import { drizzle as drizzleMySQL } from 'drizzle-orm/mysql2';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import mysql from 'mysql2/promise';
import * as schema from '../lib/db/schema';
import 'dotenv/config';

async function runMigration() {
  console.log('Starting migration from PlanetScale to Neon...\n');
  
  const planetscaleUrl = process.env.PLANETSCALE_DATABASE_URL || process.env.OLD_DATABASE_URL;
  const neonUrl = process.env.DATABASE_URL;
  
  if (!planetscaleUrl) {
    console.error('Error: PLANETSCALE_DATABASE_URL or OLD_DATABASE_URL environment variable is required');
    console.error('\nExpected format for PlanetScale URL:');
    console.error('mysql://username:password@host/database?ssl={"rejectUnauthorized":true}');
    console.error('\nExample:');
    console.error('PLANETSCALE_DATABASE_URL="mysql://abcdef123456:pscale_pw_xxxxx@aws.connect.psdb.cloud/curta?ssl={"rejectUnauthorized":true}"');
    process.exit(1);
  }
  
  if (!neonUrl) {
    console.error('Error: DATABASE_URL environment variable is required');
    console.error('\nExpected format for Neon URL:');
    console.error('postgresql://username:password@host/database?sslmode=require');
    process.exit(1);
  }
  
  // Log sanitized URLs for debugging
  console.log('Source DB (PlanetScale):', planetscaleUrl.substring(0, 30) + '...');
  console.log('Target DB (Neon):', neonUrl.substring(0, 30) + '...\n');
  
  try {
    // Create MySQL connection
    const mysqlConnection = await mysql.createConnection(planetscaleUrl);
    const sourceDb = drizzleMySQL(mysqlConnection, { schema, mode: 'default' });
    
    // Initialize Neon connection
    const neonClient = neon(neonUrl);
    const targetDb = drizzleNeon(neonClient);
    
    // Tables in order of dependencies
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
    
    // Migrate each table
    for (const { name, table } of tablesToMigrate) {
      console.log(`\nMigrating ${name}...`);
      
      try {
        // Fetch all data from source
        const data = await sourceDb.select().from(table);
        console.log(`  Found ${data.length} records`);
        
        if (data.length === 0) {
          console.log(`  No data to migrate`);
          continue;
        }
        
        // Clear existing data in target
        await targetDb.delete(table);
        console.log(`  Cleared existing data in target`);
        
        // Insert in batches
        const batchSize = 1000;
        for (let i = 0; i < data.length; i += batchSize) {
          const batch = data.slice(i, i + batchSize);
          await targetDb.insert(table).values(batch);
          console.log(`  Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(data.length / batchSize)}`);
        }
        
        console.log(`✓ Successfully migrated ${data.length} records`);
      } catch (error) {
        console.error(`✗ Error migrating ${name}:`, error);
        throw error;
      }
    }
    
    await mysqlConnection.end();
    console.log('\n✓ Migration completed successfully!');
  } catch (error) {
    console.error('\n✗ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
runMigration();