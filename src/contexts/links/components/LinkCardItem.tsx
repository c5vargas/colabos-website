import { LinksIcon } from '@/contexts/dashboard/components/DashboardIcons';
import LinkContextMenu from '@/contexts/links/components/LinkContextMenu';
import { useLinkCardItem } from '@/contexts/links/hooks/useLinkCardItem';
import type { Link } from '@/contexts/links/libs/types';
import { useAnimations } from '@/contexts/shared/hooks/useAnimations';
import { motion } from 'framer-motion';

interface LinkCardItemProps {
  link: Link;
  style: 'modern' | 'details';
  onEdit?: (link: Link) => void;
  onDelete?: (linkId: string) => void;
}

/**
 * Componente que muestra un enlace en formato de tarjeta
 * Incluye menú contextual con opciones como favorito, editar y eliminar
 */
const LinkCardItem: React.FC<LinkCardItemProps> = ({ link, style = 'modern', onDelete }) => {
  const { fadeInUp, hoverScale } = useAnimations();

  const {
    imageUrl,
    isMenuOpen,
    menuPosition,
    handleContextMenu,
    handleCloseMenu,
    handleFavorite,
    handleDelete,
  } = useLinkCardItem(link, onDelete);

  if (style === 'modern') {
    return (
      <>
        <motion.a
          href={link.url}
          target="_blank"
          className="flex w-32 flex-col items-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          whileHover={hoverScale}
          onContextMenu={handleContextMenu}
        >
          <img
            src={imageUrl || '/assets/images/square-yellow.svg'}
            alt={link.name}
            className="h-16 w-16 rounded-md object-cover object-center"
          />
          <span className="mt-2 text-center text-xs">{link.name}</span>
        </motion.a>

        <LinkContextMenu
          isOpen={isMenuOpen}
          position={menuPosition}
          onClose={handleCloseMenu}
          onFavorite={handleFavorite}
          onDelete={handleDelete}
        />
      </>
    );
  }

  return (
    <>
      <motion.a
        href={link.url}
        target="_blank"
        className="flex items-center gap-4 rounded rounded-2xl border border-black-600 bg-black-700 p-3 hover:bg-black-900"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        whileHover={hoverScale}
        onContextMenu={handleContextMenu}
      >
        <img
          src={imageUrl || '/assets/images/square-yellow.svg'}
          alt={link.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex-1 overflow-hidden">
          <h4 className="font-mediu mb-0">{link.name}</h4>
          <span className="truncate text-xs text-gray-500">{link.url}</span>
        </div>
        <LinksIcon className="size-6" />
      </motion.a>

      <LinkContextMenu
        isOpen={isMenuOpen}
        position={menuPosition}
        onClose={handleCloseMenu}
        onFavorite={handleFavorite}
        onDelete={handleDelete}
      />
    </>
  );
};

export default LinkCardItem;
