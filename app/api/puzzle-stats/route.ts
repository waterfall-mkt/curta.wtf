import { type NextRequest, NextResponse } from 'next/server';

import { count, eq, sql } from 'drizzle-orm';

import { db } from '@/lib/db';
import { puzzleSolves, puzzles as puzzlesTable, userInfo } from '@/lib/db/schema';

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== process.env.CURTA_SITE_API_KEY) {
    return NextResponse.json({ error: { message: 'Unauthorized.' } }, { status: 401 });
  }

  const [[{ total: authors }], [{ total: puzzles }], [{ total: solves }], [{ total: solvers }]] =
    await Promise.all([
      db.select({ total: count() }).from(userInfo).where(eq(userInfo.isPuzzleAuthor, true)),
      db.select({ total: count() }).from(puzzlesTable),
      db.select({ total: count() }).from(puzzleSolves),
      db
        .select({ total: sql<number>`COUNT(DISTINCT ${puzzleSolves.solverAddress})` })
        .from(puzzleSolves),
    ]);

  return NextResponse.json({ authors, puzzles, solves, solvers });
}
