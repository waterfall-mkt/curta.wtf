import type { PostgrestError } from '@supabase/supabase-js';

import supabase from '@/lib/services/supabase';

type PuzzlesCountResponse = {
  data: { count: number; lastUpdated: number };
  status: number;
  error: PostgrestError | null;
};

const fetchPuzzlesCount = async (): Promise<PuzzlesCountResponse> => {
  let lastUpdated: number;
  // We fetch this so the request gets cached.
  try {
    lastUpdated = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://curta.wtf'}/api/now`)
      .then((res) => res.json())
      .then((res) => res.now);
  } catch (err) {
    console.error(err);
    lastUpdated = Date.now();
  }

  // Fetch puzzles.
  const { data, status, error } = await supabase
    .from('puzzles')
    .select('id')
    .not('address', 'is', null)
    .returns<number[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return { data: { count: 0, lastUpdated }, status, error };
  }

  return { data: { count: data.length, lastUpdated }, status, error };
};

export default fetchPuzzlesCount;
