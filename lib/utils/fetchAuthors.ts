import type { PostgrestError } from '@supabase/supabase-js';

import supabase from '@/lib/services/supabase';
import type { DbUser } from '@/lib/types/api';
import type { User } from '@/lib/types/protocol';

type AuthorsResponse = {
  data: User[];
  status: number;
  error: PostgrestError | null;
};

const fetchAuthors = async (): Promise<AuthorsResponse> => {
  const { data, status, error } = await supabase.from('authors').select('*').returns<DbUser[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return { data: [], status, error };
  }

  const authors: User[] = data.map((item) => {
    return {
      address: item.address,
      username: item.username,
      displayName: item.displayName,
      twitter: item.twitter,
      github: item.github,
      puzzlesSolved: item.puzzlesSolved,
      isPuzzleAuthor: item.isPuzzleAuthor,
    };
  });

  return { data: authors, status, error };
};

export default fetchAuthors;
