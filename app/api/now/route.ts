import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ now: Date.now() }, { status: 200 });
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';
