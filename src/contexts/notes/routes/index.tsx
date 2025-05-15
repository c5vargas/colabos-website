import LazyWrapper from '@/contexts/shared/components/ui/LazyWrapper';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const NotesPage = lazy(() => import('@/contexts/notes/pages/NotesPage'));

const NotesRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <LazyWrapper>
        <NotesPage />
      </LazyWrapper>
    ),
  },
  {
    path: ':noteId',
    element: (
      <LazyWrapper>
        <div>NoteDetailPage</div>
      </LazyWrapper>
    ),
  },
];

export default NotesRoutes;
