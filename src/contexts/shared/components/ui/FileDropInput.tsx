import { useT } from '@/contexts/shared/hooks/useT';
import React, { useRef, useState } from 'react';

export interface FileDropInputProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  message?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  onFilesSelected: (files: File[]) => void;
}

/**
 * Componente para subir archivos con funcionalidad de arrastrar y soltar
 * Permite tanto arrastrar archivos como hacer clic para seleccionarlos
 */
const FileDropInput: React.FC<FileDropInputProps> = ({
  accept,
  multiple = false,
  maxSize,
  message,
  error,
  className = '',
  disabled = false,
  icon,
  onFilesSelected,
}) => {
  const t = useT();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>(error);

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const validateFiles = (files: File[]): File[] => {
    setLocalError(undefined);

    if (files.length === 0) return [];

    if (maxSize) {
      const oversizedFiles = files.filter((file) => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        setLocalError(
          t('fileInput.errorSize', {
            size: (maxSize / (1024 * 1024)).toFixed(2),
          }),
        );
        return [];
      }
    }

    return files;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = validateFiles(filesArray);

      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      e.dataTransfer.dropEffect = 'copy';
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!disabled && e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files);
      const validFiles = validateFiles(filesArray);

      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${isDragging ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' : 'border-gray-300 dark:border-gray-700'} ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:border-primary-400 dark:hover:border-primary-600'} `}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          disabled={disabled}
        />

        <div className="flex flex-col items-center space-y-2">
          {icon || (
            <svg
              className="h-10 w-10 text-gray-400 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          )}

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {message || t('fileInput.dragAndDrop')}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              {t('fileInput.or')} <span className="text-primary-500">{t('fileInput.browse')}</span>
            </p>
            {accept && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                {t('fileInput.acceptedFormats')}: {accept}
              </p>
            )}
          </div>
        </div>
      </div>

      {(localError || error) && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{localError || error}</p>
      )}
    </div>
  );
};

export default FileDropInput;
