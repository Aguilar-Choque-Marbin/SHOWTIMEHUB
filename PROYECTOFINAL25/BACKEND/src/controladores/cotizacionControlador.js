// src/controladores/cotizacionControlador.js
const cotizacionModelo = require('../modelos/cotizacionModelo');

// Crear solicitud de presupuesto
const crearSolicitudPresupuesto = async (peticion, respuesta) => {
  try {
    const datos = peticion.body;
    datos.id_usuario_organizador = peticion.usuario.id;

    const nuevaCotizacion = await cotizacionModelo.crearCotizacion(datos);

    respuesta.status(201).json({
      exito: true,
      mensaje: 'Solicitud de presupuesto creada exitosamente',
      datos: nuevaCotizacion
    });

  } catch (error) {
    console.error('Error al crear cotización:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al crear solicitud de presupuesto',
      error: error.message
    });
  }
};

// Obtener mis solicitudes
const obtenerMisSolicitudes = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    const cotizaciones = await cotizacionModelo.obtenerCotizacionesUsuario(idUsuario);

    respuesta.json({
      exito: true,
      datos: cotizaciones
    });

  } catch (error) {
    console.error('Error al obtener cotizaciones:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener solicitudes',
      error: error.message
    });
  }
};

// Obtener detalle de cotización con propuestas
const obtenerDetalleCotizacion = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;

    const cotizacion = await cotizacionModelo.obtenerCotizacionPorId(id);
    
    if (!cotizacion) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Cotización no encontrada'
      });
    }

    const propuestas = await cotizacionModelo.obtenerPropuestasCotizacion(id);

    respuesta.json({
      exito: true,
      datos: {
        ...cotizacion,
        propuestas
      }
    });

  } catch (error) {
    console.error('Error al obtener cotización:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener cotización',
      error: error.message
    });
  }
};

// Artista crea propuesta para una cotización
const crearPropuesta = async (peticion, respuesta) => {
  try {
    const datos = peticion.body;

    const nuevaPropuesta = await cotizacionModelo.crearPropuesta(datos);

    respuesta.status(201).json({
      exito: true,
      mensaje: 'Propuesta enviada exitosamente',
      datos: nuevaPropuesta
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

// Aceptar/rechazar propuesta
const responderPropuesta = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;
    const { estado } = peticion.body; // 'aceptada' o 'rechazada'

    const propuesta = await cotizacionModelo.actualizarEstadoPropuesta(id, estado);

    respuesta.json({
      exito: true,
      mensaje: `Propuesta ${estado} exitosamente`,
      datos: propuesta
    });

  } catch (error) {
    console.error('Error al responder propuesta:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al responder propuesta',
      error: error.message
    });
  }
};

module.exports = {
  crearSolicitudPresupuesto,
  obtenerMisSolicitudes,
  obtenerDetalleCotizacion,
  crearPropuesta,
  responderPropuesta
};
