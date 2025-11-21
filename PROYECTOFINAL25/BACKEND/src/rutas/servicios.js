// src/rutas/servicios.js
const express = require('express');
const router = express.Router();
const servicioControlador = require('../controladores/servicioControlador');
const { verificarToken } = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Obtener servicios del artista
router.get('/', servicioControlador.obtenerServicios);

// Crear servicio
router.post('/', servicioControlador.crearServicio);

// Actualizar servicio
router.put('/:id', servicioControlador.actualizarServicio);

// Eliminar servicio
router.delete('/:id', servicioControlador.eliminarServicio);

// Cambiar estado (activar/desactivar)
router.patch('/:id/estado', servicioControlador.cambiarEstado);

module.exports = router;
