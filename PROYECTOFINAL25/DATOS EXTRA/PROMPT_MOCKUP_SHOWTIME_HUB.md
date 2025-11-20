# PROMPT PARA GENERACIÓN DE MOCKUP - SHOWTIME HUB

## 📋 CONTEXTO DEL PROYECTO
Necesito que generes el diseño completo (mockup) de una aplicación web profesional llamada **ShowTime Hub** - una plataforma tipo marketplace para conectar artistas/entertainers con clientes que buscan contratar servicios de entretenimiento.

---

## 🎨 ESPECIFICACIONES DE DISEÑO

### Paleta de Colores
- **Estilo**: Profesional, moderno, minimalista
- **Colores**: Fríos y neutros (azules, grises, blancos)
- **Prohibido**: Gradientes
- **Ejemplos de paleta sugerida**:
  - Azul oscuro profesional: `#1E3A8A` o `#0F172A`
  - Azul medio: `#3B82F6` o `#475569`
  - Gris claro: `#F1F5F9` o `#E2E8F0`
  - Blanco: `#FFFFFF`
  - Gris oscuro para textos: `#334155`
  - Acentos: `#60A5FA` (azul claro para hover/estados activos)

### Framework CSS
- **Tecnología**: Tailwind CSS (todos los estilos deben ser compatibles con Tailwind)
- **Responsive**: Mobile-first design
- **Componentes**: Usar utilidades de Tailwind exclusivamente

---

## 🖥️ PÁGINAS Y FUNCIONALIDADES REQUERIDAS

### 1️⃣ PÁGINA DE INICIO (Landing Page)
**Elementos**:
- Header con logo "ShowTime Hub" y navegación limpia
- Hero section con título impactante y CTA (Call to Action)
- Sección de categorías de artistas (cards con iconos)
- Sección de artistas destacados
- Testimonios
- Footer profesional

**Diseño**:
- Layout limpio con mucho espacio en blanco
- Tipografía moderna (Inter, Poppins o similar)
- CTAs prominentes con colores de acento

---

### 2️⃣ MARKETPLACE DE ARTISTAS (Página Principal de Búsqueda)
**CRÍTICO - Esta es la página más importante**:

**Sistema de Búsqueda y Filtros**:
```
┌─────────────────────────────────────────────────────────┐
│  [🔍 Buscar por nombre...]    [📍 Ubicación ▼]  [💰 Presupuesto ▼]  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  CATEGORÍAS:                                             │
│  [🎭 Todos] [🎸 Músicos] [🎤 Cantantes] [🎪 Magos]     │
│  [🎨 Pintores] [📸 Fotógrafos] [🎬 Actores] [+ Más]    │
└─────────────────────────────────────────────────────────┘
```

**Elementos del Marketplace**:
- **Barra de búsqueda principal**: Input grande y visible
- **Filtros por categoría**: Pills/badges clickeables con iconos
- **Filtro de ubicación**: Dropdown con ciudades/regiones
- **Filtro de presupuesto**: Rango de precios (slider o dropdown)
- **Ordenamiento**: Por relevancia, precio, valoración, etc.
- **Grid de artistas**: Cards modernas estilo Airbnb/Fiverr con:
  - Foto del artista (circular o cuadrada con border-radius)
  - Nombre y categoría
  - Ubicación
  - Precio por hora/evento
  - Rating con estrellas (⭐⭐⭐⭐⭐)
  - Badge de "Verificado" si aplica
  - Botón "Ver perfil"

**Inspiración de diseño**: Airbnb, Fiverr, Upwork (marketplace moderno)

---

### 3️⃣ PERFIL DE ARTISTA (Detalle)
**Secciones**:
- Header con foto de portada y foto de perfil
- Información básica (nombre, categoría, ubicación, precio)
- Galería de fotos/videos del trabajo
- Descripción de servicios
- Reseñas y valoraciones
- Calendario de disponibilidad
- Botón "Contratar" o "Solicitar presupuesto"

---

### 4️⃣ PANEL DE ADMINISTRACIÓN (CRUD)
**Dashboard del Admin**:
- Sidebar con navegación:
  - 📊 Dashboard
  - 👥 Gestión de Usuarios
  - 🎭 Gestión de Artistas
  - 📑 Gestión de Reservas
  - 📊 Reportes
  - ⚙️ Configuración

**Funcionalidades CRUD**:
- **Tabla de datos** con:
  - Búsqueda y filtros
  - Paginación
  - Acciones: Ver, Editar, Eliminar
  - Botón "Agregar nuevo"
- **Modales** para crear/editar registros
- **Cards con estadísticas** en el dashboard (total usuarios, artistas activos, reservas, ingresos)

**Diseño**: Clean admin panel estilo Tailwind UI o shadcn/ui

---

### 5️⃣ REGISTRO E INICIO DE SESIÓN
**Páginas**:
- Login (email + password)
- Registro de Usuario
- Registro de Artista (formulario más extenso)
- Recuperación de contraseña

