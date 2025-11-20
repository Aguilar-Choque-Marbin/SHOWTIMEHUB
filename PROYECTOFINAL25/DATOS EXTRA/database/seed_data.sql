-- ============================================
-- SHOWTIME HUB - DATOS DE PRUEBA (SEED)
-- ============================================

-- ============================================
-- USUARIOS DE PRUEBA
-- ============================================

-- Password: "password123" (hasheado con bcrypt)
-- Usa esta para login: password123

-- Admin
INSERT INTO usuarios (email, password_hash, tipo_usuario, email_verificado, esta_activo, avatar_url) VALUES
('admin@showtimehub.com', '$2b$10$rKvvJQx5h6QH3x9L4fGzJOZ6w.xYxYxYxYxYxYxYxYxYxYxYxYxYx', 'admin', true, true, 'https://ui-avatars.com/api/?name=Admin&background=1E3A8A&color=fff');

-- Clientes
INSERT INTO usuarios (email, password_hash, tipo_usuario, email_verificado, esta_activo, avatar_url, telefono) VALUES
('maria.lopez@gmail.com', '$2b$10$rKvvJQx5h6QH3x9L4fGzJOZ6w.xYxYxYxYxYxYxYxYxYxYxYxYxYx', 'cliente', true, true, 'https://ui-avatars.com/api/?name=Maria+Lopez&background=3B82F6&color=fff', '70123456'),
('carlos.martinez@outlook.com', '$2b$10$rKvvJQx5h6QH3x9L4fGzJOZ6w.xYxYxYxYxYxYxYxYxYxYxYxYxYx', 'cliente', true, true, 'https://ui-avatars.com/api/?name=Carlos+Martinez&background=8B5CF6&color=fff', '71234567'),
('ana.garcia@yahoo.com', '$2b$10$rKvvJQx5h6QH3x9L4fGzJOZ6w.xYxYxYxYxYxYxYxYxYxYxYxYxYx', 'cliente', true, true, 'https://ui-avatars.com/api/?name=Ana+Garcia&background=EC4899&color=fff', '72345678');

-- Artistas
INSERT INTO usuarios (email, password_hash, tipo_usuario, email_verificado, esta_activo, avatar_url, telefono) VALUES
('juan.rocker@music.com', '$2b$10$rKvvJQx5h6QH3x9L4fGzJOZ6w.xYxYxYxYxYxYxYxYxYxYxYxYxYx', 'artista', true, true, 'https://ui-avatars.com/api/?name=Juan+Rock&background=EF4444&color=fff', '73456789'),
('sofia.voice@music.com', '$2b$10$rKvvJQx5h6QH3x9L4fGzJOZ6w.xYxYxYxYxYxYxYxYxYxYxYxYxYx', 'artista', true, true, 'https://ui-avatars.com/api/?name=Sofia+Voice&background=10B981&color=fff', '74567890'),
('magic.roberto@shows.com', '$2b$10$rKvvJQx5h6QH3x9L4fGzJOZ6w.xYxYxYxYxYxYxYxYxYxYxYxYxYx', 'artista', true, true, 'https://ui-avatars.com/api/?name=Roberto+Magic&background=F59E0B&color=fff', '75678901'),
('dj.beats@music.com', '$2b$10$rKvvJQx5h6QH3x9L4fGzJOZ6w.xYxYxYxYxYxYxYxYxYxYxYxYxYx', 'artista', true, true, 'https://ui-avatars.com/api/?name=DJ+Beats&background=6366F1&color=fff', '76789012'),
('photo.laura@visual.com', '$2b$10$rKvvJQx5h6QH3x9L4fGzJOZ6w.xYxYxYxYxYxYxYxYxYxYxYxYxYx', 'artista', true, true, 'https://ui-avatars.com/api/?name=Laura+Photo&background=06B6D4&color=fff', '77890123'),
('dance.squad@shows.com', '$2b$10$rKvvJQx5h6QH3x9L4fGzJOZ6w.xYxYxYxYxYxYxYxYxYxYxYxYxYx', 'artista', true, true, 'https://ui-avatars.com/api/?name=Dance+Squad&background=EC4899&color=fff', '78901234'),
('payaso.feliz@kids.com', '$2b$10$rKvvJQx5h6QH3x9L4fGzJOZ6w.xYxYxYxYxYxYxYxYxYxYxYxYxYx', 'artista', true, true, 'https://ui-avatars.com/api/?name=Payaso+Feliz&background=F59E0B&color=fff', '79012345');

