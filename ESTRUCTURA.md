# 📦 Estructura del Proyecto - Chocolates ASHLIE

## 📁 Estructura Completa de Archivos

```
chocolates-ashlie/
├── app/                           # Next.js App Router
│   ├── about/
│   │   └── page.tsx              # Página Nosotros
│   ├── cart/
│   │   └── page.tsx              # Carrito de compras
│   ├── contact/
│   │   └── page.tsx              # Página de contacto
│   ├── dashboard/
│   │   └── page.tsx              # Dashboard administrativo
│   ├── products/
│   │   └── page.tsx              # Catálogo de productos
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Landing page
│
├── src/
│   ├── components/
│   │   ├── ui/                   # Componentes UI base
│   │   │   ├── Badge.tsx         # Etiquetas de estado
│   │   │   ├── Button.tsx        # Botón reutilizable
│   │   │   ├── Card.tsx          # Sistema de cards
│   │   │   ├── EmptyState.tsx    # Estado vacío
│   │   │   ├── Input.tsx         # Campo de texto
│   │   │   ├── LoadingSpinner.tsx # Indicador de carga
│   │   │   ├── Modal.tsx         # Modal con portal
│   │   │   ├── Select.tsx        # Selector dropdown
│   │   │   ├── Textarea.tsx      # Área de texto
│   │   │   └── Toast.tsx         # Sistema de notificaciones
│   │   │
│   │   ├── layout/              # Componentes de layout
│   │   │   ├── Footer.tsx       # Pie de página
│   │   │   └── Header.tsx       # Navegación principal
│   │   │
│   │   └── products/            # Componentes de productos
│   │       ├── ProductCard.tsx  # Card de producto
│   │       ├── ProductFilters.tsx # Filtros
│   │       └── ProductGrid.tsx  # Grid de productos
│   │
│   ├── hooks/                   # Custom hooks
│   │   ├── useCart.ts          # Hook del carrito
│   │   ├── useDashboardStats.ts # Hook de estadísticas
│   │   ├── useLocalStorage.ts  # Hook genérico localStorage
│   │   ├── useOrders.ts        # Hook de pedidos
│   │   └── useProducts.ts      # Hook de productos
│   │
│   ├── lib/
│   │   ├── constants/
│   │   │   └── index.ts        # Constantes de la app
│   │   ├── types/
│   │   │   └── index.ts        # Tipos TypeScript
│   │   ├── utils/
│   │   │   └── index.ts        # Funciones utilitarias
│   │   └── validations/
│   │       └── index.ts        # Esquemas de validación Zod
│   │
│   └── services/
│       └── storage.service.ts   # Servicio de LocalStorage
│
├── public/                      # Archivos estáticos
├── .prettierrc                  # Configuración Prettier
├── eslint.config.mjs           # Configuración ESLint
├── next.config.ts              # Configuración Next.js
├── package.json                # Dependencias del proyecto
├── postcss.config.mjs          # Configuración PostCSS
├── tsconfig.json               # Configuración TypeScript
├── GUIA_USO.md                 # Guía de uso detallada
├── ESTRUCTURA.md               # Este archivo
└── README.md                   # Documentación principal
```

## 🎯 Descripción de Componentes Clave

### Páginas (app/)

**Landing Page (page.tsx)**
- Hero section con CTA
- Sección de características
- Productos destacados
- Información de la empresa

**Catálogo (products/page.tsx)**
- Grid de productos
- Sistema de filtros
- Búsqueda en tiempo real
- Paginación

**Carrito (cart/page.tsx)**
- Lista de productos
- Ajuste de cantidades
- Formulario de checkout
- Resumen de compra

**Dashboard (dashboard/page.tsx)**
- Métricas principales
- Pedidos recientes
- Productos más vendidos
- Alertas de stock

**Nosotros (about/page.tsx)**
- Historia de la empresa
- Proceso de elaboración
- Valores y misión
- Equipo

**Contacto (contact/page.tsx)**
- Formulario validado
- Información de contacto
- Horarios

### Componentes UI (src/components/ui/)

**Button.tsx**
- 5 variantes: primary, secondary, outline, ghost, danger
- 3 tamaños: sm, md, lg
- Estado de carga integrado
- Soporte fullWidth

**Card.tsx**
- Sistema modular: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- Variante hoverable
- Personalizable con className

**Input.tsx / Textarea.tsx / Select.tsx**
- Label automático
- Mensajes de error
- Texto de ayuda
- Validación visual
- Required indicator

**Modal.tsx**
- Portal a document.body
- Overlay con backdrop
- Cerrar con ESC o click fuera
- 4 tamaños: sm, md, lg, xl
- ModalFooter para acciones

**Toast.tsx**
- Provider global
- 4 tipos: success, error, info, warning
- Auto-dismiss configurable
- Stack de notificaciones
- Hook useToast

**LoadingSpinner.tsx**
- 3 tamaños
- LoadingOverlay para pantalla completa

**EmptyState.tsx**
- Icono personalizable
- Título y descripción
- Acción opcional

**Badge.tsx**
- 5 variantes: default, success, warning, danger, info

### Custom Hooks (src/hooks/)

**useProducts**
```typescript
{
  products: Product[]
  loading: boolean
  error: string | null
  getProductById: (id: string) => Product | undefined
  createProduct: (data) => Promise<Product | null>
  updateProduct: (id, updates) => Promise<boolean>
  deleteProduct: (id) => Promise<boolean>
  filterProducts: (filters) => Product[]
  featuredProducts: () => Product[]
  lowStockProducts: (threshold) => Product[]
  refresh: () => Promise<void>
}
```

