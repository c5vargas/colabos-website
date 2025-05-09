import { motion } from 'framer-motion';
import { useT } from '@/contexts/shared/hooks/useT';
import { useState } from 'react';
import { useAnimations } from '@/contexts/shared/hooks/useAnimations';
import Input from '@/contexts/shared/components/ui/Input';
import Button from '@/contexts/shared/components/ui/Button';

interface InviteStepProps {
  inviteData: { emails: string[] };
  onInviteChange: (data: { emails: string[] }) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export const InviteStep: React.FC<InviteStepProps> = ({
  inviteData,
  onInviteChange,
  onSubmit,
  onBack,
}) => {
  const t = useT();
  const { fadeInUp } = useAnimations();
  const [email, setEmail] = useState('');

  const handleAddEmail = () => {
    if (email && !inviteData.emails.includes(email)) {
      onInviteChange({ emails: [...inviteData.emails, email] });
      setEmail('');
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    onInviteChange({
      emails: inviteData.emails.filter((e) => e !== emailToRemove),
    });
  };

  return (
    <motion.form
      variants={fadeInUp}
      onSubmit={onSubmit}
      className="bg-black-800 rounded-xl p-8 space-y-6"
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t('onboarding.invite.title')}</h2>
        <p className="text-gray-400">{t('onboarding.invite.description')}</p>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('onboarding.invite.emailPlaceholder')}
            className="flex-1"
            fullWidth
          />
          <Button type="button" onClick={handleAddEmail} variant="primary">
            {t('onboarding.invite.add')}
          </Button>
        </div>

        <div className="space-y-2">
          {inviteData.emails.map((email) => (
            <div
              key={email}
              className="flex items-center justify-between px-4 py-2 bg-black-700 rounded-lg"
            >
              <span className="text-gray-300">{email}</span>
              <button
                type="button"
                onClick={() => handleRemoveEmail(email)}
                className="text-gray-400 hover:text-red-400"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          {t('onboarding.invite.back')}
        </Button>
        <Button type="submit" variant="primary">
          {t('onboarding.invite.continue')}
        </Button>
      </div>
    </motion.form>
  );
};
