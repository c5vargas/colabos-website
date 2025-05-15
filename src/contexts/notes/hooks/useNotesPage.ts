import { useNotes } from '@/contexts/notes/hooks/useNotes';
import type { Note } from '@/contexts/notes/libs/types';
import { useWorkspaceStore } from '@/contexts/workspace/store/useWorkspaceStore';
import { useEffect, useState } from 'react';

interface UseNotesPageReturn {
  notes: Note[];
  searchTerm: string;
  selectedTag: string;
  showPinnedOnly: boolean;
  tags: string[];
  isLoading: boolean;
  error: string | null;
  setSearchTerm: (term: string) => void;
  setSelectedTag: (tag: string) => void;
  setShowPinnedOnly: (show: boolean) => void;
}

/**
 * Hook para gestionar la página de notas
 * Proporciona funcionalidades de búsqueda y filtrado
 */
export const useNotesPage = (): UseNotesPageReturn => {
  const { notes, isLoading, error, refreshNotes, clearNotes } = useNotes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const { selectedWorkspace } = useWorkspaceStore();

  const tags = [...new Set(notes.flatMap((note) => note.tags || []))].sort();

  useEffect(() => {
    if (selectedWorkspace) {
      refreshNotes();
    } else {
      clearNotes();
    }
  }, [selectedWorkspace, refreshNotes, clearNotes]);

  return {
    notes,
    searchTerm,
    selectedTag,
    showPinnedOnly,
    tags,
    isLoading,
    error,
    setSearchTerm,
    setSelectedTag,
    setShowPinnedOnly,
  };
};
