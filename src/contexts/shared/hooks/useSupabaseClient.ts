import { useSession } from '@clerk/clerk-react';
import { createClient } from '@supabase/supabase-js';

export function useSupabaseClient() {
  const { session } = useSession();

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseKey, {
    async accessToken() {
      return session?.getToken() ?? null;
    },
  });
}
