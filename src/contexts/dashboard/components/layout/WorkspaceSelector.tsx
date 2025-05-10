import { ArrowDownIcon, PlusIcon } from '@/contexts/dashboard/components/DashboardIcons';
import { useT } from '@/contexts/shared/hooks/useT';
import { fetchWorkspaces } from '@/contexts/workspace/actions/fetchWorkspaces';
import { useWorkspaceStore } from '@/contexts/workspace/store/useWorkspaceStore';
import { useAuth } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface WorkspaceItemProps {
  name: string;
  isSelected?: boolean;
  onClick: () => void;
}

const WorkspaceItem: React.FC<WorkspaceItemProps> = ({ name, isSelected, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer px-4 py-2 hover:bg-black-700 ${isSelected ? 'bg-black-700' : ''}`}
  >
    <div className="flex items-center space-x-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 font-bold uppercase text-black-50">
        {name.charAt(0)}
      </div>
      <span className="font-medium text-gray-300">{name}</span>
    </div>
  </div>
);

const WorkspaceSelector: React.FC = () => {
  const t = useT();
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
  }, [selectedWorkspace, getToken, setSelectedWorkspace, setWorkspaces]);

  const handleCreateWorkspace = () => {
    setIsOpen(false);
    navigate('/onboarding');
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center space-x-3 rounded-md border border-black-700 bg-black-800 px-3 py-2 transition-colors hover:bg-black-700"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 font-bold uppercase text-black-50">
          {selectedWorkspace?.name.charAt(0) || 'W'}
        </div>
        <span className="font-medium text-gray-300">
          {selectedWorkspace?.name || t('workspace.default')}
        </span>
        <ArrowDownIcon
          className={`size-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-md border border-black-700 bg-black-800 shadow-lg">
          <div className="py-1">
            {workspaces.map((workspace) => (
              <WorkspaceItem
                key={workspace.id}
                name={workspace.name}
                isSelected={selectedWorkspace?.id === workspace.id}
                onClick={() => {
                  setSelectedWorkspace(workspace);
                  setIsOpen(false);
                }}
              />
            ))}

            <div className="mt-1 border-t border-black-700 pt-1">
              <div
                onClick={handleCreateWorkspace}
                className="flex cursor-pointer items-center space-x-3 px-4 py-2 text-primary-400 hover:bg-black-700"
              >
                <PlusIcon className="h-5 w-5" />
                <span className="font-medium">{t('workspace.create')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceSelector;
