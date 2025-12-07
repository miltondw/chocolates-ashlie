/**
 * Esquemas de validación con Zod
 */

import { z } from 'zod';

/**
 * Schema para crear/actualizar un producto
 */
export const productSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no debe exceder 100 caracteres'),
  description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no debe exceder 500 caracteres'),
  category: z.enum(['dark', 'milk', 'white', 'special']),
  price: z
    .number()
    .positive('El precio debe ser mayor a 0')
    .max(1000000, 'El precio no debe exceder 1,000,000'),
  ingredients: z
    .array(z.string())
    .min(1, 'Debe incluir al menos un ingrediente'),
  weight: z
    .number()
    .positive('El peso debe ser mayor a 0')
    .max(5000, 'El peso no debe exceder 5000g'),
  stock: z
    .number()
    .int('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo'),
  isFeatured: z.boolean(),
  imageUrl: z.string().url('URL de imagen inválida').optional().or(z.literal('')),
});

/**
 * Schema para el formulario de contacto
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no debe exceder 100 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z
    .string()
    .regex(/^3\d{9}$/, 'Teléfono debe ser un número colombiano válido (10 dígitos comenzando con 3)')
    .optional()
    .or(z.literal('')),
  subject: z
    .string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(200, 'El asunto no debe exceder 200 caracteres'),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no debe exceder 1000 caracteres'),
});

/**
 * Schema para checkout
 */
export const checkoutSchema = z.object({
  customerName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no debe exceder 100 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z
    .string()
    .regex(/^3\d{9}$/, 'Teléfono debe ser un número colombiano válido'),
  address: z
    .string()
    .min(10, 'La dirección debe tener al menos 10 caracteres')
    .max(200, 'La dirección no debe exceder 200 caracteres'),
  city: z
    .string()
    .min(2, 'La ciudad debe tener al menos 2 caracteres')
    .max(100, 'La ciudad no debe exceder 100 caracteres'),
  postalCode: z
    .string()
    .regex(/^\d{6}$/, 'Código postal inválido (6 dígitos)')
    .optional()
    .or(z.literal('')),
  notes: z
    .string()
    .max(500, 'Las notas no deben exceder 500 caracteres')
    .optional(),
});

/**
 * Schema para actualizar estado de orden
 */
export const orderStatusSchema = z.object({
  status: z.enum(['pending', 'processing', 'shipped', 'delivered']),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type OrderStatusData = z.infer<typeof orderStatusSchema>;
