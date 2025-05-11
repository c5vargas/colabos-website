import { fetchLinks } from '@/contexts/links/actions/fetchLinks';
import { useLinksStore } from '@/contexts/links/store/useLinksStore';
import { useWorkspaceStore } from '@/contexts/workspace/store/useWorkspaceStore';
import { useAuth } from '@clerk/clerk-react';
import { useCallback, useEffect, useState } from 'react';

/**
 * Hook personalizado para gestionar los links
 * Permite cargar, filtrar y actualizar los links del workspace actual
 */
export function useLinks() {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { selectedWorkspace } = useWorkspaceStore();

  const { links, setLinks, addLink, updateLink, removeLink, clearLinks } = useLinksStore();

  const loadLinks = useCallback(async () => {
    if (!selectedWorkspace) return;

    try {
      setIsLoading(true);
      setError(null);

      const token = (await getToken()) || '';
      const fetchedLinks = await fetchLinks(token, selectedWorkspace.id);
      setLinks(fetchedLinks);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los links';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [selectedWorkspace, getToken, setLinks]);

  const filterLinksByCategory = useCallback(
    (category: string) => {
      if (!category) return links;
      return links.filter((link) => link.category === category);
    },
    [links],
  );

  const searchLinks = useCallback(
    (searchTerm: string) => {
      if (!searchTerm.trim()) return links;

      const term = searchTerm.toLowerCase();
      return links.filter(
        (link) =>
          link.name.toLowerCase().includes(term) ||
          link.url.toLowerCase().includes(term) ||
          (link.category && link.category.toLowerCase().includes(term)),
      );
    },
    [links],
  );

  useEffect(() => {
    if (selectedWorkspace) {
      loadLinks();
    } else {
      clearLinks();
    }
  }, [selectedWorkspace, loadLinks, clearLinks]);

  return {
    links,
    isLoading,
    error,
    loadLinks,
    filterLinksByCategory,
    searchLinks,
    addLink,
    updateLink,
    removeLink,
    clearLinks,
  };
}
