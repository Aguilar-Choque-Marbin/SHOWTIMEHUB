# 📚 DOCUMENTACIÓN API - SHOWTIME HUB

## 🎯 Base URL
```
http://localhost:3000/api
```

---

## 🔐 AUTENTICACIÓN

### 1. Registrar Usuario
```http
POST /api/autenticacion/registrar
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "contrasena": "123456",
  "tipo_usuario": "artista",  // "artista", "organizador" o "usuario"
  "telefono": "70123456"
}
```

**Respuesta:**
```json
{
  "exito": true,
  "mensaje": "Usuario registrado exitosamente",
  "datos": {
    "usuario": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Iniciar Sesión
```http
POST /api/autenticacion/iniciar-sesion
Content-Type: application/json

{
  "email": "juan@example.com",
  "contrasena": "123456"
}
```

---

## 🎭 ARTISTAS (MARKETPLACE)

### 3. Listar Artistas con Filtros
```http
GET /api/artistas?busqueda=musico&categoria=Músicos&ubicacion=La Paz&presupuesto_min=100&presupuesto_max=1000&orden=calificacion_promedio&pagina=1&limite=12
```

**Parámetros de consulta (todos opcionales):**
- `busqueda` - Buscar por nombre del artista
- `categoria` - Filtrar por categoría
- `ubicacion` - Filtrar por ciudad/región
- `presupuesto_min` - Presupuesto mínimo
- `presupuesto_max` - Presupuesto máximo
- `orden` - Ordenar por: `calificacion_promedio`, `tarifa_por_hora`, `anos_experiencia`, `total_resenas`
- `pagina` - Número de página (default: 1)
- `limite` - Resultados por página (default: 12)

**Respuesta:**
```json
{
  "exito": true,
  "datos": [
    {
      "id_perfil_artista": 1,
      "nombre": "Juan",
      "apellido": "Pérez",
      "nombre_artistico": "Juan el Músico",
      "foto_perfil": "url...",
      "ubicacion": "La Paz",
      "tarifa_por_hora": 500,
      "calificacion_promedio": 4.8,
      "total_resenas": 120,
      "categoria": "Músicos",
      "verificado": true
    }
  ],
  "paginacion": {
    "pagina_actual": 1,
    "total_paginas": 5,
    "total_resultados": 60,
    "resultados_por_pagina": 12
  }
}
```

### 4. Obtener Detalle de Artista
```http
GET /api/artistas/:id
```

**Respuesta:**
```json
{
  "exito": true,
  "datos": {
    "id_perfil_artista": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "nombre_artistico": "Juan el Músico",
    "biografia": "...",
    "foto_perfil": "url...",
    "foto_portada": "url...",
    "ubicacion": "La Paz",
    "tarifa_por_hora": 500,
    "anos_experiencia": 5,
    "calificacion_promedio": 4.8,
    "total_resenas": 120,
    "categoria": "Músicos",
    "servicios": [
      {
        "nombre_servicio": "Música en vivo",
        "descripcion": "...",
        "precio_base": 800,
        "duracion_horas": 2
      }
    ],
    "portafolio": [
      {
        "url_media": "url...",
        "tipo_media": "imagen",
        "titulo": "Presentación en..."
      }
    ],
    "calificaciones": [
      {
        "puntuacion": 5,
        "comentario": "Excelente servicio",
        "nombre": "María",
        "apellido": "López",
        "fecha_calificacion": "2025-11-15"
      }
    ]
  }
}
```

### 5. Crear Perfil de Artista (requiere token)
```http
POST /api/artistas
Authorization: Bearer {token}
Content-Type: application/json

{
  "id_categoria": 1,
  "nombre_artistico": "Juan el Músico",
  "biografia": "Músico profesional con 5 años de experiencia...",
  "ubicacion": "La Paz",
  "tarifa_por_hora": 500,
  "anos_experiencia": 5
}
```

### 6. Actualizar Perfil de Artista (requiere token)
```http
PUT /api/artistas/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "biografia": "Nueva biografía...",
  "tarifa_por_hora": 600
}
```

---

## 📂 CATEGORÍAS

### 7. Listar Categorías
```http
GET /api/categorias
```

**Respuesta:**
```json
{
  "exito": true,
  "datos": [
    {
      "id_categoria": 1,
      "nombre": "Músicos",
      "descripcion": "Artistas musicales",
      "icono": "🎸",
      "total_artistas": 45
    },
    {
      "id_categoria": 2,
      "nombre": "Cantantes",
      "descripcion": "Vocalistas profesionales",
      "icono": "🎤",
      "total_artistas": 32
    }
  ]
}
```

---

## 💰 COTIZACIONES / PRESUPUESTOS

### 8. Crear Solicitud de Presupuesto (requiere token)
```http
POST /api/cotizaciones
Authorization: Bearer {token}
Content-Type: application/json

