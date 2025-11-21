// src/rutas/mensajes.js
const express = require('express');
const router = express.Router();
const mensajeControlador = require('../controladores/mensajeControlador');
const { verificarToken } = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Conversaciones
router.get('/', mensajeControlador.obtenerConversaciones);
router.post('/conversacion', mensajeControlador.obtenerOCrearConversacion);
router.get('/:conversacionId/mensajes', mensajeControlador.obtenerMensajes);
router.post('/:conversacionId/mensajes', mensajeControlador.enviarMensaje);

// Mensajes
router.put('/mensajes/:mensajeId/leer', mensajeControlador.marcarComoLeido);
router.get('/no-leidos', mensajeControlador.contarNoLeidos);

module.exports = router;
