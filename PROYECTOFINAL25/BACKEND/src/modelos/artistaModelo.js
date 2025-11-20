// src/modelos/artistaModelo.js
const pool = require('../configuracion/baseDatos');

// Obtener todos los artistas con filtros
const obtenerArtistas = async (filtros = {}) => {
  let consulta = `
    SELECT 
      pa.usuario_id as id,
      pa.nombre,
      pa.apellido,
      pa.nombre_artistico,
      pa.biografia,
      pa.ciudad,
      pa.departamento,
      pa.pais,
      pa.precio_minimo,
      pa.precio_maximo,
      pa.moneda,
      pa.verificado,
      pa.calificacion_promedio,
      pa.total_resenas,
      pa.telefono,
      pa.whatsapp,
      (SELECT STRING_AGG(c.nombre, ', ') 
       FROM servicios_artista sa 
       JOIN categorias c ON sa.categoria_id = c.id 
       WHERE sa.artista_id = pa.usuario_id AND sa.esta_activo = true
       LIMIT 1) as categoria
    FROM perfiles_artistas pa
  `;
  
  const valores = [];
  let contador = 1;
  let whereAdded = false;

  // Para el panel de admin, incluir todos los artistas
  // Para el marketplace público, solo verificados
  if (filtros.soloVerificados !== false) {
    consulta += ` WHERE pa.verificado = true`;
    whereAdded = true;
  }

  // Filtro por búsqueda (nombre o categoría)
  if (filtros.busqueda) {
    consulta += whereAdded ? ` AND` : ` WHERE`;
    consulta += ` (pa.nombre_artistico ILIKE $${contador} OR pa.nombre ILIKE $${contador} OR pa.apellido ILIKE $${contador})`;
    valores.push(`%${filtros.busqueda}%`);
    contador++;
    whereAdded = true;
  }

  // Filtro por categoría
  if (filtros.categoria) {
    consulta += whereAdded ? ` AND` : ` WHERE`;
    consulta += ` EXISTS (
      SELECT 1 FROM servicios_artista sa 
      JOIN categorias c ON sa.categoria_id = c.id 
      WHERE sa.artista_id = pa.usuario_id 
      AND sa.esta_activo = true 
      AND c.id = $${contador}
    )`;
    valores.push(filtros.categoria);
    contador++;
    whereAdded = true;
  }

  // Filtro por ubicación
  if (filtros.ubicacion) {
    consulta += whereAdded ? ` AND` : ` WHERE`;
    consulta += ` pa.ciudad ILIKE $${contador}`;
    valores.push(`%${filtros.ubicacion}%`);
    contador++;
    whereAdded = true;
  }

  // Filtro por presupuesto
  if (filtros.presupuesto_min) {
    consulta += whereAdded ? ` AND` : ` WHERE`;
    consulta += ` pa.precio_maximo >= $${contador}`;
    valores.push(filtros.presupuesto_min);
    contador++;
    whereAdded = true;
  }

  if (filtros.presupuesto_max) {
    consulta += whereAdded ? ` AND` : ` WHERE`;
    consulta += ` pa.precio_minimo <= $${contador}`;
    valores.push(filtros.presupuesto_max);
    contador++;
    whereAdded = true;
  }

  // Ordenamiento
  const ordenValido = ['calificacion_promedio', 'tarifa_por_hora', 'anos_experiencia', 'total_resenas'];
  const orden = ordenValido.includes(filtros.orden) ? filtros.orden : 'calificacion_promedio';
  consulta += ` ORDER BY pa.${orden} DESC`;

  // Paginación
  const limite = filtros.limite || 12;
  const pagina = filtros.pagina || 1;
  const offset = (pagina - 1) * limite;
  
  consulta += ` LIMIT $${contador} OFFSET $${contador + 1}`;
  valores.push(limite, offset);

  const resultado = await pool.query(consulta, valores);
  return resultado.rows;
};

// Obtener artista por ID
const obtenerArtistaPorId = async (idArtista) => {
  const consulta = `
    SELECT 
      pa.*,
      (SELECT STRING_AGG(c.nombre, ', ') 
       FROM servicios_artista sa 
       JOIN categorias c ON sa.categoria_id = c.id 
       WHERE sa.artista_id = pa.usuario_id AND sa.esta_activo = true) as categoria_principal
    FROM perfiles_artistas pa
    WHERE pa.usuario_id = $1
  `;
  
  const resultado = await pool.query(consulta, [idArtista]);
  return resultado.rows[0];
};

// Obtener servicios del artista
const obtenerServiciosArtista = async (idArtista) => {
  const consulta = `
    SELECT * FROM servicios_artista
    WHERE artista_id = $1 AND esta_activo = true
    ORDER BY id
  `;
  
  const resultado = await pool.query(consulta, [idArtista]);
  return resultado.rows;
};

// Obtener portafolio (fotos/videos)
const obtenerPortafolio = async (idArtista) => {
  const consulta = `
    SELECT * FROM portafolio_media
    WHERE artista_id = $1
    ORDER BY orden, fecha_carga DESC
  `;
  
  const resultado = await pool.query(consulta, [idArtista]);
  return resultado.rows;
};

