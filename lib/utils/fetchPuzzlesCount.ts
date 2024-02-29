'use server';

import { db } from '@/lib/db';

const fetchPuzzlesCount = async () => {
  let lastUpdated: number;
  // We fetch this so the request gets cached.
  try {
    lastUpdated = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://curta.wtf'}/api/now`)
      .then((res) => res.json())
      .then((res) => res.now);
  } catch (err) {
    console.error(err);
    lastUpdated = Date.now();
  }

  // Fetch puzzles.
  const count = await db.puzzle.count({
    where: { chain: { isTestnet: Boolean(process.env.NEXT_PUBLIC_IS_TESTNET) } },
  });

  return { data: { count, lastUpdated }, status: 200 };
};

export default fetchPuzzlesCount;