-- ============================================
-- PERFILES DE ORGANIZADORES
-- ============================================
INSERT INTO perfiles_organizadores (usuario_id, nombre, apellido, nombre_empresa, tipo_organizador, telefono, ciudad) VALUES
(2, 'María', 'López', 'Eventos ML', 'empresa', '70123456', 'La Paz'),
(3, 'Carlos', 'Martínez', NULL, 'individual', '71234567', 'Santa Cruz'),
(4, 'Ana', 'García', 'Bodas Perfectas', 'agencia', '72345678', 'Cochabamba');

-- ============================================
-- PERFILES DE ARTISTAS
-- ============================================
INSERT INTO perfiles_artistas (
    usuario_id, nombre_artistico, nombre, apellido, biografia, experiencia_anos,
    ciudad, departamento, pais, precio_minimo, precio_maximo, moneda,
    verificado, destacado, calificacion_promedio, total_resenas, total_contrataciones,
    instagram_url, facebook_url, whatsapp
) VALUES
(5, 'The Rockers', 'Juan', 'Pérez', 
 'Banda de rock con más de 10 años de experiencia. Repertorio variado que incluye rock clásico, pop-rock y covers internacionales. Ideal para fiestas, eventos corporativos y bodas.', 
 10, 'La Paz', 'La Paz', 'Bolivia', 1500.00, 5000.00, 'BOB', 
 true, true, 4.8, 45, 120,
 'https://instagram.com/therockers', 'https://facebook.com/therockers', '73456789'),

(6, 'Sofía La Voz', 'Sofía', 'Ramírez',
 'Cantante lírica y popular con formación en conservatorio. Especializada en eventos elegantes, bodas y galas. Repertorio en español, inglés e italiano.',
 8, 'Santa Cruz', 'Santa Cruz', 'Bolivia', 800.00, 3000.00, 'BOB',
 true, true, 4.9, 67, 95,
 'https://instagram.com/sofilavoz', 'https://facebook.com/sofilavoz', '74567890'),

(7, 'Roberto El Mago', 'Roberto', 'Quiroga',
 'Mago profesional especializado en eventos corporativos y familiares. Shows de magia de cerca, mentalismo y grandes ilusiones. Perfecto para sorprender a tus invitados.',
 12, 'Cochabamba', 'Cochabamba', 'Bolivia', 600.00, 2500.00, 'BOB',
 true, false, 4.7, 89, 150,
 'https://instagram.com/robertomago', 'https://facebook.com/robertomago', '75678901'),

(8, 'DJ Beats Bolivia', 'Miguel', 'Torrez',
 'DJ profesional con equipamiento de última generación. Especializado en bodas, cumpleaños 15 años y eventos corporativos. Géneros: reggaeton, electrónica, pop, rock.',
 6, 'La Paz', 'La Paz', 'Bolivia', 1000.00, 4000.00, 'BOB',
 true, true, 4.6, 52, 78,
 'https://instagram.com/djbeatsbo', 'https://facebook.com/djbeatsbo', '76789012'),

(9, 'Laura Fotografía', 'Laura', 'Mendoza',
 'Fotógrafa profesional especializada en bodas, eventos sociales y corporativos. Estilo natural y documental. Incluye sesión pre-evento y álbum digital.',
 5, 'Santa Cruz', 'Santa Cruz', 'Bolivia', 1200.00, 4500.00, 'BOB',
 true, true, 4.9, 103, 145,
 'https://instagram.com/laurafoto', 'https://facebook.com/laurafoto', '77890123'),

