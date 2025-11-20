import axios from 'axios';

// Configuración base de axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token JWT a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de error
      switch (error.response.status) {
        case 401:
          // Token inválido o expirado
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
          window.location.href = '/login';
          break;
        case 403:
          console.error('No tienes permisos para realizar esta acción');
          break;
        case 404:
          console.error('Recurso no encontrado');
          break;
        case 500:
          console.error('Error en el servidor');
          break;
      }
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      console.error('No se pudo conectar con el servidor');
    }
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const autenticacionService = {
  registrar: (datos) => api.post('/autenticacion/registrar', datos),
  iniciarSesion: (datos) => api.post('/autenticacion/iniciar-sesion', datos),
  obtenerPerfil: () => api.get('/autenticacion/perfil')
};

// Servicios de usuarios
export const usuarioService = {
  obtenerPerfil: (id) => api.get(`/usuarios/${id}`),
  actualizarPerfil: (id, datos) => api.put(`/usuarios/${id}`, datos),
  cambiarContrasena: (id, datos) => api.put(`/usuarios/${id}/contrasena`, datos),
  eliminarCuenta: (id) => api.delete(`/usuarios/${id}`)
};

// Servicios de artistas
export const artistaService = {
  listar: (params) => api.get('/artistas', { params }),
  obtenerPorId: (id) => api.get(`/artistas/${id}`),
  obtenerDetalle: (id) => api.get(`/artistas/${id}`),
  registrarArtista: (datos) => api.post('/artistas', datos),
  actualizarPerfil: (id, datos) => api.put(`/artistas/${id}`, datos),
  obtenerServicios: (id) => api.get(`/artistas/${id}/servicios`),
  agregarServicio: (id, datos) => api.post(`/artistas/${id}/servicios`, datos),
  actualizarServicio: (idArtista, idServicio, datos) => 
    api.put(`/artistas/${idArtista}/servicios/${idServicio}`, datos),
  eliminarServicio: (idArtista, idServicio) => 
    api.delete(`/artistas/${idArtista}/servicios/${idServicio}`),
  obtenerPortafolio: (id) => api.get(`/artistas/${id}/portafolio`),
  obtenerGaleria: (id) => api.get(`/artistas/${id}/portafolio`),
  agregarTrabajoPortafolio: (id, datos) => api.post(`/artistas/${id}/portafolio`, datos),
  eliminarTrabajoPortafolio: (idArtista, idTrabajo) => 
    api.delete(`/artistas/${idArtista}/portafolio/${idTrabajo}`),
  obtenerResenas: (id) => api.get(`/artistas/${id}/calificaciones`)
};

// Servicios de categorías
export const categoriaService = {
  listar: () => api.get('/categorias'),
  obtener: (id) => api.get(`/categorias/${id}`)
};

// Servicios de cotizaciones
export const cotizacionService = {
  crear: (datos) => api.post('/cotizaciones', datos),
  listar: () => api.get('/cotizaciones'),
  obtener: (id) => api.get(`/cotizaciones/${id}`),
  actualizar: (id, datos) => api.put(`/cotizaciones/${id}`, datos),
  cambiarEstado: (id, estado) => api.patch(`/cotizaciones/${id}/estado`, { estado })
};

// Servicios de calificaciones
export const calificacionService = {
  crear: (datos) => api.post('/calificaciones', datos),
  listarPorArtista: (idArtista) => api.get(`/calificaciones/artista/${idArtista}`),
  actualizar: (id, datos) => api.put(`/calificaciones/${id}`, datos),
  eliminar: (id) => api.delete(`/calificaciones/${id}`)
};

// Servicios de favoritos
export const favoritoService = {
  listar: () => api.get('/favoritos'),
  agregar: (datos) => api.post('/favoritos', datos),
  eliminar: (idArtista) => api.delete(`/favoritos/${idArtista}`),
  verificar: (idArtista) => api.get(`/favoritos/verificar/${idArtista}`)
};

// Servicios de contratos
export const contratoService = {
  crear: (datos) => api.post('/contratos', datos),
  listar: () => api.get('/contratos'),
  obtener: (id) => api.get(`/contratos/${id}`),
  actualizar: (id, datos) => api.put(`/contratos/${id}`, datos),
  cambiarEstado: (id, estado) => api.patch(`/contratos/${id}/estado`, { estado })
};

// Servicios de pagos
export const pagoService = {
  crear: (datos) => api.post('/pagos', datos),
  listar: () => api.get('/pagos'),
  obtener: (id) => api.get(`/pagos/${id}`),
  confirmar: (id, datos) => api.patch(`/pagos/${id}/confirmar`, datos)
};

// Servicios de administración
export const adminService = {
  obtenerEstadisticas: () => api.get('/admin/estadisticas'),
  listarUsuarios: (params) => api.get('/admin/usuarios', { params }),
  actualizarUsuario: (id, datos) => api.put(`/admin/usuarios/${id}`, datos),
  eliminarUsuario: (id) => api.delete(`/admin/usuarios/${id}`),
  listarArtistas: (params) => api.get('/admin/artistas', { params }),
  aprobarArtista: (id) => api.patch(`/admin/artistas/${id}/aprobar`),
  rechazarArtista: (id, datos) => api.patch(`/admin/artistas/${id}/rechazar`, datos),
  listarCotizaciones: (params) => api.get('/admin/cotizaciones', { params }),
  listarContratos: (params) => api.get('/admin/contratos', { params }),
  listarPagos: (params) => api.get('/admin/pagos', { params })
};

export default api;
