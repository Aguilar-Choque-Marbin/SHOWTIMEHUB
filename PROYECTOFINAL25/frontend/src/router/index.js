import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: () => import('@/views/InicioView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresAuth: false, hideForAuth: true }
    },
    {
      path: '/registro',
      name: 'registro',
      component: () => import('@/views/RegistroView.vue'),
      meta: { requiresAuth: false, hideForAuth: true }
    },
    {
      path: '/recuperar-contrasena',
      name: 'recuperar-contrasena',
      component: () => import('@/views/RecuperarContrasenaView.vue'),
      meta: { requiresAuth: false, hideForAuth: true }
    },
    {
      path: '/restablecer-contrasena',
      name: 'restablecer-contrasena',
      component: () => import('@/views/RestablecerContrasenaView.vue'),
      meta: { requiresAuth: false, hideForAuth: true }
    },
    {
      path: '/seleccion-rol',
      name: 'seleccion-rol',
      component: () => import('@/views/SeleccionRolView.vue'),
      meta: { requiresAuth: false, hideForAuth: true }
    },
    {
      path: '/registro-artista',
      name: 'registro-artista',
      component: () => import('@/views/RegistroArtistaView.vue'),
      meta: { requiresAuth: false, hideForAuth: true }
    },
    {
      path: '/artistas',
      name: 'artistas',
      component: () => import('@/views/ArtistasView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/artistas/:id',
      name: 'artista-detalle',
      component: () => import('@/views/ArtistaDetalleView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/solicitar-presupuesto/:artistaId/:servicioId',
      name: 'solicitar-presupuesto',
      component: () => import('@/views/SolicitarPresupuestoView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/solicitar-presupuesto-personalizado/:artistaId',
      name: 'solicitar-presupuesto-personalizado',
      component: () => import('@/views/SolicitarPresupuestoPersonalizadoView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/responder-solicitud/:solicitudId',
      name: 'responder-solicitud',
      component: () => import('@/views/ResponderSolicitudView.vue'),
      meta: { requiresAuth: true, roles: ['artista'] }
    },
    {
      path: '/propuesta-enviada/:solicitudId',
      name: 'propuesta-enviada',
      component: () => import('@/views/PropuestaEnviadaView.vue'),
      meta: { requiresAuth: true, roles: ['artista'] }
    },
    {
      path: '/proceso-pago/:propuestaId',
      name: 'proceso-pago',
      component: () => import('@/views/ProcesoPagoView.vue'),
      meta: { requiresAuth: true, roles: ['cliente', 'usuario'] }
    },
    {
      path: '/pago-qr/:propuestaId',
      name: 'pago-qr',
      component: () => import('@/views/PagoQRView.vue'),
      meta: { requiresAuth: true, roles: ['cliente', 'usuario'] }
    },
    {
      path: '/reserva-confirmada/:contratoId',
      name: 'reserva-confirmada',
      component: () => import('@/views/ReservaConfirmadaView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('@/views/PerfilView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardUsuarioView.vue'),
      meta: { requiresAuth: true, roles: ['cliente', 'usuario'] }
    },
    {
      path: '/dashboard-usuario',
      name: 'dashboard-usuario',
      component: () => import('@/views/DashboardUsuarioView.vue'),
      meta: { requiresAuth: true, roles: ['cliente', 'usuario'] }
    },
    {
      path: '/dashboard-artista',
      name: 'dashboard-artista',
      component: () => import('@/views/DashboardArtistaView.vue'),
      meta: { requiresAuth: true, roles: ['artista'] }
    },
    {
      path: '/dashboard-admin',
      name: 'dashboard-admin',
      component: () => import('@/views/DashboardAdminView.vue'),
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/cotizaciones',
      name: 'cotizaciones',
      component: () => import('@/views/CotizacionesView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/contratos',
      name: 'contratos',
      component: () => import('@/views/ContratosView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: () => import('@/views/FavoritosView.vue'),
      meta: { requiresAuth: true, roles: ['cliente', 'usuario'] }
    },
    {
      path: '/historial-pagos',
      name: 'historial-pagos',
      component: () => import('@/views/HistorialPagosView.vue'),
      meta: { requiresAuth: true, roles: ['cliente', 'usuario'] }
    },
    {
      path: '/ayuda',
      name: 'ayuda',
      component: () => import('@/views/AyudaView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'no-encontrado',
      component: () => import('@/views/NoEncontradoView.vue')
    }
  ]
});

// Guard de navegación global
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Inicializar el store desde localStorage si no está cargado
  if (!authStore.token && localStorage.getItem('token')) {
    authStore.inicializar();
  }
  
  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth && !authStore.estaAutenticado) {
    next({ name: 'login', query: { redirect: to.fullPath } });
    return;
  }
  
  // Redirigir si el usuario autenticado intenta acceder a login/registro
  if (to.meta.hideForAuth && authStore.estaAutenticado) {
    next({ name: 'inicio' });
    return;
  }
  
  // Verificar roles si están especificados
  if (to.meta.roles && authStore.estaAutenticado) {
    const tieneRol = to.meta.roles.includes(authStore.usuario.tipo_usuario);
    
    if (!tieneRol) {
      // Redirigir al dashboard apropiado según el rol
      if (authStore.esAdmin) {
        next({ name: 'dashboard-admin' });
      } else if (authStore.esArtista) {
        next({ name: 'dashboard-artista' });
      } else {
        next({ name: 'dashboard' });
      }
      return;
    }
  }
  
  next();
});

export default router;