(10, 'Dance Revolution', 'Carla', 'Suárez',
 'Grupo de baile profesional. Shows de salsa, bachata, folklore boliviano y danzas contemporáneas. Coreografías personalizadas para eventos especiales.',
 7, 'Cochabamba', 'Cochabamba', 'Bolivia', 1800.00, 6000.00, 'BOB',
 true, false, 4.8, 34, 62,
 'https://instagram.com/dancerevolution', 'https://facebook.com/dancerevolution', '78901234'),

(11, 'Payaso Feliz', 'Rodrigo', 'Vargas',
 'Payaso y animador infantil con 15 años de experiencia. Shows interactivos, juegos, globoflexia y magia para niños. Ideal para cumpleaños infantiles.',
 15, 'La Paz', 'La Paz', 'Bolivia', 300.00, 1200.00, 'BOB',
 false, false, 4.5, 127, 210,
 'https://instagram.com/payasofeliz', 'https://facebook.com/payasofeliz', '79012345');

-- ============================================
-- SERVICIOS DE ARTISTAS
-- ============================================
INSERT INTO servicios_artista (
    artista_id, categoria_id, titulo_servicio, descripcion, precio_base, precio_hora,
    duracion_minima, duracion_maxima, moneda, incluye, areas_cobertura, tags, esta_activo
) VALUES
-- The Rockers
(5, 1, 'Show de Rock en Vivo', 
 'Banda completa con 4 integrantes. Incluye equipo de sonido profesional, iluminación básica y 3 horas de show en vivo con repertorio variado.',
 2500.00, 800.00, 180, 300, 'BOB',
 ARRAY['Equipo de sonido', 'Iluminación básica', 'Amplificadores', 'Microfonos'],
 ARRAY['La Paz', 'El Alto', 'Achocalla'],
 ARRAY['boda', 'fiesta', 'corporativo', 'rock', 'musica en vivo'],
 true),

-- Sofía La Voz
(6, 2, 'Cantante para Bodas y Eventos Elegantes',
 'Presentación vocal en ceremonias religiosas, recepciones y eventos formales. Repertorio clásico y contemporáneo. Incluye equipo de sonido.',
 1500.00, 500.00, 120, 240, 'BOB',
 ARRAY['Micrófono profesional', 'Pistas musicales', 'Vestuario elegante'],
 ARRAY['Santa Cruz', 'Warnes', 'Montero'],
 ARRAY['boda', 'ceremonia', 'gala', 'evento corporativo'],
 true),

-- Roberto El Mago
(7, 3, 'Show de Magia para Eventos',
 'Espectáculo de magia e ilusionismo para eventos familiares y corporativos. Incluye magia de cerca, mentalismo y grandes ilusiones.',
 1200.00, 400.00, 60, 120, 'BOB',
 ARRAY['Material de magia', 'Asistente', 'Vestuario profesional'],
 ARRAY['Cochabamba', 'Quillacollo', 'Sacaba'],
 ARRAY['magia', 'ilusionismo', 'entretenimiento', 'corporativo'],
 true),

-- DJ Beats
(8, 10, 'DJ Profesional para Fiestas',
 'Servicio completo de DJ con equipamiento Pioneer profesional. Luces LED, humo y música de todos los géneros. Playlist personalizada.',
 2000.00, 600.00, 240, 360, 'BOB',
 ARRAY['Consola Pioneer', 'Sistema de sonido', 'Luces LED', 'Máquina de humo'],
 ARRAY['La Paz', 'El Alto', 'Zona Sur'],
 ARRAY['dj', 'fiesta', 'boda', '15 años', 'discoteca movil'],
 true),

-- Laura Fotografía
(9, 6, 'Cobertura Fotográfica de Bodas',
 'Cobertura completa de boda desde la preparación hasta la fiesta. 8 horas de servicio, álbum digital HD, 400+ fotos editadas profesionalmente.',
 3000.00, 400.00, 480, 600, 'BOB',
 ARRAY['2 Cámaras profesionales', 'Álbum digital HD', 'Edición profesional', '400+ fotos'],
 ARRAY['Santa Cruz', 'La Guardia', 'Cotoca'],
 ARRAY['fotografia', 'boda', 'matrimonio', 'sesion fotografica'],
 true),

