-- ============================================
-- SHOWTIME HUB - BASE DE DATOS COMPLETA
-- PostgreSQL 14+
-- Fecha: 18 de noviembre de 2025
-- ============================================

-- Eliminar tablas si existen (para desarrollo)
DROP TABLE IF EXISTS favoritos CASCADE;
DROP TABLE IF EXISTS calificaciones CASCADE;
DROP TABLE IF EXISTS mensajes CASCADE;
DROP TABLE IF EXISTS conversaciones CASCADE;
DROP TABLE IF EXISTS pagos CASCADE;
DROP TABLE IF EXISTS contratos CASCADE;
DROP TABLE IF EXISTS propuestas_artistas CASCADE;
DROP TABLE IF EXISTS cotizaciones_eventos CASCADE;
DROP TABLE IF EXISTS disponibilidad_artista CASCADE;
DROP TABLE IF EXISTS portafolio_media CASCADE;
DROP TABLE IF EXISTS servicios_artista CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS perfiles_organizadores CASCADE;
DROP TABLE IF EXISTS perfiles_artistas CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- ============================================
-- TABLA: usuarios
-- ============================================
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(20) NOT NULL CHECK (tipo_usuario IN ('cliente', 'artista', 'admin')),
    email_verificado BOOLEAN DEFAULT FALSE,
    oauth_provider VARCHAR(50), -- 'google', 'facebook', null
    oauth_id VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_conexion TIMESTAMP,
    esta_activo BOOLEAN DEFAULT TRUE,
    avatar_url VARCHAR(500),
    telefono VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_tipo ON usuarios(tipo_usuario);
CREATE INDEX idx_usuarios_activo ON usuarios(esta_activo);

-- ============================================
-- TABLA: categorias (NUEVA)
-- ============================================
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icono VARCHAR(100), -- nombre del icono (heroicons, lucide, etc)
    descripcion TEXT,
    imagen_url VARCHAR(500),
    color VARCHAR(20), -- color hexadecimal para UI
    orden INT DEFAULT 0,
    esta_activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas
CREATE INDEX idx_categorias_slug ON categorias(slug);
CREATE INDEX idx_categorias_activo ON categorias(esta_activo);

