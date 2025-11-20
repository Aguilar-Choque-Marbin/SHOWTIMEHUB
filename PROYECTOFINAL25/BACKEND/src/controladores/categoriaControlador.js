// src/controladores/categoriaControlador.js
const categoriaModelo = require('../modelos/categoriaModelo');

// Listar todas las categorías
const listarCategorias = async (peticion, respuesta) => {
  try {
    const categorias = await categoriaModelo.obtenerCategorias();

    respuesta.json({
      exito: true,
      datos: categorias
    });

  } catch (error) {
    console.error('Error al obtener categorías:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener categorías',
      error: error.message
    });
  }
};

module.exports = {
  listarCategorias
};
