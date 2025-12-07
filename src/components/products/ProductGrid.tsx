/**
 * Componente ProductGrid para mostrar productos en grid
 */

import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Package } from 'lucide-react';

interface ProductGridProps {
    products: Product[];
    onViewProduct?: (product: Product) => void;
    emptyMessage?: string;
}

export function ProductGrid({
    products,
    onViewProduct,
    emptyMessage = 'No se encontraron productos',
}: ProductGridProps) {
    if (products.length === 0) {
        return (
            <EmptyState
                icon={<Package className="h-10 w-10 text-gray-400" />}
                title="No hay productos"
                description={emptyMessage}
            />
        );
    }

    return (
        <div className="grid place-center items-center bg-red gap-6 grid-cols-2 lg:grid-cols-3 ">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onView={onViewProduct}
                />
            ))}
        </div>
    );
}
