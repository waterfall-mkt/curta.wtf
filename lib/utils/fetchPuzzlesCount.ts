import type { PostgrestError } from '@supabase/supabase-js';

import supabase from '@/lib/services/supabase';

type PuzzlesCountResponse = {
  data: { count: number; lastUpdated: number };
  status: number;
  error: PostgrestError | null;
};

const fetchPuzzlesCount = async (): Promise<PuzzlesCountResponse> => {
  // Fetch puzzles.
  const { data, status, error } = await supabase.from('puzzles').select('id').returns<number[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return { data: { count: 0, lastUpdated: Date.now() }, status, error };
  }

  return { data: { count: data.length, lastUpdated: Date.now() }, status, error };
};

export default fetchPuzzlesCount;
