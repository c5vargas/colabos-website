import { useT } from '@/contexts/shared/hooks/useT';
import Modal from '@/contexts/shared/components/ui/Modal';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const t = useT();

  const actions = (
    <button
      type="button"
      className="mt-3 inline-flex w-full justify-center rounded-md border border-black-600 bg-black-800 px-4 py-2 text-base font-medium text-gray-300 shadow-sm hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      onClick={onClose}
    >
      {t('actions.close')}
    </button>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('search.title')} actions={actions} size="lg">
      <div className="mt-2">
        <input
          type="text"
          className="block w-full rounded-md bg-black-700 border-black-600 text-gray-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          placeholder={t('search.placeholder')}
          autoFocus
        />
      </div>
    </Modal>
  );
};

export default SearchModal;
