# ANÁLISIS DE MOCKUPS - FUNCIONALIDADES BACKEND REQUERIDAS
## ShowTime Hub - Plataforma de Contratación de Artistas

---

## 1. LANDING PAGE (showtime_hub_landing_page)

### Elementos Visuales:
- Hero section con imagen de fondo
- Navegación principal con enlaces
- Botones CTA: "Encuentra un Artista" y "Conviértete en Artista"
- Sección "Explora por Categoría" con tarjetas de categorías
- Sección "Contratación Simplificada" con 3 pasos

### Funcionalidades Backend Necesarias:
- **GET /api/categorias** - Listar categorías de artistas (Músicos, Magos, Bailarines, Comediantes, etc.)
- **GET /api/artistas/destacados** - Obtener artistas destacados para mostrar en landing
- **GET /api/categorias/:id/artistas** - Listar artistas por categoría
- Contenido estático para secciones informativas

---

## 2. LOGIN Y REGISTRO

### 2.1 Login (user_login_*)

#### Elementos Visuales:
- Formulario con email y contraseña
- Opción "¿Olvidaste la Contraseña?"
- Botón "Iniciar Sesión"
- Opciones de login con Google y Facebook
- Toggle para mostrar/ocultar contraseña

#### Funcionalidades Backend:
- **POST /api/autenticacion/login** - Autenticación de usuarios
  - Body: `{ email, password }`
  - Response: `{ token, usuario: { id, nombre, email, rol, avatar } }`
- **POST /api/autenticacion/login/google** - Login con Google OAuth
- **POST /api/autenticacion/login/facebook** - Login con Facebook OAuth
- **POST /api/autenticacion/recuperar-password** - Recuperación de contraseña
  - Body: `{ email }`
  - Enviar email con token de recuperación
- **POST /api/autenticacion/resetear-password** - Cambiar contraseña con token
  - Body: `{ token, newPassword }`

### 2.2 Registro (user_registration_*)

#### Elementos Visuales:
- Formulario: Nombre completo, email, contraseña, confirmar contraseña
- Validación en tiempo real
- Checkbox para aceptar términos y condiciones
- Indicador de fortaleza de contraseña

#### Funcionalidades Backend:
- **POST /api/autenticacion/registro** - Registro de nuevos usuarios
  - Body: `{ nombreCompleto, email, password, confirmPassword, aceptaTerminos }`
  - Validaciones:
    - Email único
    - Password mínimo 8 caracteres
    - Passwords coinciden
  - Response: `{ mensaje, usuario: { id, nombre, email, rol } }`
- **GET /api/autenticacion/verificar-email/:token** - Verificación de email
- **POST /api/autenticacion/reenviar-verificacion** - Reenviar email de verificación

---

## 3. SELECCIÓN DE ROL (selección_de_rol_de_usuario)

### Elementos Visuales:
- Dos tarjetas principales:
  1. "Buscar Artistas (Soy Cliente)"
  2. "Ofrecer mis Servicios (Soy Artista)"
- Iconos representativos
- Botón "Seleccionar rol" en hover
- Opción "Continuar más tarde"

### Funcionalidades Backend:
- **PUT /api/usuarios/:id/rol** - Actualizar rol del usuario
  - Body: `{ rol: 'cliente' | 'artista' }`
  - Response: `{ mensaje, usuario: { id, nombre, rol } }`
- **GET /api/usuarios/:id** - Obtener información del usuario

---

## 4. REGISTRO DE ARTISTA (artist_registration)

### Elementos Visuales:
- Formulario extendido con campos:
  - Nombre completo
  - Nombre artístico/escénico
  - Email de contacto
  - Número de teléfono
  - Tipo de artista/categoría principal (select)
  - Ubicación (ciudad, estado)
  - Breve descripción de servicios (textarea)
  - URL de portafolio/redes sociales
  - Subir foto de perfil

### Funcionalidades Backend:
- **POST /api/artistas** - Crear perfil de artista
  - Body: `{ 
      usuarioId, 
      nombreCompleto, 
      nombreArtistico, 
      email, 
      telefono, 
      categoriaId, 
      ubicacion: { ciudad, estado }, 
      descripcion,
      portfolioUrl,
      redesSociales: { facebook, instagram, youtube }
    }`
  - Response: `{ mensaje, artista: { id, nombreArtistico, ... } }`
