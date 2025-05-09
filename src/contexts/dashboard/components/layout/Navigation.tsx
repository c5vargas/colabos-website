import { useT } from '@/contexts/shared/hooks/useT';
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  LinksIcon,
  MembersIcon,
  NotesIcon,
  SettingsIcon,
  TasksIcon,
} from '../DashboardIcons';

interface NavigationProps {
  collapsed?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ collapsed = false }) => {
  const t = useT();

  const navItems = [
    { to: '/app/dashboard', icon: <HomeIcon />, label: t('nav.home') },
    { to: '/app/notes', icon: <NotesIcon />, label: t('nav.notes') },
    { to: '/app/tasks', icon: <TasksIcon />, label: t('nav.tasks') },
    { to: '/app/links', icon: <LinksIcon />, label: t('nav.links') },
    { to: '/app/members', icon: <MembersIcon />, label: t('nav.members') },
    { to: '/app/settings', icon: <SettingsIcon />, label: t('nav.settings') },
  ];

  return (
    <nav className={`space-y-1 px-2 py-4 ${collapsed ? 'w-full' : ''}`}>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center rounded-md px-2 py-2 text-sm font-medium ${
              collapsed ? 'justify-center' : ''
            } ${
              isActive
                ? 'bg-black-700 text-primary-400'
                : 'text-gray-400 hover:bg-black-700 hover:text-primary-300'
            }`
          }
          title={collapsed ? item.label : undefined}
        >
          <div className={collapsed ? 'text-xl' : ''}>{item.icon}</div>
          {!collapsed && <span className="ml-3">{item.label}</span>}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
