import { createSupabaseClient } from '@/contexts/shared/libs/supabase';

/**
 * Elimina una nota de Supabase
 * @param token Token JWT para autenticación
 * @param noteId ID de la nota a eliminar
 * @returns Booleano indicando si la eliminación fue exitosa
 */
export const deleteNote = async (
  clerkToken: string | null,
  noteId: string
): Promise<boolean> => {
  const supabase = createSupabaseClient(clerkToken);

  try {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId);

    if (error) {
      console.error('Error al eliminar la nota:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error al eliminar la nota:', error);
    throw error;
  }
};