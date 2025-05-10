import { CheckCircleIcon } from '@/contexts/onboarding/components/OnboardingIcons';

interface StepIndicatorProps {
  steps: readonly string[];
  currentStep: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => (
  <div className="flex items-center justify-center mb-12">
    {steps.map((step, index) => (
      <div key={step} className="flex items-center">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
            ${
              currentStep === step
                ? 'border-primary-500 bg-primary-500/20 text-primary-500'
                : steps.indexOf(currentStep) > index
                  ? 'border-green-500 bg-green-500/20 text-green-500'
                  : 'border-gray-600 text-gray-500'
            }`}
        >
          {steps.indexOf(currentStep) > index ? <CheckCircleIcon className="w-6 h-6" /> : index + 1}
        </div>
        {index < steps.length - 1 && (
          <div
            className={`w-20 h-0.5 mx-2 ${
              steps.indexOf(currentStep) > index ? 'bg-green-500' : 'bg-gray-600'
            }`}
          />
        )}
      </div>
    ))}
  </div>
);
