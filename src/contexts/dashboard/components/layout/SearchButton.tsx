import { SearchIcon } from '@/contexts/dashboard/components/DashboardIcons';
import { useT } from '@/contexts/shared/hooks/useT';
import React from 'react';

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  const t = useT();

  return (
    <button
      onClick={onClick}
      className="flex items-center rounded-md border border-black-600 bg-black-700 px-3 py-2 text-sm text-gray-300 hover:bg-black-600"
    >
      <SearchIcon />
      <span className="ml-2 hidden md:inline">{t('search.placeholder')}</span>
      <span className="ml-2 text-xs text-gray-500">Ctrl+K</span>
    </button>
  );
};

export default SearchButton;
