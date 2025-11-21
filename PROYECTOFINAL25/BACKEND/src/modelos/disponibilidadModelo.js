// src/modelos/disponibilidadModelo.js
const pool = require('../configuracion/baseDatos');

// Crear un bloqueo de fechas para un artista
const crearBloqueo = async (artistaId, fechaInicio, fechaFin, motivo = null) => {
  const consulta = `
    INSERT INTO disponibilidad_artista 
    (artista_id, fecha_inicio, fecha_fin, estado, notas)
    VALUES ($1, $2, $3, 'bloqueado', $4)
    RETURNING *
  `;
  
  const resultado = await pool.query(consulta, [artistaId, fechaInicio, fechaFin, motivo]);
  return resultado.rows[0];
};

// Obtener todos los bloqueos de un artista
const obtenerBloqueosArtista = async (artistaId) => {
  const consulta = `
    SELECT * FROM disponibilidad_artista
    WHERE artista_id = $1 AND estado = 'bloqueado'
    ORDER BY fecha_inicio DESC
  `;
  
  const resultado = await pool.query(consulta, [artistaId]);
  return resultado.rows;
};

// Obtener bloqueos de un artista en un rango de fechas
const obtenerBloqueosPorFecha = async (artistaId, fechaInicio, fechaFin) => {
  const consulta = `
    SELECT * FROM disponibilidad_artista
    WHERE artista_id = $1 
    AND estado = 'bloqueado'
    AND (
      (fecha_inicio BETWEEN $2 AND $3) OR
      (fecha_fin BETWEEN $2 AND $3) OR
      (fecha_inicio <= $2 AND fecha_fin >= $3)
    )
    ORDER BY fecha_inicio
  `;
  
  const resultado = await pool.query(consulta, [artistaId, fechaInicio, fechaFin]);
  return resultado.rows;
};

// Eliminar un bloqueo
const eliminarBloqueo = async (bloqueoId, artistaId) => {
  const consulta = `
    DELETE FROM disponibilidad_artista
    WHERE id = $1 AND artista_id = $2 AND estado = 'bloqueado'
    RETURNING *
  `;
  
  const resultado = await pool.query(consulta, [bloqueoId, artistaId]);
  return resultado.rows[0];
};

// Actualizar el horario de disponibilidad del artista en perfiles_artistas
const actualizarHorarioDisponibilidad = async (artistaId, horario) => {
  // Primero verificamos si existe la columna horario_disponibilidad
  // Si no existe, la creamos
  try {
    const consulta = `
      UPDATE perfiles_artistas
      SET horario_disponibilidad = $1, updated_at = CURRENT_TIMESTAMP
      WHERE usuario_id = $2
      RETURNING usuario_id, horario_disponibilidad
    `;
    
    const resultado = await pool.query(consulta, [JSON.stringify(horario), artistaId]);
    return resultado.rows[0];
  } catch (error) {
    // Si la columna no existe, la creamos primero
    if (error.code === '42703') { // undefined_column
      await pool.query(`
        ALTER TABLE perfiles_artistas 
        ADD COLUMN IF NOT EXISTS horario_disponibilidad JSONB
      `);
      
      // Reintentamos la actualización
      const consulta = `
        UPDATE perfiles_artistas
        SET horario_disponibilidad = $1, updated_at = CURRENT_TIMESTAMP
        WHERE usuario_id = $2
        RETURNING usuario_id, horario_disponibilidad
      `;
      
      const resultado = await pool.query(consulta, [JSON.stringify(horario), artistaId]);
      return resultado.rows[0];
    }
    throw error;
  }
};

// Obtener el horario de disponibilidad del artista
const obtenerHorarioDisponibilidad = async (artistaId) => {
  try {
    const consulta = `
      SELECT horario_disponibilidad
      FROM perfiles_artistas
      WHERE usuario_id = $1
    `;
    
    const resultado = await pool.query(consulta, [artistaId]);
    return resultado.rows[0]?.horario_disponibilidad || null;
  } catch (error) {
    // Si la columna no existe, devolver null
    if (error.code === '42703') {
      return null;
    }
    throw error;
  }
};

module.exports = {
  crearBloqueo,
  obtenerBloqueosArtista,
  obtenerBloqueosPorFecha,
  eliminarBloqueo,
  actualizarHorarioDisponibilidad,
  obtenerHorarioDisponibilidad
};