-- ============================================
-- TABLA: perfiles_artistas
-- ============================================
CREATE TABLE perfiles_artistas (
    usuario_id INT PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre_artistico VARCHAR(255),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    biografia TEXT,
    experiencia_anos INT,
    ciudad VARCHAR(100),
    departamento VARCHAR(100), -- o estado/provincia
    pais VARCHAR(100) DEFAULT 'Bolivia',
    direccion TEXT,
    latitud DECIMAL(10, 8),
    longitud DECIMAL(11, 8),
    telefono VARCHAR(20),
    whatsapp VARCHAR(20),
    sitio_web VARCHAR(255),
    facebook_url VARCHAR(255),
    instagram_url VARCHAR(255),
    youtube_url VARCHAR(255),
    tiktok_url VARCHAR(255),
    precio_minimo DECIMAL(10, 2),
    precio_maximo DECIMAL(10, 2),
    moneda VARCHAR(10) DEFAULT 'BOB',
    verificado BOOLEAN DEFAULT FALSE,
    fecha_verificacion TIMESTAMP,
    destacado BOOLEAN DEFAULT FALSE,
    calificacion_promedio DECIMAL(3, 2) DEFAULT 0.00,
    total_resenas INT DEFAULT 0,
    total_contrataciones INT DEFAULT 0,
    disponible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para búsquedas y filtros
CREATE INDEX idx_perfiles_ciudad ON perfiles_artistas(ciudad);
CREATE INDEX idx_perfiles_precio ON perfiles_artistas(precio_minimo, precio_maximo);
CREATE INDEX idx_perfiles_calificacion ON perfiles_artistas(calificacion_promedio);
CREATE INDEX idx_perfiles_verificado ON perfiles_artistas(verificado);
CREATE INDEX idx_perfiles_destacado ON perfiles_artistas(destacado);

-- ============================================
-- TABLA: perfiles_organizadores
-- ============================================
CREATE TABLE perfiles_organizadores (
    usuario_id INT PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    nombre_empresa VARCHAR(255),
    tipo_organizador VARCHAR(50), -- 'individual', 'empresa', 'agencia'
    telefono VARCHAR(20),
    ciudad VARCHAR(100),
    pais VARCHAR(100) DEFAULT 'Bolivia',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: servicios_artista
-- ============================================
CREATE TABLE servicios_artista (
    id SERIAL PRIMARY KEY,
    artista_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    categoria_id INT REFERENCES categorias(id) ON DELETE SET NULL,
    titulo_servicio VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio_base DECIMAL(10, 2) NOT NULL,
    precio_hora DECIMAL(10, 2),
    duracion_minima INT, -- en minutos
    duracion_maxima INT, -- en minutos
    moneda VARCHAR(10) DEFAULT 'BOB',
    incluye TEXT[], -- array de strings: ['Equipo de sonido', 'Iluminación', etc]
    requisitos TEXT, -- requisitos especiales del cliente
    areas_cobertura VARCHAR(255)[], -- array de ciudades donde presta servicio
    tags VARCHAR(100)[], -- ['boda', 'cumpleaños', 'corporativo']
    esta_activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_servicios_artista ON servicios_artista(artista_id);
CREATE INDEX idx_servicios_categoria ON servicios_artista(categoria_id);
CREATE INDEX idx_servicios_precio ON servicios_artista(precio_base);
CREATE INDEX idx_servicios_activo ON servicios_artista(esta_activo);

-- ============================================
-- TABLA: portafolio_media
-- ============================================
CREATE TABLE portafolio_media (
    id SERIAL PRIMARY KEY,
    artista_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo_media VARCHAR(20) NOT NULL CHECK (tipo_media IN ('imagen', 'video', 'audio')),
    url_media VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    titulo VARCHAR(255),
    descripcion TEXT,
    orden INT DEFAULT 0,
    es_portada BOOLEAN DEFAULT FALSE,
    fecha_carga TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_portafolio_artista ON portafolio_media(artista_id);
CREATE INDEX idx_portafolio_tipo ON portafolio_media(tipo_media);
CREATE INDEX idx_portafolio_portada ON portafolio_media(es_portada);

-- ============================================
-- TABLA: disponibilidad_artista
-- ============================================
CREATE TABLE disponibilidad_artista (
    id SERIAL PRIMARY KEY,
    artista_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP NOT NULL,
    estado VARCHAR(20) DEFAULT 'disponible' CHECK (estado IN ('disponible', 'reservado', 'bloqueado')),
    notas TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_disponibilidad_artista ON disponibilidad_artista(artista_id);
CREATE INDEX idx_disponibilidad_fechas ON disponibilidad_artista(fecha_inicio, fecha_fin);
CREATE INDEX idx_disponibilidad_estado ON disponibilidad_artista(estado);

-- ============================================
-- TABLA: cotizaciones_eventos
-- ============================================
CREATE TABLE cotizaciones_eventos (
    id SERIAL PRIMARY KEY,
    organizador_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre_evento VARCHAR(255) NOT NULL,
    tipo_evento VARCHAR(100), -- 'boda', 'cumpleaños', 'corporativo', etc
    fecha_evento TIMESTAMP NOT NULL,
    ubicacion VARCHAR(255),
    ciudad VARCHAR(100),
    numero_invitados INT,
    presupuesto_estimado DECIMAL(10, 2),
    moneda VARCHAR(10) DEFAULT 'BOB',
    detalles_brief TEXT,
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'en_revision', 'respondido', 'cerrado')),
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_cotizaciones_organizador ON cotizaciones_eventos(organizador_id);
CREATE INDEX idx_cotizaciones_estado ON cotizaciones_eventos(estado);
CREATE INDEX idx_cotizaciones_fecha ON cotizaciones_eventos(fecha_evento);

-- ============================================
-- TABLA: propuestas_artistas
-- ============================================
CREATE TABLE propuestas_artistas (
    id SERIAL PRIMARY KEY,
    cotizacion_id INT NOT NULL REFERENCES cotizaciones_eventos(id) ON DELETE CASCADE,
    artista_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    mensaje_propuesta TEXT NOT NULL,
    monto_ofertado DECIMAL(10, 2) NOT NULL,
    moneda VARCHAR(10) DEFAULT 'BOB',
    duracion_estimada INT, -- en minutos
    condiciones TEXT,
    estado VARCHAR(20) DEFAULT 'enviada' CHECK (estado IN ('enviada', 'vista', 'aceptada', 'rechazada')),
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_respuesta TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_propuestas_cotizacion ON propuestas_artistas(cotizacion_id);
CREATE INDEX idx_propuestas_artista ON propuestas_artistas(artista_id);
CREATE INDEX idx_propuestas_estado ON propuestas_artistas(estado);

-- ============================================
-- TABLA: contratos
-- ============================================
CREATE TABLE contratos (
    id SERIAL PRIMARY KEY,
    contrato_id VARCHAR(50) UNIQUE NOT NULL, -- Ej: SHTC-2025-0001
    propuesta_id INT REFERENCES propuestas_artistas(id) ON DELETE SET NULL,
    artista_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    cliente_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    terminos_condiciones TEXT NOT NULL,
    monto_total DECIMAL(10, 2) NOT NULL,
    moneda VARCHAR(10) DEFAULT 'BOB',
    anticipo_porcentaje INT DEFAULT 50,
    anticipo_monto DECIMAL(10, 2),
    saldo_pendiente DECIMAL(10, 2),
    fecha_evento TIMESTAMP NOT NULL,
    duracion_horas DECIMAL(5, 2),
    ubicacion_evento TEXT,
    estado VARCHAR(30) DEFAULT 'pendiente' CHECK (estado IN (
        'pendiente', 'firmado', 'confirmado', 'en_progreso', 
        'completado', 'cancelado', 'en_disputa'
    )),
    fecha_aceptacion_organizador TIMESTAMP,
    fecha_aceptacion_artista TIMESTAMP,
    url_pdf_firmado VARCHAR(500),
    notas_adicionales TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_contratos_artista ON contratos(artista_id);
CREATE INDEX idx_contratos_cliente ON contratos(cliente_id);
CREATE INDEX idx_contratos_estado ON contratos(estado);
CREATE INDEX idx_contratos_fecha ON contratos(fecha_evento);

-- ============================================
-- TABLA: pagos
-- ============================================
CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    contrato_id INT NOT NULL REFERENCES contratos(id) ON DELETE CASCADE,
    monto_total DECIMAL(10, 2) NOT NULL,
    moneda VARCHAR(10) DEFAULT 'BOB',
    metodo_pago VARCHAR(50), -- 'tarjeta', 'transferencia', 'efectivo', 'paypal'
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN (
        'pendiente', 'procesando', 'completado', 'fallido', 'reembolsado'
    )),
    referencia_pago VARCHAR(255), -- ID de transacción de pasarela
    fecha_pago TIMESTAMP,
    fecha_vencimiento TIMESTAMP,
    comprobante_url VARCHAR(500),
    notas TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_pagos_contrato ON pagos(contrato_id);
CREATE INDEX idx_pagos_estado ON pagos(estado);
CREATE INDEX idx_pagos_fecha ON pagos(fecha_pago);

-- ============================================
-- TABLA: calificaciones
-- ============================================
CREATE TABLE calificaciones (
    id SERIAL PRIMARY KEY,
    contrato_id INT NOT NULL REFERENCES contratos(id) ON DELETE CASCADE,
    calificador_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    calificado_usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comentario TEXT,
    fecha_calificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    respuesta_calificado TEXT,
    fecha_respuesta TIMESTAMP,
    esta_publicado BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(contrato_id, calificador_id) -- Un usuario solo puede calificar una vez por contrato
);

-- Índices
CREATE INDEX idx_calificaciones_calificado ON calificaciones(calificado_usuario_id);
CREATE INDEX idx_calificaciones_rating ON calificaciones(rating);
CREATE INDEX idx_calificaciones_fecha ON calificaciones(fecha_calificacion);

-- ============================================
-- TABLA: conversaciones
-- ============================================
CREATE TABLE conversaciones (
    id SERIAL PRIMARY KEY,
    usuario_uno_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    usuario_dos_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    ultimo_mensaje_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_uno_id, usuario_dos_id)
);

-- Índices
CREATE INDEX idx_conversaciones_usuario1 ON conversaciones(usuario_uno_id);
CREATE INDEX idx_conversaciones_usuario2 ON conversaciones(usuario_dos_id);

-- ============================================
-- TABLA: mensajes
-- ============================================
CREATE TABLE mensajes (
    id SERIAL PRIMARY KEY,
    conversacion_id INT NOT NULL REFERENCES conversaciones(id) ON DELETE CASCADE,
    emisor_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    receptor_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    contenido_mensaje TEXT NOT NULL,
    leido BOOLEAN DEFAULT FALSE,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_lectura TIMESTAMP,
    url_adjunto VARCHAR(500),
    tipo_adjunto VARCHAR(20), -- 'imagen', 'documento', 'audio'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_mensajes_conversacion ON mensajes(conversacion_id);
CREATE INDEX idx_mensajes_emisor ON mensajes(emisor_id);
CREATE INDEX idx_mensajes_receptor ON mensajes(receptor_id);
CREATE INDEX idx_mensajes_leido ON mensajes(leido);
CREATE INDEX idx_mensajes_fecha ON mensajes(fecha_envio DESC);

-- ============================================
-- TABLA: favoritos (NUEVA)
-- ============================================
CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    artista_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, artista_id)
);

-- Índices
CREATE INDEX idx_favoritos_usuario ON favoritos(usuario_id);
CREATE INDEX idx_favoritos_artista ON favoritos(artista_id);

-- ============================================
-- TRIGGERS PARA updated_at AUTOMÁTICO
-- ============================================
CREATE OR REPLACE FUNCTION actualizar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a todas las tablas con updated_at
CREATE TRIGGER trigger_usuarios_updated_at BEFORE UPDATE ON usuarios
    FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_perfiles_artistas_updated_at BEFORE UPDATE ON perfiles_artistas
    FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_perfiles_organizadores_updated_at BEFORE UPDATE ON perfiles_organizadores
    FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_servicios_updated_at BEFORE UPDATE ON servicios_artista
    FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_disponibilidad_updated_at BEFORE UPDATE ON disponibilidad_artista
    FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_cotizaciones_updated_at BEFORE UPDATE ON cotizaciones_eventos
    FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_propuestas_updated_at BEFORE UPDATE ON propuestas_artistas
    FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_contratos_updated_at BEFORE UPDATE ON contratos
    FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_pagos_updated_at BEFORE UPDATE ON pagos
    FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_calificaciones_updated_at BEFORE UPDATE ON calificaciones
    FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_conversaciones_updated_at BEFORE UPDATE ON conversaciones
    FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

-- ============================================
-- VISTAS ÚTILES
-- ============================================

-- Vista: Artistas con toda su información para marketplace
CREATE VIEW vista_artistas_marketplace AS
SELECT 
    u.id,
    u.email,
    u.avatar_url,
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
    pa.calificacion_promedio,
    pa.total_resenas,
    pa.total_contrataciones,
    pa.verificado,
    pa.destacado,
    pa.disponible,
    pa.experiencia_anos,
    (SELECT array_agg(DISTINCT c.nombre) 
     FROM servicios_artista sa 
     JOIN categorias c ON sa.categoria_id = c.id 
     WHERE sa.artista_id = u.id AND sa.esta_activo = true
    ) as categorias,
    (SELECT url_media FROM portafolio_media 
     WHERE artista_id = u.id AND es_portada = true 
     LIMIT 1
    ) as imagen_portada
FROM usuarios u
JOIN perfiles_artistas pa ON u.id = pa.usuario_id
WHERE u.tipo_usuario = 'artista' AND u.esta_activo = true;

-- Vista: Estadísticas de artistas (para admin)
CREATE VIEW vista_estadisticas_artistas AS
SELECT 
    pa.usuario_id,
    pa.nombre || ' ' || pa.apellido as nombre_completo,
    pa.ciudad,
    pa.calificacion_promedio,
    pa.total_resenas,
    pa.total_contrataciones,
    COUNT(DISTINCT sa.id) as total_servicios,
    COUNT(DISTINCT pm.id) as total_media,
    COUNT(DISTINCT c.id) as contratos_activos,
    COALESCE(SUM(p.monto_total), 0) as ingresos_totales
FROM perfiles_artistas pa
LEFT JOIN servicios_artista sa ON pa.usuario_id = sa.artista_id AND sa.esta_activo = true
LEFT JOIN portafolio_media pm ON pa.usuario_id = pm.artista_id
LEFT JOIN contratos c ON pa.usuario_id = c.artista_id AND c.estado IN ('confirmado', 'completado')
LEFT JOIN pagos p ON c.id = p.contrato_id AND p.estado = 'completado'
GROUP BY pa.usuario_id, pa.nombre, pa.apellido, pa.ciudad, 
         pa.calificacion_promedio, pa.total_resenas, pa.total_contrataciones;

-- ============================================
-- FUNCIÓN: Actualizar calificación promedio de artista
-- ============================================
CREATE OR REPLACE FUNCTION actualizar_calificacion_artista()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE perfiles_artistas
    SET 
        calificacion_promedio = (
            SELECT COALESCE(AVG(rating), 0)
            FROM calificaciones
            WHERE calificado_usuario_id = NEW.calificado_usuario_id
            AND esta_publicado = true
        ),
        total_resenas = (
            SELECT COUNT(*)
            FROM calificaciones
            WHERE calificado_usuario_id = NEW.calificado_usuario_id
            AND esta_publicado = true
        )
    WHERE usuario_id = NEW.calificado_usuario_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_actualizar_calificacion_artista
AFTER INSERT OR UPDATE ON calificaciones
FOR EACH ROW
EXECUTE FUNCTION actualizar_calificacion_artista();

-- ============================================
-- DATOS DE PRUEBA (SEED DATA)
-- ============================================

-- Insertar categorías
INSERT INTO categorias (nombre, slug, icono, descripcion, color, orden) VALUES
('Músicos', 'musicos', 'musical-note', 'Bandas, solistas, DJ y músicos para eventos', '#3B82F6', 1),
('Cantantes', 'cantantes', 'microphone', 'Vocalistas profesionales para todo tipo de eventos', '#8B5CF6', 2),
('Magos', 'magos', 'sparkles', 'Magia, ilusionismo y entretenimiento mágico', '#EC4899', 3),
('Payasos', 'payasos', 'face-smile', 'Animadores infantiles y payasos profesionales', '#F59E0B', 4),
('Bailarines', 'bailarines', 'user-group', 'Shows de baile y coreografías profesionales', '#EF4444', 5),
('Fotógrafos', 'fotografos', 'camera', 'Fotografía profesional para eventos', '#06B6D4', 6),
('Videógrafos', 'videografos', 'video-camera', 'Filmación y producción de video', '#10B981', 7),
('Actores', 'actores', 'film', 'Actuación profesional y performances', '#F97316', 8),
('Comediantes', 'comediantes', 'chat-bubble-left-right', 'Stand-up comedy y humor en vivo', '#14B8A6', 9),
('DJs', 'djs', 'musical-note-list', 'DJs profesionales para fiestas y eventos', '#6366F1', 10);

-- Insertar usuario admin
INSERT INTO usuarios (email, password_hash, tipo_usuario, email_verificado, esta_activo) VALUES
('admin@showtimehub.com', '$2a$10$abcdefghijklmnopqrstuvwxyz123456789', 'admin', true, true);

-- ============================================
-- COMENTARIOS Y DOCUMENTACIÓN
-- ============================================
COMMENT ON TABLE usuarios IS 'Tabla principal de usuarios del sistema';
COMMENT ON TABLE categorias IS 'Categorías de servicios artísticos';
COMMENT ON TABLE perfiles_artistas IS 'Información detallada de los artistas';
COMMENT ON TABLE servicios_artista IS 'Servicios que ofrecen los artistas';
COMMENT ON TABLE portafolio_media IS 'Galería multimedia de los artistas';
COMMENT ON TABLE calificaciones IS 'Sistema de rating y reseñas';
COMMENT ON TABLE contratos IS 'Contratos entre clientes y artistas';
COMMENT ON TABLE pagos IS 'Registro de pagos y transacciones';
COMMENT ON TABLE favoritos IS 'Lista de artistas favoritos por usuario';

-- ============================================
-- FIN DEL SCRIPT
-- ============================================