-- Dance Revolution
(10, 5, 'Show de Baile Profesional',
 'Espectáculo de danza con 6 bailarines. Coreografías de salsa, bachata y folklore. Vestuario incluido. Ideal para eventos corporativos y fiestas.',
 3500.00, 1000.00, 30, 60, 'BOB',
 ARRAY['6 bailarines profesionales', 'Vestuario', 'Coreografía personalizada', 'Ensayo previo'],
 ARRAY['Cochabamba', 'Quillacollo'],
 ARRAY['baile', 'danza', 'show', 'coreografia', 'folklore'],
 true),

-- Payaso Feliz
(11, 4, 'Animación Infantil Completa',
 'Show de 2 horas con juegos, magia, globoflexia y música. Ideal para cumpleaños de 3 a 10 años. Incluye regalitos para los niños.',
 500.00, 250.00, 120, 180, 'BOB',
 ARRAY['Juegos interactivos', 'Globoflexia', 'Magia infantil', 'Música', 'Regalitos'],
 ARRAY['La Paz', 'El Alto', 'Zona Sur', 'Obrajes'],
 ARRAY['cumpleaños', 'niños', 'payaso', 'animacion infantil'],
 true);

-- ============================================
-- PORTAFOLIO DE MEDIOS
-- ============================================
INSERT INTO portafolio_media (artista_id, tipo_media, url_media, titulo, descripcion, orden, es_portada) VALUES
-- The Rockers
(5, 'imagen', 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee', 'Concierto en vivo', 'Show en evento corporativo', 1, true),
(5, 'imagen', 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c', 'Banda completa', 'Los 4 integrantes', 2, false),
(5, 'video', 'https://www.youtube.com/watch?v=sample1', 'Video promocional', 'Muestra de repertorio', 3, false),

-- Sofía La Voz
(6, 'imagen', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81', 'Presentación en boda', 'Ceremonia religiosa', 1, true),
(6, 'imagen', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', 'Sesión de fotos', 'Promo profesional', 2, false),

-- Roberto El Mago
(7, 'imagen', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c', 'Show de magia', 'Ilusionismo en evento', 1, true),
(7, 'imagen', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81', 'Magia de cerca', 'Mentalismo', 2, false),

-- DJ Beats
(8, 'imagen', 'https://images.unsplash.com/photo-1571266028243-d220c6a1e19d', 'Setup profesional', 'Equipo Pioneer', 1, true),
(8, 'imagen', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3', 'En plena fiesta', 'Boda 2024', 2, false),

-- Laura Fotografía  
(9, 'imagen', 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92', 'Boda romántica', 'Ceremonia al atardecer', 1, true),
(9, 'imagen', 'https://images.unsplash.com/photo-1519741497674-611481863552', 'Retrato de novios', 'Sesión post-boda', 2, false),

-- Dance Revolution
(10, 'imagen', 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad', 'Show de salsa', 'Presentación corporativa', 1, true),
(10, 'imagen', 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4', 'Folklore boliviano', 'Morenada', 2, false),

-- Payaso Feliz
(11, 'imagen', 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d', 'Cumpleaños infantil', 'Animación con niños', 1, true),
(11, 'imagen', 'https://images.unsplash.com/photo-1464047736614-af63643285bf', 'Globoflexia', 'Figuras de globos', 2, false);

-- ============================================
-- CALIFICACIONES
-- ============================================
-- Nota: Se necesitan contratos primero. Las agregaré después de crear contratos de prueba.

-- ============================================
-- COTIZACIONES DE EJEMPLO
-- ============================================
INSERT INTO cotizaciones_eventos (
    organizador_id, nombre_evento, tipo_evento, fecha_evento, ubicacion, ciudad,
    numero_invitados, presupuesto_estimado, moneda, detalles_brief, estado
) VALUES
(2, 'Boda María & Juan', 'boda', '2025-12-20 18:00:00', 'Salón Los Jardines', 'La Paz',
 150, 15000.00, 'BOB', 
 'Buscamos banda en vivo para ceremonia y recepción. Evento elegante de 150 personas. Necesitamos música variada: romántica para ceremonia, pop y rock para fiesta.',
 'pendiente'),

(3, 'Aniversario Empresa TechCorp', 'corporativo', '2025-11-30 19:00:00', 'Hotel Camino Real', 'Santa Cruz',
 200, 25000.00, 'BOB',
 'Evento corporativo de aniversario. Necesitamos DJ, fotografía y posiblemente un show de magia para el entretenimiento.',
 'pendiente'),

(4, 'Cumpleaños 15 años Valentina', '15_anos', '2026-01-15 20:00:00', 'Quinta Mi Esperanza', 'Cochabamba',
 120, 12000.00, 'BOB',
 'Fiesta de 15 años con temática elegante. Necesitamos DJ, fotógrafo y show de baile de vals.',
 'en_revision');

-- ============================================
-- PROPUESTAS DE ARTISTAS
-- ============================================
INSERT INTO propuestas_artistas (
    cotizacion_id, artista_id, mensaje_propuesta, monto_ofertado, moneda,
    duracion_estimada, condiciones, estado
) VALUES
(1, 5, 
 '¡Hola! Somos The Rockers y nos encantaría ser parte de su boda. Tenemos amplia experiencia en bodas y podemos adaptar nuestro repertorio a sus gustos. Incluimos equipo de sonido profesional e iluminación.',
 4500.00, 'BOB', 240,
 'Anticipo del 50% para reservar fecha. Incluye 4 horas de show + 1 hora adicional de música ambiente.',
 'enviada'),

(1, 6,
 'Estimados novios, sería un honor cantar en su boda. Me especializo en ceremonias religiosas y recepciones elegantes. Puedo interpretar sus canciones favoritas.',
 2000.00, 'BOB', 180,
 'Requiero lista de canciones con 2 semanas de anticipación. Anticipo 40% para reservar.',
 'enviada'),

(2, 8,
 'Perfecto para su evento corporativo. Cuento con equipamiento Pioneer profesional y amplia experiencia en eventos de empresa. Música variada según el ambiente.',
 3500.00, 'BOB', 300,
 'Incluye luces LED, sistema de sonido y playlist personalizada. Anticipo 50%.',
 'enviada'),

(2, 7,
 'Show de magia ideal para romper el hielo en eventos corporativos. 45 minutos de magia, ilusionismo y mentalismo adaptado a público adulto profesional.',
 1500.00, 'BOB', 45,
 'Show personalizado con mensaje corporativo si lo requieren. Anticipo 30%.',
 'enviada');

-- ============================================
-- FAVORITOS
-- ============================================
INSERT INTO favoritos (usuario_id, artista_id) VALUES
(2, 5), -- María likes The Rockers
(2, 6), -- María likes Sofía
(2, 9), -- María likes Laura Fotografía
(3, 8), -- Carlos likes DJ Beats
(3, 7), -- Carlos likes Roberto Mago
(4, 10), -- Ana likes Dance Revolution
(4, 6); -- Ana likes Sofía

-- ============================================
-- DISPONIBILIDAD DE ARTISTAS
-- ============================================
INSERT INTO disponibilidad_artista (artista_id, fecha_inicio, fecha_fin, estado, notas) VALUES
-- The Rockers - Disponible fin de semana
(5, '2025-11-22 18:00:00', '2025-11-23 02:00:00', 'disponible', 'Disponible para eventos de fin de semana'),
(5, '2025-11-29 18:00:00', '2025-11-30 02:00:00', 'disponible', 'Disponible'),
-- Reservado el 20 de diciembre
(5, '2025-12-20 18:00:00', '2025-12-21 00:00:00', 'reservado', 'Reservado para boda'),

-- DJ Beats - Varias fechas disponibles
(8, '2025-11-25 19:00:00', '2025-11-26 03:00:00', 'disponible', 'Viernes disponible'),
(8, '2025-11-30 19:00:00', '2025-12-01 03:00:00', 'reservado', 'Evento corporativo TechCorp'),

-- Laura Fotografía
(9, '2025-11-23 10:00:00', '2025-11-23 22:00:00', 'disponible', 'Sábado completo disponible'),
(9, '2025-12-07 10:00:00', '2025-12-07 22:00:00', 'disponible', 'Disponible para sesiones');

-- ============================================
-- CONVERSACIONES Y MENSAJES
-- ============================================
INSERT INTO conversaciones (usuario_uno_id, usuario_dos_id) VALUES
(2, 5), -- María con The Rockers
(2, 6), -- María con Sofía
(3, 8); -- Carlos con DJ Beats

INSERT INTO mensajes (conversacion_id, emisor_id, receptor_id, contenido_mensaje, leido, fecha_lectura) VALUES
(1, 2, 5, 'Hola, me interesa contratar su banda para mi boda el 20 de diciembre. ¿Están disponibles?', true, '2025-11-18 10:30:00'),
(1, 5, 2, '¡Hola María! Sí, estamos disponibles para esa fecha. ¿Qué tipo de música te gustaría?', true, '2025-11-18 10:45:00'),
(1, 2, 5, 'Nos gusta el rock clásico y algo de pop. ¿Podrían tocar canciones de The Beatles?', false, NULL),

(2, 2, 6, 'Hola Sofía, ¿cantas en bodas religiosas?', true, '2025-11-18 11:00:00'),
(2, 6, 2, 'Sí, tengo amplia experiencia en ceremonias religiosas. ¿Para qué fecha?', false, NULL),

(3, 3, 8, 'Hola, necesito un DJ para evento corporativo el 30 de noviembre', true, '2025-11-18 14:00:00'),
(3, 8, 3, 'Perfecto, esa fecha la tengo libre. ¿Cuántas personas aproximadamente?', true, '2025-11-18 14:15:00');

-- ============================================
-- ESTADÍSTICAS FINALES
-- ============================================

-- Ver resumen de datos insertados
SELECT 'Usuarios' as tabla, COUNT(*) as total FROM usuarios
UNION ALL
SELECT 'Categorías', COUNT(*) FROM categorias
UNION ALL
SELECT 'Perfiles Artistas', COUNT(*) FROM perfiles_artistas
UNION ALL
SELECT 'Servicios', COUNT(*) FROM servicios_artista
UNION ALL
SELECT 'Portafolio Media', COUNT(*) FROM portafolio_media
UNION ALL
SELECT 'Cotizaciones', COUNT(*) FROM cotizaciones_eventos
UNION ALL
SELECT 'Propuestas', COUNT(*) FROM propuestas_artistas
UNION ALL
SELECT 'Favoritos', COUNT(*) FROM favoritos
UNION ALL
SELECT 'Conversaciones', COUNT(*) FROM conversaciones
UNION ALL
SELECT 'Mensajes', COUNT(*) FROM mensajes;

-- ============================================
-- CONSULTAS DE PRUEBA
-- ============================================

-- Ver todos los artistas en el marketplace
SELECT * FROM vista_artistas_marketplace ORDER BY calificacion_promedio DESC;

-- Ver artistas por categoría
SELECT 
    pa.nombre || ' ' || pa.apellido as artista,
    c.nombre as categoria,
    pa.ciudad,
    pa.precio_minimo,
    pa.calificacion_promedio
FROM perfiles_artistas pa
JOIN servicios_artista sa ON pa.usuario_id = sa.artista_id
JOIN categorias c ON sa.categoria_id = c.id
WHERE sa.esta_activo = true
ORDER BY c.nombre, pa.calificacion_promedio DESC;

-- ============================================
-- FIN DE SEED DATA
-- ============================================
