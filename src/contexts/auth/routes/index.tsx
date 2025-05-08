import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { lazy } from 'react'

import LazyWrapper from '@/contexts/shared/components/ui/LazyWrapper'

const SignInPage = lazy(() => import('@/contexts/auth/pages/SignInPage'))
const SignUpPage = lazy(() => import('@/contexts/auth/pages/SignUpPage'))

const AuthRoutes: RouteObject[] = [
  { index: true, element: <Navigate to="/sign-in" replace /> },
  {
    path: 'sign-in/*',
    element: (
      <LazyWrapper>
        <SignInPage />
      </LazyWrapper>
    ),
  },
  {
    path: 'sign-up/*',
    element: (
      <LazyWrapper>
        <SignUpPage />
      </LazyWrapper>
    ),
  },
]

export default AuthRoutes