{
  "titulo_evento": "Boda de María y Carlos",
  "descripcion_evento": "Necesitamos música en vivo para...",
  "tipo_evento": "Boda",
  "fecha_evento": "2025-12-20",
  "hora_inicio": "18:00:00",
  "duracion_horas": 4,
  "ubicacion_evento": "Salon Los Jardines, La Paz",
  "numero_asistentes": 150,
  "presupuesto_estimado": 3000
}
```

### 9. Obtener Mis Solicitudes (requiere token)
```http
GET /api/cotizaciones/mis-solicitudes
Authorization: Bearer {token}
```

### 10. Obtener Detalle de Cotización con Propuestas (requiere token)
```http
GET /api/cotizaciones/:id
Authorization: Bearer {token}
```

**Respuesta:**
```json
{
  "exito": true,
  "datos": {
    "id_cotizacion": 1,
    "titulo_evento": "Boda de María y Carlos",
    "descripcion_evento": "...",
    "fecha_evento": "2025-12-20",
    "presupuesto_estimado": 3000,
    "propuestas": [
      {
        "id_propuesta": 1,
        "nombre_artistico": "Juan el Músico",
        "foto_perfil": "url...",
        "monto_propuesto": 2500,
        "mensaje_propuesta": "Me encantaría tocar en su boda...",
        "estado": "pendiente",
        "calificacion_promedio": 4.8
      }
    ]
  }
}
```

### 11. Artista Crea Propuesta (requiere token)
```http
POST /api/cotizaciones/propuestas
Authorization: Bearer {token}
Content-Type: application/json

{
  "id_cotizacion": 1,
  "id_perfil_artista": 5,
  "monto_propuesto": 2500,
  "mensaje_propuesta": "Me encantaría participar en su evento...",
  "tiempo_preparacion": "2 días"
}
```

### 12. Aceptar/Rechazar Propuesta (requiere token)
```http
PUT /api/cotizaciones/propuestas/:id/responder
Authorization: Bearer {token}
Content-Type: application/json

{
  "estado": "aceptada"  // o "rechazada"
}
```

---

## ⭐ CALIFICACIONES

### 13. Crear Calificación (requiere token)
```http
POST /api/calificaciones
Authorization: Bearer {token}
Content-Type: application/json

{
  "id_perfil_artista": 1,
  "id_contrato": 5,
  "puntuacion": 5,
  "comentario": "Excelente servicio, muy profesional"
}
```

### 14. Obtener Calificaciones de un Artista
```http
GET /api/calificaciones/artista/:idArtista?limite=10
```

---

## 🔑 AUTENTICACIÓN EN HEADERS

Para rutas protegidas, incluir el token JWT en el header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📱 RESPUESTAS ESTÁNDAR

### Éxito
```json
{
  "exito": true,
  "mensaje": "Mensaje descriptivo",
  "datos": { ... }
}
```

### Error
```json
{
  "exito": false,
  "mensaje": "Descripción del error",
  "error": "Detalles técnicos"
}
```

---

## 🎨 CASOS DE USO DEL MOCKUP

### Landing Page
- `GET /api/categorias` - Mostrar categorías
- `GET /api/artistas?limite=6` - Artistas destacados

### Marketplace (Búsqueda de Artistas)
- `GET /api/categorias` - Pills de categorías
- `GET /api/artistas?busqueda=...&categoria=...&ubicacion=...` - Filtros

### Perfil de Artista
- `GET /api/artistas/:id` - Detalle completo
- `GET /api/calificaciones/artista/:id` - Reseñas

### Solicitar Presupuesto
- `POST /api/cotizaciones` - Crear solicitud

### Dashboard Usuario
- `GET /api/cotizaciones/mis-solicitudes` - Mis solicitudes
- `GET /api/cotizaciones/:id` - Ver propuestas recibidas

### Dashboard Artista
- `GET /api/cotizaciones` - Ver cotizaciones disponibles
- `POST /api/cotizaciones/propuestas` - Enviar propuesta

---

## 🧪 TESTING

Puedes probar los endpoints con:
- **Thunder Client** (extensión de VS Code)
- **Postman**
- **Insomnia**
- **cURL**

Ejemplo con cURL:
```bash
curl -X GET http://localhost:3000/api/artistas
```

---

## ✅ ESTADO DEL BACKEND

**Completado:**
- ✅ Autenticación (login/registro)
- ✅ Artistas (CRUD + búsqueda con filtros)
- ✅ Categorías
- ✅ Cotizaciones/Presupuestos
- ✅ Propuestas de artistas
- ✅ Calificaciones/Reseñas
- ✅ Paginación
- ✅ Validaciones
- ✅ JWT Authentication

**Por implementar (opcional):**
- Pagos
- Upload de imágenes
- Contratos completos
- Panel de administración (CRUD)
- Notificaciones

---

## 🚀 INICIO RÁPIDO

1. Asegúrate que el servidor esté corriendo:
   ```bash
   npm run dev
   ```

2. Prueba la API:
   ```bash
   curl http://localhost:3000
   ```

3. Registra un usuario y obtén el token

4. Usa el token para endpoints protegidos
