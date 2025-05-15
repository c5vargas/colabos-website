import { createSupabaseClient } from '@/contexts/shared/libs/supabase';
import type { Note } from '../libs/types';

/**
 * Obtiene las notas asociadas a un workspace específico
 * @param token Token de autenticación
 * @param workspaceId ID del workspace
 * @returns Lista de notas del workspace
 */
export async function fetchNotes(clerkToken: string, workspaceId: string): Promise<Note[]> {
  const supabase = createSupabaseClient(clerkToken);

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('is_archived', false)
    .order('position', { ascending: true });

  if (error) throw error;
  return data;
}