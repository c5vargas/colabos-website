import { useMembers } from '@/contexts/members/hooks/useMembers';
import type { Member } from '@/contexts/members/libs/types';
import { useT } from '@/contexts/shared/hooks/useT';
import type { MemberRole } from '@/contexts/workspace/libs/types';
import { useState } from 'react';

interface UseMemberItemReturn {
  handleRemove: () => Promise<void>;
  handleUpdateRole: (newRole: MemberRole) => Promise<void>;
  isUpdating: boolean;
}

/**
 * Hook personalizado para manejar la lógica de un item de miembro
 * Proporciona funciones para actualizar el rol y eliminar un miembro
 */
export const useMemberItem = (member: Member): UseMemberItemReturn => {
  const { updateMemberRole, deleteMember } = useMembers();
  const [isUpdating, setIsUpdating] = useState(false);
  const t = useT();

  const handleUpdateRole = async (newRole: MemberRole) => {
    if (newRole === member.member_role) return;

    setIsUpdating(true);
    try {
      await updateMemberRole({
        id: member.id,
        member_role: newRole,
      });
    } catch (error) {
      console.error('Error al actualizar el rol del miembro:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    if (!confirm(t('members.confirmRemove'))) return;

    setIsUpdating(true);
    try {
      await deleteMember(member.id);
    } catch (error) {
      console.error('Error al eliminar el miembro:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    handleRemove,
    handleUpdateRole,
    isUpdating,
  };
};
