import type { Link } from '@/contexts/links/libs/types';
import { useCallback, useState, type MouseEvent } from 'react';

interface LinkCardItemMenuPosition {
  x: number;
  y: number;
}

interface UseLinkCardItemReturn {
  imageUrl: string;
  isMenuOpen: boolean;
  menuPosition: LinkCardItemMenuPosition;
  handleContextMenu: (e: MouseEvent) => void;
  handleCloseMenu: () => void;
  handleFavorite: () => void;
  handleDelete: () => void;
}

/**
 * Hook personalizado para manejar la funcionalidad del LinkCardItem
 * Incluye la gestión del menú contextual y acciones sobre el link
 */
export const useLinkCardItem = (
  link: Link,
  onDelete?: (linkId: string) => void,
): UseLinkCardItemReturn => {
  const [imageUrl, setImageUrl] = useState<string>(link.image_src || '');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<LinkCardItemMenuPosition>({ x: 0, y: 0 });

  useState(() => {
    if (!link.image_src) {
      try {
        const url = new URL(link.url);
        const domain = url.hostname;
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
        setImageUrl(faviconUrl);
      } catch {
        setImageUrl('/assets/images/square-yellow.svg');
      }
    } else {
      setImageUrl(link.image_src);
    }
  });

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setIsMenuOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleFavorite = useCallback(() => {
    console.log('Marcar como favorito:', link.id);
    handleCloseMenu();
  }, [link.id, handleCloseMenu]);

  const handleDelete = useCallback(() => {
    if (onDelete) {
      onDelete(link.id);
    }
    handleCloseMenu();
  }, [link.id, onDelete, handleCloseMenu]);

  return {
    imageUrl,
    isMenuOpen,
    menuPosition,
    handleContextMenu,
    handleCloseMenu,
    handleFavorite,
    handleDelete,
  };
};
