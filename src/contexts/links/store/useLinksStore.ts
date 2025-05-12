import type { Link } from '@/contexts/links/libs/types';
import { create } from 'zustand';

interface LinksState {
  links: Link[];
  isLoading: boolean;
  error: string | null;

  setLinks: (links: Link[]) => void;
  addLink: (link: Link) => void;
  updateLink: (id: string, updatedLink: Partial<Link>) => void;
  removeLink: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearLinks: () => void;
}

/**
 * Store para gestionar los links del workspace seleccionado
 * Permite cargar, añadir, actualizar y eliminar links
 */
export const useLinksStore = create<LinksState>((set) => ({
  links: [],
  isLoading: false,
  error: null,

  setLinks: (links) => set({ links, error: null }),
  addLink: (link) =>
    set((state) => ({
      links: [...state.links, link],
      error: null,
    })),
  updateLink: (id, updatedLink) =>
    set((state) => ({
      links: state.links.map((link) => (link.id === id ? { ...link, ...updatedLink } : link)),
      error: null,
    })),
  removeLink: (id) =>
    set((state) => ({
      links: state.links.filter((link) => link.id !== id),
      error: null,
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearLinks: () => set({ links: [], error: null }),
}));
