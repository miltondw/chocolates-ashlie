/**
 * Servicio de almacenamiento local para la aplicación
 * Implementa el patrón Singleton para gestionar localStorage
 */

import type {
  Product,
  Order,
  CartItem,
  CompanySettings,
} from '@/lib/types';
import {
  STORAGE_KEYS,
  INITIAL_PRODUCTS,
  COMPANY_INFO,
} from '@/lib/constants';
import { generateId } from '@/lib/utils';

/**
 * Clase Singleton para gestionar el almacenamiento local
 */
class StorageService {
  private static instance: StorageService;

  private constructor() {
    // Constructor privado para el patrón Singleton
  }

  /**
   * Obtiene la instancia única del servicio
   */
  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  /**
   * Verifica si estamos en el cliente
   */
  private isClient(): boolean {
    return typeof window !== 'undefined';
  }

  /**
   * Obtiene datos del localStorage de forma segura
   */
  private getItem<T>(key: string, defaultValue: T): T {
    if (!this.isClient()) return defaultValue;

    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;
      return JSON.parse(item, this.dateReviver) as T;
    } catch (error) {
      console.error(`Error al leer ${key}:`, error);
      return defaultValue;
    }
  }

  /**
   * Guarda datos en localStorage de forma segura
   */
  private setItem<T>(key: string, value: T): void {
    if (!this.isClient()) return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error al guardar ${key}:`, error);
    }
  }

  /**
   * Reviver para parsear fechas correctamente
   */
  private dateReviver(_key: string, value: any): any {
    if (typeof value === 'string') {
      const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
      if (dateRegex.test(value)) {
        return new Date(value);
      }
    }
    return value;
  }

  // ==================== PRODUCTS ====================

  /**
   * Obtiene todos los productos
   */
  async getProducts(): Promise<Product[]> {
    const products = this.getItem<Product[]>(STORAGE_KEYS.PRODUCTS, []);

    // Inicializar con productos por defecto si está vacío
    if (products.length === 0) {
      const initialProducts = INITIAL_PRODUCTS.map((p) => ({
        ...p,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await this.setProducts(initialProducts);
      return initialProducts;
    }

    return products;
  }

  /**
   * Obtiene un producto por ID
   */
  async getProductById(id: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find((p) => p.id === id) || null;
  }

  /**
   * Guarda un nuevo producto
   */
  async saveProduct(
    product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Product> {
    const products = await this.getProducts();
    const newProduct: Product = {
      ...product,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    products.push(newProduct);
    this.setItem(STORAGE_KEYS.PRODUCTS, products);
    return newProduct;
  }

  /**
   * Actualiza un producto existente
   */
  async updateProduct(
    id: string,
    updates: Partial<Omit<Product, 'id' | 'createdAt'>>
  ): Promise<Product | null> {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date(),
    };

    this.setItem(STORAGE_KEYS.PRODUCTS, products);
    return products[index];
  }

  /**
   * Elimina un producto
   */
  async deleteProduct(id: string): Promise<boolean> {
    const products = await this.getProducts();
    const filtered = products.filter((p) => p.id !== id);

    if (filtered.length === products.length) return false;

    this.setItem(STORAGE_KEYS.PRODUCTS, filtered);
    return true;
  }

  /**
   * Guarda todos los productos (para inicialización)
   */
  private async setProducts(products: Product[]): Promise<void> {
    this.setItem(STORAGE_KEYS.PRODUCTS, products);
  }

  // ==================== CART ====================

  /**
   * Obtiene el carrito actual
   */
  async getCart(): Promise<CartItem[]> {
    return this.getItem<CartItem[]>(STORAGE_KEYS.CART, []);
  }

  /**
   * Añade un item al carrito
   */
  async addToCart(productId: string, quantity: number): Promise<CartItem[]> {
    const cart = await this.getCart();
    const product = await this.getProductById(productId);

    if (!product) throw new Error('Producto no encontrado');

    const existingItem = cart.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity,
        price: product.price,
      });
    }

    this.setItem(STORAGE_KEYS.CART, cart);
    return cart;
  }

  /**
   * Actualiza la cantidad de un item en el carrito
   */
  async updateCartItem(
    productId: string,
    quantity: number
  ): Promise<CartItem[]> {
    const cart = await this.getCart();
    const item = cart.find((i) => i.productId === productId);

    if (!item) throw new Error('Item no encontrado en el carrito');

    if (quantity <= 0) {
      return this.removeFromCart(productId);
    }

    item.quantity = quantity;
    this.setItem(STORAGE_KEYS.CART, cart);
    return cart;
  }

  /**
   * Elimina un item del carrito
   */
  async removeFromCart(productId: string): Promise<CartItem[]> {
    const cart = await this.getCart();
    const filtered = cart.filter((item) => item.productId !== productId);
    this.setItem(STORAGE_KEYS.CART, filtered);
    return filtered;
  }

  /**
   * Limpia el carrito
   */
  async clearCart(): Promise<void> {
    this.setItem(STORAGE_KEYS.CART, []);
  }

  // ==================== ORDERS ====================

  /**
   * Obtiene todas las órdenes
   */
  async getOrders(): Promise<Order[]> {
    return this.getItem<Order[]>(STORAGE_KEYS.ORDERS, []);
  }

  /**
   * Obtiene una orden por ID
   */
  async getOrderById(id: string): Promise<Order | null> {
    const orders = await this.getOrders();
    return orders.find((o) => o.id === id) || null;
  }

  /**
   * Crea una nueva orden
   */
  async createOrder(
    order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Order> {
    const orders = await this.getOrders();
    const newOrder: Order = {
      ...order,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    orders.push(newOrder);
    this.setItem(STORAGE_KEYS.ORDERS, orders);
    return newOrder;
  }

  /**
   * Actualiza el estado de una orden
   */
  async updateOrderStatus(
    id: string,
    status: Order['status']
  ): Promise<Order | null> {
    const orders = await this.getOrders();
    const order = orders.find((o) => o.id === id);

    if (!order) return null;

    order.status = status;
    order.updatedAt = new Date();

    this.setItem(STORAGE_KEYS.ORDERS, orders);
    return order;
  }

  // ==================== SETTINGS ====================

  /**
   * Obtiene la configuración de la empresa
   */
  async getSettings(): Promise<CompanySettings> {
    return this.getItem<CompanySettings>(STORAGE_KEYS.SETTINGS, COMPANY_INFO);
  }

  /**
   * Actualiza la configuración de la empresa
   */
  async updateSettings(
    settings: Partial<CompanySettings>
  ): Promise<CompanySettings> {
    const current = await this.getSettings();
    const updated = { ...current, ...settings };
    this.setItem(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  }

  // ==================== UTILITY ====================

  /**
   * Exporta todos los datos a JSON
   */
  async exportData(): Promise<string> {
    const data = {
      products: await this.getProducts(),
      orders: await this.getOrders(),
      settings: await this.getSettings(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  }

  /**
   * Limpia todos los datos (con confirmación)
   */
  async clearAllData(): Promise<void> {
    if (!this.isClient()) return;

    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  }
}

// Exportar instancia única
export const storageService = StorageService.getInstance();
