import { createSupabaseClient } from '@/contexts/shared/libs/supabase';
import type { Workspace } from '../libs/types';

export async function createWorkspace(data: Partial<Workspace>, clerkToken: string | null) {
  const supabase = createSupabaseClient(clerkToken);

  const { data: workspace, error } = await supabase
    .from('workspaces')
    .insert([
      {
        name: data.name,
        description: data.description,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return workspace;
}
