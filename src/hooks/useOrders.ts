/**
 * Hook para gestionar órdenes
 */

import { useState, useEffect, useCallback } from 'react';
import type { Order, CheckoutData, CartItem } from '@/lib/types';
import { storageService } from '@/services/storage.service';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar órdenes iniciales
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await storageService.getOrders();
      setOrders(data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (err) {
      setError('Error al cargar las órdenes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear una nueva orden
  const createOrder = useCallback(
    async (
      checkoutData: CheckoutData,
      cartItems: CartItem[],
      subtotal: number,
      shipping: number
    ): Promise<Order | null> => {
      try {
        setError(null);
        const orderData = {
          customerName: checkoutData.customerName,
          email: checkoutData.email,
          phone: checkoutData.phone,
          address: `${checkoutData.address}, ${checkoutData.city}`,
          products: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
          subtotal,
          shipping,
          total: subtotal + shipping,
          status: 'pending' as const,
          notes: checkoutData.notes,
        };

        const newOrder = await storageService.createOrder(orderData);
        setOrders((prev) => [newOrder, ...prev]);
        return newOrder;
      } catch (err) {
        setError('Error al crear la orden');
        console.error(err);
        return null;
      }
    },
    []
  );

  // Actualizar estado de una orden
  const updateOrderStatus = useCallback(
    async (id: string, status: Order['status']): Promise<boolean> => {
      try {
        setError(null);
        const updated = await storageService.updateOrderStatus(id, status);
        if (updated) {
          setOrders((prev) =>
            prev.map((o) => (o.id === id ? updated : o))
          );
          return true;
        }
        return false;
      } catch (err) {
        setError('Error al actualizar la orden');
        console.error(err);
        return false;
      }
    },
    []
  );

  // Obtener orden por ID
  const getOrderById = useCallback(
    (id: string): Order | undefined => {
      return orders.find((o) => o.id === id);
    },
    [orders]
  );

  // Filtrar órdenes por estado
  const getOrdersByStatus = useCallback(
    (status: Order['status']): Order[] => {
      return orders.filter((o) => o.status === status);
    },
    [orders]
  );

  // Órdenes recientes
  const recentOrders = useCallback((limit: number = 5): Order[] => {
    return orders.slice(0, limit);
  }, [orders]);

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrderStatus,
    getOrderById,
    getOrdersByStatus,
    recentOrders,
    refresh: loadOrders,
  };
}
