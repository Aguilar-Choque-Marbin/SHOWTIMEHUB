// src/modelos/categoriaModelo.js
const pool = require('../configuracion/baseDatos');

// Obtener todas las categorías
const obtenerCategorias = async () => {
  const consulta = `
    SELECT 
      c.*,
      COUNT(DISTINCT sa.artista_id) as total_artistas
    FROM categorias c
    LEFT JOIN servicios_artista sa ON c.id = sa.categoria_id AND sa.esta_activo = true
    WHERE c.esta_activo = true
    GROUP BY c.id
    ORDER BY c.orden, c.nombre
  `;
  
  const resultado = await pool.query(consulta);
  return resultado.rows;
};

// Obtener categoría por ID
const obtenerCategoriaPorId = async (idCategoria) => {
  const consulta = 'SELECT * FROM categorias WHERE id = $1';
  const resultado = await pool.query(consulta, [idCategoria]);
  return resultado.rows[0];
};

// Crear categoría
const crearCategoria = async (datos) => {
  const consulta = `
    INSERT INTO categorias (nombre, descripcion, icono)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  
  const valores = [datos.nombre, datos.descripcion, datos.icono];
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria
};
