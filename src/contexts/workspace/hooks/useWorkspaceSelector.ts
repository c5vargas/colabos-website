import { fetchWorkspaces } from '@/contexts/workspace/actions/fetchWorkspaces';
import { useWorkspaceStore } from '@/contexts/workspace/store/useWorkspaceStore';
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hook personalizado para gestionar la selección de workspaces
 * Maneja la carga de workspaces y la selección del workspace actual
 */
export const useWorkspaceSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { workspaces, selectedWorkspace, setWorkspaces, setSelectedWorkspace } =
    useWorkspaceStore();

  useEffect(() => {
    const loadWorkspaces = async () => {
      try {
        const token = await getToken();
        const workspacesList = await fetchWorkspaces(token);
        setWorkspaces(workspacesList);

        if (workspacesList.length > 0 && !selectedWorkspace) {
          setSelectedWorkspace(workspacesList[0]);
        }
      } catch (error) {
        console.error('Error al cargar los workspaces:', error);
      }
    };

    loadWorkspaces();
  }, [getToken, setSelectedWorkspace, setWorkspaces, selectedWorkspace]);

  const toggleSelector = () => setIsOpen(!isOpen);

  const closeSelector = () => setIsOpen(false);

  const selectWorkspace = (workspaceId: string) => {
    const workspace = workspaces.find((w) => w.id === workspaceId);
    if (workspace) {
      setSelectedWorkspace(workspace);
      closeSelector();
    }
  };

  const handleCreateWorkspace = () => {
    closeSelector();
    navigate('/onboarding');
  };

  return {
    isOpen,
    workspaces,
    selectedWorkspace,
    toggleSelector,
    closeSelector,
    selectWorkspace,
    handleCreateWorkspace,
  };
};
