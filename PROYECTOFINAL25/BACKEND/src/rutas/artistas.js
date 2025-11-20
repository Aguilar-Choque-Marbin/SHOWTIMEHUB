// src/rutas/artistas.js
const express = require('express');
const router = express.Router();
const artistaControlador = require('../controladores/artistaControlador');
const { verificarToken, verificarTipoUsuario } = require('../middlewares/autenticacion');

// Rutas públicas
router.get('/', artistaControlador.listarArtistas);
router.get('/:id', artistaControlador.obtenerDetalleArtista);
router.get('/:id/servicios', artistaControlador.obtenerServiciosArtista);
router.get('/:id/servicios/:servicioId', artistaControlador.obtenerServicioPorId);

// Rutas protegidas (requieren login)
router.get('/perfil', verificarToken, artistaControlador.obtenerPerfil);
router.post('/perfil', verificarToken, artistaControlador.crearPerfilArtista);
router.put('/perfil', verificarToken, artistaControlador.actualizarPerfilArtista);
router.post('/servicios', verificarToken, artistaControlador.crearServicio);

// Rutas para estadísticas y reservas del artista
router.get('/estadisticas', verificarToken, artistaControlador.obtenerEstadisticas);
router.get('/reservas', verificarToken, artistaControlador.obtenerReservas);

// Rutas de administración (solo admin)
router.put('/:id/aprobar', verificarToken, verificarTipoUsuario('admin'), artistaControlador.aprobarArtista);
router.put('/:id/rechazar', verificarToken, verificarTipoUsuario('admin'), artistaControlador.rechazarArtista);
router.delete('/:id', verificarToken, verificarTipoUsuario('admin'), artistaControlador.eliminarArtista);

module.exports = router;
