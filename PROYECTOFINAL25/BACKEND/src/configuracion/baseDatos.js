// src/configuracion/baseDatos.js
const { Pool } = require('pg');
require('dotenv').config();

// Crear conexión a PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PUERTO,
  user: process.env.DB_USUARIO,
  password: process.env.DB_CONTRASENA,
  database: process.env.DB_NOMBRE
});

// Probar conexión
pool.connect((error, cliente, liberar) => {
  if (error) {
    console.error('❌ Error conectando a la base de datos:', error.message);
  } else {
    console.log('✅ Conectado a PostgreSQL - Base de datos: showtime_hub');
    liberar();
  }
});

module.exports = pool;
