import { useLinks } from '@/contexts/links/hooks/useLinks';
import type { Link } from '@/contexts/links/libs/types';
import { useState } from 'react';

interface UseLinksPageReturn {
  links: Link[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  groupByCategory: boolean;
  setGroupByCategory: (group: boolean) => void;
  categories: string[];
}

export const useLinksPage = (): UseLinksPageReturn => {
  const { links } = useLinks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [groupByCategory, setGroupByCategory] = useState(false);

  // Extraer categorías únicas de los enlaces
  const categories = [...new Set(links.map((link) => link.category))].sort();

  return {
    links,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    groupByCategory,
    setGroupByCategory,
    categories,
  };
};
