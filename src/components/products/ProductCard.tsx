/**
 * Componente ProductCard para mostrar productos
 */

'use client';

import Image from 'next/image';
import { ShoppingCart, Eye } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/Toast';

interface ProductCardProps {
    product: Product;
    onView?: (product: Product) => void;
}

export function ProductCard({ product, onView }: ProductCardProps) {
    const { addToCart } = useCart();
    const toast = useToast();

    const handleAddToCart = async () => {
        const success = await addToCart(product.id, 1);
        if (success) {
            toast.success(`${product.name} añadido al carrito`);
        } else {
            toast.error('No se pudo añadir al carrito');
        }
    };

    const isOutOfStock = product.stock === 0;
    const isLowStock = product.stock > 0 && product.stock <= 10;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:border-amber-300 hover:-translate-y-1">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-gray-100">
                {product.imageUrl ? (
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                            <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
                                <span className="text-2xl">🍫</span>
                            </div>
                            <p className="text-sm text-gray-400">Sin imagen</p>
                        </div>
                    </div>
                )}

                {/* Badges */}
                <div className="absolute left-3 top-3 flex flex-col gap-2">
                    {product.isFeatured && (
                        <Badge variant="warning">Destacado</Badge>
                    )}
                    {isOutOfStock && <Badge variant="danger">Agotado</Badge>}
                    {isLowStock && <Badge variant="warning">Pocas unidades</Badge>}
                </div>

                {/* Quick Actions */}
                <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    {onView && (
                        <button
                            onClick={() => onView(product)}
                            className="rounded-lg bg-white p-2 shadow-md transition-colors hover:bg-gray-50"
                            aria-label="Ver detalles"
                        >
                            <Eye className="h-5 w-5 text-gray-600" />
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                {/* Category */}
                <span className="mb-2 text-xs font-semibold text-amber-600 uppercase tracking-wide">
                    {PRODUCT_CATEGORIES[product.category].label}
                </span>

                {/* Name */}
                <h3 className="mb-3 line-clamp-2 text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                    {product.name}
                </h3>

                {/* Description */}
                <p className="mb-4 line-clamp-2 flex-1 text-sm text-gray-600 leading-relaxed">
                    {product.description}
                </p>

                {/* Weight */}
                <p className="mb-4 text-sm font-medium text-gray-500">📦 {product.weight}g</p>

                {/* Price & Actions */}
                <div className="flex items-end justify-between gap-3 pt-4 border-t border-gray-100">
                    <div>
                        <p className="text-2xl font-bold text-amber-600 mb-1">
                            {formatPrice(product.price)}
                        </p>
                        <p className="text-xs font-medium text-gray-500">
                            {isOutOfStock ? '❌ Sin stock' : `✓ ${product.stock} disponibles`}
                        </p>
                    </div>

                    <Button
                        size="sm"
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                    >
                        <ShoppingCart className="h-4 w-4" />
                        {isOutOfStock ? 'Agotado' : 'Agregar'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
