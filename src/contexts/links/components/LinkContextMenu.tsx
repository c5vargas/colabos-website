import { DeleteIcon, FavIcon } from '@/contexts/shared/components/ui/SharedIcons';
import { useAnimations } from '@/contexts/shared/hooks/useAnimations';
import { useT } from '@/contexts/shared/hooks/useT';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface LinkContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onFavorite: () => void;
  onDelete: () => void;
}

/**
 * Menú contextual para los links con opciones como favorito, editar y eliminar
 */
const LinkContextMenu: React.FC<LinkContextMenuProps> = ({
  isOpen,
  position,
  onClose,
  onFavorite,
  onDelete,
}) => {
  const t = useT();
  const { fadeInDown } = useAnimations();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={menuRef}
      className="absolute z-50 w-48 rounded-md border border-black-700 bg-black-800 shadow-lg"
      style={{ top: position.y, left: position.x }}
      variants={fadeInDown}
      initial="hidden"
      animate="visible"
    >
      <div>
        <button
          onClick={onFavorite}
          className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-black-700"
        >
          <span className="mr-2">
            <FavIcon className="size-5" />
          </span>
          {t('links.actions.favorite')}
        </button>
        <button
          onClick={onDelete}
          className="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-black-700"
        >
          <span className="mr-2">
            <DeleteIcon className="size-5" />
          </span>
          {t('links.actions.delete')}
        </button>
      </div>
    </motion.div>
  );
};

export default LinkContextMenu;
