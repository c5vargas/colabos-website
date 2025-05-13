interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder,
  label,
  required = false,
  fullWidth = false,
  className = '',
}) => {
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-md border border-gray-300 bg-black-800 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
