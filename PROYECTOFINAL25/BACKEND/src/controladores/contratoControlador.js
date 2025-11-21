// src/controladores/contratoControlador.js
const contratoModelo = require('../modelos/contratoModelo');

// Crear contrato
const crearContrato = async (peticion, respuesta) => {
  try {
    const datos = peticion.body;
    datos.id_usuario_organizador = peticion.usuario.id;

    const nuevoContrato = await contratoModelo.crearContrato(datos);

    respuesta.status(201).json({
      exito: true,
      mensaje: 'Contrato creado exitosamente',
      datos: nuevoContrato
    });

  } catch (error) {
    console.error('Error al crear contrato:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al crear contrato',
      error: error.message
    });
  }
};

// Obtener contratos del usuario
const obtenerMisContratos = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    const filtros = {
      estado: peticion.query.estado
    };

    const contratos = await contratoModelo.obtenerContratosUsuario(idUsuario, filtros);

    respuesta.json({
      exito: true,
      datos: contratos
    });

  } catch (error) {
    console.error('Error al obtener contratos:', error);
    console.error('Stack:', error.stack);
    console.error('ID Usuario:', peticion.usuario);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener contratos',
      error: error.message,
      detalles: error.stack
    });
  }
};

// Obtener contratos del artista
const obtenerContratosArtista = async (peticion, respuesta) => {
  try {
    const { idArtista } = peticion.params;
    const filtros = {
      estado: peticion.query.estado
    };

    const contratos = await contratoModelo.obtenerContratosArtista(idArtista, filtros);

    respuesta.json({
      exito: true,
      datos: contratos
    });

  } catch (error) {
    console.error('Error al obtener contratos:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener contratos',
      error: error.message
    });
  }
};

// Obtener detalle de contrato
const obtenerDetalleContrato = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;

    const contrato = await contratoModelo.obtenerContratoPorId(id);

    if (!contrato) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Contrato no encontrado'
      });
    }

    respuesta.json({
      exito: true,
      datos: contrato
    });

  } catch (error) {
    console.error('Error al obtener contrato:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener contrato',
      error: error.message
    });
  }
};

// Actualizar estado de contrato
const actualizarEstadoContrato = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;
    const { estado } = peticion.body;

    const contrato = await contratoModelo.actualizarEstadoContrato(id, estado);

    if (!contrato) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Contrato no encontrado'
      });
    }

    respuesta.json({
      exito: true,
      mensaje: `Contrato ${estado} exitosamente`,
      datos: contrato
    });

  } catch (error) {
    console.error('Error al actualizar contrato:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al actualizar contrato',
      error: error.message
    });
  }
};

// Listar todos los contratos (admin)
const listarTodosContratos = async (peticion, respuesta) => {
  try {
    const filtros = {
      estado: peticion.query.estado,
      busqueda: peticion.query.busqueda
    };

    const contratos = await contratoModelo.obtenerTodosContratos(filtros);

    respuesta.json({
      exito: true,
      datos: contratos
    });

  } catch (error) {
    console.error('Error al listar contratos:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al listar contratos',
      error: error.message
    });
  }
};

// Confirmar contrato (admin)
const confirmarContrato = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;

    await contratoModelo.actualizarEstadoContrato(id, 'confirmado');

    respuesta.json({
      exito: true,
      mensaje: 'Contrato confirmado exitosamente'
    });

  } catch (error) {
    console.error('Error al confirmar contrato:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al confirmar contrato',
      error: error.message
    });
  }
};

// Cancelar contrato (admin)
const cancelarContrato = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;

    await contratoModelo.actualizarEstadoContrato(id, 'cancelado');

    respuesta.json({
      exito: true,
      mensaje: 'Contrato cancelado'
    });

  } catch (error) {
    console.error('Error al cancelar contrato:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al cancelar contrato',
      error: error.message
    });
  }
};

// Solicitar presupuesto para servicio específico
const solicitarPresupuesto = async (peticion, respuesta) => {
  try {
    const {
      artista_id,
      servicio_id,
      fecha_evento,
      ubicacion,
      mensaje,
      nombre_contacto,
      email_contacto,
      telefono_contacto
    } = peticion.body;

    const usuario_id = peticion.usuario.id;

    // Crear solicitud en la tabla cotizaciones_eventos
    const solicitud = await contratoModelo.crearSolicitudPresupuesto({
      organizador_id: usuario_id,
      artista_id,
      servicio_id,
      tipo_evento: 'servicio_especifico',
      fecha_evento,
      ubicacion,
      detalles_brief: mensaje,
      nombre_contacto,
      email_contacto,
      telefono_contacto,
      estado: 'pendiente'
    });

    respuesta.status(201).json({
      exito: true,
      mensaje: 'Solicitud de presupuesto enviada exitosamente',
      datos: solicitud
    });

  } catch (error) {
    console.error('Error al solicitar presupuesto:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al enviar solicitud',
      error: error.message
    });
  }
};

