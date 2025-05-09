import { createSupabaseClient } from '@/contexts/shared/libs/supabase';
import type { Workspace } from '@/contexts/workspace/libs/types';

export interface Payload {
  name: string;
  description: string;
}

export async function createWorkspace(
  data: Payload,
  clerkToken: string | null
): Promise<Workspace> {
  const supabase = createSupabaseClient(clerkToken);

  const { data: workspace, error } = await supabase
    .from('workspaces')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return workspace;
}
