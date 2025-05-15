import type { CreateNoteDTO } from '@/contexts/notes/libs/types';
import { useT } from '@/contexts/shared/hooks/useT';
import { useEffect, useRef, useState } from 'react';

interface NoteFormProps {
  formData: CreateNoteDTO;
  onChange: (data: Partial<CreateNoteDTO>) => void;
  className?: string;
}

/**
 * Componente reutilizable para formularios de notas con estilo minimalista
 * Diseñado para parecer un documento simple en lugar de un formulario tradicional
 */
const NoteForm: React.FC<NoteFormProps> = ({ formData, onChange, className = '' }) => {
  const t = useT();
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // Colores predefinidos que combinan bien con el tema oscuro
  const predefinedColors = [
    { value: '#1e1e1e', name: 'Negro' },
    { value: '#f59e0b', name: 'Ámbar' },
    { value: '#8b5cf6', name: 'Púrpura' },
    { value: '#ec4899', name: 'Rosa' },
  ];

  const handleChange = (field: keyof CreateNoteDTO, value: string | string[] | boolean) => {
    onChange({ [field]: value });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    handleChange('tags', tagsArray);
  };

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, [formData.title]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="border-b border-transparent transition-colors duration-200 focus-within:border-gray-700">
        <textarea
          ref={titleRef}
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder={t('notes.titlePlaceholder') || 'Título de la nota'}
          className="w-full resize-none overflow-hidden bg-transparent text-2xl font-bold text-white placeholder-gray-500 focus:outline-none"
          rows={1}
        />
      </div>

      <div>
        <textarea
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          placeholder={t('notes.contentPlaceholder') || 'Escribe el contenido de tu nota aquí...'}
          className="min-h-[200px] w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
          style={{ resize: 'none' }}
        />
      </div>

      <div className="mt-8 border-t border-gray-800 pt-4 text-sm text-gray-400">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex items-center space-x-2">
            <div
              className="h-5 w-5 cursor-pointer overflow-hidden rounded-full"
              style={{ backgroundColor: formData.color || '#1e1e1e' }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            ></div>
            <span className="text-xs opacity-70">{t('notes.color')}</span>

            {showColorPicker && (
              <div
                ref={colorPickerRef}
                className="absolute left-0 top-7 z-10 rounded-md border border-black-600 bg-black-700 p-2 shadow-lg"
              >
                <div className="grid grid-cols-4 gap-2">
                  {predefinedColors.map((color) => (
                    <div key={color.value} className="flex flex-col items-center">
                      <div
                        className="h-4 w-4 cursor-pointer rounded-full border border-gray-700 transition-transform hover:scale-110"
                        style={{ backgroundColor: color.value }}
                        onClick={() => {
                          handleChange('color', color.value);
                          setShowColorPicker(false);
                        }}
                        title={color.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-1 items-center space-x-2">
            <span className="opacity-70">#</span>
            <input
              value={formData.tags?.join(', ') || ''}
              onChange={handleTagsChange}
              placeholder={t('notes.tagsPlaceholder') || 'etiquetas, separadas, por, comas'}
              className="w-full bg-transparent text-gray-300 focus:outline-none"
            />
          </div>

          <div
            className="flex cursor-pointer items-center space-x-2"
            onClick={() => handleChange('is_pinned', !formData.is_pinned)}
          >
            <div
              className={`h-4 w-4 rounded-full border ${formData.is_pinned ? 'border-primary-500 bg-primary-500' : 'border-gray-500'} flex items-center justify-center`}
            >
              {formData.is_pinned && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <span className="text-xs opacity-70">{t('notes.pinned')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
