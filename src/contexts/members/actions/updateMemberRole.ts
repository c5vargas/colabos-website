import type { UpdateMemberDTO } from '@/contexts/members/libs/types';
import { createSupabaseClient } from '@/contexts/shared/libs/supabase';

/**
 * Actualiza el rol de un miembro en el workspace
 * @param clerkToken Token JWT para autenticación
 * @param memberData Datos del miembro a actualizar
 * @returns Booleano indicando si la actualización fue exitosa
 */
export const updateMemberRole = async (
  clerkToken: string | null,
  memberData: UpdateMemberDTO,
): Promise<boolean> => {
  const supabase = createSupabaseClient(clerkToken);

  try {
    const { error } = await supabase
      .from('workspace_members')
      .update({
        member_role: memberData.role,
      })
      .eq('id', memberData.id);

    if (error) {
      console.error('Error al actualizar el rol del miembro:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error al actualizar el rol del miembro:', error);
    throw error;
  }
};