// Solicitar presupuesto personalizado
const solicitarPresupuestoPersonalizado = async (peticion, respuesta) => {
  try {
    const {
      artista_id,
      tipo_evento,
      fecha_evento,
      ubicacion,
      mensaje,
      nombre_contacto,
      email_contacto,
      telefono_contacto
    } = peticion.body;

    const usuario_id = peticion.usuario.id;

    // Crear solicitud en la tabla cotizaciones_eventos
    const solicitud = await contratoModelo.crearSolicitudPresupuesto({
      organizador_id: usuario_id,
      artista_id,
      servicio_id: null,
      tipo_evento,
      fecha_evento,
      ubicacion,
      detalles_brief: mensaje,
      nombre_contacto,
      email_contacto,
      telefono_contacto,
      estado: 'pendiente'
    });

    respuesta.status(201).json({
      exito: true,
      mensaje: 'Solicitud de presupuesto personalizado enviada exitosamente',
      datos: solicitud
    });

  } catch (error) {
    console.error('Error al solicitar presupuesto personalizado:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al enviar solicitud',
      error: error.message
    });
  }
};

// Obtener detalles de una solicitud
const obtenerSolicitud = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;

    const solicitud = await contratoModelo.obtenerSolicitudPorId(id);

    if (!solicitud) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Solicitud no encontrada'
      });
    }

    // Verificar que el usuario sea el artista destinatario
    if (solicitud.artista_id !== peticion.usuario.artista_id) {
      return respuesta.status(403).json({
        exito: false,
        mensaje: 'No tienes permiso para ver esta solicitud'
      });
    }

    respuesta.json({
      exito: true,
      datos: solicitud
    });

  } catch (error) {
    console.error('Error al obtener solicitud:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener solicitud',
      error: error.message
    });
  }
};

// Artista crea propuesta para una solicitud
const crearPropuesta = async (peticion, respuesta) => {
  try {
    const { id: solicitudId } = peticion.params;
    const {
      precio,
      servicios_incluidos,
      mensaje
    } = peticion.body;

    const artista_id = peticion.usuario.artista_id;

    // Verificar que la solicitud existe
    const solicitud = await contratoModelo.obtenerSolicitudPorId(solicitudId);
    
    if (!solicitud) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Solicitud no encontrada'
      });
    }

    // Crear propuesta en la tabla propuestas_artistas
    const propuesta = await contratoModelo.crearPropuestaArtista({
      cotizacion_id: solicitudId,
      artista_id,
      mensaje_propuesta: `${mensaje}\n\nServicios incluidos:\n${servicios_incluidos}`,
      monto_ofertado: precio,
      moneda: 'EUR',
      estado: 'pendiente'
    });

    // Actualizar estado de la solicitud
    await contratoModelo.actualizarEstadoSolicitud(solicitudId, 'propuesta_enviada');

    respuesta.status(201).json({
      exito: true,
      mensaje: 'Propuesta enviada exitosamente',
      datos: propuesta
    });

  } catch (error) {
    console.error('Error al crear propuesta:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al enviar propuesta',
      error: error.message
    });
  }
};

// Obtener estadísticas del artista
const obtenerEstadisticasArtista = async (peticion, respuesta) => {
  try {
    const idArtista = peticion.usuario.id;
    
    const estadisticas = await contratoModelo.obtenerEstadisticasArtista(idArtista);
    
    respuesta.json(estadisticas);
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener estadísticas',
      error: error.message
    });
  }
};

// Obtener próximas reservas del artista
const obtenerProximasReservasArtista = async (peticion, respuesta) => {
  try {
    const idArtista = peticion.usuario.id;
    
    const reservas = await contratoModelo.obtenerProximasReservasArtista(idArtista);
    
    respuesta.json(reservas);
  } catch (error) {
    console.error('Error al obtener próximas reservas:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener próximas reservas',
      error: error.message
    });
  }
};

module.exports = {
  crearContrato,
  obtenerMisContratos,
  obtenerContratosArtista,
  obtenerDetalleContrato,
  actualizarEstadoContrato,
  listarTodosContratos,
  confirmarContrato,
  cancelarContrato,
  solicitarPresupuesto,
  solicitarPresupuestoPersonalizado,
  obtenerSolicitud,
  crearPropuesta,
  obtenerEstadisticasArtista,
  obtenerProximasReservasArtista
};
