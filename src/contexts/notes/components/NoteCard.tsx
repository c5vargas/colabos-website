import { useNotes } from '@/contexts/notes/hooks/useNotes';
import type { Note } from '@/contexts/notes/libs/types';
import { HugeiconsPin, HugeiconsPinOff } from '@/contexts/shared/components/ui/Icons';
import { useAnimations } from '@/contexts/shared/hooks/useAnimations';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface NoteCardProps {
  note: Note;
  onClick?: (note: Note) => void;
  index?: number;
}

/**
 * Tarjeta para mostrar una nota individual
 * Muestra el título, contenido y permite acciones rápidas
 * Incluye animaciones suaves para mejorar la experiencia de usuario
 */
const NoteCard: React.FC<NoteCardProps> = ({ note, onClick }) => {
  const { updateNote } = useNotes();
  const [isUpdating, setIsUpdating] = useState(false);
  const { fadeInUp, hoverScale } = useAnimations();

  const handlePinToggle = async () => {
    try {
      setIsUpdating(true);
      const updatedNote = {
        ...note,
        is_pinned: !note.is_pinned,
      };
      updateNote(updatedNote);
    } catch (error) {
      console.error('Error al actualizar la nota:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const cardStyle = {
    backgroundColor: note.color || '#1e1e1e',
    borderColor: note.is_pinned ? '#31313180' : 'transparent',
  };

  return (
    <motion.div
      className="group relative flex h-full cursor-pointer flex-col rounded-lg border-2 p-4"
      style={cardStyle}
      onClick={() => onClick?.(note)}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      whileHover={hoverScale}
      layout
    >
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-lg font-semibold text-white">{note.title}</h3>
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            handlePinToggle();
          }}
          disabled={isUpdating}
          className="rounded-full p-1 text-gray-100 duration-300 hover:bg-black-700 hover:text-white"
          title={note.is_pinned ? 'Desfijar nota' : 'Fijar nota'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {note.is_pinned ? (
            <HugeiconsPinOff className="h-5 w-5 fill-yellow-500" />
          ) : (
            <HugeiconsPin className="h-5 w-5" />
          )}
        </motion.button>
      </div>

      <div className="mb-4 flex-1 overflow-hidden text-sm text-gray-200">
        <p className="line-clamp-4">{note.content}</p>
      </div>

      <div className="mt-auto">
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {note.tags.map((tag) => (
              <motion.span
                key={tag}
                className="rounded-full bg-black-700/20 px-2 py-1 text-xs text-gray-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NoteCard;
