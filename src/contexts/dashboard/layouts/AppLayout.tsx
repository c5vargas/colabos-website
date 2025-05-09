import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '@/contexts/dashboard/components/layout/TopBar';
import Sidebar from '@/contexts/dashboard/components/layout/Sidebar';
import SearchModal from '@/contexts/dashboard/components/layout/SearchModal';

export default function AppLayout() {
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
        className={`fixed h-full transition-all duration-300 ease-in-out z-20 ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <Sidebar collapsed={isSidebarCollapsed} />
      </div>

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <TopBar
          onSearchOpen={handleSearchOpen}
          onToggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <main className="flex-1 overflow-auto p-6 bg-black-800">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={handleSearchClose} />
    </div>
  );
}
