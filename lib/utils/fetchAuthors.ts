import type { PostgrestError } from '@supabase/supabase-js';

import supabase from '@/lib/services/supabase';
import type { SupabaseAuthor } from '@/lib/types/api';
import type { Author } from '@/lib/types/protocol';

type AuthorsResponse = {
  data: Author[];
  status: number;
  error: PostgrestError | null;
};

const fetchAuthors = async (): Promise<AuthorsResponse> => {
  const { data, status, error } = await supabase
    .from('authors')
    .select('*')
    .returns<SupabaseAuthor[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return {
      data: [],
      status: status,
      error: error,
    };
  }

  const authors: Author[] = data.map((item) => {
    return {
      address: item.address,
      avatar: item.avatar,
      name: item.name,
      twitter: item.twitter,
      github: item.github,
    };
  });

  return { data: authors, status, error };
};

export default fetchAuthors;
