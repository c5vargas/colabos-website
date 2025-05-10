import CreateButton from '@/contexts/dashboard/components/layout/CreateButton';
import Navigation from '@/contexts/dashboard/components/layout/Navigation';
import AppIcon from '@/contexts/shared/components/ui/AppIcon';
import React from 'react';

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  return (
    <aside
      className={`flex h-full flex-col border-r border-black-700 bg-black-700 ${collapsed ? 'items-center' : ''}`}
    >
      <div className="flex items-center justify-center p-4">
        <div className={`${collapsed ? 'hidden' : 'block'}`}>
          <AppIcon className="text-primary" size="xxl" />
        </div>
        <div className={`text-2xl font-bold text-primary-400 ${collapsed ? 'block' : 'hidden'}`}>
          C
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Navigation collapsed={collapsed} />
      </div>

      <div className={`p-4 ${collapsed ? 'flex w-full justify-center' : ''}`}>
        <CreateButton collapsed={collapsed} />
      </div>
    </aside>
  );
};

export default Sidebar;
