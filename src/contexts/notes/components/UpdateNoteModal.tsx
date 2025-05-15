import NoteForm from '@/contexts/notes/components/NoteForm';
import { useUpdateNoteModal } from '@/contexts/notes/hooks/useUpdateNoteModal';
import Button from '@/contexts/shared/components/ui/Button';
import Modal from '@/contexts/shared/components/ui/Modal';
import { useT } from '@/contexts/shared/hooks/useT';
import type { Note } from '../libs/types';

interface UpdateNoteModalProps {
  note: Note;
  onClose: () => void;
}

/**
 * Modal para crear una nueva nota
 * Utiliza el componente NoteForm para la entrada de datos
 */
export const UpdateNoteModal: React.FC<UpdateNoteModalProps> = ({ note, onClose }) => {
  const t = useT();
  const { formData, isSubmitting, error, handleSubmit, handleChange } = useUpdateNoteModal(
    note,
    onClose,
  );

  const actions = (
    <>
      <Button variant="ghost" onClick={onClose} className="mr-2" disabled={isSubmitting}>
        {t('actions.cancel')}
      </Button>
      <Button type="submit" variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
        {t('actions.update')}
      </Button>
    </>
  );

  return (
    <Modal isOpen={!!note} onClose={onClose} actions={actions} size="xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}
        <NoteForm formData={formData} onChange={handleChange} />
      </form>
    </Modal>
  );
};

export default UpdateNoteModal;
