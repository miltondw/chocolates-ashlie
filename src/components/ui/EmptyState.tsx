/**
 * Componente EmptyState para listas vacías
 */

import { ReactNode } from 'react';
import { Package } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
                {icon || <Package className="h-10 w-10 text-gray-400" />}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
            {description && (
                <p className="mb-6 max-w-sm text-sm text-gray-600">{description}</p>
            )}
            {action && (
                <Button onClick={action.onClick} variant="primary">
                    {action.label}
                </Button>
            )}
        </div>
    );
}
