/* eslint-disable @typescript-eslint/no-var-requires */
const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');
const { chains: chainsTable } = require('./schema');
const { chains } = require('./data');

// Load environment variables
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------

const ADD_CHAINS = false;

const load = async () => {
  // ---------------------------------------------------------------------------
  // Chains
  // ---------------------------------------------------------------------------

  if (ADD_CHAINS) {
    console.log('Seeding chains...');
    try {
      await db.insert(chainsTable).values(chains);
      console.log(`Successfully inserted ${chains.length} chains`);
    } catch (error) {
      console.error('Error inserting chains:', error);
      // If chains already exist, you might want to handle this gracefully
      if (error.code === '23505') {
        // Unique violation
        console.log('Chains already exist, skipping...');
      } else {
        throw error;
      }
    }
  }

  console.log('Seeding completed');
  process.exit(0);
};

load().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
