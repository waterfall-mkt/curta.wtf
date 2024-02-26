'use server';

import { unstable_cache } from 'next/cache';

import { db } from '@/lib/db';

/**
 * Fetches and returns all Puzzle authors from all chains from the database.
 */
const fetchAuthors = async () => {
  return await unstable_cache(
    async () => await db.userInfo.findMany({ where: { isPuzzleAuthor: true } }),
    ['authors'],
    { tags: ['authors', 'puzzles'], revalidate: 3600 },
  )();
};

export default fetchAuthors;
