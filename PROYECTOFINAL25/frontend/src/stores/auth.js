import { defineStore } from 'pinia';
import { autenticacionService } from '@/services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: null,
    token: null,
    cargando: false,
    error: null
  }),

  getters: {
    estaAutenticado: (state) => !!state.token,
    esArtista: (state) => state.usuario?.tipo_usuario === 'artista',
    esAdmin: (state) => state.usuario?.tipo_usuario === 'admin',
    esUsuarioNormal: (state) => state.usuario?.tipo_usuario === 'cliente' || state.usuario?.tipo_usuario === 'usuario',
    nombreUsuario: (state) => state.usuario?.nombre || '',
    emailUsuario: (state) => state.usuario?.email || ''
  },

  actions: {
    // Inicializar desde localStorage
    inicializar() {
      const token = localStorage.getItem('token');
      const usuario = localStorage.getItem('usuario');
      
      if (token && usuario) {
        this.token = token;
        this.usuario = JSON.parse(usuario);
      }
    },

    // Registrar nuevo usuario
    async registrar(datos) {
      this.cargando = true;
      this.error = null;
      
      try {
        const respuesta = await autenticacionService.registrar(datos);
        
        if (respuesta.data.exito) {
          this.token = respuesta.data.datos.token;
          this.usuario = respuesta.data.datos.usuario;
          
          // Guardar en localStorage
          localStorage.setItem('token', respuesta.data.datos.token);
          localStorage.setItem('usuario', JSON.stringify(respuesta.data.datos.usuario));
          
          return { exito: true, mensaje: respuesta.data.mensaje };
        }
        
        return { exito: false, mensaje: 'Error al registrar usuario' };
      } catch (error) {
        this.error = error.response?.data?.mensaje || 'Error al registrar usuario';
        return { exito: false, mensaje: this.error };
      } finally {
        this.cargando = false;
      }
    },

    // Iniciar sesión
    async iniciarSesion(credenciales) {
      this.cargando = true;
      this.error = null;
      
      try {
        const respuesta = await autenticacionService.iniciarSesion(credenciales);
        
        if (respuesta.data.exito) {
          this.token = respuesta.data.datos.token;
          this.usuario = respuesta.data.datos.usuario;
          
          // Guardar en localStorage
          localStorage.setItem('token', respuesta.data.datos.token);
          localStorage.setItem('usuario', JSON.stringify(respuesta.data.datos.usuario));
          
          return { exito: true, mensaje: respuesta.data.mensaje };
        }
        
        return { exito: false, mensaje: 'Error al iniciar sesión' };
      } catch (error) {
        this.error = error.response?.data?.mensaje || 'Error al iniciar sesión';
        return { exito: false, mensaje: this.error };
      } finally {
        this.cargando = false;
      }
    },

    // Cerrar sesión
    cerrarSesion() {
      this.usuario = null;
      this.token = null;
      this.error = null;
      
      // Limpiar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    },

    // Obtener perfil actualizado
    async obtenerPerfil() {
      try {
        const respuesta = await autenticacionService.obtenerPerfil();
        
        if (respuesta.data.exito) {
          this.usuario = respuesta.data.usuario;
          localStorage.setItem('usuario', JSON.stringify(respuesta.data.usuario));
          return { exito: true };
        }
        
        return { exito: false };
      } catch (error) {
        console.error('Error al obtener perfil:', error);
        return { exito: false };
      }
    },

    // Actualizar información del usuario en el store
    actualizarUsuario(datosUsuario) {
      this.usuario = { ...this.usuario, ...datosUsuario };
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
    }
  }
});
