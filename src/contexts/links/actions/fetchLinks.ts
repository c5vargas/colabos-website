import { createSupabaseClient } from '@/contexts/shared/libs/supabase';
import type { Link } from '../libs/types';

/**
 * Obtiene los links asociados a un workspace específico
 * @param token Token de autenticación
 * @param workspaceId ID del workspace
 * @returns Lista de links del workspace
 */
export async function fetchLinks(clerkToken: string, workspaceId: string): Promise<Link[]> {
  const supabase = createSupabaseClient(clerkToken);

  const { data, error } = await supabase.from('links').select('*').eq('workspace_id', workspaceId);

  if (error) throw error;
  return data;
}
