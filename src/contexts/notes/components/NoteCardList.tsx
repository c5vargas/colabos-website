import NoteCard from '@/contexts/notes/components/NoteCard';
import { useNotes } from '@/contexts/notes/hooks/useNotes';
import type { Note } from '@/contexts/notes/libs/types';
import { useT } from '@/contexts/shared/hooks/useT';
import { useState } from 'react';

interface NoteCardListProps {
  limit?: number;
  showPinnedOnly?: boolean;
  searchTerm?: string;
  selectedTag?: string;
}

/**
 * Componente para mostrar una lista de tarjetas de notas
 * Permite filtrar por búsqueda, etiquetas y notas fijadas
 */
const NoteCardList: React.FC<NoteCardListProps> = ({
  limit,
  showPinnedOnly = false,
  searchTerm = '',
  selectedTag = '',
}) => {
  const t = useT();
  const { notes, isLoading } = useNotes();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Filtrar notas según los criterios
  const filteredNotes = notes
    .filter((note) => {
      // Filtrar por término de búsqueda
      if (
        searchTerm &&
        !note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !note.content.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Filtrar por etiqueta seleccionada
      if (selectedTag && (!note.tags || !note.tags.includes(selectedTag))) {
        return false;
      }

      // Filtrar por notas fijadas
      if (showPinnedOnly && !note.is_pinned) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Ordenar primero por fijadas y luego por posición
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return a.position - b.position;
    });

  // Limitar el número de notas si se especifica
  const displayedNotes = limit ? filteredNotes.slice(0, limit) : filteredNotes;

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    console.log(selectedNote);
    // Aquí se podría navegar a la página de detalle de la nota
    // o abrir un modal para editarla
  };

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-gray-400">{t('common.loading')}</p>
      </div>
    );
  }

  if (displayedNotes.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-gray-400">{t('notes.empty')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {displayedNotes.map((note) => (
        <NoteCard key={note.id} note={note} onClick={handleNoteClick} />
      ))}
    </div>
  );
};

export default NoteCardList;