// src/rutas/contratos.js
const express = require('express');
const router = express.Router();
const contratoControlador = require('../controladores/contratoControlador');
const { verificarToken, verificarTipoUsuario } = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Rutas de admin
router.get('/admin/todos', verificarTipoUsuario('admin'), contratoControlador.listarTodosContratos);
router.put('/:id/confirmar', verificarTipoUsuario('admin'), contratoControlador.confirmarContrato);
router.put('/:id/cancelar', verificarTipoUsuario('admin'), contratoControlador.cancelarContrato);

// Solicitudes de presupuesto (nuevos endpoints)
router.post('/solicitar', contratoControlador.solicitarPresupuesto);
router.post('/solicitar-personalizado', contratoControlador.solicitarPresupuestoPersonalizado);
router.get('/solicitudes/:id', contratoControlador.obtenerSolicitud);
router.post('/solicitudes/:id/propuesta', contratoControlador.crearPropuesta);

// Gestión de contratos
router.post('/', contratoControlador.crearContrato);
router.get('/mis-contratos', contratoControlador.obtenerMisContratos);
router.get('/artista/:idArtista', contratoControlador.obtenerContratosArtista);
router.get('/:id', contratoControlador.obtenerDetalleContrato);
router.put('/:id/estado', contratoControlador.actualizarEstadoContrato);

module.exports = router;
