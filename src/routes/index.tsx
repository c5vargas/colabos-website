import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { lazy } from 'react';

import LazyWrapper from '@/contexts/shared/components/ui/LazyWrapper';
import NotesRoutes from '@/contexts/notes/routes';
import AuthRoutes from '@/contexts/auth/routes';
import LanguageWrapper from '@/contexts/shared/components/locale/LanguageWrapper';

const AuthLayout = lazy(() => import('@/contexts/auth/layouts/AuthLayout'));
const AppLayout = lazy(() => import('@/contexts/dashboard/layouts/AppLayout'));

const DashboardPage = lazy(() => import('@/contexts/dashboard/pages/DashboardPage'));
const OnboardingPage = lazy(() => import('@/contexts/onboarding/pages/OnboardingPage'));
const NotFoundPage = lazy(() => import('@/contexts/shared/pages/NotFoundPage'));

const router = createBrowserRouter([
  {
    path: '/auth',
    element: (
      <LazyWrapper>
        <AuthLayout />
      </LazyWrapper>
    ),
    children: AuthRoutes,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/app',
    element: (
      <SignedIn>
        <LazyWrapper>
          <AppLayout />
        </LazyWrapper>
      </SignedIn>
    ),
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      {
        path: 'dashboard',
        element: (
          <LazyWrapper>
            <DashboardPage />
          </LazyWrapper>
        ),
      },
      { path: 'notes/*', children: NotesRoutes },
      { path: 'tasks/*', children: [] },
      { path: 'links/*', children: [] },
    ],
  },
  {
    path: '/app/*',
    element: (
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    ),
  },
  {
    path: '*',
    element: (
      <LazyWrapper>
        <NotFoundPage />
      </LazyWrapper>
    ),
  },
]);

export default function AppRouter() {
  return (
    <LanguageWrapper>
      <RouterProvider router={router} />
    </LanguageWrapper>
  );
}
