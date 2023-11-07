import { publicClient } from '@/lib/client';
import { CURTA_ABI } from '@/lib/constants/abi';
import { getPuzzlesAddress } from '@/lib/utils';

const fetchPuzzleFlagColors = async (id: number) => {
  try {
    const data = (await publicClient.readContract({
      address: getPuzzlesAddress(1), // TODO: fetch chain ID and add as a param
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
