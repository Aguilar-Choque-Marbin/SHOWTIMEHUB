# 🎭 SHOWTIME HUB - BACKEND API

## 📋 Descripción
API REST completa y escalable para la plataforma ShowTime Hub - Sistema de contratación de artistas y entretenimiento.

**Versión:** 2.0.0  
**Tecnologías:** Node.js, Express.js, PostgreSQL, JWT

---

## 🏗️ ARQUITECTURA DEL PROYECTO

```
BACKEND/
├── src/
│   ├── configuracion/          # Configuraciones del sistema
│   │   └── baseDatos.js       # Conexión a PostgreSQL
│   │
│   ├── modelos/               # Capa de datos (consultas SQL)
│   │   ├── usuarioModelo.js
│   │   ├── artistaModelo.js
│   │   ├── categoriaModelo.js
│   │   ├── cotizacionModelo.js
│   │   ├── calificacionModelo.js
│   │   ├── favoritoModelo.js
│   │   ├── contratoModelo.js
│   │   ├── pagoModelo.js
│   │   └── adminModelo.js
│   │
│   ├── controladores/         # Lógica de negocio
│   │   ├── autenticacionControlador.js
│   │   ├── usuarioControlador.js
│   │   ├── artistaControlador.js
│   │   ├── categoriaControlador.js
│   │   ├── cotizacionControlador.js
│   │   ├── calificacionControlador.js
│   │   ├── favoritoControlador.js
│   │   ├── contratoControlador.js
│   │   ├── pagoControlador.js
│   │   └── adminControlador.js
│   │
│   ├── rutas/                 # Definición de endpoints
│   │   ├── autenticacion.js
│   │   ├── usuarios.js
│   │   ├── artistas.js
│   │   ├── categorias.js
│   │   ├── cotizaciones.js
│   │   ├── calificaciones.js
│   │   ├── favoritos.js
│   │   ├── contratos.js
│   │   ├── pagos.js
│   │   └── admin.js
│   │
│   ├── middlewares/           # Middlewares personalizados
│   │   └── autenticacion.js   # Verificación JWT, roles
│   │
│   ├── servicios/             # Servicios auxiliares (futuro)
│   │   └── (email, notificaciones, etc.)
│   │
│   └── utilidades/            # Funciones helper (futuro)
│       └── (validaciones, formateo, etc.)
│
├── .env                       # Variables de entorno
├── servidor.js                # Punto de entrada de la aplicación
├── package.json               # Dependencias del proyecto
├── DOCUMENTACION_API.md       # Documentación completa de endpoints
├── README.md                  # Este archivo
└── PASOS_REALIZADOS.txt       # Historial del desarrollo

```

---

## 🎯 CARACTERÍSTICAS PRINCIPALES

### ✅ **100% Cobertura del Mockup**
- Landing Page
- Marketplace con filtros avanzados
- Perfiles de artistas completos
- Sistema de cotizaciones
- Dashboard de usuario, artista y administrador
- Sistema de pagos
- Favoritos
- Calificaciones y reseñas

### ✅ **Escalable y Mantenible**
- Arquitectura MVC (Modelo-Vista-Controlador)
- Código modular y reutilizable
- Nombres en español para fácil comprensión
- Separación clara de responsabilidades

### ✅ **Seguridad**
- Autenticación JWT
- Encriptación de contraseñas con bcrypt
- Control de acceso por roles (usuario, artista, admin)
- Validaciones en cada endpoint

### ✅ **Performance**
- Consultas SQL optimizadas
- Paginación en listados
- Índices en base de datos
- Pool de conexiones a PostgreSQL

---

## 🚀 INICIO RÁPIDO

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
Edita el archivo `.env`:
```env
PUERTO=3000
DB_HOST=localhost
DB_PUERTO=5432
DB_USUARIO=showtime_admin
DB_CONTRASENA=showtime2025
DB_NOMBRE=showtime_hub
JWT_SECRETO=tu_clave_secreta_super_segura_123
JWT_EXPIRACION=24h
```

### 3. Iniciar Base de Datos
```bash
cd ../BD
docker-compose up -d
```

### 4. Ejecutar Servidor
```bash
# Desarrollo (con nodemon - reinicio automático)
npm run dev

# Producción
npm start
```

### 5. Verificar
Abre `http://localhost:3000` en tu navegador.

---

## 📚 ENDPOINTS DISPONIBLES

### 🔐 Autenticación
- `POST /api/autenticacion/registrar` - Registrar usuario
- `POST /api/autenticacion/iniciar-sesion` - Login

