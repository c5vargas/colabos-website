import { PlusIcon } from '@/contexts/dashboard/components/DashboardIcons';
import { useT } from '@/contexts/shared/hooks/useT';
import { useState } from 'react';

interface CreateButtonProps {
  collapsed?: boolean;
}

const CreateButton: React.FC<CreateButtonProps> = ({ collapsed = false }) => {
  const t = useT();
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);

  const toggleCreateMenu = () => {
    setIsCreateMenuOpen(!isCreateMenuOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleCreateMenu}
        className={`flex items-center justify-center rounded-md bg-primary-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600 ${
          collapsed ? 'h-10 w-10' : 'w-full'
        }`}
        title={collapsed ? t('actions.create') : undefined}
      >
        <PlusIcon />
        {!collapsed && <span className="ml-1">{t('actions.create')}</span>}
      </button>

      {isCreateMenuOpen && (
        <div
          className={`absolute ${collapsed ? 'left-full ml-2' : 'bottom-full mb-2'} bottom-2 z-50 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5`}
        >
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            {t('create.note')}
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            {t('create.task')}
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            {t('create.link')}
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            {t('create.file')}
          </a>
        </div>
      )}
    </div>
  );
};

export default CreateButton;
