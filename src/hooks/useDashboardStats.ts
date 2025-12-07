/**
 * Hook para obtener estadísticas del dashboard
 */

import { useState, useEffect, useMemo } from 'react';
import type { DashboardStats, Product, Order } from '@/lib/types';
import { storageService } from '@/services/storage.service';
import { STOCK_LIMITS } from '@/lib/constants';

export function useDashboardStats() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, ordersData] = await Promise.all([
        storageService.getProducts(),
        storageService.getOrders(),
      ]);
      setProducts(productsData);
      setOrders(ordersData);
    } catch (error) {
      console.error('Error al cargar datos del dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo((): DashboardStats => {
    // Total de productos
    const totalProducts = products.length;

    // Productos con stock bajo
    const lowStockProducts = products.filter(
      (p) => p.stock > 0 && p.stock <= STOCK_LIMITS.LOW_STOCK_THRESHOLD
    ).length;

    // Total de órdenes
    const totalOrders = orders.length;

    // Órdenes pendientes
    const pendingOrders = orders.filter((o) => o.status === 'pending').length;

    // Ingresos totales
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    // Valor promedio de orden
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Órdenes recientes (últimas 5)
    const recentOrders = [...orders]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);

    // Productos más vendidos
    const productSales = new Map<string, number>();
    orders.forEach((order) => {
      order.products.forEach((item) => {
        const current = productSales.get(item.productId) || 0;
        productSales.set(item.productId, current + item.quantity);
      });
    });

    const topProducts = Array.from(productSales.entries())
      .map(([productId, salesCount]) => {
        const product = products.find((p) => p.id === productId);
        return product ? { product, salesCount } : null;
      })
      .filter((item): item is { product: Product; salesCount: number } => item !== null)
      .sort((a, b) => b.salesCount - a.salesCount)
      .slice(0, 5);

    return {
      totalProducts,
      lowStockProducts,
      totalOrders,
      pendingOrders,
      totalRevenue,
      averageOrderValue,
      recentOrders,
      topProducts,
    };
  }, [products, orders]);

  return {
    stats,
    loading,
    refresh: loadData,
  };
}
