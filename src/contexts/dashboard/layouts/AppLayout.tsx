import SearchModal from '@/contexts/dashboard/components/layout/SearchModal';
import Sidebar from '@/contexts/dashboard/components/layout/Sidebar';
import TopBar from '@/contexts/dashboard/components/layout/TopBar';
import { useOnboarding } from '@/contexts/onboarding/hooks/useOnboarding';
import { useWorkspace } from '@/contexts/workspace/hooks/useWorkspace';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  const { isFirstTime, redirectToOnboarding } = useOnboarding();

  useWorkspace();

  useEffect(() => {
    if (isFirstTime) {
      redirectToOnboarding();
    }
  }, [isFirstTime, redirectToOnboarding]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-black-900">
      <div
        className={`fixed z-20 h-full transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <Sidebar collapsed={isSidebarCollapsed} />
      </div>

      <div
        className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <TopBar
          onSearchOpen={handleSearchOpen}
          onToggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <main className="flex-1 overflow-auto bg-black-800 p-6 text-gray-200">
          <div className="mx-auto p-4">
            <Outlet />
          </div>
        </main>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={handleSearchClose} />
    </div>
  );
}
