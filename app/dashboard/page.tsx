/**
 * Dashboard de Gestión
 */

'use client';

import { Package, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatDateTime } from '@/lib/utils';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export default function DashboardPage() {
    const { stats, loading } = useDashboardStats();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    const statusColors = {
        pending: 'warning',
        processing: 'info',
        shipped: 'info',
        delivered: 'success',
    } as const;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="mb-2 text-4xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Resumen general de tu negocio</p>
                </div>

                {/* Stats Cards */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardContent className="flex items-center justify-between p-6">
                            <div>
                                <p className="text-sm text-gray-600">Total Productos</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                            </div>
                            <Package className="h-12 w-12 text-amber-600" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center justify-between p-6">
                            <div>
                                <p className="text-sm text-gray-600">Stock Bajo</p>
                                <p className="text-3xl font-bold text-orange-600">{stats.lowStockProducts}</p>
                            </div>
                            <AlertTriangle className="h-12 w-12 text-orange-600" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center justify-between p-6">
                            <div>
                                <p className="text-sm text-gray-600">Total Pedidos</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                            </div>
                            <ShoppingCart className="h-12 w-12 text-blue-600" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center justify-between p-6">
                            <div>
                                <p className="text-sm text-gray-600">Ingresos Totales</p>
                                <p className="text-2xl font-bold text-green-600">{formatPrice(stats.totalRevenue)}</p>
                            </div>
                            <TrendingUp className="h-12 w-12 text-green-600" />
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Recent Orders */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Pedidos Recientes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {stats.recentOrders.length === 0 ? (
                                <p className="text-center text-gray-500">No hay pedidos recientes</p>
                            ) : (
                                <div className="space-y-4">
                                    {stats.recentOrders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{order.customerName}</p>
                                                <p className="text-sm text-gray-500">{formatDateTime(order.createdAt)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900">{formatPrice(order.total)}</p>
                                                <Badge variant={statusColors[order.status]}>
                                                    {order.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Top Products */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Productos Más Vendidos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {stats.topProducts.length === 0 ? (
                                <p className="text-center text-gray-500">No hay datos de ventas</p>
                            ) : (
                                <div className="space-y-4">
                                    {stats.topProducts.map(({ product, salesCount }) => (
                                        <div key={product.id} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{product.name}</p>
                                                <p className="text-sm text-gray-500">{formatPrice(product.price)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-amber-600">{salesCount}</p>
                                                <p className="text-xs text-gray-500">vendidos</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Acciones Rápidas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <Link href={ROUTES.PRODUCTS} className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-amber-600 hover:bg-amber-50">
                                    <Package className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                                    <p className="font-medium text-gray-900">Ver Productos</p>
                                </Link>
                                <Link href={ROUTES.CART} className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-amber-600 hover:bg-amber-50">
                                    <ShoppingCart className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                                    <p className="font-medium text-gray-900">Nuevo Pedido</p>
                                </Link>
                                <Link href={ROUTES.CONTACT} className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-amber-600 hover:bg-amber-50">
                                    <TrendingUp className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                                    <p className="font-medium text-gray-900">Ver Estadísticas</p>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
