// src/rutas/categorias.js
const express = require('express');
const router = express.Router();
const categoriaControlador = require('../controladores/categoriaControlador');

// Obtener todas las categorías
router.get('/', categoriaControlador.listarCategorias);

module.exports = router;
