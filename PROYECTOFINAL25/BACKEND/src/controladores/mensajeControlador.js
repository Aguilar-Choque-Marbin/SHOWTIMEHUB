// src/controladores/mensajeControlador.js
const mensajeModelo = require('../modelos/mensajeModelo');

// Obtener todas las conversaciones del usuario
const obtenerConversaciones = async (peticion, respuesta) => {
  try {
    const usuario_id = peticion.usuario.id;

    const conversaciones = await mensajeModelo.obtenerConversacionesUsuario(usuario_id);

    respuesta.json({
      exito: true,
      datos: conversaciones
    });

  } catch (error) {
    console.error('Error al obtener conversaciones:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener conversaciones',
      error: error.message
    });
  }
};

// Crear nueva conversación
const crearConversacion = async (peticion, respuesta) => {
  try {
    const { receptor_id } = peticion.body;
    const usuario_id = peticion.usuario.id;

    // Verificar si ya existe conversación
    let conversacion = await mensajeModelo.buscarConversacion(usuario_id, receptor_id);

    if (!conversacion) {
      conversacion = await mensajeModelo.crearConversacion(usuario_id, receptor_id);
    }

    respuesta.status(201).json({
      exito: true,
      mensaje: 'Conversación iniciada',
      datos: conversacion
    });

  } catch (error) {
    console.error('Error al crear conversación:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al crear conversación',
      error: error.message
    });
  }
};

// Obtener mensajes de una conversación
const obtenerMensajesConversacion = async (peticion, respuesta) => {
  try {
    const { id: conversacion_id } = peticion.params;
    const usuario_id = peticion.usuario.id;

    // Verificar que el usuario pertenece a la conversación
    const conversacion = await mensajeModelo.obtenerConversacionPorId(conversacion_id);
    
    if (!conversacion) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Conversación no encontrada'
      });
    }

    if (conversacion.usuario_uno_id !== usuario_id && conversacion.usuario_dos_id !== usuario_id) {
      return respuesta.status(403).json({
        exito: false,
        mensaje: 'No tienes acceso a esta conversación'
      });
    }

    const mensajes = await mensajeModelo.obtenerMensajes(conversacion_id);

    respuesta.json({
      exito: true,
      datos: mensajes
    });

  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener mensajes',
      error: error.message
    });
  }
};

// Enviar mensaje
const enviarMensaje = async (peticion, respuesta) => {
  try {
    const {
      conversacion_id,
      receptor_id,
      contenido_mensaje,
      url_adjunto,
      tipo_adjunto
    } = peticion.body;

    const emisor_id = peticion.usuario.id;

    const mensaje = await mensajeModelo.crearMensaje({
      conversacion_id,
      emisor_id,
      receptor_id,
      contenido_mensaje,
      url_adjunto,
      tipo_adjunto,
      leido: false
    });

    // Actualizar último mensaje de la conversación
    await mensajeModelo.actualizarUltimoMensaje(conversacion_id, mensaje.id);

    respuesta.status(201).json({
      exito: true,
      mensaje: 'Mensaje enviado',
      datos: mensaje
    });

  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al enviar mensaje',
      error: error.message
    });
  }
};

// Marcar mensaje como leído
const marcarComoLeido = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;

    const mensaje = await mensajeModelo.marcarComoLeido(id);

    respuesta.json({
      exito: true,
      mensaje: 'Mensaje marcado como leído',
      datos: mensaje
    });

  } catch (error) {
    console.error('Error al marcar mensaje:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al actualizar mensaje',
      error: error.message
    });
  }
};

// Contar mensajes no leídos
const contarMensajesNoLeidos = async (peticion, respuesta) => {
  try {
    const usuario_id = peticion.usuario.id;

    const total = await mensajeModelo.contarNoLeidos(usuario_id);

    respuesta.json({
      exito: true,
      datos: {
        total_no_leidos: total
      }
    });

  } catch (error) {
    console.error('Error al contar mensajes:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al contar mensajes',
      error: error.message
    });
  }
};

module.exports = {
  obtenerConversaciones,
  crearConversacion,
  obtenerMensajesConversacion,
  enviarMensaje,
  marcarComoLeido,
  contarMensajesNoLeidos
};
