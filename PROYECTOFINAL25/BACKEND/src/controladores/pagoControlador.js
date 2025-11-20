// src/controladores/pagoControlador.js
const pagoModelo = require('../modelos/pagoModelo');
const QRCode = require('qrcode');

// Obtener detalles de propuesta para pago
const obtenerPropuestaPorId = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;

    const propuesta = await pagoModelo.obtenerPropuestaPorId(id);

    if (!propuesta) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Propuesta no encontrada'
      });
    }

    respuesta.json({
      exito: true,
      datos: {
        propuesta_id: propuesta.id,
        artista_nombre: propuesta.nombre_artistico,
        servicio_nombre: propuesta.tipo_evento,
        fecha_evento: propuesta.fecha_evento,
        precio: parseFloat(propuesta.monto_ofertado)
      }
    });

  } catch (error) {
    console.error('Error al obtener propuesta:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener propuesta',
      error: error.message
    });
  }
};

// Generar código QR para pago
const generarCodigoQR = async (peticion, respuesta) => {
  try {
    const { propuesta_id, monto } = peticion.body;

    // Crear datos del QR (en producción esto sería una URL de pago real)
    const datosQR = {
      propuesta_id,
      monto,
      usuario_id: peticion.usuario.id,
      timestamp: Date.now()
    };

    const qrString = JSON.stringify(datosQR);
    
    // Generar QR en base64
    const qrImage = await QRCode.toDataURL(qrString);

    respuesta.json({
      exito: true,
      datos: {
        qr_image: qrImage,
        qr_id: `QR-${propuesta_id}-${Date.now()}`
      }
    });

  } catch (error) {
    console.error('Error al generar QR:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al generar código QR',
      error: error.message
    });
  }
};

// Procesar pago
const procesarPago = async (peticion, respuesta) => {
  try {
    const {
      propuesta_id,
      metodo_pago,
      monto_total,
      monto_artista,
      comision_plataforma,
      datos_tarjeta
    } = peticion.body;

    const usuario_id = peticion.usuario.id;

    // Obtener información de la propuesta
    const propuesta = await pagoModelo.obtenerPropuestaPorId(propuesta_id);
    
    if (!propuesta) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Propuesta no encontrada'
      });
    }

    // Crear registro de pago
    const pago = await pagoModelo.crearPago({
      id_contrato: null, // Se asignará después de crear el contrato
      id_propuesta: propuesta_id,
      monto: monto_total,
      metodo_pago,
      estado: 'completado',
      fecha_pago: new Date()
    });

    // Crear contrato asociado
    const contrato = await pagoModelo.crearContratoDesdePropouesta({
      id_cotizacion: propuesta.cotizacion_id,
      id_propuesta: propuesta_id,
      id_perfil_artista: propuesta.artista_id,
      id_usuario_organizador: usuario_id,
      fecha_evento: propuesta.fecha_evento,
      ubicacion_evento: propuesta.ubicacion,
      monto_total: monto_artista,
      estado: 'confirmado'
    });

    // Actualizar pago con el ID del contrato
    await pagoModelo.actualizarPagoContrato(pago.id, contrato.id);

    // Actualizar estado de la propuesta
    await pagoModelo.actualizarEstadoPropuesta(propuesta_id, 'aceptada');

    respuesta.status(201).json({
      exito: true,
      mensaje: 'Pago procesado exitosamente',
      datos: {
        pago_id: pago.id,
        contrato_id: contrato.id
      }
    });

  } catch (error) {
    console.error('Error al procesar pago:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al procesar pago',
      error: error.message
    });
  }
};

// Crear pago
const crearPago = async (peticion, respuesta) => {
  try {
    const datos = peticion.body;

    const nuevoPago = await pagoModelo.crearPago(datos);

    respuesta.status(201).json({
      exito: true,
      mensaje: 'Pago registrado exitosamente',
      datos: nuevoPago
    });

  } catch (error) {
    console.error('Error al crear pago:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al procesar pago',
      error: error.message
    });
  }
};

// Obtener historial de pagos del usuario
const obtenerHistorialPagos = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;

    const pagos = await pagoModelo.obtenerHistorialPagosUsuario(idUsuario);

    respuesta.json({
      exito: true,
      datos: pagos
    });

  } catch (error) {
    console.error('Error al obtener historial de pagos:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener historial de pagos',
      error: error.message
    });
  }
};

// Obtener ganancias del artista
const obtenerGanancias = async (peticion, respuesta) => {
  try {
    const { idArtista } = peticion.params;

    const ganancias = await pagoModelo.obtenerGananciasArtista(idArtista);

    // Calcular totales
    const totalGanado = ganancias.reduce((sum, pago) => sum + parseFloat(pago.monto), 0);

    respuesta.json({
      exito: true,
      datos: {
        pagos: ganancias,
        resumen: {
          total_ganado: totalGanado,
          total_pagos: ganancias.length
        }
      }
    });

  } catch (error) {
    console.error('Error al obtener ganancias:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener ganancias',
      error: error.message
    });
  }
};

// Actualizar estado de pago
const actualizarEstadoPago = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;
    const { estado } = peticion.body;

    const pago = await pagoModelo.actualizarEstadoPago(id, estado);

    if (!pago) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Pago no encontrado'
      });
    }

    respuesta.json({
      exito: true,
      mensaje: `Pago ${estado} exitosamente`,
      datos: pago
    });

  } catch (error) {
    console.error('Error al actualizar pago:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al actualizar pago',
      error: error.message
    });
  }
};

module.exports = {
  crearPago,
  obtenerHistorialPagos,
  obtenerGanancias,
  actualizarEstadoPago,
  obtenerPropuestaPorId,
  generarCodigoQR,
  procesarPago
};
