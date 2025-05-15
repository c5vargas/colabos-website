import { createSupabaseClient } from '@/contexts/shared/libs/supabase';
import type { CreateNoteDTO, Note } from '../libs/types';

/**
 * Crea una nueva nota en Supabase
 * @param token Token JWT para autenticación
 * @param noteData Datos de la nota a crear
 * @returns La nota creada
 */
export const createNote = async (clerkToken: string | null, noteData: CreateNoteDTO): Promise<Note> => {
  const supabase = createSupabaseClient(clerkToken);

  try {
    // Crear la nota en la base de datos
    const { data, error } = await supabase
      .from('notes')
      .insert({
        title: noteData.title,
        content: noteData.content,
        workspace_id: noteData.workspace_id,
        color: noteData.color || null,
        tags: noteData.tags || [],
        is_pinned: noteData.is_pinned || false,
        is_archived: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error al crear la nota:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error al crear la nota:', error);
    throw error;
  }
};