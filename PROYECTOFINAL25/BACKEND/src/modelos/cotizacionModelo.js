// src/modelos/cotizacionModelo.js
const pool = require('../configuracion/baseDatos');

// Crear cotización/solicitud de presupuesto
const crearCotizacion = async (datos) => {
  const consulta = `
    INSERT INTO cotizaciones_eventos (
      id_usuario_organizador, titulo_evento, descripcion_evento,
      tipo_evento, fecha_evento, hora_inicio, duracion_horas,
      ubicacion_evento, numero_asistentes, presupuesto_estimado
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `;
  
  const valores = [
    datos.id_usuario_organizador,
    datos.titulo_evento,
    datos.descripcion_evento,
    datos.tipo_evento,
    datos.fecha_evento,
    datos.hora_inicio,
    datos.duracion_horas,
    datos.ubicacion_evento,
    datos.numero_asistentes,
    datos.presupuesto_estimado
  ];
  
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

// Obtener cotizaciones del usuario
const obtenerCotizacionesUsuario = async (idUsuario) => {
  const consulta = `
    SELECT * FROM cotizaciones_eventos
    WHERE id_usuario_organizador = $1
    ORDER BY fecha_creacion DESC
  `;
  
  const resultado = await pool.query(consulta, [idUsuario]);
  return resultado.rows;
};

// Obtener cotización por ID
const obtenerCotizacionPorId = async (idCotizacion) => {
  const consulta = `
    SELECT 
      ce.*,
      u.nombre,
      u.apellido,
      u.email,
      u.telefono
    FROM cotizaciones_eventos ce
    INNER JOIN usuarios u ON ce.id_usuario_organizador = u.id_usuario
    WHERE ce.id_cotizacion = $1
  `;
  
  const resultado = await pool.query(consulta, [idCotizacion]);
  return resultado.rows[0];
};

// Crear propuesta de artista para una cotización
const crearPropuesta = async (datos) => {
  const consulta = `
    INSERT INTO propuestas_artistas (
      id_cotizacion, id_perfil_artista, monto_propuesto,
      mensaje_propuesta, tiempo_preparacion
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  
  const valores = [
    datos.id_cotizacion,
    datos.id_perfil_artista,
    datos.monto_propuesto,
    datos.mensaje_propuesta,
    datos.tiempo_preparacion
  ];
  
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

// Obtener propuestas de una cotización
const obtenerPropuestasCotizacion = async (idCotizacion) => {
  const consulta = `
    SELECT 
      p.*,
      pa.nombre_artistico,
      pa.foto_perfil,
      pa.calificacion_promedio,
      u.nombre,
      u.apellido
    FROM propuestas_artistas p
    INNER JOIN perfiles_artistas pa ON p.id_perfil_artista = pa.id_perfil_artista
    INNER JOIN usuarios u ON pa.id_usuario = u.id_usuario
    WHERE p.id_cotizacion = $1
    ORDER BY p.fecha_propuesta DESC
  `;
  
  const resultado = await pool.query(consulta, [idCotizacion]);
  return resultado.rows;
};

// Actualizar estado de propuesta
const actualizarEstadoPropuesta = async (idPropuesta, estado) => {
  const consulta = `
    UPDATE propuestas_artistas
    SET estado = $1
    WHERE id_propuesta = $2
    RETURNING *
  `;
  
  const resultado = await pool.query(consulta, [estado, idPropuesta]);
  return resultado.rows[0];
};

module.exports = {
  crearCotizacion,
  obtenerCotizacionesUsuario,
  obtenerCotizacionPorId,
  crearPropuesta,
  obtenerPropuestasCotizacion,
  actualizarEstadoPropuesta
};
