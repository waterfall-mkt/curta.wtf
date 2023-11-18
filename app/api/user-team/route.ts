import { type NextRequest, NextResponse } from 'next/server';

import supabase from '@/lib/services/supabase';
import type { DbTeam } from '@/lib/types/api';
import type { Team } from '@/lib/types/protocol';

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: { message: 'Missing `address`.' } }, { status: 400 });
  }

  const addressNormalized = address?.toLowerCase() ?? '';

  // Fetch user's team.
  const {
    data: userData,
    status: userStatus,
    error: userError,
  } = await supabase
    .from('team_members')
    .select('teamid, chainId')
    .eq('user', addressNormalized)
    .returns<{ teamid: number; chainId: number }[]>()
    .single();

  if ((userError && userStatus !== 406) || !userData) {
    return NextResponse.json({ message: 'User not on a team.' }, { status: 404 });
  }

  // Fetch team.
  const {
    data: teamData,
    status: teamStatus,
    error: teamError,
  } = await supabase
    .from('teams')
    .select('*, leader:users(*)')
    .eq('id', userData.teamid)
    .eq('chainId', userData.chainId)
    .returns<DbTeam[]>()
    .single();

  if ((teamError && teamStatus !== 406) || !teamData) {
    return NextResponse.json({ message: 'User not on a team.' }, { status: 404 });
  }

  const teamDataCasted: Team = {
    // Identifier
    id: teamData.id,
    chainId: teamData.chainId,
    leader: teamData.leader,
    // Team information
    name: teamData.name,
    avatar: teamData.avatar,
    members: [], // Purposely empty.
  };

  return NextResponse.json(teamDataCasted, { status: teamStatus });
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 60;