- **POST /api/artistas/:id/foto-perfil** - Subir foto de perfil
  - Multipart form data
  - Validar formato de imagen (jpg, png)
  - Redimensionar y optimizar imagen
- **GET /api/categorias** - Listar categorías disponibles

---

## 5. MARKETPLACE (artist_marketplace)

### Elementos Visuales:
- Barra de búsqueda principal
- Filtros: Ubicación, rango de precio, categoría, calificación
- Listado de artistas en tarjetas con:
  - Foto de perfil
  - Nombre artístico
  - Categoría
  - Ubicación
  - Calificación (estrellas)
  - Precio desde
  - Botón "Ver perfil"
- Paginación

### Funcionalidades Backend:
- **GET /api/artistas** - Listar artistas con filtros y búsqueda
  - Query params: 
    - `busqueda` (string)
    - `ubicacion` (string)
    - `precioMin`, `precioMax` (number)
    - `categoriaId` (string)
    - `calificacionMin` (number)
    - `page`, `limit` (pagination)
    - `ordenar` (precio_asc, precio_desc, calificacion_desc)
  - Response: `{ 
      artistas: [{ id, nombreArtistico, foto, categoria, ubicacion, calificacion, precioDesde }],
      total,
      pagina,
      totalPaginas
    }`
- **GET /api/artistas/buscar** - Búsqueda avanzada con autocompletado
- **GET /api/ubicaciones** - Listar ubicaciones disponibles para filtro

---

## 6. PERFIL DE ARTISTA (artist_profile_details)

### Elementos Visuales:
- Header con:
  - Foto de perfil grande
  - Nombre artístico
  - Categoría
  - Ubicación
  - Calificación y número de reseñas
  - Precio desde
  - Botones: "Contactar" y "Solicitar presupuesto"
- Tabs de navegación:
  - **Acerca de**: Biografía, experiencia, especialidades
  - **Servicios y Precios**: Paquetes de servicios con precios
  - **Portafolio**: Fotos y videos
  - **Reseñas**: Calificaciones y comentarios de clientes
  - **Disponibilidad**: Calendario
- Galería de fotos/videos
- Lista de reseñas con avatar, nombre, fecha, calificación y comentario

### Funcionalidades Backend:
- **GET /api/artistas/:id** - Obtener perfil completo del artista
  - Response: `{ 
      id, 
      nombreArtistico, 
      foto, 
      categoria, 
      ubicacion, 
      calificacion, 
      numeroResenas,
      precioDesde,
      biografia,
      experienciaAnos,
      especialidades: [],
      redesSociales: {}
    }`
- **GET /api/artistas/:id/servicios** - Listar servicios y paquetes
  - Response: `{ servicios: [{ id, nombre, descripcion, duracion, precio, incluye: [] }] }`
- **GET /api/artistas/:id/portfolio** - Obtener galería de medios
  - Response: `{ medios: [{ id, tipo: 'foto'|'video', url, thumbnail, titulo }] }`
- **GET /api/artistas/:id/resenas** - Listar reseñas y calificaciones
  - Query params: `page`, `limit`, `ordenar`
  - Response: `{ 
      resenas: [{ 
        id, 
        cliente: { nombre, avatar }, 
        calificacion, 
        comentario, 
        fecha,
        eventoTipo
      }],
      promedioCalificacion,
      totalResenas
    }`
- **GET /api/artistas/:id/disponibilidad** - Obtener calendario de disponibilidad
  - Query params: `mes`, `ano`
  - Response: `{ diasDisponibles: [], diasOcupados: [], horariosDisponibles: {} }`
- **POST /api/artistas/:id/contactar** - Enviar mensaje de contacto
  - Body: `{ nombre, email, mensaje }`

---

## 7. SOLICITAR PRESUPUESTO (solicitar_presupuesto_*)

