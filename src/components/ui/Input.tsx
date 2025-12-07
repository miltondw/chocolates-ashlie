/**
 * Componente Input reutilizable
 */

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        {label}
                        {props.required && <span className="ml-1 text-red-500">*</span>}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'flex h-12 w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base transition-all duration-200',
                        'placeholder:text-gray-400',
                        'focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/20',
                        'hover:border-gray-400',
                        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-2 text-sm text-gray-500">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
