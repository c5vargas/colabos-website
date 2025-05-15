import type { EnrichedMember, InviteMemberDTO, Member } from '@/contexts/members/libs/types';
import { createSupabaseClient } from '@/contexts/shared/libs/supabase';

/**
 * Invita a un nuevo miembro al workspace
 * @param clerkToken Token JWT para autenticación
 * @param memberData Datos del miembro a invitar
 * @returns El miembro creado
 */
export const inviteMember = async (
  clerkToken: string | null,
  memberData: InviteMemberDTO,
): Promise<EnrichedMember> => {
  const supabase = createSupabaseClient(clerkToken);

  try {
    const { data, error } = await supabase
      .from('workspace_members')
      .insert({
        workspace_id: memberData.workspace_id,
        email: memberData.email,
        member_role: memberData.member_role,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Error al invitar al miembro:', error);
      throw error;
    }

    return data as Member;
  } catch (error) {
    console.error('Error al invitar al miembro:', error);
    throw error;
  }
};
