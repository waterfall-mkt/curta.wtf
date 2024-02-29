import { type NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== process.env.CURTA_SITE_API_KEY) {
    return NextResponse.json({ error: { message: 'Unauthorized.' } }, { status: 401 });
  }

  const [authors, puzzles, solves, solversArr] = await Promise.all([
    db.userInfo.count({ where: { isPuzzleAuthor: true } }),
    db.puzzle.count(),
    db.puzzleSolve.count(),
    db.$queryRaw`SELECT COUNT(DISTINCT solver_address) FROM puzzle_solves` as Promise<
      { 'count(distinct solver_address)': bigint }[]
    >,
  ]);
  const solvers = solversArr[0]['count(distinct solver_address)'];

  return NextResponse.json({ authors, puzzles, solves, solvers });
}
