// src/controladores/calificacionControlador.js
const calificacionModelo = require('../modelos/calificacionModelo');

// Crear calificación
const crearCalificacion = async (peticion, respuesta) => {
  try {
    const datos = peticion.body;
    datos.id_usuario_calificador = peticion.usuario.id;

    // Validar puntuación
    if (datos.puntuacion < 1 || datos.puntuacion > 5) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: 'La puntuación debe estar entre 1 y 5'
      });
    }

    const nuevaCalificacion = await calificacionModelo.crearCalificacion(datos);

    respuesta.status(201).json({
      exito: true,
      mensaje: 'Calificación enviada exitosamente',
      datos: nuevaCalificacion
    });

  } catch (error) {
    console.error('Error al crear calificación:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al enviar calificación',
      error: error.message
    });
  }
};

// Obtener calificaciones de un artista
const obtenerCalificaciones = async (peticion, respuesta) => {
  try {
    const { idArtista } = peticion.params;
    const limite = peticion.query.limite || 10;

    const calificaciones = await calificacionModelo.obtenerCalificacionesArtista(idArtista, limite);

    respuesta.json({
      exito: true,
      datos: calificaciones
    });

  } catch (error) {
    console.error('Error al obtener calificaciones:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener calificaciones',
      error: error.message
    });
  }
};

module.exports = {
  crearCalificacion,
  obtenerCalificaciones
};
