// src/controladores/usuarioControlador.js
const usuarioModelo = require('../modelos/usuarioModelo');
const bcrypt = require('bcrypt');

// Obtener perfil del usuario actual
const obtenerPerfil = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    const usuario = await usuarioModelo.buscarPorId(idUsuario);

    if (!usuario) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    // Si es cliente y no tiene perfil, crear uno básico
    const pool = require('../configuracion/baseDatos');
    if (usuario.tipo_usuario === 'cliente' && !usuario.nombre) {
      await pool.query(
        'INSERT INTO perfiles_organizadores (usuario_id, nombre, apellido) VALUES ($1, $2, $3) ON CONFLICT (usuario_id) DO NOTHING',
        [idUsuario, 'Usuario', 'Nuevo']
      );
      // Recargar usuario
      const usuarioActualizado = await usuarioModelo.buscarPorId(idUsuario);
      return respuesta.json({
        exito: true,
        datos: usuarioActualizado
      });
    }

    respuesta.json({
      exito: true,
      datos: usuario
    });

  } catch (error) {
    console.error('Error al obtener perfil:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener perfil',
      error: error.message
    });
  }
};

// Actualizar perfil
const actualizarPerfil = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    const datos = peticion.body;

    // No permitir cambiar email o tipo_usuario
    delete datos.email;
    delete datos.tipo_usuario;
    delete datos.contrasena_hash;
    delete datos.password_hash;

    const pool = require('../configuracion/baseDatos');
    
    // Obtener tipo de usuario
    const usuarioActual = await usuarioModelo.buscarPorId(idUsuario);
    
    // Actualizar tabla usuarios (teléfono)
    if (datos.telefono) {
      await pool.query(
        'UPDATE usuarios SET telefono = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [datos.telefono, idUsuario]
      );
    }
    
    // Actualizar tabla de perfil según tipo de usuario
    if (usuarioActual.tipo_usuario === 'artista') {
      const camposActualizar = [];
      const valores = [];
      let contador = 1;
      
      if (datos.nombre) {
        camposActualizar.push(`nombre = $${contador}`);
        valores.push(datos.nombre);
        contador++;
      }
      
      if (datos.ciudad) {
        camposActualizar.push(`ciudad = $${contador}`);
        valores.push(datos.ciudad);
        contador++;
      }
      
      if (camposActualizar.length > 0) {
        valores.push(idUsuario);
        await pool.query(
          `UPDATE perfiles_artistas SET ${camposActualizar.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE usuario_id = $${contador}`,
          valores
        );
      }
    } else if (usuarioActual.tipo_usuario === 'cliente') {
      const camposActualizar = [];
      const valores = [];
      let contador = 1;
      
      if (datos.nombre) {
        camposActualizar.push(`nombre = $${contador}`);
        valores.push(datos.nombre);
        contador++;
      }
      
      if (datos.ciudad) {
        camposActualizar.push(`ciudad = $${contador}`);
        valores.push(datos.ciudad);
        contador++;
      }
      
      if (camposActualizar.length > 0) {
        valores.push(idUsuario);
        await pool.query(
          `UPDATE perfiles_organizadores SET ${camposActualizar.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE usuario_id = $${contador}`,
          valores
        );
      }
    }
    
    // Obtener usuario actualizado
    const usuarioActualizado = await usuarioModelo.buscarPorId(idUsuario);

    respuesta.json({
      exito: true,
      mensaje: 'Perfil actualizado exitosamente',
      datos: usuarioActualizado
    });

  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al actualizar perfil',
      error: error.message
    });
  }
};

// Listar usuarios (solo admin)
const listarUsuarios = async (peticion, respuesta) => {
  try {
    const filtros = {
      tipo_usuario: peticion.query.tipo_usuario,
      busqueda: peticion.query.busqueda,
      activo: peticion.query.activo,
      limite: parseInt(peticion.query.limite) || 20,
      pagina: parseInt(peticion.query.pagina) || 1
    };

    const usuarios = await usuarioModelo.listarUsuarios(filtros);
    const total = await usuarioModelo.contarUsuarios(filtros);
    const totalPaginas = Math.ceil(total / filtros.limite);

    respuesta.json({
      exito: true,
      datos: usuarios,
      paginacion: {
        pagina_actual: filtros.pagina,
        total_paginas: totalPaginas,
        total_resultados: total
      }
    });

  } catch (error) {
    console.error('Error al listar usuarios:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener usuarios',
      error: error.message
    });
  }
};

