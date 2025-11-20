// src/controladores/usuarioControlador.js
const usuarioModelo = require('../modelos/usuarioModelo');

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

    const estadisticas = await usuarioModelo.obtenerEstadisticasUsuario(idUsuario);

    respuesta.json({
      exito: true,
      datos: {
        ...usuario,
        estadisticas
      }
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

    const usuarioActualizado = await usuarioModelo.actualizarUsuario(idUsuario, datos);

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

module.exports = {
  obtenerPerfil,
  actualizarPerfil,
  listarUsuarios,
  cambiarEstadoUsuario,
  eliminarUsuario,
  obtenerReservas,
  obtenerFavoritos,
  actualizarTipoUsuario
};
