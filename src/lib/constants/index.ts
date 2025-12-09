/**
 * Constantes de la aplicación Chocolates ASHLIE
 */

import type { CompanySettings, ProductCategory } from '../types';

/**
 * Información de la empresa
 */
export const COMPANY_INFO: CompanySettings = {
  name: 'Chocolates ASHLIE',
  responsible: 'Duvan Torrado Mora',
  phone: '3167141043',
  email: 'ldtorradom@ufpso.edu.co',
  address: 'Cúcuta, Norte de Santander, Colombia',
  shippingCost: 15000,
  currency: 'COP',
  taxRate: 0.19,
};

/**
 * Categorías de productos con metadatos
 */
export const PRODUCT_CATEGORIES: Record<
  ProductCategory,
  { label: string; description: string; color: string }
> = {
  dark: {
    label: 'Chocolate Oscuro',
    description: 'Chocolate negro con alto contenido de cacao',
    color: 'bg-gray-800',
  },
  milk: {
    label: 'Chocolate con Leche',
    description: 'Suave y cremoso, ideal para toda la familia',
    color: 'bg-amber-700',
  },
  white: {
    label: 'Chocolate Blanco',
    description: 'Dulce y delicado con manteca de cacao',
    color: 'bg-amber-100',
  },
  special: {
    label: 'Edición Especial',
    description: 'Creaciones únicas y sabores innovadores',
    color: 'bg-purple-600',
  },
};

/**
 * Prefijo para localStorage
 */
export const STORAGE_PREFIX = 'chocolates_ashlie_';

/**
 * Keys de localStorage
 */
export const STORAGE_KEYS = {
  PRODUCTS: `${STORAGE_PREFIX}products`,
  ORDERS: `${STORAGE_PREFIX}orders`,
  CART: `${STORAGE_PREFIX}cart`,
  SETTINGS: `${STORAGE_PREFIX}settings`,
  THEME: `${STORAGE_PREFIX}theme`,
} as const;

/**
 * Configuración de paginación
 */
export const PAGINATION = {
  PRODUCTS_PER_PAGE: 12,
  ORDERS_PER_PAGE: 10,
} as const;

/**
 * Límites de stock
 */
export const STOCK_LIMITS = {
  LOW_STOCK_THRESHOLD: 10,
  OUT_OF_STOCK: 0,
  MAX_CART_QUANTITY: 50,
} as const;

/**
 * Mensajes de validación
 */
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'Este campo es requerido',
  INVALID_EMAIL: 'Email inválido',
  INVALID_PHONE: 'Teléfono inválido',
  MIN_LENGTH: (min: number) => `Debe tener al menos ${min} caracteres`,
  MAX_LENGTH: (max: number) => `No debe exceder ${max} caracteres`,
  MIN_VALUE: (min: number) => `El valor mínimo es ${min}`,
  MAX_VALUE: (max: number) => `El valor máximo es ${max}`,
} as const;

/**
 * Rutas de la aplicación
 */
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  CART: '/cart',
  DASHBOARD: '/dashboard',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const;

/**
 * Productos iniciales de muestra
 */
export const INITIAL_PRODUCTS = [
  {
    name: 'Chocolate Negro 85%',
    description:
      'Chocolate oscuro con 85% de cacao. Sabor intenso y menos dulce.',
    category: 'dark' as ProductCategory,
    price: 28000,
    ingredients: ['Cacao', 'Azúcar de caña', 'Manteca de cacao'],
    weight: 100,
    stock: 50,
    isFeatured: true,
    imageUrl:"/chocolates/Chocolate_Negro.jpg"
  },
  {
    name: 'Chocolate con Leche Clásico',
    description: 'Suave y cremoso, el favorito de la familia.',
    category: 'milk' as ProductCategory,
    price: 22000,
    ingredients: ['Cacao', 'Leche entera', 'Azúcar', 'Vainilla'],
    weight: 100,
    stock: 75,
    isFeatured: true,
    imageUrl:"/chocolates/Chocolate_con_Leche.jpg"
  },
  {
    name: 'Chocolate Blanco con Fresas',
    description: 'Chocolate blanco premium con trozos de fresa deshidratada.',
    category: 'white' as ProductCategory,
    price: 25000,
    ingredients: [
      'Manteca de cacao',
      'Leche',
      'Azúcar',
      'Fresas deshidratadas',
    ],
    weight: 100,
    stock: 40,
    isFeatured: false,
    imageUrl:"/chocolates/Chocolate_Blanco.jpg"
  },
  {
    name: 'Edición Especial: Café & Almendras',
    description: 'Chocolate negro con granos de café tostado y almendras.',
    category: 'special' as ProductCategory,
    price: 32000,
    ingredients: ['Cacao 70%', 'Café colombiano', 'Almendras', 'Azúcar'],
    weight: 100,
    stock: 30,
    isFeatured: true,
    imageUrl:"/chocolates/Edicion_Especial.jpg"
  },
];

/**
 * Textos de la aplicación
 */
export const APP_TEXTS = {
  HERO_TITLE: 'Chocolates Artesanales con Ingredientes Selectos',
  HERO_SUBTITLE:
    'Elaborados con pasión y dedicación, cada chocolate es una experiencia única',
  ABOUT_MISSION:
    'En Chocolates ASHLIE nos dedicamos a crear experiencias únicas a través de chocolates artesanales de la más alta calidad. Utilizamos ingredientes cuidadosamente seleccionados y técnicas tradicionales para garantizar que cada pieza sea perfecta.',
} as const;
