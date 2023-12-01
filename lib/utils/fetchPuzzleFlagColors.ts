'use server';

import { CURTA_ABI } from '@/lib/constants/abi';
import { getChainInfo, getPublicClient } from '@/lib/utils';

const fetchPuzzleFlagColors = async (id: number, chainId: number) => {
  try {
    const data = (await getPublicClient(chainId).readContract({
      address: getChainInfo(chainId).puzzles,
      abi: CURTA_ABI,
      functionName: 'getPuzzleColorsAndSolves',
      args: [id.toString()],
    })) as [string];

    const colors = data[0];

    return { colors: colors.toString() };
  } catch (error) {
    return { error, colors: null };
  }
};

export default fetchPuzzleFlagColors;
