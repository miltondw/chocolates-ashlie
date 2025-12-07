/**
 * Componente Card genérico
 */

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ children, className, hoverable = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-xl border border-gray-200 bg-white p-6 shadow-sm',
                    hoverable && 'transition-all duration-200 hover:shadow-lg hover:border-gray-300',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
    return (
        <div ref={ref} className={cn('mb-4', className)} {...props}>
            {children}
        </div>
    );
});

CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<
    HTMLHeadingElement,
    HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => {
    return (
        <h3
            ref={ref}
            className={cn('text-xl font-semibold text-gray-900', className)}
            {...props}
        >
            {children}
        </h3>
    );
});

CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<
    HTMLParagraphElement,
    HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => {
    return (
        <p
            ref={ref}
            className={cn('mt-1 text-sm text-gray-600', className)}
            {...props}
        >
            {children}
        </p>
    );
});

CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
    return (
        <div ref={ref} className={cn('', className)} {...props}>
            {children}
        </div>
    );
});

CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn('mt-6 flex items-center gap-3', className)}
            {...props}
        >
            {children}
        </div>
    );
});

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