### 👤 Usuarios
- `GET /api/usuarios/perfil` - Obtener perfil (requiere token)
- `PUT /api/usuarios/perfil` - Actualizar perfil (requiere token)
- `GET /api/usuarios` - Listar usuarios (admin)
- `DELETE /api/usuarios/:id` - Eliminar usuario (admin)

### 🎭 Artistas
- `GET /api/artistas` - Listar artistas con filtros
- `GET /api/artistas/:id` - Detalle de artista
- `POST /api/artistas` - Crear perfil artista (requiere token)
- `PUT /api/artistas/:id` - Actualizar perfil (requiere token)

### 📂 Categorías
- `GET /api/categorias` - Listar categorías

### 💰 Cotizaciones
- `POST /api/cotizaciones` - Crear solicitud (requiere token)
- `GET /api/cotizaciones/mis-solicitudes` - Mis solicitudes (requiere token)
- `GET /api/cotizaciones/:id` - Detalle con propuestas (requiere token)
- `POST /api/cotizaciones/propuestas` - Enviar propuesta (requiere token)
- `PUT /api/cotizaciones/propuestas/:id/responder` - Aceptar/rechazar (requiere token)

### ⭐ Calificaciones
- `POST /api/calificaciones` - Crear calificación (requiere token)
- `GET /api/calificaciones/artista/:idArtista` - Ver calificaciones

### ❤️ Favoritos
- `GET /api/favoritos` - Mis favoritos (requiere token)
- `POST /api/favoritos` - Agregar favorito (requiere token)
- `DELETE /api/favoritos/artista/:idArtista` - Eliminar favorito (requiere token)
- `GET /api/favoritos/artista/:idArtista/verificar` - Verificar si es favorito (requiere token)

### 📄 Contratos
- `POST /api/contratos` - Crear contrato (requiere token)
- `GET /api/contratos/mis-contratos` - Mis contratos (requiere token)
- `GET /api/contratos/artista/:idArtista` - Contratos del artista (requiere token)
- `GET /api/contratos/:id` - Detalle de contrato (requiere token)
- `PUT /api/contratos/:id/estado` - Actualizar estado (requiere token)

### 💳 Pagos
- `POST /api/pagos` - Registrar pago (requiere token)
- `GET /api/pagos/historial` - Historial de pagos (requiere token)
- `GET /api/pagos/ganancias/artista/:idArtista` - Ganancias del artista (requiere token)
- `PUT /api/pagos/:id/estado` - Actualizar estado de pago (requiere token)

### 🛡️ Admin
- `GET /api/admin/dashboard` - Estadísticas generales (admin)
- `GET /api/admin/reportes` - Reportes por fecha (admin)
- `GET /api/admin/reportes/ingresos` - Reporte de ingresos (admin)
- `GET /api/admin/categorias/populares` - Categorías populares (admin)
- `GET /api/admin/usuarios` - Gestionar usuarios (admin)
- `GET /api/admin/artistas` - Gestionar artistas (admin)

Ver `DOCUMENTACION_API.md` para detalles completos con ejemplos.

---

## 🔑 AUTENTICACIÓN

### Obtener Token
```http
POST /api/autenticacion/iniciar-sesion
Content-Type: application/json

{
  "email": "usuario@example.com",
  "contrasena": "123456"
}
```

**Respuesta:**
```json
{
  "exito": true,
  "datos": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Usar Token en Peticiones
```http
GET /api/usuarios/perfil
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🗄️ BASE DE DATOS

### Tablas Principales
- `usuarios` - Usuarios del sistema
- `perfiles_artistas` - Perfiles de artistas
- `categorias` - Categorías de servicios
- `servicios_artista` - Servicios ofrecidos
- `portafolio_media` - Galería de artistas
- `cotizaciones_eventos` - Solicitudes de presupuesto
- `propuestas_artistas` - Propuestas para eventos
- `contratos` - Contratos firmados
- `pagos` - Registro de pagos
- `calificaciones` - Reseñas y ratings
- `artistas_favoritos` - Favoritos de usuarios
- `disponibilidad_artista` - Calendario de artistas

---

## 🧪 TESTING

### Con Thunder Client (VS Code)
1. Instala la extensión "Thunder Client"
2. Crea una nueva colección
3. Importa los endpoints desde `DOCUMENTACION_API.md`

### Con cURL
```bash
# Listar artistas
curl http://localhost:3000/api/artistas

# Login
curl -X POST http://localhost:3000/api/autenticacion/iniciar-sesion \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","contrasena":"123456"}'
```

