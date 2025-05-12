import LazyWrapper from '@/contexts/shared/components/ui/LazyWrapper';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const LinksPage = lazy(() => import('@/contexts/links/pages/LinksPage'));

const NotesRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <LazyWrapper>
        <LinksPage />
      </LazyWrapper>
    ),
  },
  {
    path: ':noteId',
    element: (
      <LazyWrapper>
        <div>LinkPage</div>
      </LazyWrapper>
    ),
  },
];

export default NotesRoutes;
