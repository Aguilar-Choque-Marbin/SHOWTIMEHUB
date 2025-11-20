// src/modelos/favoritoModelo.js
const pool = require('../configuracion/baseDatos');

// Agregar artista a favoritos
const agregarFavorito = async (idUsuario, idArtista) => {
  const consulta = `
    INSERT INTO favoritos (usuario_id, artista_id)
    VALUES ($1, $2)
    ON CONFLICT (usuario_id, artista_id) DO NOTHING
    RETURNING *
  `;
  const resultado = await pool.query(consulta, [idUsuario, idArtista]);
  return resultado.rows[0];
};

// Eliminar de favoritos
const eliminarFavorito = async (idUsuario, idArtista) => {
  const consulta = `
    DELETE FROM favoritos
    WHERE usuario_id = $1 AND artista_id = $2
    RETURNING *
  `;
  const resultado = await pool.query(consulta, [idUsuario, idArtista]);
  return resultado.rows[0];
};

// Obtener favoritos del usuario
const obtenerFavoritos = async (idUsuario) => {
  const consulta = `
    SELECT 
      f.id,
      f.fecha_creacion,
      f.artista_id,
      u.email,
      u.tipo_usuario,
      pa.nombre_artistico,
      pa.nombre,
      pa.apellido,
      pa.ciudad,
      pa.calificacion_promedio
    FROM favoritos f
    INNER JOIN usuarios u ON f.artista_id = u.id
    LEFT JOIN perfiles_artistas pa ON f.artista_id = pa.usuario_id
    WHERE f.usuario_id = $1
    ORDER BY f.fecha_creacion DESC
  `;
  const resultado = await pool.query(consulta, [idUsuario]);
  return resultado.rows;
};

// Verificar si es favorito
const esFavorito = async (idUsuario, idArtista) => {
  const consulta = `
    SELECT EXISTS(
      SELECT 1 FROM favoritos
      WHERE usuario_id = $1 AND artista_id = $2
    ) as es_favorito
  `;
  const resultado = await pool.query(consulta, [idUsuario, idArtista]);
  return resultado.rows[0].es_favorito;
};

module.exports = {
  agregarFavorito,
  eliminarFavorito,
  obtenerFavoritos,
  esFavorito
};
