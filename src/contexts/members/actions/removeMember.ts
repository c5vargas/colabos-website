import { createSupabaseClient } from '@/contexts/shared/libs/supabase';

/**
 * Elimina un miembro del workspace
 * @param clerkToken Token JWT para autenticación
 * @param memberId ID del miembro a eliminar
 * @returns Booleano indicando si la eliminación fue exitosa
 */
export const removeMember = async (
  clerkToken: string | null,
  memberId: string,
): Promise<boolean> => {
  const supabase = createSupabaseClient(clerkToken);

  try {
    const { error } = await supabase.from('workspace_members').delete().eq('id', memberId);

    if (error) {
      console.error('Error al eliminar el miembro:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error al eliminar el miembro:', error);
    throw error;
  }
};
