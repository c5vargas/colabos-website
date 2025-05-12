import { deleteLink } from '@/contexts/links/actions/deleteLink';
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

  const { links, addLink, setLinks, removeLink, clearLinks } = useLinksStore();

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

  const handleRemove = async (linkId: string) => {
    try {
      const token = (await getToken()) || '';
      const deleted = await deleteLink(token, linkId);

      if (deleted) {
        removeLink(linkId);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar el link';
      setError(errorMessage);
    }
  };

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
    addLink,
    handleRemove,
    clearLinks,
  };
}
