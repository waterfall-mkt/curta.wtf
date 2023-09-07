import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseSchema = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA ?? 'mainnet_prod';

const options = { db: { schema: supabaseSchema } };

const supabase = createClient(supabaseUrl, supabaseAnonKey, options);

export default supabase;
