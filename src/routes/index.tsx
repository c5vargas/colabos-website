import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { lazy, Suspense } from "react";

import LoadingFallback from "@/contexts/shared/components/ui/LoadingFallback";
import NotesRoutes from "@/contexts/notes/routes";

// Lazy loading de layouts
const AuthLayout = lazy(() => import("@/contexts/auth/layouts/AuthLayout"));
const AppLayout = lazy(() => import("@/contexts/dashboard/layouts/AppLayout"));

// Lazy loading de páginas
const DashboardPage = lazy(() => import("@/contexts/dashboard/pages/DashboardPage"));
const NotFoundPage = lazy(() => import("@/contexts/shared/pages/NotFoundPage"));

// Wrapper para componentes lazy
const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LazyWrapper><AuthLayout /></LazyWrapper>,
    children: [
      { index: true, element: <Navigate to="/sign-in" replace /> },
      { path: "sign-in/*", element: <SignIn routing="path" path="/sign-in" /> },
      { path: "sign-up/*", element: <SignUp routing="path" path="/sign-up" /> },
    ],
  },
  {
    path: "/app",
    element: (
      <SignedIn>
        <LazyWrapper><AppLayout /></LazyWrapper>
      </SignedIn>
    ),
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      { path: "dashboard", element: <LazyWrapper><DashboardPage /></LazyWrapper> },
      { path: "notes/*", children: NotesRoutes },
      { path: "tasks/*", children: [] },
      { path: "links/*", children: [] },
      { path: "files/*", children: [] },
    ],
  },
  {
    path: "/app/*",
    element: (
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    ),
  },
  {
    path: "*",
    element: <LazyWrapper><NotFoundPage /></LazyWrapper>,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

