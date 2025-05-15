import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export function createSupabaseClient(clerkToken?: string | null) {
  return createClient(supabaseUrl, supabaseKey, {
    async accessToken() {
      return Promise.resolve(clerkToken || '');
    },
  });
}
