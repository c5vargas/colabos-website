import { createLink } from '@/contexts/links/actions/createLink';
import type { CreateLinkDTO } from '@/contexts/links/libs/types';
import { useWorkspaceStore } from '@/contexts/workspace/store/useWorkspaceStore';
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useLinks } from './useLinks';

/**
 * Hook personalizado para manejar la lógica del modal de creación de enlaces
 * Gestiona el estado del formulario, la validación y el envío de datos
 */
export const useCreateLinkModal = (onClose: () => void) => {
  const { getToken } = useAuth();
  const { selectedWorkspace } = useWorkspaceStore();
  const { addLink } = useLinks();

  const [formData, setFormData] = useState<CreateLinkDTO>({
    name: '',
    url: '',
    workspace_id: selectedWorkspace?.id || '',
    image_src: '',
    category: '',
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

    if (!formData.name.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    if (!formData.url.trim()) {
      setError('La URL es obligatoria');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const token = await getToken();
      const link = await createLink(token, formData);
      addLink(link);

      setFormData({
        name: '',
        url: '',
        workspace_id: selectedWorkspace?.id || '',
        image_src: '',
        category: '',
      });

      onClose();
    } catch (error) {
      console.error('Error al crear el enlace:', error);
      setError('Error al crear el enlace. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (newData: Partial<CreateLinkDTO>) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
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
