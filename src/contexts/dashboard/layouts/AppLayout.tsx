import { useT } from '@/contexts/shared/hooks/useT';
import { useUser } from '@clerk/clerk-react';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  const t = useT();
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">ColabOS</h1>
          <div className="flex items-center space-x-4">
            <span>{t('appLayout.hello', { name: user?.firstName })}</span>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
