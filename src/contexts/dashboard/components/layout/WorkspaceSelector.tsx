import { ArrowDownIcon, PlusIcon } from '@/contexts/dashboard/components/DashboardIcons';
import { useAnimations } from '@/contexts/shared/hooks/useAnimations';
import { useT } from '@/contexts/shared/hooks/useT';
import { useWorkspaceSelector } from '@/contexts/workspace/hooks/useWorkspaceSelector';
import { motion } from 'framer-motion';

interface WorkspaceItemProps {
  id: string;
  name: string;
  isSelected?: boolean;
  onSelect: (id: string) => void;
}

/**
 * Componente que representa un item de workspace en la lista desplegable
 */
const WorkspaceItem: React.FC<WorkspaceItemProps> = ({ id, name, isSelected, onSelect }) => {
  const { fadeInLeft } = useAnimations();

  return (
    <motion.div
      variants={fadeInLeft}
      onClick={() => onSelect(id)}
      className={`cursor-pointer px-4 py-2 hover:bg-black-700 ${isSelected ? 'bg-black-700' : ''}`}
    >
      <div className="flex items-center space-x-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 font-bold uppercase text-black-50">
          {name.charAt(0)}
        </div>
        <span className="font-medium text-gray-300">{name}</span>
      </div>
    </motion.div>
  );
};

/**
 * Selector de workspace que permite al usuario cambiar entre sus workspaces
 * y crear nuevos workspaces
 */
const WorkspaceSelector: React.FC = () => {
  const t = useT();
  const { fadeInDown } = useAnimations();
  const {
    isOpen,
    workspaces,
    selectedWorkspace,
    toggleSelector,
    selectWorkspace,
    handleCreateWorkspace,
  } = useWorkspaceSelector();

  return (
    <div className="relative">
      <motion.div
        variants={fadeInDown}
        initial="hidden"
        animate="visible"
        onClick={toggleSelector}
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
      </motion.div>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-md border border-black-700 bg-black-800 shadow-lg">
          <div className="py-1">
            {workspaces.map((workspace) => (
              <WorkspaceItem
                key={workspace.id}
                id={workspace.id}
                name={workspace.name}
                isSelected={selectedWorkspace?.id === workspace.id}
                onSelect={selectWorkspace}
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
