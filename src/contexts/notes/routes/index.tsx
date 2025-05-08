import type { RouteObject } from "react-router-dom";
import { Suspense } from "react";

import LoadingFallback from "@/contexts/shared/components/ui/LoadingFallback";

const NotesRoutes: RouteObject[] = [
  { 
    index: true, 
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <div>NotesPage</div>
      </Suspense>
    ) 
  },
  { 
    path: ":noteId", 
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <div>NoteDetailPage</div>
      </Suspense>
    ) 
  },
];

export default NotesRoutes;