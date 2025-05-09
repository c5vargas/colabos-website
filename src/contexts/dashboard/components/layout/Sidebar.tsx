import React from 'react';
import Navigation from '@/contexts/dashboard/components/layout/Navigation';
import CreateButton from '@/contexts/dashboard/components/layout/CreateButton';
import AppIcon from '@/contexts/shared/components/ui/AppIcon';

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  return (
    <aside
      className={`h-full bg-black-700 border-r border-black-700 flex flex-col ${collapsed ? 'items-center' : ''}`}
    >
      <div className="p-4 flex items-center justify-center">
        <div className={`${collapsed ? 'hidden' : 'block'}`}>
          <AppIcon className="text-primary" size="xxl" />
        </div>
        <div className={`text-primary-400 font-bold text-2xl ${collapsed ? 'block' : 'hidden'}`}>
          C
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Navigation collapsed={collapsed} />
      </div>

      <div className={`p-4 ${collapsed ? 'w-full flex justify-center' : ''}`}>
        <CreateButton collapsed={collapsed} />
      </div>
    </aside>
  );
};

export default Sidebar;
