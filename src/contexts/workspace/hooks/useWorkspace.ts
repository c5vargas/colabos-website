import { useLinks } from '@/contexts/links/hooks/useLinks';
import { useWorkspaceStore } from '@/contexts/workspace/store/useWorkspaceStore';

export function useWorkspace() {
  const { selectedWorkspace } = useWorkspaceStore();
  const { links } = useLinks();

  return {
    workspace: selectedWorkspace,
    links: links,
  };
}
