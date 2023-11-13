import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const options = { db: { schema: process.env.NEXT_PUBLIC_IS_TESTNET ? 'testnet' : 'public' } };

const supabase = createClient(supabaseUrl, supabaseAnonKey, options);

export default supabase;
