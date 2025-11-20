// src/rutas/usuarios.js
const express = require('express');
const router = express.Router();
const usuarioControlador = require('../controladores/usuarioControlador');
const { verificarToken, verificarTipoUsuario } = require('../middlewares/autenticacion');

// Rutas protegidas - Perfil del usuario
router.get('/perfil', verificarToken, usuarioControlador.obtenerPerfil);
router.put('/perfil', verificarToken, usuarioControlador.actualizarPerfil);

// Ruta para actualizar tipo de usuario (después de selección de rol)
router.put('/actualizar-tipo', verificarToken, usuarioControlador.actualizarTipoUsuario);

// Rutas protegidas - Reservas y favoritos del usuario
router.get('/reservas', verificarToken, usuarioControlador.obtenerReservas);
router.get('/favoritos', verificarToken, usuarioControlador.obtenerFavoritos);

// Rutas de administración (solo admin)
router.get('/', verificarToken, verificarTipoUsuario('admin'), usuarioControlador.listarUsuarios);
router.put('/:id/estado', verificarToken, verificarTipoUsuario('admin'), usuarioControlador.cambiarEstadoUsuario);
router.delete('/:id', verificarToken, verificarTipoUsuario('admin'), usuarioControlador.eliminarUsuario);

module.exports = router;
