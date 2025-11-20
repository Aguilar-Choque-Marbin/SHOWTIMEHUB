// src/rutas/mensajes.js
const express = require('express');
const router = express.Router();
const mensajeControlador = require('../controladores/mensajeControlador');
const { verificarToken } = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Conversaciones
router.get('/conversaciones', mensajeControlador.obtenerConversaciones);
router.post('/conversaciones', mensajeControlador.crearConversacion);
router.get('/conversaciones/:id/mensajes', mensajeControlador.obtenerMensajesConversacion);

// Mensajes
router.post('/', mensajeControlador.enviarMensaje);
router.put('/:id/leer', mensajeControlador.marcarComoLeido);
router.get('/no-leidos', mensajeControlador.contarMensajesNoLeidos);

module.exports = router;
