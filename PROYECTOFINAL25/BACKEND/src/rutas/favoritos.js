// src/rutas/favoritos.js
const express = require('express');
const router = express.Router();
const favoritoControlador = require('../controladores/favoritoControlador');
const { verificarToken } = require('../middlewares/autenticacion');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Gestión de favoritos
router.get('/', favoritoControlador.obtenerFavoritos);
router.post('/', favoritoControlador.agregarFavorito);
router.delete('/artista/:idArtista', favoritoControlador.eliminarFavorito);
router.get('/artista/:idArtista/verificar', favoritoControlador.verificarFavorito);

module.exports = router;
