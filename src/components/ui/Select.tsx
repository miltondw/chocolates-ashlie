/**
 * Componente Select reutilizable
 */

import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, placeholder, id, ...props }, ref) => {
        const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={selectId}
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        {label}
                        {props.required && <span className="ml-1 text-red-500">*</span>}
                    </label>
                )}
                <select
                    ref={ref}
                    id={selectId}
                    className={cn(
                        'flex h-12 w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base transition-all duration-200',
                        'focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/20',
                        'hover:border-gray-400',
                        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
                        error &&
                        'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                        className
                    )}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
        );
    }
);

Select.displayName = 'Select';

export { Select };
