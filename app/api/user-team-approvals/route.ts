import { type NextRequest, NextResponse } from 'next/server';

import supabase from '@/lib/services/supabase';
import type { DbTeamMemberApproval } from '@/lib/types/api';

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: { message: 'Missing `address`.' } }, { status: 400 });
  }

  const addressNormalized = address?.toLowerCase() ?? '';

  // Fetch user's team.
  const { data, status, error } = await supabase
    .from('team_member_approvals')
    .select('*')
    .eq('member', addressNormalized)
    .eq('approved', true)
    .returns<DbTeamMemberApproval[]>();

  if (error && status !== 406) {
    return NextResponse.json({ message: 'User not on a team.' }, { status: 404 });
  }

  const approvals: DbTeamMemberApproval[] = data ?? [];

  return NextResponse.json(approvals, { status });
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 60;
