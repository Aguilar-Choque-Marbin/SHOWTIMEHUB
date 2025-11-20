// src/rutas/autenticacion.js
const express = require('express');
const router = express.Router();
const autenticacionControlador = require('../controladores/autenticacionControlador');

// Ruta para registrar usuario
router.post('/registrar', autenticacionControlador.registrar);

// Ruta para iniciar sesión
router.post('/iniciar-sesion', autenticacionControlador.iniciarSesion);

// Ruta para solicitar recuperación de contraseña
router.post('/recuperar-contrasena', autenticacionControlador.solicitarRecuperacion);

// Ruta para verificar token de recuperación
router.get('/verificar-token/:token', autenticacionControlador.verificarToken);

// Ruta para restablecer contraseña
router.post('/restablecer-contrasena', autenticacionControlador.restablecerContrasena);

module.exports = router;
