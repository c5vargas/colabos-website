import { createSupabaseClient } from '@/contexts/shared/libs/supabase';
import type { Note, UpdateNoteDTO } from '../libs/types';

/**
 * Actualiza una nota existente en Supabase
 * @param token Token JWT para autenticación
 * @param noteId ID de la nota a actualizar
 * @param noteData Datos de la nota a actualizar
 * @returns La nota actualizada
 */
export const fetchAndUpdateNote = async (
  clerkToken: string | null,
  noteId: string,
  noteData: UpdateNoteDTO,
): Promise<Note> => {
  const supabase = createSupabaseClient(clerkToken);

  try {
    const { data, error } = await supabase
      .from('notes')
      .update({
        ...noteData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', noteId)
      .select()
      .single();

    if (error) {
      console.error('Error al actualizar la nota:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error al actualizar la nota:', error);
    throw error;
  }
};
