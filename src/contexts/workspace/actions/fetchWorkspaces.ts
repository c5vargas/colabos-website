import { createSupabaseClient } from '@/contexts/shared/libs/supabase';

export async function fetchWorkspaces(clerkToken: string | null) {
  const supabase = createSupabaseClient(clerkToken);

  const { data, error } = await supabase.from('workspaces').select('*');

  if (error) throw error;
  return data;
}
