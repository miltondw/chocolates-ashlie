/**
 * Componente Modal reutilizable
 */

'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseButton?: boolean;
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
}: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    const modalContent = (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={handleOverlayClick}
        >
            <div
                className={cn(
                    'relative w-full rounded-xl bg-white shadow-xl',
                    sizes[size]
                )}
            >
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        {title && (
                            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                                aria-label="Cerrar modal"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                )}
                <div className="px-6 py-4">{children}</div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}

export function ModalFooter({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'mt-6 flex items-center justify-end gap-3 border-t border-gray-200 pt-4',
                className
            )}
        >
            {children}
        </div>
    );
}
