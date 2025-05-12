import ProfileMenu from '@/contexts/dashboard/components/layout/ProfileMenu';
import SearchButton from '@/contexts/dashboard/components/layout/SearchButton';
import WorkspaceSelector from '@/contexts/dashboard/components/layout/WorkspaceSelector';
import { useT } from '@/contexts/shared/hooks/useT';
import { ChevronLeftIcon, ChevronRightIcon } from '../DashboardIcons';

interface TopBarProps {
  onSearchOpen: () => void;
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ onSearchOpen, onToggleSidebar, isSidebarCollapsed }) => {
  const t = useT();

  return (
    <header className="sticky top-0 z-10 border-b border-black-700 bg-black-800">
      <div className="mx-auto flex h-16 max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {/* Botón para colapsar/expandir sidebar */}
          <button
            onClick={onToggleSidebar}
            className="mr-4 text-gray-400 hover:text-primary-400 focus:outline-none"
          >
            {isSidebarCollapsed ? (
              <ChevronRightIcon className="size-6" />
            ) : (
              <ChevronLeftIcon className="size-6" />
            )}
          </button>

          {/* Selector de Workspace */}
          <WorkspaceSelector />
        </div>

        {/* Búsqueda global y acciones */}
        <div className="flex items-center space-x-4">
          {/* Botón de búsqueda global */}
          <SearchButton onClick={onSearchOpen} />

          {/* Botón de invitar */}
          <button className="rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-black-50 transition-colors hover:bg-primary-500">
            {t('workspace.invite')}
          </button>

          {/* Menú de perfil */}
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
