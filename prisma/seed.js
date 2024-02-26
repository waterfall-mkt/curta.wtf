/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');
const { chains } = require('./data');

const prisma = new PrismaClient();

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------

const ADD_CHAINS = true;

const load = async () => {
  // ---------------------------------------------------------------------------
  // Chains
  // ---------------------------------------------------------------------------

  if (ADD_CHAINS) {
    await prisma.chain.createMany({ data: chains });
  }
};

load();
