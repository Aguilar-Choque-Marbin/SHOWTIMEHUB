# 🗄️ Base de Datos ShowTime Hub - PostgreSQL

## 📋 Descripción

Base de datos completa para la plataforma ShowTime Hub - Marketplace de Artistas y Entertainers.

## 🚀 Instalación y Configuración

### 1️⃣ Ejecutar en DBeaver

#### Paso 1: Crear la Base de Datos
```sql
CREATE DATABASE showtime_hub;
```

#### Paso 2: Conectarse a la nueva base de datos
- En DBeaver, crea una nueva conexión a la base de datos `showtime_hub`

#### Paso 3: Ejecutar el script principal
1. Abre el archivo `showtime_hub_complete.sql`
2. Selecciona todo (Ctrl+A)
3. Ejecuta (Ctrl+Enter o botón Execute)

#### Paso 4: Insertar datos de prueba
1. Abre el archivo `seed_data.sql`
2. Selecciona todo (Ctrl+A)
3. Ejecuta (Ctrl+Enter)

### 2️⃣ Verificar la instalación

```sql
-- Ver todas las tablas creadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Ver resumen de datos
SELECT 'Usuarios' as tabla, COUNT(*) as total FROM usuarios
UNION ALL
SELECT 'Artistas', COUNT(*) FROM perfiles_artistas
UNION ALL
SELECT 'Servicios', COUNT(*) FROM servicios_artista
UNION ALL
SELECT 'Categorías', COUNT(*) FROM categorias;
```

## 📊 Estructura de la Base de Datos

### Tablas Principales

| Tabla | Descripción | Registros de prueba |
|-------|-------------|---------------------|
| `usuarios` | Usuarios del sistema (clientes, artistas, admin) | 11 |
| `categorias` | Categorías de servicios artísticos | 10 |
| `perfiles_artistas` | Información detallada de artistas | 7 |
| `perfiles_organizadores` | Información de organizadores/clientes | 3 |
| `servicios_artista` | Servicios ofrecidos por artistas | 7 |
| `portafolio_media` | Galería multimedia (fotos/videos) | 14 |
| `disponibilidad_artista` | Calendario de disponibilidad | 7 |
| `cotizaciones_eventos` | Solicitudes de cotización | 3 |
| `propuestas_artistas` | Ofertas de artistas | 4 |
| `contratos` | Contratos confirmados | 0 |
| `pagos` | Registro de pagos | 0 |
| `calificaciones` | Reseñas y ratings | 0 |
| `conversaciones` | Hilos de chat | 3 |
| `mensajes` | Mensajes entre usuarios | 7 |
| `favoritos` | Artistas favoritos | 7 |

## 👥 Usuarios de Prueba

### Credenciales de Login
**Password para todos:** `password123`

| Email | Tipo | Nombre | Descripción |
|-------|------|--------|-------------|
| `admin@showtimehub.com` | Admin | Admin | Administrador del sistema |
| `maria.lopez@gmail.com` | Cliente | María López | Cliente/Organizadora |
| `carlos.martinez@outlook.com` | Cliente | Carlos Martínez | Cliente |
| `ana.garcia@yahoo.com` | Cliente | Ana García | Cliente |
| `juan.rocker@music.com` | Artista | The Rockers | Banda de rock |
| `sofia.voice@music.com` | Artista | Sofía La Voz | Cantante |
| `magic.roberto@shows.com` | Artista | Roberto El Mago | Mago |
| `dj.beats@music.com` | Artista | DJ Beats | DJ profesional |
| `photo.laura@visual.com` | Artista | Laura Fotografía | Fotógrafa |
| `dance.squad@shows.com` | Artista | Dance Revolution | Grupo de baile |
| `payaso.feliz@kids.com` | Artista | Payaso Feliz | Animador infantil |

## 🎨 Categorías de Artistas

1. **Músicos** - Bandas, solistas y músicos
2. **Cantantes** - Vocalistas profesionales
3. **Magos** - Magia e ilusionismo
4. **Payasos** - Animadores infantiles
5. **Bailarines** - Shows de baile
6. **Fotógrafos** - Fotografía profesional
7. **Videógrafos** - Filmación de eventos
8. **Actores** - Performance y actuación
9. **Comediantes** - Stand-up comedy
10. **DJs** - DJs para fiestas

## 🔍 Consultas Útiles

### Ver artistas en el marketplace
```sql
SELECT * FROM vista_artistas_marketplace 
WHERE disponible = true
ORDER BY calificacion_promedio DESC;
```

### Buscar artistas por categoría
```sql
SELECT 
    pa.nombre_artistico,
    pa.ciudad,
    pa.precio_minimo,
    pa.calificacion_promedio,
    c.nombre as categoria
FROM perfiles_artistas pa
JOIN servicios_artista sa ON pa.usuario_id = sa.artista_id
JOIN categorias c ON sa.categoria_id = c.id
WHERE c.slug = 'musicos' -- cambiar por la categoría deseada
AND sa.esta_activo = true
ORDER BY pa.calificacion_promedio DESC;
```