### Elementos Visuales:
- Header con info del artista seleccionado
- Formulario por secciones:
  
  **Sección 1: Detalles del Evento**
  - Servicio seleccionado (readonly)
  - Precio del servicio (referencia, readonly)
  - Fecha y hora del evento (datetime picker)
  - Ubicación del evento (input con icono)
  - Duración estimada
  - Número de invitados
  
  **Sección 2: Información de Contacto**
  - Nombre completo
  - Email
  - Teléfono
  
  **Sección 3: Detalles Adicionales**
  - Tipo de evento (select: boda, cumpleaños, corporativo, etc.)
  - Requerimientos especiales (textarea)
  - Presupuesto estimado
  
  **Sección 4: Confirmación**
  - Resumen de la solicitud
  - Checkbox aceptar términos
  - Botón "Enviar Solicitud de Presupuesto"

### Funcionalidades Backend:
- **POST /api/cotizaciones** - Crear solicitud de presupuesto
  - Body: `{
      artistaId,
      servicioId,
      clienteId,
      evento: {
        fecha,
        hora,
        ubicacion,
        duracion,
        numeroInvitados,
        tipo,
        requerimientosEspeciales
      },
      contacto: {
        nombre,
        email,
        telefono
      },
      presupuestoEstimado
    }`
  - Response: `{ mensaje, cotizacion: { id, estado: 'pendiente', ... } }`
  - Enviar notificación por email al artista
- **GET /api/cotizaciones/:id** - Obtener detalles de cotización
- **GET /api/tipos-evento** - Listar tipos de eventos disponibles

---

## 8. RESPONDER PRESUPUESTO (responder_a_presupuesto_*)

### Elementos Visuales:
- Información de la solicitud del cliente
- Formulario de respuesta del artista:
  - Precio ofrecido
  - Detalles del servicio incluido
  - Términos y condiciones
  - Tiempo de validez de la oferta
  - Política de cancelación
  - Botones: "Enviar Propuesta" / "Rechazar Solicitud"

### Funcionalidades Backend:
- **PUT /api/cotizaciones/:id/responder** - Artista responde a cotización
  - Body: `{
      estado: 'aceptada' | 'rechazada',
      precioOfrecido,
      detallesServicio,
      terminosCondiciones,
      validezOferta: { fecha },
      politicaCancelacion,
      notasAdicionales
    }`
  - Response: `{ mensaje, cotizacion: { id, estado, ... } }`
  - Enviar notificación por email al cliente
- **POST /api/cotizaciones/:id/contraoferta** - Cliente hace contraoferta
  - Body: `{ precioContraoferta, mensaje }`
- **GET /api/cotizaciones/artista/:artistaId** - Listar cotizaciones recibidas por artista
  - Query params: `estado`, `page`, `limit`

---

## 9. DASHBOARD DE USUARIO (dashboard_del_usuario_*)

### Pantallas y Elementos:

#### 9.1 Dashboard Principal (dashboard_del_usuario_1)
- Sidebar con navegación:
  - Inicio
  - Mis Reservas
  - Artistas Favoritos
  - Mensajes
  - Notificaciones
  - Perfil
- Saludo personalizado
- Tarjetas de resumen:
  - Próximas reservas
  - Artistas guardados
  - Mensajes sin leer
- Actividad reciente

#### 9.2 Mis Reservas (dashboard_del_usuario_2)
- Filtros: Todas, Próximas, Completadas, Canceladas
- Listado de reservas con:
  - Foto del artista
  - Nombre y servicio
  - Fecha y hora
  - Estado (confirmada, pendiente, completada, cancelada)
  - Botones de acción según estado
- Opciones por reserva:
  - Ver detalles
  - Contactar artista
  - Cancelar reserva
  - Dejar reseña (si completada)

#### 9.3 Artistas Favoritos (dashboard_del_usuario_3)
- Grid de artistas guardados
- Botón para ver perfil completo
- Opción de eliminar de favoritos

#### 9.4 Mensajes (dashboard_del_usuario_4)
- Lista de conversaciones
- Panel de chat
- Enviar mensajes en tiempo real

#### 9.5 Notificaciones (dashboard_del_usuario_5)
- Lista de notificaciones con tipos:
  - Confirmaciones de reserva
  - Respuestas a cotizaciones
  - Recordatorios de eventos
  - Mensajes nuevos
- Marcar como leídas

#### 9.6 Perfil (dashboard_del_usuario_6)
- Editar información personal
- Cambiar contraseña
- Preferencias de notificación

### Funcionalidades Backend:

