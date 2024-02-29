'use server';

import { db } from '@/lib/db';

/**
 * Fetches and returns all events, sorted from earliest start date to latest
 * start date from the database.
 */
const fetchEvents = async () => {
  return await db.event.findMany({
    where: { isTestnet: Boolean(process.env.NEXT_PUBLIC_IS_TESTNET) },
    orderBy: { startDate: 'asc' },
  });
};

export default fetchEvents;
