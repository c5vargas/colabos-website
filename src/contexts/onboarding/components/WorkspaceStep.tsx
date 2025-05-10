import type { WorkspaceFormData } from '@/contexts/onboarding/hooks/useOnboardingFlow';
import { motion } from 'framer-motion';
import { useT } from '@/contexts/shared/hooks/useT';
import { useAnimations } from '@/contexts/shared/hooks/useAnimations';
import Input from '@/contexts/shared/components/ui/Input';
import Textarea from '@/contexts/shared/components/ui/Textarea';
import Button from '@/contexts/shared/components/ui/Button';

interface WorkspaceStepProps {
  workspaceData: WorkspaceFormData;
  onWorkspaceChange: (data: WorkspaceFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const WorkspaceStep: React.FC<WorkspaceStepProps> = ({
  workspaceData,
  onWorkspaceChange,
  onSubmit,
}) => {
  const { fadeInUp } = useAnimations();
  const t = useT();

  return (
    <motion.form
      variants={fadeInUp}
      onSubmit={onSubmit}
      className="bg-black-800 rounded-xl p-8 space-y-6"
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t('onboarding.workspace.title')}</h2>
        <p className="text-gray-400">{t('onboarding.workspace.description')}</p>
      </div>

      <div className="space-y-4">
        <Input
          id="name"
          label={t('onboarding.workspace.nameLabel')}
          value={workspaceData.name}
          onChange={(e) => onWorkspaceChange({ ...workspaceData, name: e.target.value })}
          placeholder={t('onboarding.workspace.namePlaceholder')}
          required
          fullWidth
        />

        <Textarea
          id="description"
          label={t('onboarding.workspace.descriptionLabel')}
          value={workspaceData.description}
          onChange={(e) => onWorkspaceChange({ ...workspaceData, description: e.target.value })}
          placeholder={t('onboarding.workspace.descriptionPlaceholder')}
          className="h-32"
          fullWidth
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="primary">
          {t('onboarding.workspace.continue')}
        </Button>
      </div>
    </motion.form>
  );
};
