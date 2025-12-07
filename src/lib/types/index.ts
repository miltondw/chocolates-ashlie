/**
 * Tipos centralizados para la aplicación Chocolates ASHLIE
 */

export type ProductCategory = 'dark' | 'milk' | 'white' | 'special';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';
export type Theme = 'light' | 'dark';

/**
 * Interfaz para representar un producto de chocolate
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  ingredients: string[];
  weight: number; // en gramos
  stock: number;
  isFeatured: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interfaz para items en el carrito
 */
export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

/**
 * Interfaz para representar un pedido
 */
export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  address?: string;
  products: Array<{ productId: string; quantity: number; price: number }>;
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interfaz para la configuración de la empresa
 */
export interface CompanySettings {
  name: string;
  responsible: string;
  phone: string;
  email: string;
  address: string;
  shippingCost: number;
  currency: string;
  taxRate: number;
}

/**
 * Interfaz para estadísticas del dashboard
 */
export interface DashboardStats {
  totalProducts: number;
  lowStockProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  recentOrders: Order[];
  topProducts: Array<{ product: Product; salesCount: number }>;
}

/**
 * Tipo para filtros de productos
 */
export interface ProductFilters {
  category?: ProductCategory;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
}

/**
 * Tipo para formulario de contacto
 */
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Tipo para datos de checkout
 */
export interface CheckoutData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}
