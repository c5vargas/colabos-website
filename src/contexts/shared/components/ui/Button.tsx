import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';
import { useT } from '@/contexts/shared/hooks/useT';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const t = useT();

    const baseStyles =
      'font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black-800 transition-colors';

    const variants = {
      primary: 'bg-primary-600 text-black-50 hover:bg-primary-500 focus:ring-primary-500',
      secondary: 'bg-black-700 text-gray-200 hover:bg-black-600 focus:ring-black-500',
      ghost: 'text-gray-400 hover:text-gray-200',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-2',
      lg: 'px-8 py-3 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
            {t('common.loading')}
          </div>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
