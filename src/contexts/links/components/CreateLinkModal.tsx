import LinkForm from '@/contexts/links/components/LinkForm';
import { useCreateLinkModal } from '@/contexts/links/hooks/useCreateLinkModal';
import Button from '@/contexts/shared/components/ui/Button';
import Modal from '@/contexts/shared/components/ui/Modal';
import { useT } from '@/contexts/shared/hooks/useT';

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
  const { formData, isSubmitting, error, handleSubmit, handleChange } = useCreateLinkModal(onClose);

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
        {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}
        <LinkForm formData={formData} onChange={handleChange} />
      </form>
    </Modal>
  );
};
