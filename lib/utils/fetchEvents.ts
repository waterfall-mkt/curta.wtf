import type { PostgrestError } from '@supabase/supabase-js';

import supabase from '@/lib/services/supabase';
import type { DbEvent } from '@/lib/types/api';
import type { Event } from '@/lib/types/protocol';

type EventsResponse = {
  data: Event[];
  status: number;
  error: PostgrestError | null;
};

const fetchEvents = async (): Promise<EventsResponse> => {
  const { data, status, error } = await supabase.from('events').select('*').returns<DbEvent[]>();

  if ((error && status !== 406) || !data || (data && data.length === 0)) {
    return { data: [], status, error };
  }

  const events: Event[] = data.map((item) => ({
    slug: item.slug,
    name: item.name,
    description: item.description,
    link: item.link,
    image: item.image,
    startDate: item.startDate,
    endDate: item.endDate,
    location: item.location,
  }));

  return { data: events, status, error };
};

export default fetchEvents;
