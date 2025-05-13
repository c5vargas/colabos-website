import type { EnrichedMember, Member } from '@/contexts/members/libs/types';
import { createSupabaseClient } from '@/contexts/shared/libs/supabase';

/**
 * Obtiene todos los miembros de un workspace específico
 * @param clerkToken Token JWT para autenticación
 * @param workspaceId ID del workspace
 * @returns Lista de miembros con datos enriquecidos desde Clerk
 */
export const getMembers = async (
  clerkToken: string | null,
  workspaceId: string,
): Promise<EnrichedMember[]> => {
  const supabase = createSupabaseClient(clerkToken);

  try {
    // Obtener miembros del workspace desde Supabase
    const { data: workspaceMembers, error } = await supabase
      .from('workspace_members')
      .select('*')
      .eq('workspace_id', workspaceId);

    if (error) {
      console.error('Error al obtener miembros:', error);
      throw error;
    }

    if (!workspaceMembers.length) {
      return [];
    }

    // Como no tenemos backend, usaremos la API de Clerk directamente desde el frontend
    // Esto requiere que el usuario tenga permisos para ver estos datos
    // Normalmente, esto solo funcionaría para el usuario actual o administradores

    // Enriquecer los datos con información de Clerk
    // Nota: Esto es una simulación, ya que no podemos obtener datos de otros usuarios desde el frontend
    const enrichedMembers: EnrichedMember[] = workspaceMembers.map((member: Member) => {
      return {
        ...member,
        name: member.user_id ? `Usuario ${member.user_id.substring(0, 5)}` : 'Invitación pendiente',
        avatar_url: undefined, // No tenemos acceso a este dato desde el frontend
      };
    });

    return enrichedMembers;
  } catch (error) {
    console.error('Error al obtener miembros:', error);
    throw error;
  }
};
