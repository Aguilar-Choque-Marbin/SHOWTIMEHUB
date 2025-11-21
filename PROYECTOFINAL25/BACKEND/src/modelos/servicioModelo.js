// src/modelos/servicioModelo.js
const pool = require('../configuracion/baseDatos');

// Obtener servicios del artista
const obtenerServiciosArtista = async (artistaId) => {
  const consulta = `
    SELECT 
      sa.*,
      c.nombre as categoria_nombre
    FROM servicios_artista sa
    LEFT JOIN categorias c ON sa.categoria_id = c.id
    WHERE sa.artista_id = $1
    ORDER BY sa.created_at DESC
  `;
  
  const resultado = await pool.query(consulta, [artistaId]);
  return resultado.rows;
};

// Crear servicio
const crearServicio = async (datos) => {
  const consulta = `
    INSERT INTO servicios_artista (
      artista_id, categoria_id, nombre, descripcion,
      precio_base, moneda, duracion_horas, incluye,
      esta_activo
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;
  
  const valores = [
    datos.artista_id,
    datos.categoria_id,
    datos.nombre,
    datos.descripcion,
    datos.precio_base,
    datos.moneda || 'EUR',
    datos.duracion_horas,
    datos.incluye,
    datos.esta_activo !== undefined ? datos.esta_activo : true
  ];
  
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

// Actualizar servicio
const actualizarServicio = async (id, artistaId, datos) => {
  const campos = [];
  const valores = [];
  let contador = 1;

  if (datos.categoria_id !== undefined) {
    campos.push(`categoria_id = $${contador}`);
    valores.push(datos.categoria_id);
    contador++;
  }
  
  if (datos.nombre !== undefined) {
    campos.push(`nombre = $${contador}`);
    valores.push(datos.nombre);
    contador++;
  }
  
  if (datos.descripcion !== undefined) {
    campos.push(`descripcion = $${contador}`);
    valores.push(datos.descripcion);
    contador++;
  }
  
  if (datos.precio_base !== undefined) {
    campos.push(`precio_base = $${contador}`);
    valores.push(datos.precio_base);
    contador++;
  }
  
  if (datos.duracion_horas !== undefined) {
    campos.push(`duracion_horas = $${contador}`);
    valores.push(datos.duracion_horas);
    contador++;
  }
  
  if (datos.incluye !== undefined) {
    campos.push(`incluye = $${contador}`);
    valores.push(datos.incluye);
    contador++;
  }
  
  if (datos.esta_activo !== undefined) {
    campos.push(`esta_activo = $${contador}`);
    valores.push(datos.esta_activo);
    contador++;
  }

  if (campos.length === 0) {
    throw new Error('No hay campos para actualizar');
  }

  valores.push(id);
  valores.push(artistaId);

  const consulta = `
    UPDATE servicios_artista
    SET ${campos.join(', ')}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $${contador} AND artista_id = $${contador + 1}
    RETURNING *
  `;

  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

// Eliminar servicio
const eliminarServicio = async (id, artistaId) => {
  const consulta = `
    DELETE FROM servicios_artista
    WHERE id = $1 AND artista_id = $2
    RETURNING *
  `;
  
  const resultado = await pool.query(consulta, [id, artistaId]);
  return resultado.rows[0];
};

// Activar/Desactivar servicio
const cambiarEstadoServicio = async (id, artistaId, estado) => {
  const consulta = `
    UPDATE servicios_artista
    SET esta_activo = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2 AND artista_id = $3
    RETURNING *
  `;
  
  const resultado = await pool.query(consulta, [estado, id, artistaId]);
  return resultado.rows[0];
};

module.exports = {
  obtenerServiciosArtista,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
  cambiarEstadoServicio
};