**Diseño**:
- Formularios centrados con fondo de color sólido
- Validación visual de campos
- Botones grandes y claros

---

### 6️⃣ PERFIL DE USUARIO
**Secciones**:
- Datos personales (editable)
- Historial de reservas
- Artistas favoritos
- Métodos de pago
- Configuración de notificaciones

---

### 7️⃣ PÁGINA DE RESERVA/CONTRATACIÓN
**Flujo**:
1. Seleccionar fecha y hora
2. Seleccionar tipo de servicio
3. Detalles del evento
4. Resumen y confirmación
5. Pago

**Diseño**: Wizard/stepper con pasos claros

---

## 📱 COMPONENTES REUTILIZABLES

### Navbar
```
Logo | Explorar | Categorías | Cómo funciona | [Buscar 🔍] | Login | Registro
```

### Footer
```
Columnas: Sobre nosotros | Categorías | Soporte | Legal | Redes Sociales
```

### Card de Artista (Componente clave)
```
┌─────────────────────────┐
│   [Imagen del artista]  │
│                         │
│  ⭐⭐⭐⭐⭐ (4.8) 120 reseñas│
│  Juan Pérez              │
│  🎸 Músico - Guitarrista│
│  📍 La Paz, Bolivia     │
│  💰 Bs. 500/hora        │
│  [Ver perfil] ──────────│
└─────────────────────────┘
```

---

## 🎯 PRINCIPIOS DE DISEÑO A SEGUIR

1. **Espacio en blanco**: Usa padding y margin generosos
2. **Jerarquía visual**: Tamaños de fuente claros (text-4xl, text-2xl, text-lg)
3. **Consistencia**: Mismos border-radius, sombras, espaciados
4. **Accesibilidad**: Contraste WCAG AA mínimo
5. **Microinteracciones**: Hover states sutiles (scale, shadow)
6. **Iconos**: Usa Heroicons o Lucide (compatibles con Tailwind)
7. **Imágenes**: Placeholder con aspect-ratio correcto
8. **Loading states**: Skeletons con animate-pulse
9. **Estados vacíos**: Mensajes amigables cuando no hay datos

---

## 🛠️ ESPECIFICACIONES TÉCNICAS

### Clases de Tailwind Sugeridas

**Contenedores**:
```
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

**Cards**:
```
bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6
```

**Botones Primarios**:
```
bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors
```

**Inputs**:
```
w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent
```

**Grid de artistas**:
```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
```

---

## 📦 ESTRUCTURA DE ARCHIVOS HTML REQUERIDA

Genera archivos HTML separados para cada página:
- `index.html` - Landing page
- `marketplace.html` - Búsqueda de artistas ⭐
- `artista-detalle.html` - Perfil de artista
- `login.html` - Inicio de sesión
- `registro.html` - Registro
- `registro-artista.html` - Registro de artista
- `admin-dashboard.html` - Panel de administración
- `admin-artistas.html` - CRUD de artistas
- `perfil-usuario.html` - Perfil del usuario
- `reserva.html` - Proceso de reserva

---

## ✅ CHECKLIST DE ENTREGA

Asegúrate de que el mockup incluya:
- [ ] Todas las páginas listadas arriba
- [ ] Navegación funcional entre páginas (links)
- [ ] Sistema de búsqueda completo en marketplace
- [ ] Filtros por categoría, ubicación y presupuesto
- [ ] Grid de artistas responsive
- [ ] Panel de admin con tablas CRUD
- [ ] Formularios de login/registro
- [ ] Diseño 100% Tailwind CSS
- [ ] Paleta de colores fríos/neutros SIN gradientes
- [ ] Diseño profesional y moderno
- [ ] Mobile responsive (sm:, md:, lg:, xl:)
- [ ] Componentes reutilizables
- [ ] Estados hover/active
- [ ] Iconos consistentes

---

## 🎨 REFERENCIAS VISUALES

**Inspírate en**:
- Airbnb (para el marketplace y cards)
- Fiverr (para perfiles de freelancers)
- Stripe Dashboard (para el panel de admin)
- Tailwind UI (para componentes)

**NO copiar, solo inspirarse en**:
- Layout limpio y espaciado
- Sistema de filtros intuitivo
- Cards modernas con sombras sutiles
- Navegación clara

---

## 🚀 ENTREGABLES FINALES

1. **Archivos HTML** completos con Tailwind CDN
2. **Documentación** de la paleta de colores usada
3. **Guía de componentes** principales
4. **Screenshots** o capturas de cada página

---

## 💡 NOTAS ADICIONALES

- Usa placeholder images de Unsplash o similar
- Incluye data dummy realista (nombres, precios, ubicaciones)
- Los iconos deben ser consistentes (un solo set)
- Prioriza la usabilidad sobre la complejidad visual
- El marketplace debe ser la joya de la corona - dedícale especial atención

---

**¡IMPORTANTE!** El resultado debe verse como una aplicación web real, lista para desarrollo. Debe transmitir profesionalismo, confianza y facilidad de uso.
