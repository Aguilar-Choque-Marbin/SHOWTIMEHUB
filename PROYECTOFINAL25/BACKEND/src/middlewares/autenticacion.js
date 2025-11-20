// src/middlewares/autenticacion.js
const jwt = require('jsonwebtoken');

// Middleware para verificar token JWT
const verificarToken = (peticion, respuesta, siguiente) => {
  try {
    // Obtener token del header
    const token = peticion.headers.authorization?.split(' ')[1];

    if (!token) {
      return respuesta.status(401).json({
        exito: false,
        mensaje: 'Token no proporcionado'
      });
    }

    // Verificar token
    const decodificado = jwt.verify(token, process.env.JWT_SECRETO);
    peticion.usuario = decodificado;
    siguiente();

  } catch (error) {
    return respuesta.status(401).json({
      exito: false,
      mensaje: 'Token inválido o expirado'
    });
  }
};

// Middleware para verificar tipo de usuario
const verificarTipoUsuario = (...tiposPermitidos) => {
  return (peticion, respuesta, siguiente) => {
    if (!tiposPermitidos.includes(peticion.usuario.tipo)) {
      return respuesta.status(403).json({
        exito: false,
        mensaje: 'No tienes permisos para realizar esta acción'
      });
    }
    siguiente();
  };
};

module.exports = {
  verificarToken,
  verificarTipoUsuario
};