### Buscar artistas por ciudad y precio
```sql
SELECT 
    pa.nombre_artistico,
    pa.ciudad,
    pa.precio_minimo,
    pa.precio_maximo,
    pa.calificacion_promedio
FROM perfiles_artistas pa
WHERE pa.ciudad = 'La Paz'
AND pa.precio_minimo <= 2000
AND pa.disponible = true
ORDER BY pa.calificacion_promedio DESC;
```

### Ver cotizaciones pendientes
```sql
SELECT 
    ce.nombre_evento,
    ce.fecha_evento,
    ce.presupuesto_estimado,
    u.email as organizador,
    COUNT(pa.id) as propuestas_recibidas
FROM cotizaciones_eventos ce
JOIN usuarios u ON ce.organizador_id = u.id
LEFT JOIN propuestas_artistas pa ON ce.id = pa.cotizacion_id
WHERE ce.estado = 'pendiente'
GROUP BY ce.id, ce.nombre_evento, ce.fecha_evento, ce.presupuesto_estimado, u.email;
```

### Ver mensajes no leídos por usuario
```sql
SELECT 
    m.contenido_mensaje,
    m.fecha_envio,
    u.email as emisor
FROM mensajes m
JOIN usuarios u ON m.emisor_id = u.id
WHERE m.receptor_id = 2 -- ID del usuario
AND m.leido = false
ORDER BY m.fecha_envio DESC;
```

### Ver artistas más populares
```sql
SELECT 
    pa.nombre_artistico,
    pa.ciudad,
    pa.calificacion_promedio,
    pa.total_resenas,
    pa.total_contrataciones,
    COUNT(f.id) as favoritos
FROM perfiles_artistas pa
LEFT JOIN favoritos f ON pa.usuario_id = f.artista_id
GROUP BY pa.usuario_id, pa.nombre_artistico, pa.ciudad, 
         pa.calificacion_promedio, pa.total_resenas, pa.total_contrataciones
ORDER BY favoritos DESC, pa.calificacion_promedio DESC
LIMIT 10;
```

## 🔧 Mejoras Implementadas

### ✅ Nuevas Tablas
- **categorias**: Sistema de categorización de servicios
- **favoritos**: Lista de artistas favoritos por usuario

### ✅ Mejoras en Tablas Existentes
- **usuarios**: 
  - OAuth provider para login social
  - Avatar URL
  - Estado activo/inactivo
  
- **perfiles_artistas**:
  - Ubicación detallada (ciudad, departamento, país, coordenadas)
  - Redes sociales (Instagram, Facebook, YouTube, TikTok)
  - Badge de verificado y destacado
  - Calificación y estadísticas

- **servicios_artista**:
  - Relación con categorías
  - Arrays de inclusiones, tags y áreas de cobertura
  - Precios por hora y base

### ✅ Funcionalidades Automáticas
- **Triggers**: Actualización automática de `updated_at`
- **Función**: Actualización automática de calificación promedio
- **Vistas**: Vista optimizada para marketplace
- **Índices**: Optimización de búsquedas

## 🎯 Características del Sistema

### Para Clientes
- ✅ Búsqueda de artistas por categoría, ubicación y precio
- ✅ Sistema de favoritos
- ✅ Solicitar cotizaciones
- ✅ Chat con artistas
- ✅ Calificar y dejar reseñas

### Para Artistas
- ✅ Perfil profesional completo
- ✅ Portafolio multimedia
- ✅ Gestión de servicios
- ✅ Calendario de disponibilidad
- ✅ Responder cotizaciones
- ✅ Chat con clientes

### Para Administradores
- ✅ CRUD completo de usuarios
- ✅ Gestión de categorías
- ✅ Verificación de artistas
- ✅ Moderación de contenido
- ✅ Estadísticas del sistema

## 📈 Próximos Pasos

1. **Implementar Backend** (Node.js/PHP/Python)
2. **API REST** para todas las operaciones
3. **Sistema de autenticación** JWT
4. **Upload de imágenes** (AWS S3 o Cloudinary)
5. **Sistema de pagos** (Stripe/PayPal)
6. **Notificaciones** en tiempo real (WebSockets)

## 🐛 Solución de Problemas

### Error: "relation already exists"
```sql
-- Eliminar todas las tablas y volver a crear
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
-- Luego ejecutar showtime_hub_complete.sql
```

### Error en triggers
```sql
-- Ver todos los triggers
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public';
```

### Ver logs de PostgreSQL
```bash
docker logs <container_id>
```

## 📞 Soporte

Para dudas o problemas con la base de datos, revisar:
1. Los comentarios en el código SQL
2. La documentación de PostgreSQL
3. Los logs de DBeaver

---

**Versión**: 1.0  
**Fecha**: 18 de noviembre de 2025  
**PostgreSQL**: 14+  
**Autor**: ShowTime Hub Team
