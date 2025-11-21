// servidor.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// ============================================
// IMPORTAR TODAS LAS RUTAS
// ============================================
const rutasAutenticacion = require('./src/rutas/autenticacion');
const rutasUsuarios = require('./src/rutas/usuarios');
const rutasArtistas = require('./src/rutas/artistas');
const rutasCategorias = require('./src/rutas/categorias');
const rutasCotizaciones = require('./src/rutas/cotizaciones');
const rutasCalificaciones = require('./src/rutas/calificaciones');
const rutasFavoritos = require('./src/rutas/favoritos');
const rutasContratos = require('./src/rutas/contratos');
const rutasPagos = require('./src/rutas/pagos');
const rutasAdmin = require('./src/rutas/admin');
const rutasMensajes = require('./src/rutas/mensajes');
const rutasServicios = require('./src/rutas/servicios');
const rutasDisponibilidad = require('./src/rutas/disponibilidad');

const aplicacion = express();
const puerto = process.env.PUERTO || 3000;

// ============================================
// MIDDLEWARES
// ============================================
aplicacion.use(cors());
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

// ============================================
// RUTA DE BIENVENIDA Y DOCUMENTACIÓN
// ============================================
aplicacion.get('/', (peticion, respuesta) => {
  respuesta.json({ 
    mensaje: '🎭 Bienvenido a ShowTime Hub API',
    estado: 'funcionando',
    version: '2.0.0',
    descripcion: 'API REST completa para plataforma de contratación de artistas',
    endpoints: {
      autenticacion: {
        base: '/api/autenticacion',
        rutas: ['POST /registrar', 'POST /iniciar-sesion']
      },
      usuarios: {
        base: '/api/usuarios',
        rutas: ['GET /perfil', 'PUT /perfil', 'GET /', 'DELETE /:id']
      },
      artistas: {
        base: '/api/artistas',
        rutas: ['GET /', 'GET /:id', 'POST /', 'PUT /:id']
      },
      categorias: {
        base: '/api/categorias',
        rutas: ['GET /']
      },
      cotizaciones: {
        base: '/api/cotizaciones',
        rutas: ['POST /', 'GET /mis-solicitudes', 'GET /:id', 'POST /propuestas', 'PUT /propuestas/:id/responder']
      },
      calificaciones: {
        base: '/api/calificaciones',
        rutas: ['POST /', 'GET /artista/:idArtista']
      },
      favoritos: {
        base: '/api/favoritos',
        rutas: ['GET /', 'POST /', 'DELETE /artista/:idArtista', 'GET /artista/:idArtista/verificar']
      },
      contratos: {
        base: '/api/contratos',
        rutas: ['POST /', 'GET /mis-contratos', 'GET /artista/:idArtista', 'GET /:id', 'PUT /:id/estado']
      },
      pagos: {
        base: '/api/pagos',
        rutas: ['POST /', 'GET /historial', 'GET /ganancias/artista/:idArtista', 'PUT /:id/estado']
      },
      admin: {
        base: '/api/admin',
        rutas: ['GET /dashboard', 'GET /reportes', 'GET /reportes/ingresos', 'GET /categorias/populares', 'GET /usuarios', 'GET /artistas']
      }
    },
    documentacion: 'Ver DOCUMENTACION_API.md para detalles completos'
  });
});

// ============================================
// REGISTRAR TODAS LAS RUTAS DE LA API
// ============================================
aplicacion.use('/api/autenticacion', rutasAutenticacion);
aplicacion.use('/api/usuarios', rutasUsuarios);
aplicacion.use('/api/artistas', rutasArtistas);
aplicacion.use('/api/categorias', rutasCategorias);
aplicacion.use('/api/cotizaciones', rutasCotizaciones);
aplicacion.use('/api/calificaciones', rutasCalificaciones);
aplicacion.use('/api/favoritos', rutasFavoritos);
aplicacion.use('/api/contratos', rutasContratos);
aplicacion.use('/api/pagos', rutasPagos);
aplicacion.use('/api/admin', rutasAdmin);
aplicacion.use('/api/mensajes', rutasMensajes);
aplicacion.use('/api/servicios', rutasServicios);
aplicacion.use('/api/disponibilidad', rutasDisponibilidad);

// ============================================
// MANEJO DE ERRORES
// ============================================
// Error 404 - Ruta no encontrada
aplicacion.use((peticion, respuesta) => {
  respuesta.status(404).json({
    exito: false,
    mensaje: 'Ruta no encontrada',
    ruta_solicitada: peticion.url,
    metodo: peticion.method
  });
});

// Error 500 - Error del servidor
aplicacion.use((error, peticion, respuesta, siguiente) => {
  console.error('❌ Error del servidor:', error);
  respuesta.status(500).json({
    exito: false,
    mensaje: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Error procesando solicitud'
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================
aplicacion.listen(puerto, () => {
  console.log('═══════════════════════════════════════════════════');
  console.log('🎭  SHOWTIME HUB API v2.0.0');
  console.log('═══════════════════════════════════════════════════');
  console.log(`🚀  Servidor corriendo en: http://localhost:${puerto}`);
  console.log(`📚  Documentación: http://localhost:${puerto}/`);
  console.log(`🗄️   Base de datos: PostgreSQL (${process.env.DB_NOMBRE})`);
  console.log('═══════════════════════════════════════════════════');
  console.log('📋  Endpoints disponibles:');
  console.log('   • Autenticación: /api/autenticacion');
  console.log('   • Usuarios: /api/usuarios');
  console.log('   • Artistas: /api/artistas');
  console.log('   • Categorías: /api/categorias');
  console.log('   • Cotizaciones: /api/cotizaciones');
  console.log('   • Calificaciones: /api/calificaciones');
  console.log('   • Favoritos: /api/favoritos');
  console.log('   • Contratos: /api/contratos');
  console.log('   • Pagos: /api/pagos');
  console.log('   • Mensajes: /api/mensajes');
  console.log('   • Admin: /api/admin');
  console.log('═══════════════════════════════════════════════════');
});
