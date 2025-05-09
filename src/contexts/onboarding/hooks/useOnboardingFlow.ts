import { useState } from 'react';
import { createWorkspace } from '@/contexts/workspace/actions/createWorkspace';
import { useAuth } from '@clerk/clerk-react';

export interface WorkspaceFormData {
  name: string;
  description: string;
}

interface InviteFormData {
  emails: string[];
}

const steps = ['workspace', 'invite', 'finish'] as const;
type Step = (typeof steps)[number];

export function useOnboardingFlow() {
  const { getToken } = useAuth();
  const [currentStep, setCurrentStep] = useState<Step>('workspace');
  const [workspaceData, setWorkspaceData] = useState<WorkspaceFormData>({
    name: '',
    description: '',
  });
  const [inviteData, setInviteData] = useState<InviteFormData>({
    emails: [],
  });

  const handleWorkspaceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('invite');
  };

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('finish');
  };

  const handleFinishSubmit = async () => {
    try {
      const token = await getToken({ template: 'supabase' });

      await createWorkspace(
        {
          name: 'Mi Workspace',
          description: 'Descripción',
        },
        token
      );
    } catch (error) {
      console.error('Error al crear el workspace:', error);
      throw error;
    }
  };

  return {
    steps,
    currentStep,
    workspaceData,
    inviteData,
    setCurrentStep,
    setWorkspaceData,
    setInviteData,
    handleWorkspaceSubmit,
    handleInviteSubmit,
    handleFinishSubmit,
  };
}
