import { useT } from '@/contexts/shared/hooks/useT';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  const t = useT();

  return (
    <div className="flex min-h-screen bg-[url('/assets/images/backgrounds/bg-auth.avif')] bg-cover bg-center">
      <div className="hidden lg:flex bg-black/10 lg:w-1/2 relative items-center justify-center">
        <div className="relative z-10 text-center p-8">
          <h1 className="text-4xl font-bold text-white mb-2 text-shadow-lg">
            {t('authLayout.h1')}
          </h1>
          <p className="text-2xl text-white/85 uppercase tracking-wider text-shadow-lg">
            {t('authLayout.p')}
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-black/60 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">{t('authLayout.h2')}</h2>
            <p className="mt-2 text-gray-400">{t('authLayout.descr')}</p>
          </div>

          <div className="mt-8 flex flex-col items-center">
            <Outlet />
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>© 2024 ColabOS. {t('authLayout.footer')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
