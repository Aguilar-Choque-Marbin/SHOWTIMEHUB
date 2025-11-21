// src/controladores/servicioControlador.js
const servicioModelo = require('../modelos/servicioModelo');

// Obtener servicios del artista
const obtenerServicios = async (peticion, respuesta) => {
  try {
    const artistaId = peticion.usuario.id;
    
    const servicios = await servicioModelo.obtenerServiciosArtista(artistaId);
    
    respuesta.json(servicios);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener servicios',
      error: error.message
    });
  }
};

// Crear servicio
const crearServicio = async (peticion, respuesta) => {
  try {
    const artistaId = peticion.usuario.id;
    const datos = {
      ...peticion.body,
      artista_id: artistaId
    };
    
    const nuevoServicio = await servicioModelo.crearServicio(datos);
    
    respuesta.status(201).json({
      exito: true,
      mensaje: 'Servicio creado exitosamente',
      datos: nuevoServicio
    });
  } catch (error) {
    console.error('Error al crear servicio:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al crear servicio',
      error: error.message
    });
  }
};

// Actualizar servicio
const actualizarServicio = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;
    const artistaId = peticion.usuario.id;
    const datos = peticion.body;
    
    const servicioActualizado = await servicioModelo.actualizarServicio(id, artistaId, datos);
    
    if (!servicioActualizado) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Servicio no encontrado'
      });
    }
    
    respuesta.json({
      exito: true,
      mensaje: 'Servicio actualizado exitosamente',
      datos: servicioActualizado
    });
  } catch (error) {
    console.error('Error al actualizar servicio:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al actualizar servicio',
      error: error.message
    });
  }
};

// Eliminar servicio
const eliminarServicio = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;
    const artistaId = peticion.usuario.id;
    
    const servicioEliminado = await servicioModelo.eliminarServicio(id, artistaId);
    
    if (!servicioEliminado) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Servicio no encontrado'
      });
    }
    
    respuesta.json({
      exito: true,
      mensaje: 'Servicio eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar servicio:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al eliminar servicio',
      error: error.message
    });
  }
};

// Cambiar estado del servicio (activar/desactivar)
const cambiarEstado = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;
    const artistaId = peticion.usuario.id;
    const { esta_activo } = peticion.body;
    
    const servicioActualizado = await servicioModelo.cambiarEstadoServicio(id, artistaId, esta_activo);
    
    if (!servicioActualizado) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Servicio no encontrado'
      });
    }
    
    respuesta.json({
      exito: true,
      mensaje: `Servicio ${esta_activo ? 'activado' : 'desactivado'} exitosamente`,
      datos: servicioActualizado
    });
  } catch (error) {
    console.error('Error al cambiar estado del servicio:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al cambiar estado del servicio',
      error: error.message
    });
  }
};

module.exports = {
  obtenerServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
  cambiarEstado
};