**useCart**
```typescript
{
  cart: CartItem[]
  cartItems: CartItemWithProduct[]
  loading: boolean
  subtotal: number
  itemCount: number
  addToCart: (productId, quantity) => Promise<boolean>
  updateQuantity: (productId, quantity) => Promise<boolean>
  removeFromCart: (productId) => Promise<boolean>
  clearCart: () => Promise<void>
  isInCart: (productId) => boolean
  getItemQuantity: (productId) => number
  refresh: () => Promise<void>
}
```

**useOrders**
```typescript
{
  orders: Order[]
  loading: boolean
  error: string | null
  createOrder: (data, items, subtotal, shipping) => Promise<Order | null>
  updateOrderStatus: (id, status) => Promise<boolean>
  getOrderById: (id) => Order | undefined
  getOrdersByStatus: (status) => Order[]
  recentOrders: (limit) => Order[]
  refresh: () => Promise<void>
}
```

**useDashboardStats**
```typescript
{
  stats: {
    totalProducts: number
    lowStockProducts: number
    totalOrders: number
    pendingOrders: number
    totalRevenue: number
    averageOrderValue: number
    recentOrders: Order[]
    topProducts: Array<{product: Product, salesCount: number}>
  }
  loading: boolean
  refresh: () => Promise<void>
}
```

### Servicios (src/services/)

**storage.service.ts**
- Patrón Singleton
- Métodos CRUD para:
  - Productos
  - Pedidos
  - Carrito
  - Configuración
- Manejo de errores
- Reviver para fechas
- Exportación de datos

### Utilidades (src/lib/)

**utils/index.ts**
- `cn()` - Combinar clases Tailwind
- `formatPrice()` - Formatear precios COP
- `formatDate()` - Formatear fechas
- `formatDateTime()` - Fecha con hora
- `generateId()` - Generar IDs únicos
- `isValidEmail()` - Validar email
- `isValidPhone()` - Validar teléfono
- `truncate()` - Truncar texto
- `slugify()` - Crear slugs
- `debounce()` - Debounce function
- `groupBy()` - Agrupar arrays
- `sortBy()` - Ordenar arrays

**validations/index.ts**
- `productSchema` - Validación de productos
- `contactFormSchema` - Validación de contacto
- `checkoutSchema` - Validación de checkout
- `orderStatusSchema` - Validación de estado de orden

**constants/index.ts**
- COMPANY_INFO
- PRODUCT_CATEGORIES
- STORAGE_KEYS
- PAGINATION
- STOCK_LIMITS
- VALIDATION_MESSAGES
- ROUTES
- INITIAL_PRODUCTS
- APP_TEXTS

**types/index.ts**
- Product
- Order
- CartItem
- CompanySettings
- DashboardStats
- ProductFilters
- ContactForm
- CheckoutData

## 🔄 Flujo de Datos

1. **Inicialización**
   - App carga → StorageService verifica localStorage
   - Si vacío → carga productos iniciales
   - Hooks se suscriben a cambios

2. **Gestión de Productos**
   - useProducts → StorageService → localStorage
   - CRUD operations actualizan estado local
   - Re-render automático de componentes

3. **Carrito de Compras**
   - useCart mantiene sincronización
   - Operaciones persisten inmediatamente
   - Validación de stock en tiempo real

4. **Creación de Pedidos**
   - Checkout → useOrders.createOrder()
   - Limpia carrito automáticamente
   - Actualiza estadísticas del dashboard

5. **Dashboard**
   - useDashboardStats calcula métricas
   - Reactivo a cambios en productos/pedidos
   - Actualización en tiempo real

## 📊 Persistencia de Datos

### LocalStorage Keys
```
chocolates_ashlie_products  → Product[]
chocolates_ashlie_orders    → Order[]
chocolates_ashlie_cart      → CartItem[]
chocolates_ashlie_settings  → CompanySettings
```

### Formato de Datos
Todos los datos se guardan como JSON string con soporte para:
- Fechas (Date objects)
- Números decimales
- Arrays y objetos anidados

## 🎨 Sistema de Diseño

### Colores Principales
- Amber (600-700): Color de marca
- Gray: Tonos neutros
- Red: Errores
- Green: Éxito
- Yellow: Advertencias
- Blue: Información

### Espaciado
- Gap estándar: 4, 6, 8 (1rem, 1.5rem, 2rem)
- Padding: 4, 6, 8
- Margin: 4, 8, 12

### Tipografía
- Font: Inter (Google Fonts)
- Tamaños: text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl

### Bordes
- Radius: rounded-lg, rounded-xl
- Width: border, border-2

## 🚀 Próximas Mejoras Sugeridas

1. **CRUD de Productos en Dashboard**
   - Modal para crear/editar productos
   - Subida de imágenes
   - Gestión de inventario

2. **Gestión de Pedidos**
   - Cambiar estado de pedidos
   - Filtrar por estado
   - Exportar a PDF/CSV

3. **Autenticación**
   - Login de admin
   - Protección de rutas

4. **PWA**
   - Service Worker
   - Offline support
   - Instalación en dispositivos

5. **Notificaciones**
   - Email al crear pedido
   - Alertas de stock bajo

---

**Estructura diseñada siguiendo principios SOLID y Clean Architecture**
