/**
 * Componente Header de navegación
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { ROUTES } from '@/lib/constants';

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { itemCount } = useCart();

    const navigation = [
        { name: 'Inicio', href: ROUTES.HOME },
        { name: 'Productos', href: ROUTES.PRODUCTS },
        { name: 'Nosotros', href: ROUTES.ABOUT },
        { name: 'Contacto', href: ROUTES.CONTACT },
        { name: 'Dashboard', href: ROUTES.DASHBOARD },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-stone-200 bg-white shadow-sm">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href={ROUTES.HOME} className="flex items-center gap-3 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-900">
                            <span className="text-lg font-bold text-white">A</span>
                        </div>
                        <span className="text-lg font-semibold text-stone-900 hidden sm:block">
                            Chocolates ASHLIE
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-1 md:flex">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                                    pathname === item.href
                                        ? 'text-amber-900 bg-amber-50'
                                        : 'text-stone-600 hover:text-amber-900 hover:bg-stone-50'
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Cart Button */}
                        <Link
                            href={ROUTES.CART}
                            className="relative ml-3 rounded-md p-2 text-stone-600 hover:bg-stone-50 hover:text-amber-900 transition-colors"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {itemCount > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-900 text-xs font-bold text-white">
                                    {itemCount > 9 ? '9+' : itemCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile menu button & cart */}
                    <div className="flex items-center gap-2 md:hidden">
                        <Link
                            href={ROUTES.CART}
                            className="relative rounded-lg p-2 text-gray-600 transition-all hover:bg-amber-50 hover:text-amber-600"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {itemCount > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white shadow-lg">
                                    {itemCount > 99 ? '99+' : itemCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
                            aria-label="Menú"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="border-t border-gray-200 py-3 md:hidden space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    'block rounded-lg px-4 py-3 text-base font-medium transition-all',
                                    pathname === item.href
                                        ? 'bg-amber-50 text-amber-600'
                                        : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
}
