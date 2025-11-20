// src/controladores/autenticacionControlador.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModelo = require('../modelos/usuarioModelo');

// Registrar nuevo usuario
const registrar = async (peticion, respuesta) => {
  try {
    const { nombre, apellido, email, contrasena, tipo_usuario, telefono } = peticion.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !apellido || !email || !contrasena || !tipo_usuario) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: 'Todos los campos son obligatorios'
      });
    }

    // Verificar si el email ya existe
    const usuarioExistente = await usuarioModelo.buscarPorEmail(email);
    if (usuarioExistente) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: 'El email ya está registrado'
      });
    }

    // Encriptar contraseña
    const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

    // Crear usuario
    const nuevoUsuario = await usuarioModelo.crearUsuario({
      nombre,
      apellido,
      email,
      contrasena: contrasenaEncriptada,
      tipo_usuario,
      telefono
    });

    // Generar token JWT
    const token = jwt.sign(
      { id: nuevoUsuario.id, tipo: nuevoUsuario.tipo_usuario },
      process.env.JWT_SECRETO,
      { expiresIn: process.env.JWT_EXPIRACION }
    );

    respuesta.status(201).json({
      exito: true,
      mensaje: 'Usuario registrado exitosamente',
      datos: {
        usuario: nuevoUsuario,
        token
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al registrar usuario',
      error: error.message
    });
  }
};

// Iniciar sesión
const iniciarSesion = async (peticion, respuesta) => {
  try {
    const { email, contrasena } = peticion.body;

    // Validar campos
    if (!email || !contrasena) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: 'Email y contraseña son obligatorios'
      });
    }

    // Buscar usuario
    const usuario = await usuarioModelo.buscarPorEmail(email);
    if (!usuario) {
      return respuesta.status(401).json({
        exito: false,
        mensaje: 'Credenciales incorrectas'
      });
    }

    // Verificar contraseña
    const contrasenaValida = await bcrypt.compare(contrasena, usuario.password_hash);
    if (!contrasenaValida) {
      return respuesta.status(401).json({
        exito: false,
        mensaje: 'Credenciales incorrectas'
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo_usuario },
      process.env.JWT_SECRETO,
      { expiresIn: process.env.JWT_EXPIRACION }
    );

    // Remover contraseña de la respuesta
    delete usuario.password_hash;

    respuesta.json({
      exito: true,
      mensaje: 'Inicio de sesión exitoso',
      datos: {
        usuario,
        token
      }
    });

  } catch (error) {
    console.error('Error en inicio de sesión:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al iniciar sesión',
      error: error.message
    });
  }
};

// Solicitar recuperación de contraseña
const solicitarRecuperacion = async (peticion, respuesta) => {
  try {
    const { email } = peticion.body;

    if (!email) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: 'El email es obligatorio'
      });
    }

    // Buscar usuario por email
    const usuario = await usuarioModelo.buscarPorEmail(email);
    
    // Por seguridad, siempre devolvemos el mismo mensaje aunque el email no exista
    if (!usuario) {
      return respuesta.json({
        exito: true,
        mensaje: 'Si el email existe, recibirás un enlace de recuperación'
      });
    }

    // Generar token único
    const crypto = require('crypto');
    const token = crypto.randomBytes(32).toString('hex');
    
    // Token válido por 24 horas
    const expiraEn = new Date(Date.now() + 86400000); // 24 horas

    // Guardar token en la base de datos
    await usuarioModelo.crearTokenRecuperacion(usuario.id, token, expiraEn);

    // En producción, aquí enviarías un email
    // Por ahora, devolvemos el token en la respuesta (solo para desarrollo)
    console.log(`Token de recuperación para ${email}: ${token}`);
    console.log(`URL: http://localhost:5173/restablecer-contrasena?token=${token}`);

    respuesta.json({
      exito: true,
      mensaje: 'Si el email existe, recibirás un enlace de recuperación',
      // Solo para desarrollo - ELIMINAR en producción
      token_desarrollo: token,
      url_desarrollo: `http://localhost:5173/restablecer-contrasena?token=${token}`
    });

  } catch (error) {
    console.error('Error en solicitar recuperación:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al procesar la solicitud',
      error: error.message
    });
  }
};

// Verificar token de recuperación
const verificarToken = async (peticion, respuesta) => {
  try {
    const { token } = peticion.params;

    if (!token) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: 'Token no proporcionado'
      });
    }

    // Buscar token en la base de datos
    const tokenData = await usuarioModelo.buscarTokenRecuperacion(token);

    if (!tokenData) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: 'Token inválido o expirado'
      });
    }

    respuesta.json({
      exito: true,
      mensaje: 'Token válido',
      email: tokenData.email
    });

  } catch (error) {
    console.error('Error en verificar token:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al verificar token',
      error: error.message
    });
  }
};

// Restablecer contraseña
const restablecerContrasena = async (peticion, respuesta) => {
  try {
    const { token, nuevaContrasena } = peticion.body;

    if (!token || !nuevaContrasena) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: 'Token y nueva contraseña son obligatorios'
      });
    }

    if (nuevaContrasena.length < 6) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: 'La contraseña debe tener al menos 6 caracteres'
      });
    }

    // Verificar token
    const tokenData = await usuarioModelo.buscarTokenRecuperacion(token);

    if (!tokenData) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: 'Token inválido o expirado'
      });
    }

    // Encriptar nueva contraseña
    const contrasenaEncriptada = await bcrypt.hash(nuevaContrasena, 10);

    // Actualizar contraseña
    await usuarioModelo.actualizarContrasena(tokenData.id_usuario, contrasenaEncriptada);

    // Marcar token como usado
    await usuarioModelo.marcarTokenUsado(token);

    respuesta.json({
      exito: true,
      mensaje: 'Contraseña actualizada exitosamente'
    });

  } catch (error) {
    console.error('Error en restablecer contraseña:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al restablecer contraseña',
      error: error.message
    });
  }
};

module.exports = {
  registrar,
  iniciarSesion,
  solicitarRecuperacion,
  verificarToken,
  restablecerContrasena
};
