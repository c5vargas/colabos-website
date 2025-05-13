import LazyWrapper from '@/contexts/shared/components/ui/LazyWrapper';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const MembersPage = lazy(() => import('@/contexts/members/pages/MembersPage'));

const MembersRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <LazyWrapper>
        <MembersPage />
      </LazyWrapper>
    ),
  },
];

export default MembersRoutes;
