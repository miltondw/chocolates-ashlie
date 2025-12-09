/**
 * Página de Catálogo de Productos
 */

'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import type { ProductCategory } from '@/lib/types';

export default function ProductsPage() {
    const { loading, filterProducts } = useProducts();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<
        ProductCategory | 'all'
    >('all');
    const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setShowFeaturedOnly(false);
    };

    const filteredProducts = filterProducts({
        searchQuery: searchQuery || undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        featured: showFeaturedOnly || undefined,
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
                <div className="mb-8 sm:mb-12">
                    <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                        Catálogo de Productos
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600">
                        Descubre nuestra selección de chocolates artesanales
                    </p>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 lg:gap-10">
                    <aside className="lg:col-span-1">
                        <ProductFilters
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            showFeaturedOnly={showFeaturedOnly}
                            onFeaturedToggle={setShowFeaturedOnly}
                            onClearFilters={handleClearFilters}
                        />
                    </aside>

                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="py-12">
                                <LoadingSpinner size="lg" />
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 sm:mb-8 flex items-center justify-between">
                                    <p className="text-sm sm:text-base font-medium text-gray-600">
                                        {filteredProducts.length} producto
                                        {filteredProducts.length !== 1 ? 's' : ''} encontrado
                                        {filteredProducts.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                                <ProductGrid
                                    products={filteredProducts}
                                    emptyMessage="No se encontraron productos que coincidan con los filtros seleccionados"
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
