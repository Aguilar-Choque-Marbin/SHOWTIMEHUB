// src/controladores/mensajeControlador.js
const mensajeModelo = require('../modelos/mensajeModelo');

// Obtener todas las conversaciones del usuario
const obtenerConversaciones = async (peticion, respuesta) => {
  try {
    const usuarioId = peticion.usuario.id;
    const conversaciones = await mensajeModelo.obtenerConversacionesUsuario(usuarioId);
    respuesta.json(conversaciones);
  } catch (error) {
    console.error('Error al obtener conversaciones:', error);
    respuesta.status(500).json({ 
      mensaje: 'Error al obtener conversaciones',
      error: error.message 
    });
  }
};

// Obtener o crear conversación con otro usuario
const obtenerOCrearConversacion = async (peticion, respuesta) => {
  try {
    const usuarioId = peticion.usuario.id;
    const { otroUsuarioId } = peticion.body;

    if (!otroUsuarioId) {
      return respuesta.status(400).json({ mensaje: 'ID del otro usuario requerido' });
    }

    const conversacion = await mensajeModelo.obtenerOCrearConversacion(usuarioId, otroUsuarioId);
    respuesta.json(conversacion);
  } catch (error) {
    console.error('Error al obtener/crear conversación:', error);
    respuesta.status(500).json({ 
      mensaje: 'Error al obtener/crear conversación',
      error: error.message 
    });
  }
};

// Obtener mensajes de una conversación
const obtenerMensajes = async (peticion, respuesta) => {
  try {
    const usuarioId = peticion.usuario.id;
    const { conversacionId } = peticion.params;

    // Verificar que el usuario pertenece a la conversación
    const conversacion = await mensajeModelo.obtenerConversacionPorId(conversacionId);
    
    if (!conversacion) {
      return respuesta.status(404).json({ mensaje: 'Conversación no encontrada' });
    }

    if (conversacion.usuario_uno_id !== usuarioId && conversacion.usuario_dos_id !== usuarioId) {
      return respuesta.status(403).json({ mensaje: 'No tienes acceso a esta conversación' });
    }

    const mensajes = await mensajeModelo.obtenerMensajes(conversacionId, usuarioId);
    respuesta.json(mensajes);
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    respuesta.status(500).json({ 
      mensaje: 'Error al obtener mensajes',
      error: error.message 
    });
  }
};

// Enviar mensaje
const enviarMensaje = async (peticion, respuesta) => {
  try {
    const emisorId = peticion.usuario.id;
    const { conversacionId } = peticion.params;
    const { contenido } = peticion.body;

    if (!contenido || contenido.trim() === '') {
      return respuesta.status(400).json({ mensaje: 'El contenido del mensaje es requerido' });
    }

    // Verificar que el usuario pertenece a la conversación
    const conversacion = await mensajeModelo.obtenerConversacionPorId(conversacionId);
    
    if (!conversacion) {
      return respuesta.status(404).json({ mensaje: 'Conversación no encontrada' });
    }

    if (conversacion.usuario_uno_id !== emisorId && conversacion.usuario_dos_id !== emisorId) {
      return respuesta.status(403).json({ mensaje: 'No tienes acceso a esta conversación' });
    }

    // Determinar el receptor
    const receptorId = conversacion.usuario_uno_id === emisorId 
      ? conversacion.usuario_dos_id 
      : conversacion.usuario_uno_id;

    const mensaje = await mensajeModelo.crearMensaje({
      conversacion_id: conversacionId,
      emisor_id: emisorId,
      receptor_id: receptorId,
      contenido_mensaje: contenido
    });

    respuesta.status(201).json(mensaje);
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    respuesta.status(500).json({ 
      mensaje: 'Error al enviar mensaje',
      error: error.message 
    });
  }
};

// Marcar mensajes como leídos
const marcarComoLeido = async (peticion, respuesta) => {
  try {
    const { mensajeId } = peticion.params;
    const mensaje = await mensajeModelo.marcarComoLeido(mensajeId);
    respuesta.json(mensaje);
  } catch (error) {
    console.error('Error al marcar mensaje como leído:', error);
    respuesta.status(500).json({ 
      mensaje: 'Error al marcar mensaje como leído',
      error: error.message 
    });
  }
};

// Contar mensajes no leídos
const contarNoLeidos = async (peticion, respuesta) => {
  try {
    const usuarioId = peticion.usuario.id;
    const total = await mensajeModelo.contarNoLeidos(usuarioId);
    respuesta.json({ total });
  } catch (error) {
    console.error('Error al contar mensajes no leídos:', error);
    respuesta.status(500).json({ 
      mensaje: 'Error al contar mensajes no leídos',
      error: error.message 
    });
  }
};

module.exports = {
  obtenerConversaciones,
  obtenerOCrearConversacion,
  obtenerMensajes,
  enviarMensaje,
  marcarComoLeido,
  contarNoLeidos
};
