/**
 * Página de Carrito de Compras
 */

'use client';

import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useOrders } from '@/hooks/useOrders';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useToast } from '@/components/ui/Toast';
import { formatPrice } from '@/lib/utils';
import { COMPANY_INFO, ROUTES } from '@/lib/constants';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const router = useRouter();
    const { cartItems, subtotal, updateQuantity, removeFromCart, clearCart, loading } = useCart();
    const { createOrder } = useOrders();
    const toast = useToast();
    const [checkoutData, setCheckoutData] = useState({
        customerName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        notes: '',
    });
    const [processing, setProcessing] = useState(false);

    const shipping = COMPANY_INFO.shippingCost;
    const total = subtotal + shipping;

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const order = await createOrder(
                { ...checkoutData, postalCode: '' },
                cartItems,
                subtotal,
                shipping
            );

            if (order) {
                await clearCart();
                toast.success('Pedido realizado correctamente');
                // Pequeño delay para asegurar que el estado se actualice
                setTimeout(() => {
                    router.push(ROUTES.DASHBOARD);
                }, 100);
            } else {
                toast.error('Error al procesar el pedido');
            }
        } catch {
            toast.error('Error al procesar el pedido');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <div className="flex min-h-screen items-center justify-center"><LoadingSpinner size="lg" /></div>;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
                <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                    <EmptyState
                        icon={<ShoppingBag className="h-12 w-12 text-gray-400" />}
                        title="Tu carrito está vacío"
                        description="Agrega productos a tu carrito para continuar"
                        action={{
                            label: 'Ver Productos',
                            onClick: () => router.push(ROUTES.PRODUCTS),
                        }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 lg:py-16">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                <div className="mb-10">
                    <Link href={ROUTES.PRODUCTS} className="mb-6 inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                        Continuar comprando
                    </Link>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Carrito de Compras</h1>
                    <p className="mt-2 text-gray-600">Revisa tus productos y completa tu pedido</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.productId} className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex gap-6">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 shadow-inner">
                                        <span className="text-4xl">🍫</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.product.name}</h3>
                                        <p className="text-base text-amber-600 font-semibold mb-4">{formatPrice(item.price)}</p>
                                        <div className="flex items-center gap-3">
                                            <Button size="sm" variant="outline" onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="h-9 w-9 p-0">
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                                            <Button size="sm" variant="outline" onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="h-9 w-9 p-0">
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.productId)} className="ml-auto text-red-600 hover:bg-red-50">
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Form */}
                    <div className="lg:col-span-1">
                        <form onSubmit={handleCheckout} className="rounded-xl border-2 border-gray-200 bg-white p-8 shadow-lg sticky top-24">
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">Resumen del Pedido</h2>

                            <div className="mb-8 space-y-3 border-b-2 border-gray-200 pb-6">
                                <div className="flex justify-between text-base">
                                    <span className="text-gray-600 font-medium">Subtotal</span>
                                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-base">
                                    <span className="text-gray-600 font-medium">Envío</span>
                                    <span className="font-semibold">{formatPrice(shipping)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold pt-2">
                                    <span>Total</span>
                                    <span className="text-amber-600">{formatPrice(total)}</span>
                                </div>
                            </div>

                            <div className="space-y-5 mb-8">
                                <Input label="Nombre" name="customerName" required value={checkoutData.customerName} onChange={(e) => setCheckoutData({ ...checkoutData, customerName: e.target.value })} />
                                <Input label="Email" name="email" type="email" required value={checkoutData.email} onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })} />
                                <Input label="Teléfono" name="phone" required value={checkoutData.phone} onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })} />
                                <Input label="Dirección" name="address" required value={checkoutData.address} onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })} />
                                <Input label="Ciudad" name="city" required value={checkoutData.city} onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })} />
                            </div>

                            <Button type="submit" fullWidth size="lg" isLoading={processing}>Realizar Pedido</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
