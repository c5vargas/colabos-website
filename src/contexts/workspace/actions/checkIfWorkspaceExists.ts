import { createSupabaseClient } from '@/contexts/shared/libs/supabase';

export async function checkIfWorkspaceExists(clerkToken: string | null): Promise<boolean> {
  const supabase = createSupabaseClient(clerkToken);
  const { data, error } = await supabase.from('workspaces').select('id').limit(1);

  if (error) throw error;

  return data && data.length > 0;
}
