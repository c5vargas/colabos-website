import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import { useT } from '@/contexts/shared/hooks/useT';
import { useAnimations } from '@/contexts/shared/hooks/useAnimations';
import { useOnboardingFlow } from '@/contexts/onboarding/hooks/useOnboardingFlow';
import { StepIndicator } from '@/contexts/onboarding/components/StepIndicator';
import { WorkspaceStep } from '@/contexts/onboarding/components/WorkspaceStep';
import { InviteStep } from '@/contexts/onboarding/components/InviteStep';
import { FinishStep } from '@/contexts/onboarding/components/FinishStep';

export default function OnboardingPage() {
  const t = useT();
  const { fadeInUp, staggerItems } = useAnimations();
  const { user } = useUser();
  const {
    currentStep,
    workspaceData,
    inviteData,
    steps,
    setWorkspaceData,
    setInviteData,
    setCurrentStep,
    handleWorkspaceSubmit,
    handleInviteSubmit,
  } = useOnboardingFlow();

  return (
    <div className="min-h-screen bg-black-900 text-gray-200">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <motion.div
          variants={staggerItems}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              {t('onboarding.welcome', { name: user?.firstName || 'Usuario' })}
            </h1>
            <p className="text-gray-400 text-lg">{t('onboarding.description')}</p>
          </motion.div>

          <StepIndicator steps={steps} currentStep={currentStep} />

          {currentStep === 'workspace' && (
            <WorkspaceStep
              workspaceData={workspaceData}
              onWorkspaceChange={setWorkspaceData}
              onSubmit={handleWorkspaceSubmit}
            />
          )}
          {currentStep === 'invite' && (
            <InviteStep
              inviteData={inviteData}
              onInviteChange={setInviteData}
              onSubmit={handleInviteSubmit}
              onBack={() => setCurrentStep('workspace')}
            />
          )}
          {currentStep === 'finish' && <FinishStep />}
        </motion.div>
      </div>
    </div>
  );
}
