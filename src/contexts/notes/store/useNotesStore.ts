import type { Note } from '@/contexts/notes/libs/types';
import { create } from 'zustand';

interface NotesState {
  notes: Note[];
  isLoading: boolean;
  error: string | null;

  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  updateNote: (id: string, updatedNote: Partial<Note>) => void;
  removeNote: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearNotes: () => void;
}

/**
 * Store para gestionar las notas del workspace seleccionado
 * Permite cargar, añadir, actualizar y eliminar notas
 */
export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  isLoading: false,
  error: null,

  setNotes: (notes) => set({ notes, error: null }),
  addNote: (note) =>
    set((state) => ({
      notes: [...state.notes, note],
      error: null,
    })),
  updateNote: (id, updatedNote) =>
    set((state) => ({
      notes: state.notes.map((note) => (note.id === id ? { ...note, ...updatedNote } : note)),
      error: null,
    })),
  removeNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
      error: null,
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearNotes: () => set({ notes: [], error: null }),
}));