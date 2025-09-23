#!/usr/bin/env tsx

import { drizzle as drizzleMySQL } from 'drizzle-orm/mysql2';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import mysql from 'mysql2/promise';
import 'dotenv/config';

async function runMigration() {
  console.log('Starting flexible migration from PlanetScale to Neon...\n');
  
  const planetscaleUrl = process.env.PLANETSCALE_DATABASE_URL || process.env.OLD_DATABASE_URL;
  const neonUrl = process.env.DATABASE_URL;
  
  if (!planetscaleUrl || !neonUrl) {
    console.error('Missing required environment variables');
    process.exit(1);
  }
  
  console.log('Source DB (PlanetScale):', planetscaleUrl.substring(0, 30) + '...');
  console.log('Target DB (Neon):', neonUrl.substring(0, 30) + '...\n');
  
  try {
    // Create connections
    const mysqlConnection = await mysql.createConnection(planetscaleUrl);
    const sourceDb = drizzleMySQL(mysqlConnection);
    
    const neonClient = neon(neonUrl);
    const targetDb = drizzleNeon(neonClient);
    
    // Get list of tables from source database
    const [tables] = await mysqlConnection.query(
      'SHOW TABLES'
    ) as any[];
    
    const tableNames = tables.map((t: any) => Object.values(t)[0]) as string[];
    console.log('Found tables:', tableNames.join(', '), '\n');
    
    // Define migration order based on dependencies
    const orderedTables = [
      // Independent tables first
      'users', 'chains', 'companies', 'events', 'user_info', 'verifications',
      // Dependent tables
      'sessions', 'accounts', 'puzzles', 'puzzle_solves', 
      'golf_courses', 'golf_course_commits', 'golf_course_solves',
      'teams', 'team_member_approvals', 'team_transfers'
    ].filter(t => tableNames.includes(t));
    
    // Add any remaining tables not in our ordered list
    const remainingTables = tableNames.filter(t => !orderedTables.includes(t));
    const allTablesOrdered = [...orderedTables, ...remainingTables];
    
    for (const tableName of allTablesOrdered) {
      console.log(`\nMigrating ${tableName}...`);
      
      try {
        // Get column information
        const [columns] = await mysqlConnection.query(
          `SHOW COLUMNS FROM \`${tableName}\``
        ) as any[];
        
        const columnNames = columns.map((c: any) => c.Field);
        console.log(`  Columns: ${columnNames.join(', ')}`);
        
        // Select all data
        const [rows] = await mysqlConnection.query(
          `SELECT * FROM \`${tableName}\``
        ) as any[];
        
        console.log(`  Found ${rows.length} records`);
        
        if (rows.length === 0) {
          console.log(`  No data to migrate`);
          continue;
        }
        
        // Clear target table
        await targetDb.execute(`DELETE FROM "${tableName}"`);
        console.log(`  Cleared existing data in target`);
        
        // Insert data in batches
        const batchSize = 1000;
        for (let i = 0; i < rows.length; i += batchSize) {
          const batch = rows.slice(i, i + batchSize);
          
          // Build insert query
          if (batch.length > 0) {
            const columns = Object.keys(batch[0]).filter(col => batch[0][col] !== undefined);
            const placeholders = batch.map(() => 
              `(${columns.map(() => '$1').join(', ')})`
            ).join(', ');
            
            // Prepare values array
            const values: any[] = [];
            for (const row of batch) {
              for (const col of columns) {
                values.push(row[col]);
              }
            }
            
            // Build the query with proper parameterization
            const valuesList = batch.map((row, rowIndex) => {
              const rowValues = columns.map((col, colIndex) => {
                const paramIndex = rowIndex * columns.length + colIndex + 1;
                return `$${paramIndex}`;
              }).join(', ');
              return `(${rowValues})`;
            }).join(', ');
            
            const insertQuery = `
              INSERT INTO "${tableName}" (${columns.map(c => `"${c}"`).join(', ')})
              VALUES ${valuesList}
            `;
            
            await targetDb.execute({
              sql: insertQuery,
              params: values
            });
          }
          
          console.log(`  Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(rows.length / batchSize)}`);
        }
        
        console.log(`✓ Successfully migrated ${rows.length} records`);
      } catch (error: any) {
        console.error(`✗ Error migrating ${tableName}:`, error.message);
        
        // Try to provide helpful information about the error
        if (error.message.includes('column') && error.message.includes('does not exist')) {
          console.log(`  Note: Table structure might be different between source and target`);
          console.log(`  Consider updating your target schema or manually handling this table`);
        }
        
        // Continue with other tables instead of failing completely
        console.log(`  Skipping ${tableName} and continuing with other tables...`);
      }
    }
    
    await mysqlConnection.end();
    console.log('\n✓ Migration completed!');
    console.log('\nNote: Some tables may have been skipped due to schema differences.');
    console.log('Please review the output above and handle any failed tables manually.');
    
  } catch (error) {
    console.error('\n✗ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
runMigration();