// Obtener calificaciones
const obtenerCalificaciones = async (idArtista) => {
  const consulta = `
    SELECT 
      c.id,
      c.rating as calificacion,
      c.comentario,
      c.fecha_calificacion,
      u.email,
      u.avatar_url as avatar_cliente,
      COALESCE(po.nombre || ' ' || po.apellido, pa.nombre_artistico, SPLIT_PART(u.email, '@', 1)) as nombre_cliente
    FROM calificaciones c
    INNER JOIN usuarios u ON c.calificador_id = u.id
    LEFT JOIN perfiles_organizadores po ON u.id = po.usuario_id
    LEFT JOIN perfiles_artistas pa ON u.id = pa.usuario_id
    WHERE c.calificado_usuario_id = $1 AND c.esta_publicado = true
    ORDER BY c.fecha_calificacion DESC
  `;
  
  const resultado = await pool.query(consulta, [idArtista]);
  return resultado.rows;
};

// Crear perfil de artista
const crearPerfilArtista = async (datos) => {
  const consulta = `
    INSERT INTO perfiles_artistas (
      id_usuario, id_categoria, nombre_artistico, biografia,
      foto_perfil, foto_portada, ubicacion, tarifa_por_hora, anos_experiencia
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;
  
  const valores = [
    datos.id_usuario,
    datos.id_categoria,
    datos.nombre_artistico,
    datos.biografia,
    datos.foto_perfil || null,
    datos.foto_portada || null,
    datos.ubicacion,
    datos.tarifa_por_hora,
    datos.anos_experiencia || 0
  ];
  
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

// Actualizar perfil de artista
const actualizarPerfilArtista = async (idArtista, datos) => {
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

  valores.push(idArtista);

  const consulta = `
    UPDATE perfiles_artistas
    SET ${campos.join(', ')}
    WHERE id_perfil_artista = $${contador}
    RETURNING *
  `;

  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

// Contar total de artistas (para paginación)
const contarArtistas = async (filtros = {}) => {
  let consulta = `
    SELECT COUNT(*) as total
    FROM perfiles_artistas pa
    WHERE pa.verificado = true
  `;
  
  const valores = [];
  let contador = 1;

  if (filtros.busqueda) {
    consulta += ` AND (pa.nombre_artistico ILIKE $${contador} OR pa.nombre ILIKE $${contador} OR pa.apellido ILIKE $${contador})`;
    valores.push(`%${filtros.busqueda}%`);
    contador++;
  }

  if (filtros.ubicacion) {
    consulta += ` AND pa.ciudad ILIKE $${contador}`;
    valores.push(`%${filtros.ubicacion}%`);
    contador++;
  }

  if (filtros.presupuesto_min) {
    consulta += ` AND pa.precio_minimo >= $${contador}`;
    valores.push(filtros.presupuesto_min);
    contador++;
  }

  if (filtros.presupuesto_max) {
    consulta += ` AND pa.precio_minimo <= $${contador}`;
    valores.push(filtros.presupuesto_max);
    contador++;
  }

  const resultado = await pool.query(consulta, valores);
  return parseInt(resultado.rows[0].total);
};

// Obtener artista por ID de usuario
const obtenerArtistaPorIdUsuario = async (idUsuario) => {
  const consulta = `
    SELECT 
      pa.*,
      u.nombre,
      u.email,
      u.telefono
    FROM perfiles_artistas pa
    JOIN usuarios u ON pa.usuario_id = u.id
    WHERE pa.usuario_id = $1
  `;
  
  const resultado = await pool.query(consulta, [idUsuario]);
  return resultado.rows[0];
};

// Crear servicio de artista
const crearServicio = async (datos) => {
  const consulta = `
    INSERT INTO servicios_artista 
      (artista_id, categoria_id, titulo_servicio, descripcion, esta_activo)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  
  const valores = [
    datos.artista_id,
    datos.categoria_id,
    datos.titulo_servicio || 'Servicio Principal',
    datos.descripcion || '',
    true
  ];
  
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

// Aprobar artista
const aprobarArtista = async (id) => {
  const query = `
    UPDATE perfiles_artistas
    SET verificado = true,
        fecha_verificacion = NOW(),
        updated_at = NOW()
    WHERE usuario_id = $1
    RETURNING *
  `;
  
  const resultado = await pool.query(query, [id]);
  return resultado.rows[0];
};

// Rechazar artista
const rechazarArtista = async (id) => {
  const query = `
    UPDATE perfiles_artistas
    SET verificado = false,
        updated_at = NOW()
    WHERE usuario_id = $1
    RETURNING *
  `;
  
  const resultado = await pool.query(query, [id]);
  return resultado.rows[0];
};

// Eliminar artista
const eliminarArtista = async (id) => {
  const query = `
    DELETE FROM usuarios
    WHERE id = $1 AND tipo_usuario = 'artista'
  `;
  
  await pool.query(query, [id]);
};

module.exports = {
  obtenerArtistas,
  obtenerArtistaPorId,
  obtenerArtistaPorIdUsuario,
  obtenerServiciosArtista,
  obtenerServicioPorId,
  obtenerPortafolio,
  obtenerCalificaciones,
  crearPerfilArtista,
  actualizarPerfilArtista,
  crearServicio,
  contarArtistas,
  aprobarArtista,
  rechazarArtista,
  eliminarArtista
};

// Obtener un servicio específico por ID
async function obtenerServicioPorId(servicioId) {
  const consulta = `
    SELECT 
      sa.*,
      pa.nombre_artistico,
      cat.nombre as categoria_nombre
    FROM servicios_artista sa
    INNER JOIN perfiles_artistas pa ON sa.id_artista = pa.id_perfil_artista
    LEFT JOIN categorias cat ON pa.id_categoria = cat.id_categoria
    WHERE sa.id_servicio = $1
  `;
  
  const resultado = await pool.query(consulta, [servicioId]);
  return resultado.rows[0];
}
