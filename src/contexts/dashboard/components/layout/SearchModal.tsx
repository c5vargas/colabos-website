import { useT } from '@/contexts/shared/hooks/useT';
import { useState } from 'react';
import { SearchIcon } from '@/contexts/dashboard/components/DashboardIcons';
import Modal from '@/contexts/shared/components/ui/Modal';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const t = useT();
  const [searchTerm, setSearchTerm] = useState('');

  const actions = (
    <div className="flex justify-between items-center w-full">
      <div className="text-xs text-gray-500">
        <kbd className="px-2 py-1 bg-black-700 rounded-md border border-black-600">esc</kbd>
        <span className="mx-1">{t('search.shortcuts.close')}</span>
        <kbd className="px-2 py-1 bg-black-700 rounded-md border border-black-600">↵</kbd>
        <span className="mx-1">{t('search.shortcuts.search')}</span>
      </div>
      <button
        type="button"
        className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors"
        onClick={onClose}
      >
        {t('actions.close')}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('search.title')}
      actions={actions}
      size="xl"
      className="max-w-2xl"
    >
      <div className="mt-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-4 py-3 bg-black-700 border border-black-600 rounded-lg 
                     text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-primary-500 
                     focus:border-primary-500 focus:outline-none transition-colors
                     text-lg"
          placeholder={t('search.placeholder')}
          autoFocus
        />
      </div>

      {/* Resultados de búsqueda */}
      {searchTerm && (
        <div className="mt-4 space-y-2">
          <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">
            {t('search.results.title')}
          </div>
          <div className="space-y-1">
            {/* Ejemplo de resultado */}
            <div className="p-3 rounded-md hover:bg-black-700 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-primary-700/30 rounded-md flex items-center justify-center">
                  <SearchIcon className="h-4 w-4 text-primary-400" />
                </div>
                <div className="truncate max-w-[25em]">
                  <div className="text-gray-200">Lorem ipsum dolor</div>
                  <div className="text-sm text-gray-500">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat sed sequi quis
                    quo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SearchModal;
