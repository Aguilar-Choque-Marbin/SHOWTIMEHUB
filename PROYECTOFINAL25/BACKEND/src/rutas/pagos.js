// src/rutas/pagos.js
const express = require('express');
const router = express.Router();
const pagoControlador = require('../controladores/pagoControlador');
const { verificarToken } = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Nuevos endpoints para el flujo de pago
router.get('/propuestas/:id', pagoControlador.obtenerPropuestaPorId);
router.post('/generar-qr', pagoControlador.generarCodigoQR);
router.post('/procesar', pagoControlador.procesarPago);

// Gestión de pagos
router.post('/', pagoControlador.crearPago);
router.get('/historial', pagoControlador.obtenerHistorialPagos);
router.get('/ganancias/artista/:idArtista', pagoControlador.obtenerGanancias);
router.put('/:id/estado', pagoControlador.actualizarEstadoPago);

module.exports = router;
