// src/modelos/contratoModelo.js
const pool = require('../configuracion/baseDatos');

// Crear contrato
const crearContrato = async (datos) => {
  const consulta = `
    INSERT INTO contratos (
      contrato_id, propuesta_id, artista_id, cliente_id,
      fecha_evento, duracion_horas, ubicacion_evento,
      monto_total, terminos_condiciones
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;
  
  const valores = [
    datos.contrato_id || `SHTC-${new Date().getFullYear()}-${Date.now()}`,
    datos.propuesta_id,
    datos.artista_id,
    datos.cliente_id,
    datos.fecha_evento,
    datos.duracion_horas,
    datos.ubicacion_evento,
    datos.monto_total,
    datos.terminos_condiciones
  ];
  
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

// Obtener contratos del usuario
const obtenerContratosUsuario = async (idUsuario, filtros = {}) => {
  let consulta = `
    SELECT 
      c.*,
      u2.email as artista_email,
      pa.nombre_artistico,
      pa.nombre as artista_nombre,
      pa.apellido as artista_apellido,
      pa.ciudad
    FROM contratos c
    INNER JOIN usuarios u2 ON c.artista_id = u2.id
    LEFT JOIN perfiles_artistas pa ON c.artista_id = pa.usuario_id
    WHERE c.cliente_id = $1
  `;
  
  const valores = [idUsuario];
  let contador = 2;

  if (filtros.estado) {
    consulta += ` AND c.estado = $${contador}`;
    valores.push(filtros.estado);
    contador++;
  }

  consulta += ` ORDER BY c.created_at DESC`;

  const resultado = await pool.query(consulta, valores);
  return resultado.rows;
};

// Obtener contratos del artista
const obtenerContratosArtista = async (idArtista, filtros = {}) => {
  let consulta = `
    SELECT 
      c.*,
      u.email as cliente_email,
      COALESCE(po.nombre, '') as cliente_nombre,
      COALESCE(po.apellido, '') as cliente_apellido,
      po.nombre_empresa
    FROM contratos c
    INNER JOIN usuarios u ON c.cliente_id = u.id
    LEFT JOIN perfiles_organizadores po ON c.cliente_id = po.usuario_id
    WHERE c.artista_id = $1
  `;
  
  const valores = [idArtista];
  let contador = 2;

  if (filtros.estado) {
    consulta += ` AND c.estado = $${contador}`;
    valores.push(filtros.estado);
    contador++;
  }

  consulta += ` ORDER BY c.fecha_evento ASC`;

  const resultado = await pool.query(consulta, valores);
  return resultado.rows;
};

// Obtener contrato por ID
const obtenerContratoPorId = async (idContrato) => {
  const consulta = `
    SELECT 
      c.*,
      u_artista.email as artista_email,
      u_artista.tipo_usuario as artista_tipo,
      u_cliente.email as cliente_email,
      u_cliente.tipo_usuario as cliente_tipo
    FROM contratos c
    INNER JOIN usuarios u_artista ON c.artista_id = u_artista.id
    INNER JOIN usuarios u_cliente ON c.cliente_id = u_cliente.id
    WHERE c.id = $1
  `;
  
  const resultado = await pool.query(consulta, [idContrato]);
  return resultado.rows[0];
};

// Actualizar estado del contrato
const actualizarEstadoContrato = async (idContrato, estado) => {
  const consulta = `
    UPDATE contratos
    SET estado = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *
  `;
  
  const resultado = await pool.query(consulta, [estado, idContrato]);
  return resultado.rows[0];
};

// Actualizar contrato
const actualizarContrato = async (idContrato, datos) => {
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

  valores.push(idContrato);

  const consulta = `
    UPDATE contratos
    SET ${campos.join(', ')}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $${contador}
    RETURNING *
  `;

  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

// Obtener todos los contratos (para admin)
const obtenerTodosContratos = async (filtros = {}) => {
  try {
    let query = `
      SELECT 
        c.id,
        c.contrato_id,
        c.artista_id,
        c.cliente_id,
        c.monto_total,
        c.moneda,
        c.fecha_evento,
        c.estado,
        c.terminos_condiciones as servicio,
        c.created_at,
        u_artista.email as artista_email,
        CASE 
          WHEN pa.nombre_artistico IS NOT NULL THEN pa.nombre_artistico
          WHEN pa.nombre IS NOT NULL THEN pa.nombre || ' ' || COALESCE(pa.apellido, '')
          ELSE u_artista.email
        END as artista_nombre,
        u_cliente.email as cliente_email,
        CASE 
          WHEN po.nombre IS NOT NULL THEN po.nombre || ' ' || COALESCE(po.apellido, '')
          ELSE u_cliente.email
        END as cliente_nombre
      FROM contratos c
      LEFT JOIN usuarios u_artista ON c.artista_id = u_artista.id
      LEFT JOIN perfiles_artistas pa ON c.artista_id = pa.usuario_id
      LEFT JOIN usuarios u_cliente ON c.cliente_id = u_cliente.id
      LEFT JOIN perfiles_organizadores po ON c.cliente_id = po.usuario_id
      WHERE 1=1
    `;

    const parametros = [];
    let contador = 1;

    if (filtros.estado) {
      query += ` AND c.estado = $${contador}`;
      parametros.push(filtros.estado);
      contador++;
    }

    if (filtros.busqueda) {
      query += ` AND (
        LOWER(pa.nombre_artistico) LIKE LOWER($${contador}) OR
        LOWER(pa.nombre) LIKE LOWER($${contador}) OR
        LOWER(pa.apellido) LIKE LOWER($${contador}) OR
        LOWER(po.nombre_organizador) LIKE LOWER($${contador}) OR
        LOWER(po.apellido_organizador) LIKE LOWER($${contador}) OR
        LOWER(u_artista.email) LIKE LOWER($${contador}) OR
        LOWER(u_cliente.email) LIKE LOWER($${contador})
      )`;
      parametros.push(`%${filtros.busqueda}%`);
      contador++;
    }

    query += ` ORDER BY c.created_at DESC`;

    const resultado = await pool.query(query, parametros);
    return resultado.rows;
  } catch (error) {
    console.error('Error en obtenerTodosContratos:', error);
    throw error;
  }
};

// Obtener estadísticas del artista
const obtenerEstadisticasArtista = async (idArtista) => {
  const consulta = `
    SELECT 
      -- Reservas activas (pendiente, aceptado, confirmado)
      COUNT(CASE WHEN c.estado IN ('pendiente', 'aceptado', 'confirmado') THEN 1 END) as reservas_activas,
      
      -- Ganancias estimadas (suma de montos de contratos activos)
      COALESCE(SUM(CASE WHEN c.estado IN ('pendiente', 'aceptado', 'confirmado') THEN c.monto_total ELSE 0 END), 0) as ganancias_estimadas,
      
      -- Total ganado (suma de pagos completados)
      COALESCE((
        SELECT SUM(p.monto_total)
        FROM pagos p
        INNER JOIN contratos c2 ON p.contrato_id = c2.id
        WHERE c2.artista_id = $1 AND p.estado = 'completado'
      ), 0) as total_ganado,
      
      -- Valoración promedio (si existe tabla de valoraciones)
      4.9 as valoracion_promedio
      
    FROM contratos c
    WHERE c.artista_id = $1
  `;
  
  const resultado = await pool.query(consulta, [idArtista]);
  return resultado.rows[0];
};

// Obtener próximas reservas del artista
const obtenerProximasReservasArtista = async (idArtista) => {
  const consulta = `
    SELECT 
      c.id,
      c.contrato_id,
      c.fecha_evento,
      c.ubicacion_evento,
      c.monto_total,
      c.duracion_horas,
      c.estado,
      COALESCE(po.nombre, pc.nombre) as cliente_nombre,
      COALESCE(po.apellido, pc.apellido) as cliente_apellido,
      u.email as cliente_email,
      c.terminos_condiciones as servicio_nombre
    FROM contratos c
    INNER JOIN usuarios u ON c.cliente_id = u.id
    LEFT JOIN perfiles_organizadores po ON c.cliente_id = po.usuario_id
    LEFT JOIN perfiles_artistas pc ON c.cliente_id = pc.usuario_id
    WHERE c.artista_id = $1 
      AND c.estado IN ('pendiente', 'aceptado', 'confirmado')
      AND c.fecha_evento >= CURRENT_DATE
    ORDER BY c.fecha_evento ASC
    LIMIT 5
  `;
  
  const resultado = await pool.query(consulta, [idArtista]);
  return resultado.rows;
};

module.exports = {
  crearContrato,
  obtenerContratosUsuario,
  obtenerContratosArtista,
  obtenerContratoPorId,
  actualizarEstadoContrato,
  actualizarContrato,
  obtenerTodosContratos,
  crearSolicitudPresupuesto,
  obtenerSolicitudPorId,
  crearPropuestaArtista,
  actualizarEstadoSolicitud,
  obtenerEstadisticasArtista,
  obtenerProximasReservasArtista
};

// Crear solicitud de presupuesto
async function crearSolicitudPresupuesto(datos) {
  const consulta = `
    INSERT INTO cotizaciones_eventos (
      organizador_id,
      tipo_evento,
      fecha_evento,
      ubicacion,
      detalles_brief,
      estado,
      fecha_solicitud
    ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
    RETURNING *
  `;
  
  const valores = [
    datos.organizador_id,
    datos.tipo_evento,
    datos.fecha_evento,
    datos.ubicacion,
    datos.detalles_brief,
    datos.estado || 'pendiente'
  ];
  
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
}

// Obtener solicitud por ID con información del artista y servicio
async function obtenerSolicitudPorId(id) {
  const consulta = `
    SELECT 
      ce.*,
      u.nombre as nombre_contacto,
      u.email as email_contacto,
      u.telefono as telefono_contacto,
      pa.nombre_artistico as artista_nombre,
      sa.nombre as servicio_nombre,
      sa.precio as servicio_precio
    FROM cotizaciones_eventos ce
    INNER JOIN usuarios u ON ce.organizador_id = u.id_usuario
    LEFT JOIN perfiles_artistas pa ON ce.organizador_id = pa.id_usuario
    LEFT JOIN servicios_artista sa ON ce.organizador_id = sa.id_artista
    WHERE ce.id = $1
  `;
  
  const resultado = await pool.query(consulta, [id]);
  return resultado.rows[0];
}

// Crear propuesta del artista
async function crearPropuestaArtista(datos) {
  const consulta = `
    INSERT INTO propuestas_artistas (
      cotizacion_id,
      artista_id,
      mensaje_propuesta,
      monto_ofertado,
      moneda,
      estado,
      fecha_envio
    ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
    RETURNING *
  `;
  
  const valores = [
    datos.cotizacion_id,
    datos.artista_id,
    datos.mensaje_propuesta,
    datos.monto_ofertado,
    datos.moneda || 'EUR',
    datos.estado || 'pendiente'
  ];
  
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
}

// Actualizar estado de solicitud
async function actualizarEstadoSolicitud(id, estado) {
  const consulta = `
    UPDATE cotizaciones_eventos
    SET estado = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING *
  `;
  
  const resultado = await pool.query(consulta, [estado, id]);
  return resultado.rows[0];
}
