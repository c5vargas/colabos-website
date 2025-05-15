import { getMembers } from '@/contexts/members/actions/getMembers';
import { inviteMember as inviteMemberAction } from '@/contexts/members/actions/inviteMember';
import { removeMember as removeMemberAction } from '@/contexts/members/actions/removeMember';
import { updateMemberRole as updateMemberRoleAction } from '@/contexts/members/actions/updateMemberRole';
import type { InviteMemberDTO, UpdateMemberDTO } from '@/contexts/members/libs/types';
import { useMembersStore } from '@/contexts/members/store/useMembersStore';
import { useT } from '@/contexts/shared/hooks/useT';
import { useWorkspace } from '@/contexts/workspace/hooks/useWorkspace';
import { useAuth } from '@clerk/clerk-react';
import { useCallback, useState } from 'react';

/**
 * Hook para gestionar los miembros del workspace actual
 * Actúa como intermediario entre las acciones (API) y el store (estado local)
 */
export const useMembers = () => {
  const { getToken } = useAuth();
  const { workspace } = useWorkspace();
  const t = useT();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    members,
    setMembers,
    addMember,
    updateMember: updateMemberInStore,
    removeMember: removeMemberFromStore,
  } = useMembersStore();

  const fetchMembers = useCallback(async () => {
    if (!workspace) return;

    setIsLoading(true);
    setError(null);

    try {
      const token = await getToken();
      if (token) {
        const membersData = await getMembers(token, workspace.id);
        console.log('obteniendo members', membersData);
        setMembers(membersData);
      }
    } catch (err) {
      console.error('Error al cargar miembros:', err);
      setError(t('members.errors.loadFailed'));
    } finally {
      setIsLoading(false);
    }
  }, [workspace]);

  const updateMemberRole = async (memberData: UpdateMemberDTO): Promise<boolean> => {
    try {
      const token = await getToken();
      if (!token) return false;

      const updatedMember = await updateMemberRoleAction(token, memberData);

      if (updatedMember) {
        updateMemberInStore(memberData.id, {
          member_role: memberData.member_role,
        });

        console.log({
          //TODO TOAST
          type: 'success',
          message: t('members.success.roleUpdated'),
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al actualizar miembro:', error);
      console.log({
        //TODO TOAST
        type: 'error',
        message: t('members.errors.updateFailed'),
      });
      return false;
    }
  };

  const inviteMember = async (payload: InviteMemberDTO): Promise<boolean> => {
    try {
      const token = await getToken();
      if (!token) return false;

      const newMember = await inviteMemberAction(token, payload);

      if (newMember) {
        addMember(newMember);
        console.log({
          //TODO TOAST
          type: 'success',
          message: t('members.success.invited'),
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error al eliminar miembro:', error);
      console.log({
        //TODO TOAST
        type: 'error',
        message: t('members.errors.removeFailed'),
      });
      return false;
    }
  };

  const deleteMember = async (memberId: string): Promise<boolean> => {
    try {
      const token = await getToken();
      if (!token) return false;

      const success = await removeMemberAction(token, memberId);

      if (success) {
        removeMemberFromStore(memberId);

        console.log({
          //TODO TOAST
          type: 'success',
          message: t('members.success.removed'),
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al eliminar miembro:', error);
      console.log({
        //TODO TOAST
        type: 'error',
        message: t('members.errors.removeFailed'),
      });
      return false;
    }
  };

  return {
    members,
    isLoading,
    error,
    fetchMembers,
    updateMemberRole,
    inviteMember,
    deleteMember,
  };
};