**Reservas:**
- **GET /api/usuarios/:id/reservas** - Listar reservas del usuario
  - Query params: `estado`, `page`, `limit`
- **GET /api/reservas/:id** - Obtener detalles de una reserva
- **PUT /api/reservas/:id/cancelar** - Cancelar reserva
- **POST /api/reservas/:id/resena** - Dejar reseña después del evento

**Favoritos:**
- **GET /api/usuarios/:id/favoritos** - Listar artistas favoritos
- **POST /api/usuarios/:id/favoritos** - Agregar artista a favoritos
  - Body: `{ artistaId }`
- **DELETE /api/usuarios/:id/favoritos/:artistaId** - Eliminar de favoritos

**Mensajes:**
- **GET /api/mensajes/conversaciones/:usuarioId** - Listar conversaciones
- **GET /api/mensajes/conversacion/:conversacionId** - Obtener mensajes de conversación
- **POST /api/mensajes** - Enviar mensaje
  - Body: `{ destinatarioId, mensaje, conversacionId? }`
- **PUT /api/mensajes/:id/leer** - Marcar mensaje como leído

**Notificaciones:**
- **GET /api/notificaciones/:usuarioId** - Listar notificaciones
  - Query params: `leidas`, `page`, `limit`
- **PUT /api/notificaciones/:id/leer** - Marcar como leída
- **PUT /api/notificaciones/leer-todas** - Marcar todas como leídas

**Perfil:**
- **GET /api/usuarios/:id** - Obtener perfil del usuario
- **PUT /api/usuarios/:id** - Actualizar información personal
  - Body: `{ nombre, telefono, ubicacion, fotoPerfil }`
- **PUT /api/usuarios/:id/password** - Cambiar contraseña
  - Body: `{ passwordActual, passwordNueva }`
- **PUT /api/usuarios/:id/preferencias** - Actualizar preferencias
  - Body: `{ notificacionesEmail, notificacionesPush, idioma }`

---

## 10. DASHBOARD DE ARTISTA (dashboard_del_artista_*)

### Pantallas y Elementos:

#### 10.1 Dashboard Principal (dashboard_del_artista_1)
- Sidebar con navegación:
  - Dashboard
  - Mis Servicios
  - Reservas
  - Calendario
  - Mensajes
  - Ganancias
  - Perfil
  - Ajustes
- Métricas principales (cards):
  - Ingresos del mes
  - Reservas pendientes
  - Próximas presentaciones
  - Calificación promedio
- Gráficos de rendimiento
- Solicitudes de cotización recientes

#### 10.2 Mis Servicios (dashboard_del_artista_2)
- Listado de servicios/paquetes creados
- Botón "Agregar Nuevo Servicio"
- Por cada servicio:
  - Nombre
  - Descripción
  - Precio
  - Duración
  - Botones: Editar, Eliminar, Activar/Desactivar

#### 10.3 Reservas (dashboard_del_artista_3)
- Filtros: Todas, Pendientes, Confirmadas, Completadas, Canceladas
- Calendario view y lista view
- Detalles de cada reserva
- Acciones: Confirmar, Rechazar, Completar

#### 10.4 Calendario (dashboard_del_artista_4)
- Vista mensual/semanal/diaria
- Eventos programados
- Bloquear fechas no disponibles
- Configurar horarios de disponibilidad

#### 10.5 Mensajes (dashboard_del_artista_5)
- Similar al dashboard de usuario
- Comunicación con clientes

#### 10.6 Ganancias (dashboard_del_artista_6)
- Resumen financiero
- Historial de pagos
- Pagos pendientes
- Configuración de método de pago
- Descargar facturas

#### 10.7 Perfil (dashboard_del_artista_7)
- Editar perfil público
- Gestionar portafolio
- Actualizar biografía
- Cambiar foto de perfil y galería

### Funcionalidades Backend:

**Dashboard:**
- **GET /api/artistas/:id/estadisticas** - Obtener métricas del dashboard
  - Response: `{ 
      ingresosDelMes, 
      reservasPendientes, 
      proximosEventos,
      calificacionPromedio,
      vistasDelPerfil,
      cotizacionesPendientes
    }`
- **GET /api/artistas/:id/graficos** - Datos para gráficos de rendimiento
  - Query params: `periodo` (semana, mes, año)

