// src/controladores/adminControlador.js
const adminModelo = require('../modelos/adminModelo');
const usuarioModelo = require('../modelos/usuarioModelo');
const artistaModelo = require('../modelos/artistaModelo');

// Dashboard - Estadísticas generales
const obtenerDashboard = async (peticion, respuesta) => {
  try {
    const estadisticas = await adminModelo.obtenerEstadisticasGenerales();
    const actividadReciente = await adminModelo.obtenerActividadReciente(10);
    const artistasPopulares = await adminModelo.obtenerArtistasPopulares(5);

    respuesta.json({
      exito: true,
      datos: {
        estadisticas,
        actividad_reciente: actividadReciente,
        artistas_populares: artistasPopulares
      }
    });

  } catch (error) {
    console.error('Error al obtener dashboard:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener estadísticas',
      error: error.message
    });
  }
};

// Reportes - Estadísticas por fecha
const obtenerReportes = async (peticion, respuesta) => {
  try {
    const { fecha_inicio, fecha_fin } = peticion.query;

    if (!fecha_inicio || !fecha_fin) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: 'Fecha de inicio y fin son requeridas'
      });
    }

    const estadisticas = await adminModelo.obtenerEstadisticasPorFecha(fecha_inicio, fecha_fin);

    respuesta.json({
      exito: true,
      datos: estadisticas
    });

  } catch (error) {
    console.error('Error al obtener reportes:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al generar reporte',
      error: error.message
    });
  }
};

// Reportes mensuales de ingresos
const obtenerReporteIngresos = async (peticion, respuesta) => {
  try {
    const anio = peticion.query.anio || new Date().getFullYear();

    const reporte = await adminModelo.obtenerReporteIngresosMensual(anio);

    respuesta.json({
      exito: true,
      datos: {
        anio: anio,
        meses: reporte
      }
    });

  } catch (error) {
    console.error('Error al obtener reporte de ingresos:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al generar reporte de ingresos',
      error: error.message
    });
  }
};

// Categorías populares
const obtenerCategoriasPopulares = async (peticion, respuesta) => {
  try {
    const categorias = await adminModelo.obtenerCategoriasPopulares();

    respuesta.json({
      exito: true,
      datos: categorias
    });

  } catch (error) {
    console.error('Error al obtener categorías populares:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener categorías',
      error: error.message
    });
  }
};

// Gestión de usuarios
const gestionarUsuarios = async (peticion, respuesta) => {
  try {
    const filtros = {
      tipo_usuario: peticion.query.tipo_usuario,
      busqueda: peticion.query.busqueda,
      activo: peticion.query.activo,
      limite: parseInt(peticion.query.limite) || 20,
      pagina: parseInt(peticion.query.pagina) || 1
    };

    const usuarios = await usuarioModelo.listarUsuarios(filtros);
    const total = await usuarioModelo.contarUsuarios(filtros);

    respuesta.json({
      exito: true,
      datos: usuarios,
      paginacion: {
        pagina_actual: filtros.pagina,
        total_paginas: Math.ceil(total / filtros.limite),
        total_resultados: total
      }
    });

  } catch (error) {
    console.error('Error al gestionar usuarios:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener usuarios',
      error: error.message
    });
  }
};

// Gestión de artistas
const gestionarArtistas = async (peticion, respuesta) => {
  try {
    const filtros = {
      busqueda: peticion.query.busqueda,
      categoria: peticion.query.categoria,
      limite: parseInt(peticion.query.limite) || 20,
      pagina: parseInt(peticion.query.pagina) || 1
    };

    const artistas = await artistaModelo.obtenerArtistas(filtros);
    const total = await artistaModelo.contarArtistas(filtros);

    respuesta.json({
      exito: true,
      datos: artistas,
      paginacion: {
        pagina_actual: filtros.pagina,
        total_paginas: Math.ceil(total / filtros.limite),
        total_resultados: total
      }
    });

  } catch (error) {
    console.error('Error al gestionar artistas:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener artistas',
      error: error.message
    });
  }
};

module.exports = {
  obtenerDashboard,
  obtenerReportes,
  obtenerReporteIngresos,
  obtenerCategoriasPopulares,
  gestionarUsuarios,
  gestionarArtistas
};
