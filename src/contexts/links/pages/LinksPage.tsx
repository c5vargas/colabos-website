import LinksCardList from '@/contexts/links/components/LinkCardList';
import LinksSearchBar from '@/contexts/links/components/LinksSearchBar';
import { useLinksPage } from '@/contexts/links/hooks/useLinksPage';
import React from 'react';

const LinksPage: React.FC = () => {
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories } =
    useLinksPage();

  return (
    <>
      <div className="mb-6 space-y-4">
        <LinksSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />
      </div>

      <LinksCardList
        cardStyle="details"
        searchTerm={searchTerm}
        categoryFilter={selectedCategory}
      />
    </>
  );
};

export default LinksPage;