**Servicios:**
- **GET /api/artistas/:id/servicios** - Listar servicios del artista
- **POST /api/artistas/:id/servicios** - Crear nuevo servicio
  - Body: `{ nombre, descripcion, precio, duracion, incluye: [], activo }`
- **PUT /api/servicios/:id** - Actualizar servicio
- **DELETE /api/servicios/:id** - Eliminar servicio
- **PUT /api/servicios/:id/toggle-activo** - Activar/desactivar servicio

**Reservas:**
- **GET /api/artistas/:id/reservas** - Listar reservas del artista
  - Query params: `estado`, `fechaInicio`, `fechaFin`, `page`, `limit`
- **PUT /api/reservas/:id/confirmar** - Confirmar reserva
- **PUT /api/reservas/:id/rechazar** - Rechazar reserva
  - Body: `{ motivo }`
- **PUT /api/reservas/:id/completar** - Marcar reserva como completada

**Calendario:**
- **GET /api/artistas/:id/calendario** - Obtener eventos del calendario
  - Query params: `mes`, `ano`
- **POST /api/artistas/:id/disponibilidad** - Configurar disponibilidad
  - Body: `{ 
      diasSemana: [1,2,3,4,5], 
      horarioInicio, 
      horarioFin,
      fechasNoDisponibles: []
    }`
- **POST /api/artistas/:id/bloquear-fecha** - Bloquear fecha específica
  - Body: `{ fecha, motivo }`

**Ganancias:**
- **GET /api/artistas/:id/ganancias** - Resumen de ganancias
  - Query params: `periodo`
  - Response: `{ 
      totalGanancias, 
      gananciasDelMes,
      pagosPendientes,
      proximoPago: { fecha, monto }
    }`
- **GET /api/artistas/:id/pagos** - Historial de pagos
  - Query params: `page`, `limit`
- **GET /api/artistas/:id/facturas/:facturaId** - Descargar factura PDF
- **PUT /api/artistas/:id/metodo-pago** - Configurar método de pago
  - Body: `{ tipoCuenta, numeroCuenta, banco, titular }`

**Perfil:**
- **PUT /api/artistas/:id** - Actualizar perfil completo
- **POST /api/artistas/:id/portfolio/foto** - Agregar foto al portafolio
- **POST /api/artistas/:id/portfolio/video** - Agregar video al portafolio
- **DELETE /api/artistas/:id/portfolio/:mediaId** - Eliminar del portafolio

---

## 11. DASHBOARD DE ADMINISTRADOR (dashboard_del_administrador_*)

### Pantallas y Elementos:

#### 11.1 Dashboard Principal (dashboard_del_administrador_1)
- Sidebar con navegación:
  - Dashboard
  - Gestión de Usuarios
  - Gestión de Artistas
  - Gestión de Reservas
  - Reportes
  - Configuración
- Métricas principales:
  - Total usuarios
  - Total artistas
  - Reservas activas
  - Ingresos totales
- Gráficos de crecimiento
- Actividad reciente de la plataforma

#### 11.2 Gestión de Usuarios (dashboard_del_administrador_2)
- Tabla de usuarios con:
  - ID, Nombre, Email, Rol, Fecha registro, Estado
  - Acciones: Ver, Editar, Suspender, Eliminar
- Filtros: Rol, Estado, Fecha de registro
- Búsqueda por nombre/email
- Paginación

#### 11.3 Gestión de Artistas (dashboard_del_administrador_3)
- Tabla de artistas con:
  - ID, Nombre artístico, Categoría, Ubicación, Estado verificación, Calificación
  - Acciones: Ver perfil, Aprobar, Rechazar, Suspender
- Artistas pendientes de aprobación
- Filtros: Categoría, Estado, Calificación

#### 11.4 Gestión de Reservas (dashboard_del_administrador_4)
- Tabla de todas las reservas
- Filtros: Estado, Fecha, Artista, Cliente
- Resolver disputas
- Gestionar reembolsos

#### 11.5 Reportes (dashboard_del_administrador_5)
- Reportes financieros
- Reportes de uso de la plataforma
- Exportar datos (CSV, Excel, PDF)
- Gráficos personalizados

