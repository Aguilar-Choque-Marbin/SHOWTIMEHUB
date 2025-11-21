// src/modelos/mensajeModelo.js
const pool = require('../configuracion/baseDatos');

// Obtener conversaciones del usuario
const obtenerConversacionesUsuario = async (usuarioId) => {
  const consulta = `
    SELECT 
      c.*,
      CASE 
        WHEN c.usuario_uno_id = $1 THEN u2.id
        ELSE u1.id
      END as otro_usuario_id,
      CASE 
        WHEN c.usuario_uno_id = $1 THEN u2.email
        ELSE u1.email
      END as otro_usuario_email,
      CASE 
        WHEN c.usuario_uno_id = $1 THEN COALESCE(pa2.nombre_artistico, CONCAT(pa2.nombre, ' ', pa2.apellido))
        ELSE COALESCE(pa1.nombre_artistico, CONCAT(pa1.nombre, ' ', pa1.apellido))
      END as otro_usuario_nombre,
      m.contenido_mensaje as ultimo_mensaje,
      m.fecha_envio as fecha_ultimo_mensaje,
      m.leido as ultimo_leido,
      m.emisor_id as ultimo_emisor_id,
      (SELECT COUNT(*) FROM mensajes WHERE conversacion_id = c.id AND receptor_id = $1 AND leido = false) as mensajes_no_leidos
    FROM conversaciones c
    INNER JOIN usuarios u1 ON c.usuario_uno_id = u1.id
    INNER JOIN usuarios u2 ON c.usuario_dos_id = u2.id
    LEFT JOIN perfiles_artistas pa1 ON u1.id = pa1.usuario_id
    LEFT JOIN perfiles_artistas pa2 ON u2.id = pa2.usuario_id
    LEFT JOIN mensajes m ON c.ultimo_mensaje_id = m.id
    WHERE c.usuario_uno_id = $1 OR c.usuario_dos_id = $1
    ORDER BY COALESCE(m.fecha_envio, c.fecha_creacion) DESC
  `;
  
  const resultado = await pool.query(consulta, [usuarioId]);
  return resultado.rows;
};

// Buscar o crear conversación entre dos usuarios
const obtenerOCrearConversacion = async (usuario1Id, usuario2Id) => {
  // Asegurar que usuario_uno_id sea siempre el menor ID
  const [menorId, mayorId] = usuario1Id < usuario2Id 
    ? [usuario1Id, usuario2Id] 
    : [usuario2Id, usuario1Id];

  // Buscar conversación existente
  let consulta = `
    SELECT * FROM conversaciones
    WHERE usuario_uno_id = $1 AND usuario_dos_id = $2
  `;
  let resultado = await pool.query(consulta, [menorId, mayorId]);

  if (resultado.rows.length > 0) {
    return resultado.rows[0];
  }

  // Crear nueva conversación
  consulta = `
    INSERT INTO conversaciones (usuario_uno_id, usuario_dos_id)
    VALUES ($1, $2)
    RETURNING *
  `;
  resultado = await pool.query(consulta, [menorId, mayorId]);
  return resultado.rows[0];
};

// Obtener conversación por ID
const obtenerConversacionPorId = async (id) => {
  const consulta = `SELECT * FROM conversaciones WHERE id = $1`;
  const resultado = await pool.query(consulta, [id]);
  return resultado.rows[0];
};

// Obtener mensajes de una conversación
const obtenerMensajes = async (conversacionId, usuarioId) => {
  const consulta = `
    SELECT 
      m.*,
      u.email as emisor_email
    FROM mensajes m
    INNER JOIN usuarios u ON m.emisor_id = u.id
    WHERE m.conversacion_id = $1
    ORDER BY m.fecha_envio ASC
  `;
  
  const resultado = await pool.query(consulta, [conversacionId]);
  
  // Marcar mensajes como leídos
  if (usuarioId) {
    await pool.query(`
      UPDATE mensajes 
      SET leido = true, fecha_lectura = CURRENT_TIMESTAMP
      WHERE conversacion_id = $1 AND receptor_id = $2 AND leido = false
    `, [conversacionId, usuarioId]);
  }
  
  return resultado.rows;
};

// Crear mensaje
const crearMensaje = async (datos) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Insertar mensaje
    const consultaMensaje = `
      INSERT INTO mensajes (conversacion_id, emisor_id, receptor_id, contenido_mensaje, url_adjunto, tipo_adjunto)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const resultadoMensaje = await client.query(consultaMensaje, [
      datos.conversacion_id,
      datos.emisor_id,
      datos.receptor_id,
      datos.contenido_mensaje,
      datos.url_adjunto || null,
      datos.tipo_adjunto || null
    ]);
    
    const mensaje = resultadoMensaje.rows[0];
    
    // Actualizar último mensaje de la conversación
    await client.query(`
      UPDATE conversaciones 
      SET ultimo_mensaje_id = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `, [mensaje.id, datos.conversacion_id]);
    
    await client.query('COMMIT');
    return mensaje;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Actualizar último mensaje de conversación
const actualizarUltimoMensaje = async (conversacionId, mensajeId) => {
  const consulta = `
    UPDATE conversaciones
    SET ultimo_mensaje_id = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *
  `;
  
  const resultado = await pool.query(consulta, [mensajeId, conversacionId]);
  return resultado.rows[0];
};

// Marcar mensaje como leído
const marcarComoLeido = async (mensajeId) => {
  const consulta = `
    UPDATE mensajes
    SET leido = true, fecha_lectura = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `;
  
  const resultado = await pool.query(consulta, [mensajeId]);
  return resultado.rows[0];
};

// Contar mensajes no leídos
const contarNoLeidos = async (usuarioId) => {
  const consulta = `
    SELECT COUNT(*) as total
    FROM mensajes
    WHERE receptor_id = $1 AND leido = false
  `;
  
  const resultado = await pool.query(consulta, [usuarioId]);
  return parseInt(resultado.rows[0].total);
};

module.exports = {
  obtenerConversacionesUsuario,
  obtenerOCrearConversacion,
  obtenerConversacionPorId,
  obtenerMensajes,
  crearMensaje,
  actualizarUltimoMensaje,
  marcarComoLeido,
  contarNoLeidos
};
