import { type NextRequest, NextResponse } from 'next/server';

import supabase from '@/lib/services/supabase';
import type { DbTeamMember } from '@/lib/types/api';
import type { Team } from '@/lib/types/protocol';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: { message: 'Missing `id`.' } }, { status: 400 });
  }

  const idNormalized = Number(id);

  if (Number.isNaN(idNormalized)) {
    return NextResponse.json({ error: { message: 'Invalid `id`.' } }, { status: 400 });
  }

  // Fetch team members.
  const { data, status, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('teamid', idNormalized)
    .returns<DbTeamMember[]>();

  if ((error && status !== 406) || !data) {
    return NextResponse.json({ message: 'Team not found.' }, { status: 404 });
  }

  const members: Team['members'] = data
    .map(({ user }) => ({ address: user }))
    .concat([
      { address: '0x655af72e1500eb8a8d1c90856ae3b8f148a78471' },
      { address: '0x655af72e1500eb8a8d1c90856ae3b8f148a78471' },
      { address: '0x655af72e1500eb8a8d1c90856ae3b8f148a78471' },
      { address: '0x655af72e1500eb8a8d1c90856ae3b8f148a78471' },
      { address: '0x655af72e1500eb8a8d1c90856ae3b8f148a78471' },
      { address: '0x655af72e1500eb8a8d1c90856ae3b8f148a78471' },
      { address: '0x655af72e1500eb8a8d1c90856ae3b8f148a78471' },
      { address: '0x655af72e1500eb8a8d1c90856ae3b8f148a78471' },
    ]);

  return NextResponse.json(members, { status });
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 60;