#### 11.6 Configuración (dashboard_del_administrador_6)
- Gestionar categorías de artistas
- Configurar comisiones de la plataforma
- Gestionar tipos de eventos
- Configurar emails automáticos
- Configuración de pagos

### Funcionalidades Backend:

**Dashboard:**
- **GET /api/admin/estadisticas** - Métricas generales
  - Response: `{ 
      totalUsuarios, 
      totalArtistas, 
      reservasActivas, 
      ingresosTotales,
      crecimientoMensual: {}
    }`
- **GET /api/admin/actividad-reciente** - Actividad de la plataforma
  - Query params: `limite`

**Gestión de Usuarios:**
- **GET /api/admin/usuarios** - Listar todos los usuarios
  - Query params: `rol`, `estado`, `busqueda`, `page`, `limit`
- **GET /api/admin/usuarios/:id** - Ver detalles de usuario
- **PUT /api/admin/usuarios/:id** - Editar usuario
- **PUT /api/admin/usuarios/:id/suspender** - Suspender usuario
  - Body: `{ motivo, duracion }`
- **DELETE /api/admin/usuarios/:id** - Eliminar usuario (soft delete)

**Gestión de Artistas:**
- **GET /api/admin/artistas** - Listar todos los artistas
  - Query params: `categoria`, `estadoVerificacion`, `busqueda`, `page`, `limit`
- **GET /api/admin/artistas/pendientes** - Artistas pendientes de aprobación
- **PUT /api/admin/artistas/:id/aprobar** - Aprobar artista
- **PUT /api/admin/artistas/:id/rechazar** - Rechazar artista
  - Body: `{ motivo }`
- **PUT /api/admin/artistas/:id/suspender** - Suspender artista

**Gestión de Reservas:**
- **GET /api/admin/reservas** - Listar todas las reservas
  - Query params: `estado`, `fechaInicio`, `fechaFin`, `artistaId`, `clienteId`, `page`, `limit`
- **GET /api/admin/reservas/:id** - Ver detalles de reserva
- **PUT /api/admin/reservas/:id/resolver-disputa** - Resolver disputa
  - Body: `{ resolucion, reembolso?, notasAdmin }`
- **POST /api/admin/reservas/:id/reembolso** - Procesar reembolso
  - Body: `{ monto, motivo }`

**Categorías:**
- **GET /api/admin/categorias** - Listar categorías
- **POST /api/admin/categorias** - Crear categoría
  - Body: `{ nombre, descripcion, icono }`
- **PUT /api/admin/categorias/:id** - Actualizar categoría
- **DELETE /api/admin/categorias/:id** - Eliminar categoría

**Reportes:**
- **GET /api/admin/reportes/financiero** - Reporte financiero
  - Query params: `fechaInicio`, `fechaFin`, `formato` (json, csv, pdf)
- **GET /api/admin/reportes/usuarios** - Reporte de usuarios
- **GET /api/admin/reportes/artistas** - Reporte de artistas
- **GET /api/admin/reportes/reservas** - Reporte de reservas
- **GET /api/admin/reportes/exportar** - Exportar datos

**Configuración:**
- **GET /api/admin/configuracion** - Obtener configuración actual
- **PUT /api/admin/configuracion** - Actualizar configuración
  - Body: `{ 
      comisionPlataforma, 
      emailsAutomaticos: {},
      politicasCancelacion: {},
      metodosPagoActivos: []
    }`

---

## 12. PÁGINAS DE PAGO (página_de_pago_*)

### Elementos Visuales:
- Resumen de la reserva:
  - Artista
  - Servicio
  - Fecha y hora
  - Ubicación
  - Subtotal
  - Tasa de servicio
  - Total a pagar
- Métodos de pago:
  - Tarjeta de crédito/débito
  - PayPal
  - Transferencia bancaria
- Formulario de tarjeta:
  - Número de tarjeta
  - Nombre del titular
  - Fecha de expiración
  - CVV
- Checkbox: Guardar método de pago
- Checkbox: Aceptar términos y condiciones
- Botón "Procesar Pago"
- Indicadores de seguridad (SSL, PCI compliance)

