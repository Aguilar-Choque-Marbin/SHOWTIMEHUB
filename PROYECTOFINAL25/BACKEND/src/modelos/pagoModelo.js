// src/modelos/pagoModelo.js
const pool = require('../configuracion/baseDatos');

// Crear pago
const crearPago = async (datos) => {
  const consulta = `
    INSERT INTO pagos (
      id_contrato, monto, metodo_pago, estado_pago,
      fecha_pago, id_transaccion_externa
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  
  const valores = [
    datos.id_contrato,
    datos.monto,
    datos.metodo_pago,
    datos.estado_pago || 'pendiente',
    datos.fecha_pago || new Date(),
    datos.id_transaccion_externa
  ];
  
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

// Obtener pagos de un contrato
const obtenerPagosContrato = async (idContrato) => {
  const consulta = `
    SELECT * FROM pagos
    WHERE id_contrato = $1
    ORDER BY fecha_pago DESC
  `;
  
  const resultado = await pool.query(consulta, [idContrato]);
  return resultado.rows;
};

// Obtener historial de pagos del usuario
const obtenerHistorialPagosUsuario = async (idUsuario) => {
  const consulta = `
    SELECT 
      p.id,
      p.contrato_id,
      p.monto_total as monto,
      p.estado,
      p.metodo_pago,
      p.referencia_pago as id_transaccion,
      p.fecha_pago as fecha,
      c.fecha_evento,
      c.contrato_id as numero_contrato,
      pa.nombre_artistico,
      pa.nombre as artista_nombre,
      pa.apellido as artista_apellido,
      se.titulo_servicio as servicio
    FROM pagos p
    INNER JOIN contratos c ON p.contrato_id = c.id
    INNER JOIN perfiles_artistas pa ON c.artista_id = pa.usuario_id
    LEFT JOIN servicios_artista se ON c.propuesta_id = se.id
    WHERE c.cliente_id = $1
    ORDER BY p.fecha_pago DESC
  `;
  
  const resultado = await pool.query(consulta, [idUsuario]);
  
  // Formatear los resultados
  return resultado.rows.map(row => ({
    id: row.id,
    id_transaccion: row.id_transaccion || row.numero_contrato,
    fecha: row.fecha || row.fecha_evento,
    artista: row.nombre_artistico || `${row.artista_nombre} ${row.artista_apellido}`,
    servicio: row.servicio || 'Servicio de entretenimiento',
    monto: parseFloat(row.monto),
    estado: row.estado === 'completado' ? 'Completado' : 
            row.estado === 'pendiente' ? 'Pendiente' : 
            row.estado === 'reembolsado' ? 'Reembolsado' : 'Pendiente',
    metodo_pago: row.metodo_pago || 'Tarjeta'
  }));
};

// Obtener ganancias del artista
const obtenerGananciasArtista = async (idArtista) => {
  const consulta = `
    SELECT 
      p.*,
      c.fecha_evento,
      u.nombre as cliente_nombre,
      u.apellido as cliente_apellido
    FROM pagos p
    INNER JOIN contratos c ON p.id_contrato = c.id_contrato
    INNER JOIN usuarios u ON c.id_usuario_organizador = u.id_usuario
    WHERE c.id_perfil_artista = $1 AND p.estado_pago = 'completado'
    ORDER BY p.fecha_pago DESC
  `;
  
  const resultado = await pool.query(consulta, [idArtista]);
  return resultado.rows;
};

// Actualizar estado del pago
const actualizarEstadoPago = async (idPago, estado) => {
  const consulta = `
    UPDATE pagos
    SET estado_pago = $1
    WHERE id_pago = $2
    RETURNING *
  `;
  
  const resultado = await pool.query(consulta, [estado, idPago]);
  return resultado.rows[0];
};

// Obtener estadísticas de pagos
const obtenerEstadisticasPagos = async () => {
  const consulta = `
    SELECT 
      COUNT(*) as total_pagos,
      SUM(CASE WHEN estado_pago = 'completado' THEN monto ELSE 0 END) as total_ingresos,
      SUM(CASE WHEN estado_pago = 'pendiente' THEN monto ELSE 0 END) as total_pendiente,
      COUNT(CASE WHEN estado_pago = 'completado' THEN 1 END) as pagos_completados,
      COUNT(CASE WHEN estado_pago = 'pendiente' THEN 1 END) as pagos_pendientes
    FROM pagos
  `;
  
  const resultado = await pool.query(consulta);
  return resultado.rows[0];
};

module.exports = {
  crearPago,
  obtenerPagosContrato,
  obtenerHistorialPagosUsuario,
  obtenerGananciasArtista,
  actualizarEstadoPago,
  obtenerEstadisticasPagos,
  obtenerPropuestaPorId,
  crearContratoDesdePropouesta,
  actualizarPagoContrato,
  actualizarEstadoPropuesta
};

// Obtener propuesta por ID con información completa
async function obtenerPropuestaPorId(id) {
  const consulta = `
    SELECT 
      pa.*,
      ce.fecha_evento,
      ce.ubicacion,
      ce.tipo_evento,
      ce.cotizacion_id,
      pf.nombre_artistico,
      pf.id_perfil_artista as artista_id
    FROM propuestas_artistas pa
    INNER JOIN cotizaciones_eventos ce ON pa.cotizacion_id = ce.id
    INNER JOIN perfiles_artistas pf ON pa.artista_id = pf.id_perfil_artista
    WHERE pa.id = $1
  `;
  
  const resultado = await pool.query(consulta, [id]);
  return resultado.rows[0];
}

// Crear contrato desde propuesta
async function crearContratoDesdePropouesta(datos) {
  const consulta = `
    INSERT INTO contratos (
      id_cotizacion,
      id_propuesta,
      id_perfil_artista,
      id_usuario_organizador,
      fecha_evento,
      ubicacion_evento,
      monto_total,
      estado
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;
  
  const valores = [
    datos.id_cotizacion,
    datos.id_propuesta,
    datos.id_perfil_artista,
    datos.id_usuario_organizador,
    datos.fecha_evento,
    datos.ubicacion_evento,
    datos.monto_total,
    datos.estado || 'confirmado'
  ];
  
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
}

// Actualizar pago con ID de contrato
async function actualizarPagoContrato(idPago, idContrato) {
  const consulta = `
    UPDATE pagos
    SET id_contrato = $1
    WHERE id_pago = $2
    RETURNING *
  `;
  
  const resultado = await pool.query(consulta, [idContrato, idPago]);
  return resultado.rows[0];
}

// Actualizar estado de propuesta
async function actualizarEstadoPropuesta(id, estado) {
  const consulta = `
    UPDATE propuestas_artistas
    SET estado = $1, fecha_respuesta = NOW()
    WHERE id = $2
    RETURNING *
  `;
  
  const resultado = await pool.query(consulta, [estado, id]);
  return resultado.rows[0];
}
