-- Agregar columna horario_disponibilidad a perfiles_artistas si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'perfiles_artistas' 
        AND column_name = 'horario_disponibilidad'
    ) THEN
        ALTER TABLE perfiles_artistas 
        ADD COLUMN horario_disponibilidad JSONB DEFAULT NULL;
        
        RAISE NOTICE 'Columna horario_disponibilidad agregada exitosamente';
    ELSE
        RAISE NOTICE 'La columna horario_disponibilidad ya existe';
    END IF;
END $$;

-- Verificar la tabla disponibilidad_artista
SELECT COUNT(*) as total_bloqueos FROM disponibilidad_artista;

-- Mostrar estructura de la tabla
\d disponibilidad_artista
