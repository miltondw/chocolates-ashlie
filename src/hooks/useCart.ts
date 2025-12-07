/**
 * Hook para gestionar el carrito de compras
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { CartItem, Product } from '@/lib/types';
import { storageService } from '@/services/storage.service';
import { STOCK_LIMITS } from '@/lib/constants';

interface CartItemWithProduct extends CartItem {
  product: Product;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar carrito y productos
  useEffect(() => {
    loadCart();
    loadProducts();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await storageService.getCart();
      setCart(data);
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await storageService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  // Añadir producto al carrito
  const addToCart = useCallback(
    async (productId: string, quantity: number = 1): Promise<boolean> => {
      try {
        const product = products.find((p) => p.id === productId);
        if (!product) {
          console.error('Producto no encontrado');
          return false;
        }

        if (product.stock < quantity) {
          console.error('Stock insuficiente');
          return false;
        }

        const existingItem = cart.find((item) => item.productId === productId);
        const newQuantity = existingItem
          ? existingItem.quantity + quantity
          : quantity;

        if (newQuantity > STOCK_LIMITS.MAX_CART_QUANTITY) {
          console.error('Cantidad máxima excedida');
          return false;
        }

        const updatedCart = await storageService.addToCart(
          productId,
          quantity
        );
        setCart(updatedCart);
        return true;
      } catch (error) {
        console.error('Error al añadir al carrito:', error);
        return false;
      }
    },
    [cart, products]
  );

  // Actualizar cantidad de un item
  const updateQuantity = useCallback(
    async (productId: string, quantity: number): Promise<boolean> => {
      try {
        if (quantity < 1) {
          return removeFromCart(productId);
        }

        const product = products.find((p) => p.id === productId);
        if (!product || product.stock < quantity) {
          console.error('Stock insuficiente');
          return false;
        }

        if (quantity > STOCK_LIMITS.MAX_CART_QUANTITY) {
          console.error('Cantidad máxima excedida');
          return false;
        }

        const updatedCart = await storageService.updateCartItem(
          productId,
          quantity
        );
        setCart(updatedCart);
        return true;
      } catch (error) {
        console.error('Error al actualizar cantidad:', error);
        return false;
      }
    },
    [products]
  );

  // Eliminar item del carrito
  const removeFromCart = useCallback(
    async (productId: string): Promise<boolean> => {
      try {
        const updatedCart = await storageService.removeFromCart(productId);
        setCart(updatedCart);
        return true;
      } catch (error) {
        console.error('Error al eliminar del carrito:', error);
        return false;
      }
    },
    []
  );

  // Limpiar carrito
  const clearCart = useCallback(async (): Promise<void> => {
    try {
      await storageService.clearCart();
      setCart([]);
      // Forzar actualización del localStorage
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error al limpiar el carrito:', error);
    }
  }, []);

  // Items del carrito con información del producto
  const cartItems = useMemo((): CartItemWithProduct[] => {
    return cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return { ...item, product };
      })
      .filter((item): item is CartItemWithProduct => item !== null);
  }, [cart, products]);

  // Subtotal
  const subtotal = useMemo((): number => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  // Número total de items
  const itemCount = useMemo((): number => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Verificar si un producto está en el carrito
  const isInCart = useCallback(
    (productId: string): boolean => {
      return cart.some((item) => item.productId === productId);
    },
    [cart]
  );

  // Obtener cantidad de un producto en el carrito
  const getItemQuantity = useCallback(
    (productId: string): number => {
      const item = cart.find((i) => i.productId === productId);
      return item?.quantity || 0;
    },
    [cart]
  );

  return {
    cart,
    cartItems,
    loading,
    subtotal,
    itemCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isInCart,
    getItemQuantity,
    refresh: loadCart,
  };
}
