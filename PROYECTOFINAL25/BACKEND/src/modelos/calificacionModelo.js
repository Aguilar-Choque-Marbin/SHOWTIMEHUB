// src/modelos/calificacionModelo.js
const pool = require('../configuracion/baseDatos');

// Crear calificación
const crearCalificacion = async (datos) => {
  const consulta = `
    INSERT INTO calificaciones (
      id_perfil_artista, id_usuario_calificador, id_contrato,
      puntuacion, comentario
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  
  const valores = [
    datos.id_perfil_artista,
    datos.id_usuario_calificador,
    datos.id_contrato,
    datos.puntuacion,
    datos.comentario
  ];
  
  const resultado = await pool.query(consulta, valores);
  
  // Actualizar calificación promedio del artista
  await actualizarCalificacionPromedio(datos.id_perfil_artista);
  
  return resultado.rows[0];
};

// Actualizar calificación promedio del artista
const actualizarCalificacionPromedio = async (idArtista) => {
  const consulta = `
    UPDATE perfiles_artistas
    SET 
      calificacion_promedio = (
        SELECT ROUND(AVG(puntuacion)::numeric, 1)
        FROM calificaciones
        WHERE id_perfil_artista = $1
      ),
      total_resenas = (
        SELECT COUNT(*)
        FROM calificaciones
        WHERE id_perfil_artista = $1
      )
    WHERE id_perfil_artista = $1
  `;
  
  await pool.query(consulta, [idArtista]);
};

// Obtener calificaciones de un artista
const obtenerCalificacionesArtista = async (idArtista, limite = 10) => {
  const consulta = `
    SELECT 
      c.*,
      u.nombre,
      u.apellido
    FROM calificaciones c
    INNER JOIN usuarios u ON c.id_usuario_calificador = u.id_usuario
    WHERE c.id_perfil_artista = $1
    ORDER BY c.fecha_calificacion DESC
    LIMIT $2
  `;
  
  const resultado = await pool.query(consulta, [idArtista, limite]);
  return resultado.rows;
};

module.exports = {
  crearCalificacion,
  obtenerCalificacionesArtista
};
