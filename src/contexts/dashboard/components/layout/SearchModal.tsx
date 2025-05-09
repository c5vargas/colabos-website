import { useT } from '@/contexts/shared/hooks/useT';
import { useState, useCallback } from 'react';
import { SearchIcon } from '@/contexts/dashboard/components/DashboardIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimations } from '@/contexts/shared/hooks/useAnimations';
import Modal from '@/contexts/shared/components/ui/Modal';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch?: (term: string) => Promise<SearchResult[]>;
}

const SearchResultItem: React.FC<{ result: SearchResult }> = ({ result }) => {
  const { hoverScale, fadeInUp } = useAnimations();

  return (
    <motion.div
      variants={fadeInUp}
      className="result-item p-3 rounded-md hover:bg-black-700 cursor-pointer transition-colors"
      whileHover={hoverScale}
    >
      <div className="flex items-center space-x-3">
        <motion.div
          className="h-8 w-8 bg-primary-700/30 rounded-md flex items-center justify-center"
          whileHover={{ backgroundColor: 'rgba(109, 40, 217, 0.4)' }}
        >
          {result.icon || <SearchIcon className="h-4 w-4 text-primary-400" />}
        </motion.div>
        <div className="truncate max-w-[25em]">
          <div className="text-gray-200">{result.title}</div>
          <div className="text-sm text-gray-500">{result.description}</div>
        </div>
      </div>
    </motion.div>
  );
};

const SearchShortcuts: React.FC = () => {
  const t = useT();

  return (
    <div className="text-xs text-gray-500">
      <kbd className="px-2 py-1 bg-black-700 rounded-md border border-black-600">esc</kbd>
      <span className="mx-1">{t('search.shortcuts.close')}</span>
      <kbd className="px-2 py-1 bg-black-700 rounded-md border border-black-600">↵</kbd>
      <span className="mx-1">{t('search.shortcuts.search')}</span>
    </div>
  );
};

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSearch }) => {
  const t = useT();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const { staggerItems, fadeInUp, fadeIn } = useAnimations();

  const handleSearch = useCallback(
    async (term: string) => {
      setSearchTerm(term);
      if (onSearch && term.trim()) {
        const searchResults = await onSearch(term);
        setResults(searchResults);
      } else {
        setResults([
          {
            id: 'demo',
            title: 'search.demo.title',
            description: 'search.demo.description',
            icon: <SearchIcon className="h-4 w-4 text-gray-400" />,
          },
        ]);
      }
    },
    [onSearch]
  );

  const actions = (
    <div className="flex justify-between items-center w-full">
      <SearchShortcuts />
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
        <motion.input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="block w-full pl-10 pr-4 py-3 bg-black-700 border border-black-600 rounded-lg 
                     text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-primary-500 
                     focus:border-primary-500 focus:outline-none transition-colors
                     text-lg"
          placeholder={t('search.placeholder')}
          autoFocus
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        />
      </div>

      <AnimatePresence>
        {searchTerm && (
          <motion.div
            variants={staggerItems}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 space-y-2"
          >
            <motion.div
              variants={fadeInUp}
              className="text-sm text-gray-400 uppercase tracking-wider mb-2"
            >
              {t('search.results.title')}
            </motion.div>
            <motion.div variants={staggerItems} className="space-y-1">
              {results.map((result) => (
                <SearchResultItem key={result.id} result={result} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default SearchModal;
