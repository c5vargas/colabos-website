interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnClickOutside?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'md',
  closeOnClickOutside = true,
}) => {
  if (!isOpen) return null;

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
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black-900 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={handleBackdropClick}
        />

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div
          className={`inline-block transform overflow-hidden rounded-lg bg-black-800 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full ${sizeClasses[size]} sm:align-middle border border-black-700`}
        >
          {/* Header */}
          {title && (
            <div className="bg-black-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-200" id="modal-title">
                {title}
              </h3>
            </div>
          )}

          <div className="bg-black-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">{children}</div>

          {actions && (
            <div className="bg-black-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
