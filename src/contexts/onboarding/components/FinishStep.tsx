import { motion } from 'framer-motion';
import { useT } from '@/contexts/shared/hooks/useT';
import { useNavigate } from 'react-router-dom';
import { useAnimations } from '@/contexts/shared/hooks/useAnimations';

interface FinishStepProps {
  onFinish: () => Promise<void>;
}

export const FinishStep: React.FC<FinishStepProps> = ({ onFinish }) => {
  const t = useT();
  const { fadeInUp } = useAnimations();
  const navigate = useNavigate();

  const handleFinish = async () => {
    await onFinish();
    navigate('/app/dashboard');
  };

  return (
    <motion.div variants={fadeInUp} className="bg-black-800 rounded-xl p-8 space-y-6 text-center">
      <div className="space-y-4">
        <div className="w-20 h-20 mx-auto bg-primary-600/20 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-primary-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">{t('onboarding.finish.title')}</h2>
        <p className="text-gray-400">{t('onboarding.finish.description')}</p>
      </div>

      <button
        onClick={handleFinish}
        className="px-8 py-3 bg-primary-600 text-black-50 rounded-lg font-medium
                 hover:bg-primary-500 focus:outline-none focus:ring-2 
                 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-black-800"
      >
        {t('onboarding.finish.button')}
      </button>
    </motion.div>
  );
};
