import { createNote } from '@/contexts/notes/actions/createNote';
import { fetchAndUpdateNote } from '@/contexts/notes/actions/fetchAndUpdateNote';
import { fetchNotes } from '@/contexts/notes/actions/fetchNotes';
import type { CreateNoteDTO, Note } from '@/contexts/notes/libs/types';
import { useNotesStore } from '@/contexts/notes/store/useNotesStore';
import { useWorkspaceStore } from '@/contexts/workspace/store/useWorkspaceStore';
import { useAuth } from '@clerk/clerk-react';
import { useCallback } from 'react';

/**
 * Hook para gestionar las notas del workspace actual
 * Proporciona métodos para cargar, añadir, actualizar y eliminar notas
 */
export const useNotes = () => {
  const { getToken } = useAuth();
  const { selectedWorkspace } = useWorkspaceStore();
  const {
    notes,
    isLoading,
    error,
    setNotes,
    addNote: addNoteStore,
    updateNote: updateNoteStore,
    removeNote,
    setLoading,
    clearNotes,
    setError,
  } = useNotesStore();

  const fetchWorkspaceNotes = useCallback(async () => {
    if (!selectedWorkspace) return;

    try {
      setLoading(true);
      const token = await getToken();
      if (!token) throw new Error('No se pudo obtener el token de autenticación');

      const notesData = await fetchNotes(token, selectedWorkspace.id);
      setNotes(notesData);
    } catch (error) {
      console.error('Error al cargar las notas:', error);
      setError('Error al cargar las notas. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [selectedWorkspace, getToken, setNotes]);

  const addNote = async (note: CreateNoteDTO) => {
    try {
      const token = await getToken();
      if (!token) throw new Error('No se pudo obtener el token de autenticación');
      const newNote = await createNote(token, note);
      addNoteStore(newNote);

      return newNote;
    } catch (error) {
      console.error('Error al crear la nota:', error);
      setError('Error al crear la nota. Inténtalo de nuevo.');
      return null;
    }
  };

  const updateNote = async (note: Note) => {
    try {
      const token = await getToken();
      if (!token) throw new Error('No se pudo obtener el token de autenticación');
      const newNote = await fetchAndUpdateNote(token, note.id, note);
      updateNoteStore(newNote.id, newNote);

      return newNote;
    } catch (error) {
      console.error('Error al crear la nota:', error);
      setError('Error al crear la nota. Inténtalo de nuevo.');
      return null;
    }
  };

  return {
    notes,
    isLoading,
    error,
    addNote,
    clearNotes,
    updateNote,
    removeNote,
    refreshNotes: fetchWorkspaceNotes,
  };
};