---

## 📊 PATRONES DE DISEÑO UTILIZADOS

### 1. **MVC (Modelo-Vista-Controlador)**
- **Modelos**: Interacción con la base de datos
- **Controladores**: Lógica de negocio
- **Rutas**: Mapeo de endpoints

### 2. **Middleware Pattern**
- Autenticación JWT
- Verificación de roles
- Manejo de errores

### 3. **Repository Pattern**
- Modelos como repositorios de datos
- Abstracción de consultas SQL

### 4. **Separation of Concerns**
- Cada módulo tiene una responsabilidad única
- Código fácil de mantener y escalar

---

## 🔄 FLUJO DE UNA PETICIÓN

```
Cliente (Frontend)
    ↓
[Rutas] - Define el endpoint
    ↓
[Middleware] - Verifica autenticación/roles
    ↓
[Controlador] - Procesa la lógica de negocio
    ↓
[Modelo] - Realiza consultas a la BD
    ↓
[Base de Datos] - PostgreSQL
    ↓
[Modelo] - Retorna datos
    ↓
[Controlador] - Formatea respuesta
    ↓
[Rutas] - Envía respuesta JSON
    ↓
Cliente (Frontend)
```

---

## 🛠️ TECNOLOGÍAS

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación stateless
- **Bcrypt** - Encriptación de contraseñas
- **Dotenv** - Variables de entorno
- **Cors** - Cross-Origin Resource Sharing
- **Nodemon** - Reinicio automático en desarrollo

---

## 📈 PRÓXIMAS MEJORAS

- [ ] Sistema de notificaciones en tiempo real (WebSockets)
- [ ] Upload de imágenes (AWS S3 o Cloudinary)
- [ ] Integración con pasarelas de pago (Stripe, PayPal)
- [ ] Sistema de mensajería entre usuarios
- [ ] Calendario de disponibilidad interactivo
- [ ] Reportes avanzados con gráficos
- [ ] Sistema de tickets de soporte
- [ ] API de envío de emails (Nodemailer)
- [ ] Rate limiting y throttling
- [ ] Logs centralizados

---

## 👥 ROLES Y PERMISOS

### Usuario/Cliente
- Ver marketplace
- Solicitar presupuestos
- Contratar artistas
- Calificar servicios
- Gestionar favoritos

### Artista
- Crear perfil
- Responder cotizaciones
- Gestionar servicios
- Ver contratos
- Ver ganancias

### Administrador
- Dashboard completo
- Gestionar usuarios
- Gestionar artistas
- Ver reportes
- Moderación de contenido

---

## 📝 CONVENCIONES DE CÓDIGO

### Nombres de Variables
- **Español**: Para facilitar comprensión
- **camelCase**: `nombreUsuario`, `idArtista`
- **snake_case** en BD: `id_usuario`, `nombre_artistico`

### Respuestas API
Siempre incluyen:
```json
{
  "exito": true|false,
  "mensaje": "Descripción",
  "datos": {...}
}
```

### Códigos HTTP
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### El servidor no inicia
```bash
# Verificar que el puerto 3000 esté libre
netstat -ano | findstr :3000

# Verificar variables de entorno
cat .env
```

### Error de conexión a BD
```bash
# Verificar que Docker esté corriendo
docker ps

# Reiniciar contenedor
cd ../BD
docker-compose restart
```

### Token inválido
- Verificar que el token no haya expirado (24h)
- Verificar formato: `Bearer TOKEN`

---

## 📞 SOPORTE

Para problemas o dudas:
1. Revisar `DOCUMENTACION_API.md`
2. Revisar `PASOS_REALIZADOS.txt`
3. Verificar logs del servidor
4. Revisar estructura del proyecto

---

## ✅ CHECKLIST DE PRODUCCIÓN

Antes de desplegar a producción:

- [ ] Cambiar `JWT_SECRETO` por uno seguro y largo
- [ ] Configurar variables de entorno de producción
- [ ] Habilitar HTTPS
- [ ] Configurar CORS con dominios específicos
- [ ] Implementar rate limiting
- [ ] Configurar logs de producción
- [ ] Hacer backup de base de datos
- [ ] Pruebas de carga
- [ ] Documentar API con Swagger
- [ ] Configurar monitoreo (PM2, New Relic)

---

## 📄 LICENCIA

Proyecto educativo - SIS324 UMSA

---

**¡Backend completo y listo para usar!** 🚀