### Funcionalidades Backend:
- **POST /api/pagos/procesar** - Procesar pago
  - Body: `{
      reservaId,
      metodoPago: 'tarjeta' | 'paypal' | 'transferencia',
      datosPago: {
        numeroTarjeta?, // encriptado
        nombreTitular?,
        fechaExpiracion?,
        cvv?, // encriptado
        paypalEmail?,
        cuentaBancaria?
      },
      guardarMetodo,
      aceptaTerminos
    }`
  - Integración con pasarela de pagos (Stripe, PayPal)
  - Response: `{ 
      exito, 
      transaccionId, 
      reserva: { id, estado: 'confirmada' },
      recibo: { url }
    }`
  - Enviar confirmación por email
- **GET /api/pagos/metodos/:usuarioId** - Listar métodos de pago guardados
- **POST /api/pagos/metodos** - Guardar nuevo método de pago
- **DELETE /api/pagos/metodos/:id** - Eliminar método de pago
- **POST /api/pagos/webhook** - Webhook para confirmación de pago externo
- **GET /api/pagos/:transaccionId/recibo** - Descargar recibo PDF

---

## 13. AYUDA Y SOPORTE (ayuda_y_soporte)

### Elementos Visuales:
- Barra de búsqueda de artículos de ayuda
- Sección "Preguntas Frecuentes (Clientes)" con acordeones:
  - ¿Cómo contrato a un artista?
  - ¿Es seguro mi pago?
  - ¿Cómo puedo dejar una reseña?
  - ¿Cuál es la política de cancelación?
  - ¿Cómo contacto con el soporte?
- Sección "Preguntas Frecuentes (Artistas)":
  - ¿Cómo creo mi perfil?
  - ¿Cuánto cobra la plataforma?
  - ¿Cuándo recibo mis pagos?
  - ¿Cómo gestiono mi calendario?
- Categorías de ayuda
- Botón "Contactar Soporte"
- Chat en vivo (opcional)

### Funcionalidades Backend:
- **GET /api/ayuda/articulos** - Listar artículos de ayuda
  - Query params: `categoria`, `busqueda`, `rol`
- **GET /api/ayuda/articulos/:id** - Obtener artículo específico
- **GET /api/ayuda/faqs** - Listar preguntas frecuentes
  - Query params: `rol` (cliente, artista)
- **GET /api/ayuda/categorias** - Listar categorías de ayuda
- **POST /api/ayuda/buscar** - Búsqueda en base de conocimiento
  - Body: `{ query }`
- **POST /api/soporte/ticket** - Crear ticket de soporte
  - Body: `{ 
      usuarioId, 
      asunto, 
      descripcion, 
      categoria,
      prioridad,
      adjuntos: []
    }`
- **GET /api/soporte/tickets/:usuarioId** - Listar tickets del usuario
- **GET /api/soporte/tickets/:id** - Ver detalles de ticket
- **POST /api/soporte/tickets/:id/mensaje** - Agregar mensaje a ticket
- **PUT /api/soporte/tickets/:id/cerrar** - Cerrar ticket

---

## FUNCIONALIDADES ADICIONALES TRANSVERSALES

### Autenticación y Seguridad:
- **Middleware de autenticación JWT** para rutas protegidas
- **Middleware de autorización por roles** (cliente, artista, admin)
- **Rate limiting** para prevenir abuso de API
- **Validación de entrada** en todos los endpoints
- **Encriptación de datos sensibles** (contraseñas con bcrypt, datos de pago)
- **Logs de auditoría** para acciones administrativas

### Notificaciones:
- **Sistema de notificaciones en tiempo real** (WebSockets/Socket.io)
- **Envío de emails transaccionales** (confirmaciones, recordatorios)
- **Notificaciones push** (opcional, para app móvil)
- **Plantillas de email** personalizables

### Búsqueda y Filtrado:
- **Búsqueda full-text** en artistas, servicios
- **Geolocalización** para búsqueda por ubicación
- **Sistema de tags** para categorización avanzada
- **Búsqueda con autocompletado**

### Almacenamiento:
- **Subida de archivos** (fotos, videos, documentos)
- **Integración con servicio de almacenamiento** (AWS S3, Cloudinary)
- **Procesamiento de imágenes** (redimensionamiento, optimización)
- **Gestión de medios** (galería, eliminación)

