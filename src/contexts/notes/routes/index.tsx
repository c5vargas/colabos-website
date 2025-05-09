import type { RouteObject } from 'react-router-dom';
import LazyWrapper from '@/contexts/shared/components/ui/LazyWrapper';

const NotesRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <LazyWrapper>
        <div>NotesPage</div>
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
