import type { CreateLinkDTO } from '@/contexts/links/libs/types';
import FileDropInput from '@/contexts/shared/components/ui/FileDropInput';
import Input from '@/contexts/shared/components/ui/Input';
import { useT } from '@/contexts/shared/hooks/useT';

interface LinkFormProps {
  formData: CreateLinkDTO;
  onChange: (data: CreateLinkDTO) => void;
  className?: string;
}

/**
 * Componente reutilizable para formularios de links
 * Puede ser usado tanto para crear como para editar links
 */
const LinkForm: React.FC<LinkFormProps> = ({ formData, onChange, className = '' }) => {
  const t = useT();

  const handleChange = (field: keyof CreateLinkDTO, value: string | File) => {
    onChange({ ...formData, [field]: value });
  };

  const handleFeaturedImage = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    handleChange('image_src', file);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Input
        id="link-name"
        label={t('links.name')}
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder={t('links.namePlaceholder')}
        required
        fullWidth
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          id="link-url"
          label={t('links.url')}
          type="url"
          value={formData.url}
          onChange={(e) => handleChange('url', e.target.value)}
          placeholder={t('links.urlPlaceholder')}
          required
          fullWidth
        />

        <Input
          id="link-category"
          label={t('links.category')}
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          placeholder={t('links.categoryPlaceholder')}
          required
          fullWidth
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-300">{t('links.image')}</label>

        <FileDropInput
          onFilesSelected={handleFeaturedImage}
          accept="image/*"
          multiple={false}
          maxSize={5 * 1024 * 1024} // 5MB
        />
      </div>
    </div>
  );
};

export default LinkForm;
