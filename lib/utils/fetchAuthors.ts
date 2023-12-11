'use server';

import type { PostgrestError } from '@supabase/supabase-js';

import supabase from '@/lib/services/supabase';
import type { DbUser } from '@/lib/types/api';
import type { PartialUser } from '@/lib/types/protocol';

type AuthorsResponse = {
  data: PartialUser[];
  status: number;
  error: PostgrestError | null;
};

/**
 * Fetches and returns all Puzzle authors from all chains from the database.
 * @return An object containing data for the authors, the status code, and the
 * error in the shape `{ data: PartialUser[], status: number, error: PostgrestError | null }`.
 */
const fetchAuthors = async (): Promise<AuthorsResponse> => {
  const { data, status, error } = await supabase
    .from('users')
    .select('*')
    .filter('isPuzzleAuthor', 'is', 'true')
    .returns<DbUser[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return { data: [], status, error };
  }

  const authors: PartialUser[] = data.map((item) => {
    return {
      address: item.address,
      username: item.username,
      displayName: item.displayName,
      twitter: item.twitter,
      github: item.github,
    };
  });

  return { data: authors, status, error };
};

export default fetchAuthors;
