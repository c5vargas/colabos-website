import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { createSupabaseClient } from '../libs/supabase';

export function useSupabaseAuth() {
  const { getToken } = useAuth();
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    const setupClient = async () => {
      const token = await getToken({ template: 'supabase' });
      const client = createSupabaseClient(token);
      setSupabaseClient(client);
    };

    setupClient();
  }, [getToken]);

  return supabaseClient;
}
