import { type NextRequest, NextResponse } from 'next/server';

import type { User, UserInfo } from '@prisma/client';

import { db } from '@/lib/db';

export type UserApiValue = User & {
  info: UserInfo | null;
  _count: { puzzleSolves: number };
};

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('address');
  const username = req.nextUrl.searchParams.get('username');

  if (!address && !username) {
    return NextResponse.json(
      { error: { message: 'Missing `address` or `username`.' } },
      { status: 400 },
    );
  }

  const addressNormalized = address?.toLowerCase() ?? '';
  const usernameNormalized = username?.toLowerCase() ?? '';

  const user = await db.user.findFirst({
    where: {
      info: {
        OR: [{ address: addressNormalized }, { username: usernameNormalized }],
      },
    },
    include: {
      info: true,
      _count: {
        select: { puzzleSolves: true },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ message: 'User not found.' }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 60;
