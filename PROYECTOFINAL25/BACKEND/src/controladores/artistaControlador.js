// src/controladores/artistaControlador.js
const artistaModelo = require('../modelos/artistaModelo');

// Listar artistas con filtros (para marketplace)
const listarArtistas = async (peticion, respuesta) => {
  try {
    const filtros = {
      busqueda: peticion.query.busqueda,
      categoria: peticion.query.categoria,
      ubicacion: peticion.query.ubicacion || peticion.query.ciudad,
      presupuesto_min: peticion.query.presupuesto_min || peticion.query.precio_minimo,
      presupuesto_max: peticion.query.presupuesto_max || peticion.query.precio_maximo,
      orden: peticion.query.orden,
      limite: parseInt(peticion.query.limite) || 12,
      pagina: parseInt(peticion.query.pagina) || 1,
      soloVerificados: peticion.query.incluirNoVerificados ? false : true // Para admin
    };

    const artistas = await artistaModelo.obtenerArtistas(filtros);
    const total = await artistaModelo.contarArtistas(filtros);
    const totalPaginas = Math.ceil(total / filtros.limite);

    respuesta.json({
      exito: true,
      artistas: artistas,
      total: total,
      paginacion: {
        pagina_actual: filtros.pagina,
        total_paginas: totalPaginas,
        total_resultados: total,
        resultados_por_pagina: filtros.limite
      }
    });

  } catch (error) {
    console.error('Error al listar artistas:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener artistas',
      error: error.message
    });
  }
};

// Obtener detalle completo de un artista
const obtenerDetalleArtista = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;

    const artista = await artistaModelo.obtenerArtistaPorId(id);
    
    if (!artista) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Artista no encontrado'
      });
    }

    // Obtener información adicional
    const servicios = await artistaModelo.obtenerServiciosArtista(id);
    const portafolio = await artistaModelo.obtenerPortafolio(id);
    const calificaciones = await artistaModelo.obtenerCalificaciones(id);

    respuesta.json({
      exito: true,
      artista: {
        ...artista,
        servicios,
        portafolio,
        calificaciones
      }
    });

  } catch (error) {
    console.error('Error al obtener detalle del artista:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener detalle del artista',
      error: error.message
    });
  }
};

// Crear perfil de artista
const crearPerfilArtista = async (peticion, respuesta) => {
  try {
    const datos = peticion.body;
    datos.id_usuario = peticion.usuario.id; // Del token JWT

    const nuevoArtista = await artistaModelo.crearPerfilArtista(datos);

    respuesta.status(201).json({
      exito: true,
      mensaje: 'Perfil de artista creado exitosamente',
      datos: nuevoArtista
    });

  } catch (error) {
    console.error('Error al crear perfil de artista:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al crear perfil de artista',
      error: error.message
    });
  }
};

// Actualizar perfil de artista
const actualizarPerfilArtista = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    const datos = peticion.body;

    // Buscar el artista por id_usuario
    const artista = await artistaModelo.obtenerArtistaPorIdUsuario(idUsuario);
    
    if (!artista) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Artista no encontrado'
      });
    }

    const artistaActualizado = await artistaModelo.actualizarPerfilArtista(artista.id, datos);

    respuesta.json({
      exito: true,
      mensaje: 'Perfil actualizado exitosamente',
      datos: artistaActualizado
    });

  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al actualizar perfil',
      error: error.message
    });
  }
};

// Obtener perfil del artista actual
const obtenerPerfil = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    
    const artista = await artistaModelo.obtenerArtistaPorIdUsuario(idUsuario);
    
    if (!artista) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Perfil de artista no encontrado'
      });
    }

    respuesta.json(artista);

  } catch (error) {
    console.error('Error al obtener perfil:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener perfil',
      error: error.message
    });
  }
};

// Crear servicio del artista
const crearServicio = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    const datos = peticion.body;
    
    // Buscar el ID del artista
    const artista = await artistaModelo.obtenerArtistaPorIdUsuario(idUsuario);
    
    if (!artista) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Perfil de artista no encontrado'
      });
    }

    datos.artista_id = artista.id;
    
    const nuevoServicio = await artistaModelo.crearServicio(datos);

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

// Obtener estadísticas del artista
const obtenerEstadisticas = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    
    // Por ahora retornamos estadísticas de ejemplo
    respuesta.json({
      reservasActivas: 0,
      gananciasMes: 0,
      gananciasTotal: 0,
      gananciasPendientes: 0,
      valoracion: 5.0
    });
    
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener estadísticas',
      error: error.message
    });
  }
};

// Obtener reservas del artista
const obtenerReservas = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    
    // Por ahora retornamos un array vacío
    respuesta.json([]);
    
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener reservas',
      error: error.message
    });
  }
};

// Aprobar artista (admin)
const aprobarArtista = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;

    await artistaModelo.aprobarArtista(id);

    respuesta.json({
      exito: true,
      mensaje: 'Artista aprobado exitosamente'
    });
  } catch (error) {
    console.error('Error al aprobar artista:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al aprobar artista',
      error: error.message
    });
  }
};

// Rechazar artista (admin)
const rechazarArtista = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;

    await artistaModelo.rechazarArtista(id);

    respuesta.json({
      exito: true,
      mensaje: 'Artista rechazado'
    });
  } catch (error) {
    console.error('Error al rechazar artista:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al rechazar artista',
      error: error.message
    });
  }
};

// Eliminar artista (admin)
const eliminarArtista = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;

    await artistaModelo.eliminarArtista(id);

    respuesta.json({
      exito: true,
      mensaje: 'Artista eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar artista:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al eliminar artista',
      error: error.message
    });
  }
};

// Obtener servicios de un artista
const obtenerServiciosArtista = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;

    const servicios = await artistaModelo.obtenerServiciosArtista(id);

    respuesta.json({
      exito: true,
      datos: servicios
    });

  } catch (error) {
    console.error('Error al obtener servicios:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener servicios',
      error: error.message
    });
  }
};

// Obtener servicio específico por ID
const obtenerServicioPorId = async (peticion, respuesta) => {
  try {
    const { id, servicioId } = peticion.params;

    const servicio = await artistaModelo.obtenerServicioPorId(servicioId);

    if (!servicio) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Servicio no encontrado'
      });
    }

    respuesta.json({
      exito: true,
      datos: servicio
    });

  } catch (error) {
    console.error('Error al obtener servicio:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener servicio',
      error: error.message
    });
  }
};

module.exports = {
  listarArtistas,
  obtenerDetalleArtista,
  crearPerfilArtista,
  actualizarPerfilArtista,
  obtenerPerfil,
  crearServicio,
  obtenerEstadisticas,
  obtenerReservas,
  aprobarArtista,
  rechazarArtista,
  eliminarArtista,
  obtenerServiciosArtista,
  obtenerServicioPorId
};
