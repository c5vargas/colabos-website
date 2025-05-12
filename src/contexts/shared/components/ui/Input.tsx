import { type ReactNode } from 'react';

interface InputProps {
  id?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
  icon?: ReactNode;
}

const Input: React.FC<InputProps> = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  required = false,
  fullWidth = false,
  className = '',
  icon,
}) => {
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-md border border-gray-300 bg-black-800 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 ${
            icon ? 'pl-10' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default Input;
