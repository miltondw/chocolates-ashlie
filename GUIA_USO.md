# 📘 Guía de Uso - Chocolates ASHLIE

## 🎯 Inicio Rápido

La aplicación funciona completamente con datos locales (LocalStorage), por lo que puedes empezar a usarla inmediatamente.

### Primera Vez

1. **Accede a la aplicación**
   - Abre http://localhost:3000
   - La primera vez se cargarán productos de muestra automáticamente

2. **Explora el catálogo**
   - Navega a "Productos" en el menú
   - Usa los filtros para buscar chocolates
   - Haz clic en "Agregar" para añadir al carrito

3. **Realiza un pedido**
   - Ve al carrito (icono en el header)
   - Ajusta cantidades si es necesario
   - Completa el formulario de checkout
   - ¡Listo! Tu pedido se guardará en el dashboard

## 📱 Funcionalidades por Página

### Landing Page (/)
- **Propósito**: Página principal atractiva
- **Características**:
  - Hero section con información de la empresa
  - Productos destacados
  - Valores y características
  - Llamados a la acción

### Catálogo (/products)
- **Propósito**: Explorar y comprar productos
- **Características**:
  - Búsqueda en tiempo real
  - Filtros por categoría
  - Solo productos destacados
  - Indicadores de stock
  - Añadir al carrito directamente

### Carrito (/cart)
- **Propósito**: Revisar y completar compras
- **Características**:
  - Ver resumen de productos
  - Modificar cantidades
  - Eliminar productos
  - Calcular envío y total
  - Formulario de datos del cliente
  - Crear pedido

### Dashboard (/dashboard)
- **Propósito**: Visualizar estadísticas del negocio
- **Métricas Disponibles**:
  - Total de productos
  - Productos con stock bajo
  - Total de pedidos
  - Ingresos totales
  - Pedidos recientes
  - Productos más vendidos
  - Acciones rápidas

### Nosotros (/about)
- **Propósito**: Información de la empresa
- **Contenido**:
  - Historia y misión
  - Proceso artesanal
  - Valores corporativos
  - Equipo
  - Certificaciones

### Contacto (/contact)
- **Propósito**: Comunicación directa
- **Formulario con**:
  - Nombre, email, teléfono
  - Asunto y mensaje
  - Validación en tiempo real
  - Información de contacto
  - Horarios de atención

## 🔧 Gestión de Datos

### LocalStorage
Todos los datos se guardan en tu navegador:

- **Productos**: `chocolates_ashlie_products`
- **Pedidos**: `chocolates_ashlie_orders`
- **Carrito**: `chocolates_ashlie_cart`
- **Configuración**: `chocolates_ashlie_settings`

### Productos Iniciales
Al cargar la app por primera vez, se crean 4 productos de ejemplo:
1. Chocolate Negro 85%
2. Chocolate con Leche Clásico
3. Chocolate Blanco con Fresas
4. Edición Especial: Café & Almendras

## 🎨 Componentes Principales

### Sistema de Filtros
```tsx
// Ejemplo de uso
<ProductFilters
  searchQuery={query}
  onSearchChange={setQuery}
  selectedCategory={category}
  onCategoryChange={setCategory}
  showFeaturedOnly={featured}
  onFeaturedToggle={setFeatured}
  onClearFilters={clearAll}
/>
```

### Sistema de Notificaciones
```tsx
// En cualquier componente
const toast = useToast();

// Mostrar notificaciones
toast.success('Producto añadido');
toast.error('Error al procesar');
toast.info('Información importante');
toast.warning('Advertencia');
```

### Hook de Productos
```tsx
// Ejemplo de uso
const { 
  products,           // Lista de productos
  loading,           // Estado de carga
  createProduct,     // Crear producto
  updateProduct,     // Actualizar
  deleteProduct,     // Eliminar
  filterProducts,    // Filtrar
  featuredProducts,  // Solo destacados
  lowStockProducts   // Stock bajo
} = useProducts();
```

### Hook de Carrito
```tsx
const { 
  cartItems,         // Items con datos del producto
  subtotal,          // Subtotal de la compra
  itemCount,         // Total de items
  addToCart,         // Añadir producto
  updateQuantity,    // Actualizar cantidad
  removeFromCart,    // Eliminar item
  clearCart,         // Vaciar carrito
  isInCart           // Verificar si está en carrito
} = useCart();
```

## 🚀 Flujo de Trabajo Típico

### Cliente realizando una compra

1. **Explorar productos**
   - Navegar al catálogo
   - Usar filtros y búsqueda
   - Ver detalles de productos

2. **Añadir al carrito**
   - Click en "Agregar" en cada producto
   - Ver notificación de confirmación
   - Contador del carrito se actualiza

3. **Revisar carrito**
   - Click en icono del carrito
   - Ajustar cantidades si es necesario
   - Ver resumen de costos

4. **Completar compra**
   - Llenar formulario de datos
   - Revisar total
   - Click en "Realizar Pedido"
   - Redirección al dashboard

5. **Ver pedido**
   - En el dashboard aparece el pedido
   - Estado inicial: "pending"

## 💾 Persistencia de Datos

### Backup Manual
Para respaldar tus datos:

```javascript
// En la consola del navegador
const data = {
  products: localStorage.getItem('chocolates_ashlie_products'),
  orders: localStorage.getItem('chocolates_ashlie_orders'),
  cart: localStorage.getItem('chocolates_ashlie_cart')
};
console.log(JSON.stringify(data));
// Copiar y guardar el resultado
```

### Limpiar Datos
Para empezar de cero:

```javascript
// En la consola del navegador
localStorage.clear();
// Recargar la página
```

## 🎯 Tips y Buenas Prácticas

1. **Filtros inteligentes**: Combina búsqueda por texto con filtros de categoría
2. **Stock bajo**: Revisa el dashboard regularmente para productos con poco stock
3. **Productos destacados**: Marca como destacados tus mejores productos
4. **Carrito persistente**: El carrito se mantiene aunque cierres el navegador
5. **Validación automática**: Los formularios validan datos en tiempo real

## 🐛 Solución de Problemas

### El carrito está vacío después de recargar
- Verifica que las cookies/localStorage estén habilitadas
- Limpia la caché y recarga

### No aparecen productos
- Abre la consola de desarrollador (F12)
- Busca errores en rojo
- Recarga la página

### Problemas con el formulario
- Verifica que todos los campos requeridos estén llenos
- Revisa los mensajes de validación en rojo
- El teléfono debe tener 10 dígitos comenzando con 3

## 📞 Soporte

Si tienes problemas o sugerencias:

**Email**: ldtorradom@ufpso.edu.co  
**Teléfono**: 3167141043

---

**¡Disfruta usando Chocolates ASHLIE! 🍫**
