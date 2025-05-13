import { createSupabaseClient } from '@/contexts/shared/libs/supabase';

/**
 * Acepta una invitación para unirse a un workspace
 * @param clerkToken Token JWT para autenticación
 * @param invitationId ID de la invitación a aceptar
 * @param userId ID del usuario de Clerk que acepta la invitación
 * @returns Booleano indicando si la aceptación fue exitosa
 */
export const acceptInvitation = async (
  clerkToken: string | null,
  invitationId: string,
  userId: string,
): Promise<boolean> => {
  const supabase = createSupabaseClient(clerkToken);

  try {
    const { error } = await supabase
      .from('workspace_members')
      .update({
        user_id: userId,
        status: 'active',
      })
      .eq('id', invitationId)
      .eq('status', 'pending');

    if (error) {
      console.error('Error al aceptar la invitación:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error al aceptar la invitación:', error);
    throw error;
  }
};
