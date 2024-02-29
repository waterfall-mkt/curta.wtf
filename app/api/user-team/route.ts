import { type NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: { message: 'Missing `address`.' } }, { status: 400 });
  }

  const addressNormalized = address?.toLowerCase() ?? '';

  // Fetch user w/ teams.
  const user = await db.user.findFirst({
    where: { address: addressNormalized },
    include: {
      teamTransfers: {
        // Read from `TeamRegistry` on Base Sepolia if testnet; Base otherwise.
        where: { chainId: process.env.NEXT_PUBLIC_IS_TESTNET ? 84532 : 8453 },
        include: { to: true },
        orderBy: { timestamp: 'desc' },
      },
    },
  });

  if (!user || user.teamTransfers.length === 0 || user.teamTransfers[0].toTeamId === 0) {
    return NextResponse.json({ message: 'User not on a team.' }, { status: 404 });
  }

  return NextResponse.json(user.teamTransfers[0].to, { status: 200 });
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 60;
