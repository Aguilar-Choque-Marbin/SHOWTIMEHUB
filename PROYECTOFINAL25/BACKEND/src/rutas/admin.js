// src/rutas/admin.js
const express = require('express');
const router = express.Router();
const adminControlador = require('../controladores/adminControlador');
const { verificarToken, verificarTipoUsuario } = require('../middlewares/autenticacion');

// Todas las rutas requieren ser administrador
router.use(verificarToken);
router.use(verificarTipoUsuario('admin'));

// Dashboard y estadísticas
router.get('/dashboard', adminControlador.obtenerDashboard);
router.get('/reportes', adminControlador.obtenerReportes);
router.get('/reportes/ingresos', adminControlador.obtenerReporteIngresos);
router.get('/categorias/populares', adminControlador.obtenerCategoriasPopulares);

// Gestión de usuarios y artistas
router.get('/usuarios', adminControlador.gestionarUsuarios);
router.get('/artistas', adminControlador.gestionarArtistas);

module.exports = router;
