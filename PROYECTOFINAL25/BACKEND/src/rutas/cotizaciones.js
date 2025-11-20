// src/rutas/cotizaciones.js
const express = require('express');
const router = express.Router();
const cotizacionControlador = require('../controladores/cotizacionControlador');
const { verificarToken } = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Solicitudes de presupuesto
router.post('/', cotizacionControlador.crearSolicitudPresupuesto);
router.get('/mis-solicitudes', cotizacionControlador.obtenerMisSolicitudes);
router.get('/:id', cotizacionControlador.obtenerDetalleCotizacion);

// Propuestas
router.post('/propuestas', cotizacionControlador.crearPropuesta);
router.put('/propuestas/:id/responder', cotizacionControlador.responderPropuesta);

module.exports = router;
