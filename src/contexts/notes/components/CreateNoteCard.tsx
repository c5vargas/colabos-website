import { useNotes } from '@/contexts/notes/hooks/useNotes';
import { useWorkspaceStore } from '@/contexts/workspace/store/useWorkspaceStore';
import { useState } from 'react';

interface CreateNoteCardProps {
  onNoteCreated?: (noteId: string) => void;
}

/**
 * Tarjeta para crear una nueva nota rápidamente
 * Al hacer clic, crea automáticamente una nota con datos mínimos
 */
const CreateNoteCard: React.FC<CreateNoteCardProps> = ({ onNoteCreated }) => {
  const { selectedWorkspace } = useWorkspaceStore();
  const { addNote } = useNotes();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNote = async () => {
    if (!selectedWorkspace) return;

    setIsCreating(true);

    const emptyNote = {
      title: 'Nueva nota',
      content: '',
      workspace_id: selectedWorkspace.id,
      is_pinned: false,
    };

    const newNote = await addNote(emptyNote);
    if (!newNote) return;

    if (onNoteCreated) {
      onNoteCreated(newNote.id);
    }
    setIsCreating(false);
  };

  return (
    <div
      className="group relative flex h-full cursor-pointer flex-col rounded-lg border-2 border-dashed border-gray-600 p-4 transition-all hover:border-indigo-500 hover:shadow-md"
      onClick={handleCreateNote}
    >
      <div className="flex h-full flex-col items-center justify-center text-center">
        {isCreating ? (
          <div className="flex flex-col items-center">
            <svg
              className="h-8 w-8 animate-spin text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="mt-2 text-sm text-gray-400">Creando nota...</p>
          </div>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-500 group-hover:text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <h3 className="mt-2 text-lg font-semibold text-gray-400 group-hover:text-white">
              Crear nueva nota
            </h3>
            <p className="mt-1 text-sm text-gray-500">Haz clic para crear una nota en blanco</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateNoteCard;
