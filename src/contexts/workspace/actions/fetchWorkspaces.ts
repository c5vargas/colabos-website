import { supabase } from '@/contexts/shared/libs/supabase';

export async function fetchWorkspaces() {
  const { data, error } = await supabase.from('workspaces').select('*');

  if (error) throw error;
  return data;
}
