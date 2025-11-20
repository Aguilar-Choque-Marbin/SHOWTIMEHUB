-- Tabla para almacenar tokens de recuperación de contraseña
CREATE TABLE IF NOT EXISTS tokens_recuperacion (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  token VARCHAR(255) NOT NULL UNIQUE,
  expira_en TIMESTAMP NOT NULL,
  usado BOOLEAN DEFAULT FALSE,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usado_en TIMESTAMP
);

-- Índice para búsquedas rápidas por token
CREATE INDEX IF NOT EXISTS idx_tokens_recuperacion_token ON tokens_recuperacion(token);

-- Índice para limpiar tokens expirados
CREATE INDEX IF NOT EXISTS idx_tokens_recuperacion_expira ON tokens_recuperacion(expira_en);

-- Función para limpiar tokens expirados automáticamente (opcional)
CREATE OR REPLACE FUNCTION limpiar_tokens_expirados()
RETURNS void AS $$
BEGIN
  DELETE FROM tokens_recuperacion 
  WHERE expira_en < NOW() OR usado = TRUE;
END;
$$ LANGUAGE plpgsql;
