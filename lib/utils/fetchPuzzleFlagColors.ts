import { publicClient } from '@/lib/client';
import { CURTA_ABI } from '@/lib/constants/abi';

const fetchPuzzleFlagColors = async (id: number) => {
  try {
    const data = (await publicClient.readContract({
      address: process.env.NEXT_PUBLIC_CURTA_ADDRESS,
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
