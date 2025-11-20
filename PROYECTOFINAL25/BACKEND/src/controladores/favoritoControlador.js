// src/controladores/favoritoControlador.js
const favoritoModelo = require('../modelos/favoritoModelo');

// Agregar a favoritos
const agregarFavorito = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    const { id_perfil_artista } = peticion.body;

    const favorito = await favoritoModelo.agregarFavorito(idUsuario, id_perfil_artista);

    respuesta.status(201).json({
      exito: true,
      mensaje: 'Artista agregado a favoritos',
      datos: favorito
    });

  } catch (error) {
    console.error('Error al agregar favorito:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al agregar a favoritos',
      error: error.message
    });
  }
};

// Eliminar de favoritos
const eliminarFavorito = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    const { idArtista } = peticion.params;

    const favorito = await favoritoModelo.eliminarFavorito(idUsuario, idArtista);

    if (!favorito) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Favorito no encontrado'
      });
    }

    respuesta.json({
      exito: true,
      mensaje: 'Artista eliminado de favoritos'
    });

  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al eliminar de favoritos',
      error: error.message
    });
  }
};

// Obtener favoritos del usuario
const obtenerFavoritos = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    const favoritos = await favoritoModelo.obtenerFavoritos(idUsuario);

    respuesta.json({
      exito: true,
      datos: favoritos
    });

  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    console.error('Stack:', error.stack);
    console.error('ID Usuario:', peticion.usuario.id);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener favoritos',
      error: error.message,
      detalles: error.stack
    });
  }
};

// Verificar si es favorito
const verificarFavorito = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    const { idArtista } = peticion.params;

    const esFavorito = await favoritoModelo.esFavorito(idUsuario, idArtista);

    respuesta.json({
      exito: true,
      es_favorito: esFavorito
    });

  } catch (error) {
    console.error('Error al verificar favorito:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al verificar favorito',
      error: error.message
    });
  }
};

module.exports = {
  agregarFavorito,
  eliminarFavorito,
  obtenerFavoritos,
  verificarFavorito
};
