import { useMembers } from '@/contexts/members/hooks/useMembers';
import type { CreateMemberDTO } from '@/contexts/members/libs/types';
import { useWorkspaceStore } from '@/contexts/workspace/store/useWorkspaceStore';
import { useEffect, useState } from 'react';

/**
 * Hook personalizado para manejar la lógica del modal de invitación de miembros
 * Gestiona el estado del formulario, la validación y el envío de datos
 */
export const useInviteMemberModal = (onClose: () => void) => {
  const { selectedWorkspace } = useWorkspaceStore();
  const { inviteMember } = useMembers();

  const [formData, setFormData] = useState<CreateMemberDTO>({
    email: '',
    member_role: 'viewer',
    workspace_id: selectedWorkspace?.id || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedWorkspace) return;
    setFormData((prev) => ({
      ...prev,
      workspace_id: selectedWorkspace.id,
    }));
  }, [selectedWorkspace]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      setError('El email es obligatorio');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      inviteMember(formData);

      setFormData({
        email: '',
        member_role: 'viewer',
        workspace_id: selectedWorkspace?.id || '',
      });

      onClose();
    } catch (error) {
      console.error('Error al invitar al miembro:', error);
      setError('Error al enviar la invitación. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof CreateMemberDTO, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (error) setError(null);
  };

  return {
    formData,
    isSubmitting,
    error,
    handleSubmit,
    handleChange,
  };
};
