// src/rutas/calificaciones.js
const express = require('express');
const router = express.Router();
const calificacionControlador = require('../controladores/calificacionControlador');
const { verificarToken } = require('../middlewares/autenticacion');

// Crear calificación (requiere login)
router.post('/', verificarToken, calificacionControlador.crearCalificacion);

// Obtener calificaciones de un artista (público)
router.get('/artista/:idArtista', calificacionControlador.obtenerCalificaciones);

module.exports = router;
