'use server';

import type { Address } from 'viem';

import { fetchUserTeamApprovals } from '@/lib/utils';

export default async function action(address: Address) {
  return (await fetchUserTeamApprovals(address)).data ?? [];
}
