import { type NextRequest, NextResponse } from 'next/server';

import supabase from '@/lib/services/supabase';
import type { DbUser } from '@/lib/types/api';

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

  const { data, status, error } = await supabase
    .from('users')
    .select('*')
    .or(`address.eq.${addressNormalized},username.eq.${usernameNormalized}}`)
    .returns<DbUser[]>()
    .single();

  if ((error && status !== 406) || !data) {
    return NextResponse.json({ error }, { status });
  }

  return NextResponse.json({ data }, { status });
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const dynamic = 'force-dynamic';