// Eliminar usuario (solo admin)
const eliminarUsuario = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;

    const usuarioEliminado = await usuarioModelo.eliminarUsuario(id);

    if (!usuarioEliminado) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    respuesta.json({
      exito: true,
      mensaje: 'Usuario eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al eliminar usuario',
      error: error.message
    });
  }
};

// Obtener reservas del usuario
const obtenerReservas = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    
    // Por ahora retornamos un array vacío - implementar cuando haya modelo de contratos/reservas
    respuesta.json([]);
    
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener reservas',
      error: error.message
    });
  }
};

// Obtener favoritos del usuario
const obtenerFavoritos = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    
    // Por ahora retornamos un array vacío - implementar cuando haya modelo de favoritos
    respuesta.json([]);
    
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al obtener favoritos',
      error: error.message
    });
  }
};

// Actualizar tipo de usuario (para selección de rol después del registro)
const actualizarTipoUsuario = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    const { tipo_usuario } = peticion.body;

    // Validar tipo de usuario
    const tiposPermitidos = ['cliente', 'artista'];
    if (!tiposPermitidos.includes(tipo_usuario)) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: 'Tipo de usuario no válido'
      });
    }

    // Actualizar en la base de datos
    const pool = require('../configuracion/baseDatos');
    await pool.query(
      'UPDATE usuarios SET tipo_usuario = $1 WHERE id = $2',
      [tipo_usuario, idUsuario]
    );

    respuesta.json({
      exito: true,
      mensaje: 'Tipo de usuario actualizado correctamente',
      datos: { tipo_usuario }
    });

  } catch (error) {
    console.error('Error al actualizar tipo de usuario:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al actualizar tipo de usuario',
      error: error.message
    });
  }
};

// Cambiar estado de usuario (activar/desactivar)
const cambiarEstadoUsuario = async (peticion, respuesta) => {
  try {
    const { id } = peticion.params;
    const { esta_activo } = peticion.body;

    const resultado = await usuarioModelo.actualizarEstadoUsuario(id, esta_activo);

    if (!resultado) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    respuesta.json({
      exito: true,
      mensaje: 'Estado del usuario actualizado correctamente',
      datos: resultado
    });
  } catch (error) {
    console.error('Error al cambiar estado del usuario:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al cambiar el estado del usuario'
    });
  }
};

// Cambiar contraseña
const cambiarContrasena = async (peticion, respuesta) => {
  try {
    const idUsuario = peticion.usuario.id;
    const { contrasena_actual, contrasena_nueva } = peticion.body;

    if (!contrasena_actual || !contrasena_nueva) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: 'Se requieren la contraseña actual y la nueva contraseña'
      });
    }

    if (contrasena_nueva.length < 6) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: 'La nueva contraseña debe tener al menos 6 caracteres'
      });
    }

    // Obtener usuario
    const usuario = await usuarioModelo.buscarPorId(idUsuario);
    if (!usuario) {
      return respuesta.status(404).json({
        exito: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    // Verificar contraseña actual
    const contrasenaValida = await bcrypt.compare(contrasena_actual, usuario.password_hash);
    if (!contrasenaValida) {
      return respuesta.status(401).json({
        exito: false,
        mensaje: 'La contraseña actual es incorrecta'
      });
    }

    // Hashear nueva contraseña
    const nuevaContrasenaHash = await bcrypt.hash(contrasena_nueva, 10);

    // Actualizar contraseña
    const pool = require('../configuracion/baseDatos');
    await pool.query(
      'UPDATE usuarios SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [nuevaContrasenaHash, idUsuario]
    );

    respuesta.json({
      exito: true,
      mensaje: 'Contraseña actualizada exitosamente'
    });

  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al cambiar contraseña',
      error: error.message
    });
  }
};

module.exports = {
  obtenerPerfil,
  actualizarPerfil,
  listarUsuarios,
  cambiarEstadoUsuario,
  eliminarUsuario,
  obtenerReservas,
  obtenerFavoritos,
  actualizarTipoUsuario,
  cambiarContrasena
};