### Sistema de Calificaciones:
- **POST /api/calificaciones** - Crear calificación
- **GET /api/calificaciones/artista/:id** - Obtener calificaciones
- **PUT /api/calificaciones/:id** - Actualizar calificación
- **DELETE /api/calificaciones/:id** - Eliminar calificación
- **Validación**: Solo clientes con reservas completadas pueden calificar

### Mensajería en Tiempo Real:
- **WebSocket server** para chat en vivo
- **Sistema de conversaciones** entre clientes y artistas
- **Notificaciones de mensajes nuevos**
- **Historial de conversaciones**

### Analytics:
- **Tracking de eventos** (visitas a perfiles, búsquedas, conversiones)
- **Estadísticas de uso** para artistas
- **Métricas de negocio** para administradores

---

## RESUMEN DE MODELOS DE BASE DE DATOS NECESARIOS

1. **Usuario**
   - id, nombre, email, password, rol, telefono, avatar, fechaRegistro, emailVerificado, estado

2. **Artista** (extiende Usuario)
   - nombreArtistico, categoriaId, ubicacion, biografia, experienciaAnos, precioDesde, calificacionPromedio, numeroResenas, estadoVerificacion, portfolio, redesSociales

3. **Categoria**
   - id, nombre, descripcion, icono, activo

4. **Servicio**
   - id, artistaId, nombre, descripcion, precio, duracion, incluye, activo

5. **Cotizacion**
   - id, artistaId, clienteId, servicioId, eventoDetalles, estado, precioSolicitado, precioOfrecido, fechaSolicitud, fechaRespuesta

6. **Reserva**
   - id, artistaId, clienteId, servicioId, cotizacionId, fecha, hora, ubicacion, estado, precioFinal, comisionPlataforma, fechaCreacion

7. **Pago**
   - id, reservaId, transaccionId, monto, metodoPago, estado, fechaPago, reciboUrl

8. **Calificacion**
   - id, reservaId, clienteId, artistaId, puntuacion, comentario, fecha

9. **Mensaje**
   - id, conversacionId, remitenteId, destinatarioId, contenido, leido, fechaEnvio

10. **Conversacion**
    - id, participantes, ultimoMensaje, fechaActualizacion

11. **Notificacion**
    - id, usuarioId, tipo, titulo, mensaje, leida, enlace, fechaCreacion

12. **PortfolioMedia**
    - id, artistaId, tipo, url, thumbnail, titulo, orden

13. **Disponibilidad**
    - id, artistaId, diasSemana, horarioInicio, horarioFin, fechasNoDisponibles

14. **TicketSoporte**
    - id, usuarioId, asunto, descripcion, categoria, estado, prioridad, fechaCreacion, fechaCierre

15. **ConfiguracionPlataforma**
    - id, comisionPlataforma, politicasCancelacion, emailsAutomaticos, metodosPagoActivos

---

## PRIORIDADES DE IMPLEMENTACIÓN

### Fase 1 - MVP (Funcionalidad Básica):
1. Autenticación (login, registro, roles)
2. Gestión de categorías
3. CRUD de artistas
4. Marketplace (listado y búsqueda básica)
5. Perfil de artista (visualización)
6. Cotizaciones (solicitar y responder)
7. Sistema de reservas básico
8. Pagos (integración básica)

### Fase 2 - Funcionalidad Completa:
1. Dashboards de usuario y artista
2. Sistema de mensajería
3. Notificaciones
4. Calendario y disponibilidad
5. Sistema de calificaciones y reseñas
6. Gestión de portfolio
7. Favoritos

### Fase 3 - Administración y Optimización:
1. Dashboard de administrador completo
2. Sistema de reportes
3. Gestión avanzada de usuarios
4. Sistema de soporte
5. Analytics
6. Optimizaciones de rendimiento

### Fase 4 - Características Avanzadas:
1. Chat en tiempo real con WebSockets
2. Notificaciones push
3. Búsqueda avanzada con geolocalización
4. Sistema de recomendaciones
5. Integración con redes sociales
6. API pública para terceros

---

## ENDPOINTS TOTALES ESTIMADOS: ~120-150 endpoints

Este análisis proporciona una visión completa de todas las funcionalidades que el backend debe soportar para implementar todos los mockups de ShowTime Hub.
