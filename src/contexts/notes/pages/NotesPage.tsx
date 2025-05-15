import CreateNoteCard from '@/contexts/notes/components/CreateNoteCard';
import NoteCard from '@/contexts/notes/components/NoteCard';
import UpdateNoteModal from '@/contexts/notes/components/UpdateNoteModal';
import { useNotesPage } from '@/contexts/notes/hooks/useNotesPage';
import { type Note } from '@/contexts/notes/libs/types';
import { useState } from 'react';

/**
 * Página principal para gestionar notas
 * Muestra una lista de notas y permite crear, ver, editar y eliminar
 */
const NotesPage: React.FC = () => {
  const { notes, isLoading, error } = useNotesPage();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleCloseDetailModal = () => {
    setSelectedNote(null);
  };

  const handleNoteCreated = (noteId: string) => {
    console.log('Note created with ID:', noteId);
    const newNote = notes.find((note) => note.id === noteId);
    if (newNote) {
      setSelectedNote(newNote);
    }
  };

  const pinnedNotes = notes.filter((note) => note.is_pinned && !note.is_archived);
  const unpinnedNotes = notes.filter((note) => !note.is_pinned && !note.is_archived);

  if (isLoading) return <div className="py-10 text-center">Cargando notas...</div>;
  if (error) return <div className="py-10 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {pinnedNotes.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-white">Notas Fijadas</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {pinnedNotes.map((note) => (
              <NoteCard key={note.id} note={note} onClick={handleNoteClick} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-4 text-xl font-semibold text-white">Todas las Notas</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <CreateNoteCard onNoteCreated={handleNoteCreated} />

          {unpinnedNotes.map((note) => (
            <NoteCard key={note.id} note={note} onClick={handleNoteClick} />
          ))}
        </div>
      </div>

      {selectedNote && <UpdateNoteModal note={selectedNote} onClose={handleCloseDetailModal} />}
    </div>
  );
};

export default NotesPage;
