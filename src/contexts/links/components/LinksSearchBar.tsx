import { SearchIcon } from '@/contexts/dashboard/components/DashboardIcons';
import Input from '@/contexts/shared/components/ui/Input';
import Select from '@/contexts/shared/components/ui/Select';
import { useT } from '@/contexts/shared/hooks/useT';
import React from 'react';

interface LinksSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const LinksSearchBar: React.FC<LinksSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}) => {
  const t = useT();

  const categoryOptions = [...categories.map((category) => ({ value: category, label: category }))];

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="w-full sm:w-1/2">
        <Input
          id="search-links"
          placeholder={t('links.search')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          fullWidth
          icon={<SearchIcon className="h-5 w-5 text-gray-400" />}
        />
      </div>
      <div className="w-full sm:w-1/2">
        <Select
          id="category-filter"
          value={selectedCategory}
          placeholder={t('links.allCategories')}
          onChange={(e) => onCategoryChange(e.target.value)}
          options={categoryOptions}
          fullWidth
        />
      </div>
    </div>
  );
};

export default LinksSearchBar;
