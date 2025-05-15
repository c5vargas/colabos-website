import { useAnimations } from '@/contexts/shared/hooks/useAnimations';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  closeOnClickOutside?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'md',
  className,
  closeOnClickOutside = true,
}) => {
  const { fastFadeIn } = useAnimations();

  const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnClickOutside && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`mx-auto flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0 ${className}`}
          >
            <motion.div
              className="fixed inset-0 bg-black-900 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={handleBackdropClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>

            <motion.div
              className={`inline-block transform overflow-hidden rounded-lg bg-black-800 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full ${sizeClasses[size]} border border-black-700 sm:align-middle`}
              variants={fastFadeIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Header */}
              {title && (
                <div className="bg-black-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-200" id="modal-title">
                    {title}
                  </h3>
                </div>
              )}

              <div className="bg-black-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">{children}</div>

              {actions && (
                <div className="bg-black-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {actions}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
