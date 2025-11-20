// src/modelos/usuarioModelo.js
const pool = require('../configuracion/baseDatos');

// Buscar usuario por email
const buscarPorEmail = async (email) => {
  const consulta = 'SELECT * FROM usuarios WHERE email = $1';
  const resultado = await pool.query(consulta, [email]);
  return resultado.rows[0];
};

// Buscar usuario por ID
const buscarPorId = async (id) => {
  const consulta = `
    SELECT 
      id, nombre, apellido, email, tipo_usuario, 
      telefono, fecha_registro, esta_activo as activo
    FROM usuarios 
    WHERE id = $1
  `;
  const resultado = await pool.query(consulta, [id]);
  return resultado.rows[0];
};

// Crear nuevo usuario
const crearUsuario = async (datosUsuario) => {
  const { nombre, apellido, email, contrasena, tipo_usuario, telefono } = datosUsuario;
  
  const consulta = `
    INSERT INTO usuarios (email, password_hash, tipo_usuario, telefono)
    VALUES ($1, $2, $3, $4)
    RETURNING id, email, tipo_usuario, telefono, fecha_registro
  `;
  
  const valores = [email, contrasena, tipo_usuario, telefono];
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

// Crear token de recuperación
const crearTokenRecuperacion = async (usuarioId, token, expiraEn) => {
  const consulta = `
    INSERT INTO tokens_recuperacion (usuario_id, token, expira_en)
    VALUES ($1, $2, $3)
    RETURNING id, token, expira_en
  `;
  const resultado = await pool.query(consulta, [usuarioId, token, expiraEn]);
  return resultado.rows[0];
};

// Buscar token de recuperación válido
const buscarTokenRecuperacion = async (token) => {
  const consulta = `
    SELECT tr.*, u.email, u.id as id_usuario
    FROM tokens_recuperacion tr
    INNER JOIN usuarios u ON tr.usuario_id = u.id
    WHERE tr.token = $1 
      AND tr.usado = FALSE 
      AND tr.expira_en > NOW()
  `;
  const resultado = await pool.query(consulta, [token]);
  return resultado.rows[0];
};

// Marcar token como usado
const marcarTokenUsado = async (token) => {
  const consulta = `
    UPDATE tokens_recuperacion 
    SET usado = TRUE, usado_en = NOW()
    WHERE token = $1
  `;
  await pool.query(consulta, [token]);
};

// Actualizar contraseña
const actualizarContrasena = async (usuarioId, nuevaContrasena) => {
  const consulta = `
    UPDATE usuarios 
    SET password_hash = $1
    WHERE id = $2
    RETURNING id as id_usuario, email
  `;
  const resultado = await pool.query(consulta, [nuevaContrasena, usuarioId]);
  return resultado.rows[0];
};

// Actualizar usuario
const actualizarUsuario = async (idUsuario, datos) => {
  const campos = [];
  const valores = [];
  let contador = 1;

  Object.keys(datos).forEach(campo => {
    if (datos[campo] !== undefined) {
      campos.push(`${campo} = $${contador}`);
      valores.push(datos[campo]);
      contador++;
    }
  });

  valores.push(idUsuario);

  const consulta = `
    UPDATE usuarios
    SET ${campos.join(', ')}
    WHERE id = $${contador}
    RETURNING id, email, tipo_usuario, telefono, fecha_registro
  `;

  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

// Listar todos los usuarios (para admin)
const listarUsuarios = async (filtros = {}) => {
  let consulta = `
    SELECT 
      u.id, u.email, u.tipo_usuario, u.telefono, 
      u.fecha_registro, u.esta_activo
    FROM usuarios u
    WHERE 1=1
  `;
  
  const valores = [];
  let contador = 1;

  if (filtros.tipo_usuario) {
    consulta += ` AND u.tipo_usuario = $${contador}`;
    valores.push(filtros.tipo_usuario);
    contador++;
  }

  if (filtros.busqueda) {
    consulta += ` AND u.email ILIKE $${contador}`;
    valores.push(`%${filtros.busqueda}%`);
    contador++;
  }

  if (filtros.activo !== undefined) {
    consulta += ` AND u.esta_activo = $${contador}`;
    valores.push(filtros.activo);
    contador++;
  }

  consulta += ` ORDER BY u.fecha_registro DESC`;

  const limite = filtros.limite || 20;
  const pagina = filtros.pagina || 1;
  const offset = (pagina - 1) * limite;
  
  consulta += ` LIMIT $${contador} OFFSET $${contador + 1}`;
  valores.push(limite, offset);

  const resultado = await pool.query(consulta, valores);
  return resultado.rows;
};

// Contar usuarios
const contarUsuarios = async (filtros = {}) => {
  let consulta = 'SELECT COUNT(*) as total FROM usuarios WHERE 1=1';
  const valores = [];
  let contador = 1;

  if (filtros.tipo_usuario) {
    consulta += ` AND tipo_usuario = $${contador}`;
    valores.push(filtros.tipo_usuario);
    contador++;
  }

  if (filtros.busqueda) {
    consulta += ` AND email ILIKE $${contador}`;
    valores.push(`%${filtros.busqueda}%`);
    contador++;
  }

  const resultado = await pool.query(consulta, valores);
  return parseInt(resultado.rows[0].total);
};

// Eliminar usuario (soft delete)
const eliminarUsuario = async (idUsuario) => {
  const consulta = `
    UPDATE usuarios
    SET activo = false
    WHERE id_usuario = $1
    RETURNING id_usuario
  `;
  const resultado = await pool.query(consulta, [idUsuario]);
  return resultado.rows[0];
};

// Obtener estadísticas de usuario
const obtenerEstadisticasUsuario = async (idUsuario) => {
  const consulta = `
    SELECT 
      (SELECT COUNT(*) FROM cotizaciones_eventos WHERE id_usuario_organizador = $1) as total_cotizaciones,
      (SELECT COUNT(*) FROM contratos WHERE id_usuario_organizador = $1) as total_contratos,
      (SELECT COUNT(*) FROM calificaciones WHERE id_usuario_calificador = $1) as total_calificaciones,
      (SELECT COUNT(*) FROM artistas_favoritos WHERE id_usuario = $1) as total_favoritos
  `;
  const resultado = await pool.query(consulta, [idUsuario]);
  return resultado.rows[0];
};

// Actualizar estado de usuario
const actualizarEstadoUsuario = async (idUsuario, estaActivo) => {
  const consulta = `
    UPDATE usuarios 
    SET esta_activo = $1
    WHERE id = $2
    RETURNING id, email, tipo_usuario, esta_activo
  `;
  const resultado = await pool.query(consulta, [estaActivo, idUsuario]);
  return resultado.rows[0];
};

module.exports = {
  buscarPorEmail,
  buscarPorId,
  crearUsuario,
  actualizarUsuario,
  actualizarEstadoUsuario,
  listarUsuarios,
  contarUsuarios,
  eliminarUsuario,
  obtenerEstadisticasUsuario,
  crearTokenRecuperacion,
  buscarTokenRecuperacion,
  marcarTokenUsado,
  actualizarContrasena
};
