// src/controladores/disponibilidadControlador.js
const disponibilidadModelo = require('../modelos/disponibilidadModelo');

// Crear un bloqueo de fechas
const crearBloqueo = async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin, motivo } = req.body;
    const artistaId = req.usuario.id;

    // Validaciones
    if (!fecha_inicio || !fecha_fin) {
      return res.status(400).json({
        exito: false,
        mensaje: 'Las fechas de inicio y fin son requeridas'
      });
    }

    // Verificar que la fecha de inicio no sea posterior a la fecha de fin
    if (new Date(fecha_inicio) > new Date(fecha_fin)) {
      return res.status(400).json({
        exito: false,
        mensaje: 'La fecha de inicio no puede ser posterior a la fecha de fin'
      });
    }

    // Verificar si hay conflictos con bloqueos existentes
    const bloqueosExistentes = await disponibilidadModelo.obtenerBloqueosPorFecha(
      artistaId,
      fecha_inicio,
      fecha_fin
    );

    if (bloqueosExistentes.length > 0) {
      return res.status(400).json({
        exito: false,
        mensaje: 'Ya existe un bloqueo en el rango de fechas seleccionado',
        conflictos: bloqueosExistentes
      });
    }

    // Crear el bloqueo
    const nuevoBloqueo = await disponibilidadModelo.crearBloqueo(
      artistaId,
      fecha_inicio,
      fecha_fin,
      motivo
    );

    res.status(201).json({
      exito: true,
      mensaje: 'Bloqueo creado exitosamente',
      datos: nuevoBloqueo
    });
  } catch (error) {
    console.error('Error al crear bloqueo:', error);
    res.status(500).json({
      exito: false,
      mensaje: 'Error al crear el bloqueo',
      error: error.message
    });
  }
};

// Obtener todos los bloqueos del artista
const obtenerBloqueos = async (req, res) => {
  try {
    const artistaId = req.usuario.id;

    const bloqueos = await disponibilidadModelo.obtenerBloqueosArtista(artistaId);

    res.json({
      exito: true,
      datos: bloqueos
    });
  } catch (error) {
    console.error('Error al obtener bloqueos:', error);
    res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener los bloqueos',
      error: error.message
    });
  }
};

// Obtener bloqueos en un rango de fechas
const obtenerBloqueosPorFecha = async (req, res) => {
  try {
    const artistaId = req.usuario.id;
    const { fecha_inicio, fecha_fin } = req.query;

    if (!fecha_inicio || !fecha_fin) {
      return res.status(400).json({
        exito: false,
        mensaje: 'Las fechas de inicio y fin son requeridas'
      });
    }

    const bloqueos = await disponibilidadModelo.obtenerBloqueosPorFecha(
      artistaId,
      fecha_inicio,
      fecha_fin
    );

    res.json({
      exito: true,
      datos: bloqueos
    });
  } catch (error) {
    console.error('Error al obtener bloqueos por fecha:', error);
    res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener los bloqueos',
      error: error.message
    });
  }
};

// Eliminar un bloqueo
const eliminarBloqueo = async (req, res) => {
  try {
    const { id } = req.params;
    const artistaId = req.usuario.id;

    const bloqueoEliminado = await disponibilidadModelo.eliminarBloqueo(id, artistaId);

    if (!bloqueoEliminado) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Bloqueo no encontrado o no autorizado'
      });
    }

    res.json({
      exito: true,
      mensaje: 'Bloqueo eliminado exitosamente',
      datos: bloqueoEliminado
    });
  } catch (error) {
    console.error('Error al eliminar bloqueo:', error);
    res.status(500).json({
      exito: false,
      mensaje: 'Error al eliminar el bloqueo',
      error: error.message
    });
  }
};

// Actualizar horario de disponibilidad
const actualizarHorario = async (req, res) => {
  try {
    const artistaId = req.usuario.id;
    const { horario } = req.body;

    // Validar que se envió el horario
    if (!horario || typeof horario !== 'object') {
      return res.status(400).json({
        exito: false,
        mensaje: 'El horario es requerido y debe ser un objeto'
      });
    }

    // Validar estructura del horario (días de la semana)
    const diasValidos = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    const horarioValidado = {};

    for (const dia of diasValidos) {
      if (horario[dia]) {
        // Validar que tenga las propiedades necesarias
        if (typeof horario[dia].activo !== 'boolean') {
          return res.status(400).json({
            exito: false,
            mensaje: `El día ${dia} debe tener la propiedad 'activo' (boolean)`
          });
        }

        horarioValidado[dia] = {
          activo: horario[dia].activo,
          hora_inicio: horario[dia].hora_inicio || '09:00',
          hora_fin: horario[dia].hora_fin || '18:00'
        };
      }
    }

    // Actualizar en la base de datos
    const resultado = await disponibilidadModelo.actualizarHorarioDisponibilidad(
      artistaId,
      horarioValidado
    );

    res.json({
      exito: true,
      mensaje: 'Horario actualizado exitosamente',
      datos: resultado
    });
  } catch (error) {
    console.error('Error al actualizar horario:', error);
    res.status(500).json({
      exito: false,
      mensaje: 'Error al actualizar el horario',
      error: error.message
    });
  }
};

// Obtener horario de disponibilidad
const obtenerHorario = async (req, res) => {
  try {
    const artistaId = req.usuario.id;

    const horario = await disponibilidadModelo.obtenerHorarioDisponibilidad(artistaId);

    res.json({
      exito: true,
      datos: horario || {
        lunes: { activo: true, hora_inicio: '09:00', hora_fin: '18:00' },
        martes: { activo: true, hora_inicio: '09:00', hora_fin: '18:00' },
        miercoles: { activo: true, hora_inicio: '09:00', hora_fin: '18:00' },
        jueves: { activo: true, hora_inicio: '09:00', hora_fin: '18:00' },
        viernes: { activo: true, hora_inicio: '09:00', hora_fin: '18:00' },
        sabado: { activo: false, hora_inicio: '10:00', hora_fin: '14:00' },
        domingo: { activo: false, hora_inicio: '10:00', hora_fin: '14:00' }
      }
    });
  } catch (error) {
    console.error('Error al obtener horario:', error);
    res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener el horario',
      error: error.message
    });
  }
};

module.exports = {
  crearBloqueo,
  obtenerBloqueos,
  obtenerBloqueosPorFecha,
  eliminarBloqueo,
  actualizarHorario,
  obtenerHorario
};
