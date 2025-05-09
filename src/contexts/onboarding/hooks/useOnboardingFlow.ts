import { useState } from 'react';

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
  };
}
