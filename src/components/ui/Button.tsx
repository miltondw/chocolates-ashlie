/**
 * Componente Button reutilizable con variantes
 */

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            fullWidth = false,
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            'inline-flex items-center justify-center gap-2 rounded-lg font-medium  cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:shadow-md active:scale-95';

        const variants = {
            primary:
                'bg-amber-600 text-white hover:bg-amber-700 focus-visible:ring-amber-600',
            secondary:
                'bg-gray-800 text-white hover:bg-gray-900 focus-visible:ring-gray-800',
            outline:
                'border-2 border-amber-600 text-amber-600 hover:bg-amber-50 focus-visible:ring-amber-600 shadow-none',
            ghost:
                'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500 shadow-none',
            danger:
                'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
        };

        const sizes = {
            sm: 'h-10 px-6 py-2.5 text-sm',
            md: 'h-12 px-8 py-3 text-base',
            lg: 'h-14 px-10 py-4 text-lg',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    fullWidth && 'w-full',
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg
                            className="mr-2 h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Cargando...
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
