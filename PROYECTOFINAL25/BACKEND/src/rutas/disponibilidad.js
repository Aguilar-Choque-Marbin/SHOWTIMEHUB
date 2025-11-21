// src/rutas/disponibilidad.js
const express = require('express');
const router = express.Router();
const disponibilidadControlador = require('../controladores/disponibilidadControlador');
const { verificarToken, verificarTipoUsuario } = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación y ser artista
router.use(verificarToken);
router.use(verificarTipoUsuario('artista'));

// Rutas de bloqueos
router.post('/bloqueos', disponibilidadControlador.crearBloqueo);
router.get('/bloqueos', disponibilidadControlador.obtenerBloqueos);
router.get('/bloqueos/rango', disponibilidadControlador.obtenerBloqueosPorFecha);
router.delete('/bloqueos/:id', disponibilidadControlador.eliminarBloqueo);

// Rutas de horario
router.get('/horario', disponibilidadControlador.obtenerHorario);
router.put('/horario', disponibilidadControlador.actualizarHorario);

module.exports = router;
