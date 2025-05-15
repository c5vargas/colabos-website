import type { CreateNoteDTO, Note } from '@/contexts/notes/libs/types';
import { useWorkspaceStore } from '@/contexts/workspace/store/useWorkspaceStore';
import { useEffect, useState } from 'react';
import { useNotes } from './useNotes';

/**
 * Hook personalizado para manejar la lógica del modal de creación de notas
 * Gestiona el estado del formulario, la validación y el envío de datos
 */
export const useUpdateNoteModal = (note: Note, onClose: () => void) => {
  const { selectedWorkspace } = useWorkspaceStore();
  const { updateNote } = useNotes();

  const [formData, setFormData] = useState<Note>(note);

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

    if (!formData.title.trim()) {
      setError('El título es obligatorio');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await updateNote(formData);
      onClose();
    } catch (error) {
      console.error('Error al crear la nota:', error);
      setError('Error al crear la nota. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (newData: Partial<CreateNoteDTO>) => {
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
