// src/modelos/adminModelo.js
const pool = require('../configuracion/baseDatos');

// Obtener estadísticas generales del sistema
const obtenerEstadisticasGenerales = async () => {
  const consulta = `
    SELECT 
      (SELECT COUNT(*) FROM usuarios WHERE activo = true) as total_usuarios,
      (SELECT COUNT(*) FROM usuarios WHERE tipo_usuario = 'artista' AND activo = true) as total_artistas,
      (SELECT COUNT(*) FROM usuarios WHERE tipo_usuario = 'organizador' AND activo = true) as total_organizadores,
      (SELECT COUNT(*) FROM perfiles_artistas WHERE activo = true) as perfiles_artistas_activos,
      (SELECT COUNT(*) FROM cotizaciones_eventos) as total_cotizaciones,
      (SELECT COUNT(*) FROM contratos) as total_contratos,
      (SELECT COUNT(*) FROM contratos WHERE estado = 'activo') as contratos_activos,
      (SELECT COUNT(*) FROM calificaciones) as total_calificaciones,
      (SELECT ROUND(AVG(puntuacion)::numeric, 2) FROM calificaciones) as calificacion_promedio_sistema,
      (SELECT SUM(monto) FROM pagos WHERE estado_pago = 'completado') as ingresos_totales,
      (SELECT COUNT(*) FROM pagos WHERE estado_pago = 'completado') as pagos_completados
  `;
  
  const resultado = await pool.query(consulta);
  return resultado.rows[0];
};

// Obtener estadísticas por fecha
const obtenerEstadisticasPorFecha = async (fechaInicio, fechaFin) => {
  const consulta = `
    SELECT 
      COUNT(DISTINCT CASE WHEN u.fecha_registro BETWEEN $1 AND $2 THEN u.id_usuario END) as nuevos_usuarios,
      COUNT(DISTINCT CASE WHEN c.fecha_creacion BETWEEN $1 AND $2 THEN c.id_cotizacion END) as nuevas_cotizaciones,
      COUNT(DISTINCT CASE WHEN con.fecha_creacion BETWEEN $1 AND $2 THEN con.id_contrato END) as nuevos_contratos,
      SUM(CASE WHEN p.fecha_pago BETWEEN $1 AND $2 AND p.estado_pago = 'completado' THEN p.monto ELSE 0 END) as ingresos_periodo
    FROM usuarios u
    FULL OUTER JOIN cotizaciones_eventos c ON 1=1
    FULL OUTER JOIN contratos con ON 1=1
    FULL OUTER JOIN pagos p ON 1=1
  `;
  
  const resultado = await pool.query(consulta, [fechaInicio, fechaFin]);
  return resultado.rows[0];
};

// Obtener artistas más populares
const obtenerArtistasPopulares = async (limite = 10) => {
  const consulta = `
    SELECT 
      pa.id_perfil_artista,
      pa.nombre_artistico,
      pa.foto_perfil,
      pa.calificacion_promedio,
      pa.total_resenas,
      u.nombre,
      u.apellido,
      c.nombre as categoria,
      COUNT(DISTINCT con.id_contrato) as total_contratos,
      COUNT(DISTINCT af.id_favorito) as total_favoritos
    FROM perfiles_artistas pa
    INNER JOIN usuarios u ON pa.id_usuario = u.id_usuario
    LEFT JOIN categorias c ON pa.id_categoria = c.id_categoria
    LEFT JOIN contratos con ON pa.id_perfil_artista = con.id_perfil_artista
    LEFT JOIN artistas_favoritos af ON pa.id_perfil_artista = af.id_perfil_artista
    WHERE pa.activo = true
    GROUP BY pa.id_perfil_artista, u.id_usuario, c.id_categoria
    ORDER BY pa.calificacion_promedio DESC, total_contratos DESC
    LIMIT $1
  `;
  
  const resultado = await pool.query(consulta, [limite]);
  return resultado.rows;
};

// Obtener categorías más solicitadas
const obtenerCategoriasPopulares = async () => {
  const consulta = `
    SELECT 
      c.id_categoria,
      c.nombre,
      c.icono,
      COUNT(DISTINCT pa.id_perfil_artista) as total_artistas,
      COUNT(DISTINCT co.id_cotizacion) as total_cotizaciones,
      COUNT(DISTINCT con.id_contrato) as total_contratos
    FROM categorias c
    LEFT JOIN perfiles_artistas pa ON c.id_categoria = pa.id_categoria
    LEFT JOIN cotizaciones_eventos co ON c.id_categoria = co.id_categoria_solicitada
    LEFT JOIN contratos con ON pa.id_perfil_artista = con.id_perfil_artista
    WHERE c.activo = true
    GROUP BY c.id_categoria
    ORDER BY total_contratos DESC, total_cotizaciones DESC
  `;
  
  const resultado = await pool.query(consulta);
  return resultado.rows;
};

// Obtener actividad reciente
const obtenerActividadReciente = async (limite = 20) => {
  const consulta = `
    (SELECT 
      'usuario' as tipo,
      u.id_usuario as id,
      CONCAT(u.nombre, ' ', u.apellido) as descripcion,
      u.fecha_registro as fecha,
      'nuevo_usuario' as accion
    FROM usuarios u
    ORDER BY u.fecha_registro DESC
    LIMIT $1)
    
    UNION ALL
    
    (SELECT 
      'cotizacion' as tipo,
      c.id_cotizacion as id,
      c.titulo_evento as descripcion,
      c.fecha_creacion as fecha,
      'nueva_cotizacion' as accion
    FROM cotizaciones_eventos c
    ORDER BY c.fecha_creacion DESC
    LIMIT $1)
    
    UNION ALL
    
    (SELECT 
      'contrato' as tipo,
      con.id_contrato as id,
      CONCAT('Contrato para ', pa.nombre_artistico) as descripcion,
      con.fecha_creacion as fecha,
      'nuevo_contrato' as accion
    FROM contratos con
    INNER JOIN perfiles_artistas pa ON con.id_perfil_artista = pa.id_perfil_artista
    ORDER BY con.fecha_creacion DESC
    LIMIT $1)
    
    ORDER BY fecha DESC
    LIMIT $1
  `;
  
  const resultado = await pool.query(consulta, [limite]);
  return resultado.rows;
};

// Obtener reportes de ingresos por mes
const obtenerReporteIngresosMensual = async (anio) => {
  const consulta = `
    SELECT 
      EXTRACT(MONTH FROM p.fecha_pago) as mes,
      COUNT(*) as total_pagos,
      SUM(p.monto) as total_ingresos,
      AVG(p.monto) as promedio_pago
    FROM pagos p
    WHERE EXTRACT(YEAR FROM p.fecha_pago) = $1 
      AND p.estado_pago = 'completado'
    GROUP BY EXTRACT(MONTH FROM p.fecha_pago)
    ORDER BY mes
  `;
  
  const resultado = await pool.query(consulta, [anio]);
  return resultado.rows;
};

module.exports = {
  obtenerEstadisticasGenerales,
  obtenerEstadisticasPorFecha,
  obtenerArtistasPopulares,
  obtenerCategoriasPopulares,
  obtenerActividadReciente,
  obtenerReporteIngresosMensual
};
