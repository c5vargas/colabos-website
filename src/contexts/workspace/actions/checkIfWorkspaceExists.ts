import { supabase } from '@/contexts/shared/libs/supabase';

export async function checkIfWorkspaceExists(): Promise<boolean> {
  try {
    const { data: workspaces, error } = await supabase.from('workspaces').select('id').limit(1);

    if (error) throw error;

    return workspaces && workspaces.length > 0;
  } catch (error) {
    console.error('Error al verificar existencia de workspace:', error);
    throw error;
  }
}
