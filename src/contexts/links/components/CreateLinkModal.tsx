import { createLink } from '@/contexts/links/actions/createLink';
import LinkForm from '@/contexts/links/components/LinkForm';
import type { CreateLinkDTO } from '@/contexts/links/libs/types';
import Button from '@/contexts/shared/components/ui/Button';
import Modal from '@/contexts/shared/components/ui/Modal';
import { useT } from '@/contexts/shared/hooks/useT';
import { useWorkspaceStore } from '@/contexts/workspace/store/useWorkspaceStore';
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';

interface CreateLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal para crear un nuevo enlace
 * Utiliza el componente LinkForm para la entrada de datos
 */
export const CreateLinkModal: React.FC<CreateLinkModalProps> = ({ isOpen, onClose }) => {
  const t = useT();
  const { getToken } = useAuth();
  const { selectedWorkspace } = useWorkspaceStore();

  const [formData, setFormData] = useState<CreateLinkDTO>({
    name: '',
    url: '',
    workspace_id: selectedWorkspace?.id || '',
    image_src: '',
    category: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const token = await getToken();
      const link = await createLink(token, formData);
      console.log('Enlace creado:', link);
      onClose();

      setFormData({
        name: '',
        url: '',
        workspace_id: selectedWorkspace?.id || '',
        image_src: '',
        category: '',
      });
    } catch (error) {
      console.error('Error al crear el enlace:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!selectedWorkspace) return;
    setFormData((prev) => {
      return {
        ...prev,
        workspace_id: selectedWorkspace.id,
      };
    });
  }, [selectedWorkspace]);

  const actions = (
    <>
      <Button variant="ghost" onClick={onClose} className="mr-2" disabled={isSubmitting}>
        {t('actions.cancel')}
      </Button>
      <Button type="submit" variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
        {t('actions.create')}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('links.create.title')}
      actions={actions}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <LinkForm formData={formData} onChange={setFormData} />
      </form>
    </Modal>
  );
};
