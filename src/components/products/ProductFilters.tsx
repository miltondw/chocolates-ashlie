/**
 * Componente ProductFilters para filtrar productos
 */

'use client';

import { Search, X } from 'lucide-react';
import type { ProductCategory } from '@/lib/types';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

interface ProductFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCategory: ProductCategory | 'all';
    onCategoryChange: (category: ProductCategory | 'all') => void;
    showFeaturedOnly: boolean;
    onFeaturedToggle: (value: boolean) => void;
    onClearFilters: () => void;
}

export function ProductFilters({
    searchQuery,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    showFeaturedOnly,
    onFeaturedToggle,
    onClearFilters,
}: ProductFiltersProps) {
    const hasActiveFilters =
        searchQuery || selectedCategory !== 'all' || showFeaturedOnly;

    return (
        <div className="space-y-4 sm:space-y-6 rounded-xl border-2 border-gray-200 bg-white p-4 sm:p-6 lg:p-8 shadow-lg lg:sticky lg:top-24">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Filtros</h2>

            {/* Search */}
            <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
                    Buscar
                </label>
                <div className="relative">
                    <Search className="absolute left-3 sm:left-4 top-1/2 h-4 sm:h-5 w-4 sm:w-5 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="h-11 sm:h-12 w-full rounded-lg border-2 border-gray-300 pl-10 sm:pl-12 pr-4 text-sm sm:text-base transition-all focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/20 hover:border-gray-400"
                    />
                </div>
            </div>

            {/* Categories */}
            <div>
                <h3 className="mb-3 sm:mb-4 text-sm font-bold text-gray-900">
                    Categorías
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    <button
                        onClick={() => onCategoryChange('all')}
                        className={`rounded-lg px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all shadow-sm ${selectedCategory === 'all'
                            ? 'bg-amber-600 text-white shadow-md scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Todas
                    </button>
                    {Object.entries(PRODUCT_CATEGORIES).map(([key, category]) => (
                        <button
                            key={key}
                            onClick={() => onCategoryChange(key as ProductCategory)}
                            className={`rounded-lg px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all shadow-sm ${selectedCategory === key
                                ? 'bg-amber-600 text-white shadow-md scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-amber-50 rounded-lg">
                <input
                    type="checkbox"
                    id="featured"
                    checked={showFeaturedOnly}
                    onChange={(e) => onFeaturedToggle(e.target.checked)}
                    className="h-4 sm:h-5 w-4 sm:w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                />
                <label htmlFor="featured" className="text-xs sm:text-sm font-medium text-gray-700 cursor-pointer">
                    Solo productos destacados
                </label>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
                <div className="pt-3 sm:pt-4 border-t-2 border-gray-200">
                    <Button
                        variant="outline"
                        size="md"
                        onClick={onClearFilters}
                        fullWidth
                    >
                        <X className="h-4 sm:h-5 w-4 sm:w-5" />
                        Limpiar filtros
                    </Button>
                </div>
            )}
        </div>
    );
}
