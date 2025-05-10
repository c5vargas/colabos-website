import { type Workspace } from '@/contexts/workspace/libs/types';
import { create } from 'zustand';

interface WorkspaceStore {
  workspaces: Workspace[];
  selectedWorkspace: Workspace | null;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setSelectedWorkspace: (workspace: Workspace) => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  workspaces: [],
  selectedWorkspace: null,
  setWorkspaces: (workspaces) => set({ workspaces }),
  setSelectedWorkspace: (workspace) => set({ selectedWorkspace: workspace }),
}));
