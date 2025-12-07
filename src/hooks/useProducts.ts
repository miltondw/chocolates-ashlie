/**
 * Hook para gestionar productos con localStorage
 */

import { useState, useEffect, useCallback } from 'react';
import type { Product, ProductFilters } from '@/lib/types';
import { storageService } from '@/services/storage.service';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar productos iniciales
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await storageService.getProducts();
      setProducts(data);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener un producto por ID
  const getProductById = useCallback(
    (id: string): Product | undefined => {
      return products.find((p) => p.id === id);
    },
    [products]
  );

  // Crear un nuevo producto
  const createProduct = useCallback(
    async (
      productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<Product | null> => {
      try {
        setError(null);
        const newProduct = await storageService.saveProduct(productData);
        setProducts((prev) => [...prev, newProduct]);
        return newProduct;
      } catch (err) {
        setError('Error al crear el producto');
        console.error(err);
        return null;
      }
    },
    []
  );

  // Actualizar un producto
  const updateProduct = useCallback(
    async (
      id: string,
      updates: Partial<Omit<Product, 'id' | 'createdAt'>>
    ): Promise<boolean> => {
      try {
        setError(null);
        const updated = await storageService.updateProduct(id, updates);
        if (updated) {
          setProducts((prev) =>
            prev.map((p) => (p.id === id ? updated : p))
          );
          return true;
        }
        return false;
      } catch (err) {
        setError('Error al actualizar el producto');
        console.error(err);
        return false;
      }
    },
    []
  );

  // Eliminar un producto
  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      const success = await storageService.deleteProduct(id);
      if (success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        return true;
      }
      return false;
    } catch (err) {
      setError('Error al eliminar el producto');
      console.error(err);
      return false;
    }
  }, []);

  // Filtrar productos
  const filterProducts = useCallback(
    (filters: ProductFilters): Product[] => {
      let filtered = [...products];

      if (filters.category) {
        filtered = filtered.filter((p) => p.category === filters.category);
      }

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.ingredients.some((i) => i.toLowerCase().includes(query))
        );
      }

      if (filters.minPrice !== undefined) {
        filtered = filtered.filter((p) => p.price >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
      }

      if (filters.inStock !== undefined && filters.inStock) {
        filtered = filtered.filter((p) => p.stock > 0);
      }

      if (filters.featured !== undefined) {
        filtered = filtered.filter((p) => p.isFeatured === filters.featured);
      }

      return filtered;
    },
    [products]
  );

  // Productos destacados
  const featuredProducts = useCallback((): Product[] => {
    return products.filter((p) => p.isFeatured);
  }, [products]);

  // Productos con stock bajo
  const lowStockProducts = useCallback((threshold: number = 10): Product[] => {
    return products.filter((p) => p.stock > 0 && p.stock <= threshold);
  }, [products]);

  return {
    products,
    loading,
    error,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    filterProducts,
    featuredProducts,
    lowStockProducts,
    refresh: loadProducts,
  };
}
