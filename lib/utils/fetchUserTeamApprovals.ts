'use server';

import type { PostgrestError } from '@supabase/supabase-js';
import type { Address } from 'viem';

import supabase from '@/lib/services/supabase';
import type { DbTeam, DbTeamMember, DbTeamMemberApproval } from '@/lib/types/api';
import type { Team, TeamMemberApproval } from '@/lib/types/protocol';

type UserTeamApprovalResponse = {
  data: TeamMemberApproval[] | null;
  status: number;
  error: PostgrestError | null;
};

/**
 * Returns a user's approvals and the data for each team.
 * @param address The address of the user.
 * @returns An object containing data for the Team, the status code, and the
 * error in the shape `{ data: Team | null, status: number, error: PostgrestError | null }`.
 */
const fetchUserTeamApprovals = async (address: Address): Promise<UserTeamApprovalResponse> => {
  const addressNormalized = address?.toLowerCase() ?? '';

  // Fetch user's approvals.
  const { data, status, error } = await supabase
    .from('team_member_approvals')
    .select('*, member:users(*)')
    .eq('member', addressNormalized)
    .eq('approved', true)
    .returns<DbTeamMemberApproval[]>();

  if ((error && status !== 406) || !data) {
    return { data: null, status, error };
  }

  // Fetch all teams.
  const { data: teams } = await supabase
    .from('teams')
    .select('*, leader:users(*)')
    .returns<DbTeam[]>();

  // Fetch team members.
  const { data: teamMembers } = await supabase
    .from('team_members')
    .select('*')
    .returns<DbTeamMember[]>();

  // The keys are in the form `teamId`. We ignore `chainId` here. Then, make a
  // mapping of the teams.
  const teamMap = new Map<number, Team>();
  teams?.map((team) =>
    teamMap.set(team.id, {
      id: team.id,
      chainId: team.chainId,
      leader: team.leader,
      name: team.name,
      avatar: team.avatar,
      members: [],
    }),
  );
  teamMembers?.map((member) => {
    const team = teamMap.get(member.teamid);
    if (team) {
      teamMap.set(member.teamid, {
        ...team,
        members: [...team.members, { address: member.user }],
      });
    }
  });

  const approvals: TeamMemberApproval[] = data.map((approval) => ({
    teamId: approval.teamId,
    chainId: approval.chainId,
    member: approval.member,
    approved: approval.approved,
    team: teamMap.get(approval.teamId) ?? {
      id: approval.teamId,
      chainId: approval.chainId,
      members: [],
    },
  }));

  return { data: approvals, status, error };
};

export default fetchUserTeamApprovals;
