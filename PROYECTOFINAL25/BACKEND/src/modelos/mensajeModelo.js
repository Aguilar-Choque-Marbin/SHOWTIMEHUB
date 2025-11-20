// src/modelos/mensajeModelo.js
const pool = require('../configuracion/baseDatos');

// Obtener conversaciones del usuario
const obtenerConversacionesUsuario = async (usuario_id) => {
  const consulta = `
    SELECT 
      c.*,
      CASE 
        WHEN c.usuario_uno_id = $1 THEN u2.nombre
        ELSE u1.nombre
      END as otro_usuario_nombre,
      CASE 
        WHEN c.usuario_uno_id = $1 THEN u2.apellido
        ELSE u1.apellido
      END as otro_usuario_apellido,
      CASE 
        WHEN c.usuario_uno_id = $1 THEN u2.id_usuario
        ELSE u1.id_usuario
      END as otro_usuario_id,
      CASE 
        WHEN c.usuario_uno_id = $1 THEN pa2.foto_perfil
        ELSE pa1.foto_perfil
      END as otro_usuario_foto,
      m.contenido_mensaje as ultimo_mensaje,
      m.fecha_envio as fecha_ultimo_mensaje,
      COUNT(CASE WHEN m2.leido = false AND m2.receptor_id = $1 THEN 1 END) as mensajes_no_leidos
    FROM conversaciones c
    INNER JOIN usuarios u1 ON c.usuario_uno_id = u1.id_usuario
    INNER JOIN usuarios u2 ON c.usuario_dos_id = u2.id_usuario
    LEFT JOIN perfiles_artistas pa1 ON u1.id_usuario = pa1.id_usuario
    LEFT JOIN perfiles_artistas pa2 ON u2.id_usuario = pa2.id_usuario
    LEFT JOIN mensajes m ON c.ultimo_mensaje_id = m.id
    LEFT JOIN mensajes m2 ON c.id = m2.conversacion_id
    WHERE c.usuario_uno_id = $1 OR c.usuario_dos_id = $1
    GROUP BY c.id, u1.nombre, u1.apellido, u2.nombre, u2.apellido, 
             u1.id_usuario, u2.id_usuario, pa1.foto_perfil, pa2.foto_perfil,
             m.contenido_mensaje, m.fecha_envio
    ORDER BY m.fecha_envio DESC NULLS LAST
  `;
  
  const resultado = await pool.query(consulta, [usuario_id]);
  return resultado.rows;
};

// Buscar conversación existente entre dos usuarios
const buscarConversacion = async (usuario1_id, usuario2_id) => {
  const consulta = `
    SELECT * FROM conversaciones
    WHERE (usuario_uno_id = $1 AND usuario_dos_id = $2)
       OR (usuario_uno_id = $2 AND usuario_dos_id = $1)
    LIMIT 1
  `;
  
  const resultado = await pool.query(consulta, [usuario1_id, usuario2_id]);
  return resultado.rows[0];
};

// Crear nueva conversación
const crearConversacion = async (usuario1_id, usuario2_id) => {
  const consulta = `
    INSERT INTO conversaciones (usuario_uno_id, usuario_dos_id, fecha_creacion)
    VALUES ($1, $2, NOW())
    RETURNING *
  `;
  
  const resultado = await pool.query(consulta, [usuario1_id, usuario2_id]);
  return resultado.rows[0];
};

// Obtener conversación por ID
const obtenerConversacionPorId = async (id) => {
  const consulta = `SELECT * FROM conversaciones WHERE id = $1`;
  const resultado = await pool.query(consulta, [id]);
  return resultado.rows[0];
};

// Obtener mensajes de una conversación
const obtenerMensajes = async (conversacion_id) => {
  const consulta = `
    SELECT 
      m.*,
      u_emisor.nombre as emisor_nombre,
      u_emisor.apellido as emisor_apellido,
      pa_emisor.foto_perfil as emisor_foto,
      u_receptor.nombre as receptor_nombre,
      u_receptor.apellido as receptor_apellido
    FROM mensajes m
    INNER JOIN usuarios u_emisor ON m.emisor_id = u_emisor.id_usuario
    INNER JOIN usuarios u_receptor ON m.receptor_id = u_receptor.id_usuario
    LEFT JOIN perfiles_artistas pa_emisor ON u_emisor.id_usuario = pa_emisor.id_usuario
    WHERE m.conversacion_id = $1
    ORDER BY m.fecha_envio ASC
  `;
  
  const resultado = await pool.query(consulta, [conversacion_id]);
  return resultado.rows;
};

// Crear mensaje
const crearMensaje = async (datos) => {
  const consulta = `
    INSERT INTO mensajes (
      conversacion_id, emisor_id, receptor_id, contenido_mensaje,
      leido, fecha_envio, url_adjunto, tipo_adjunto
    ) VALUES ($1, $2, $3, $4, $5, NOW(), $6, $7)
    RETURNING *
  `;
  
  const valores = [
    datos.conversacion_id,
    datos.emisor_id,
    datos.receptor_id,
    datos.contenido_mensaje,
    datos.leido || false,
    datos.url_adjunto,
    datos.tipo_adjunto
  ];
  
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

// Actualizar último mensaje de conversación
const actualizarUltimoMensaje = async (conversacion_id, mensaje_id) => {
  const consulta = `
    UPDATE conversaciones
    SET ultimo_mensaje_id = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING *
  `;
  
  const resultado = await pool.query(consulta, [mensaje_id, conversacion_id]);
  return resultado.rows[0];
};

// Marcar mensaje como leído
const marcarComoLeido = async (mensaje_id) => {
  const consulta = `
    UPDATE mensajes
    SET leido = true, fecha_lectura = NOW()
    WHERE id = $1
    RETURNING *
  `;
  
  const resultado = await pool.query(consulta, [mensaje_id]);
  return resultado.rows[0];
};

// Contar mensajes no leídos
const contarNoLeidos = async (usuario_id) => {
  const consulta = `
    SELECT COUNT(*) as total
    FROM mensajes
    WHERE receptor_id = $1 AND leido = false
  `;
  
  const resultado = await pool.query(consulta, [usuario_id]);
  return parseInt(resultado.rows[0].total);
};

module.exports = {
  obtenerConversacionesUsuario,
  buscarConversacion,
  crearConversacion,
  obtenerConversacionPorId,
  obtenerMensajes,
  crearMensaje,
  actualizarUltimoMensaje,
  marcarComoLeido,
  contarNoLeidos
};
