<template>
  <div class="min-h-screen bg-[#0d0d0d] text-white">
    <!-- Header -->
    <div class="bg-[#1a1a1a] border-b border-gray-800 py-6">
      <div class="container mx-auto px-4">
        <div class="flex items-center gap-4">
          <button @click="$router.back()" class="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 class="text-3xl font-bold">Mi Perfil</h1>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto space-y-6">
        <!-- Información Personal -->
        <div class="bg-[#1a1a1a] rounded-xl border border-gray-800 p-6">
          <h2 class="text-xl font-bold mb-6">Información Personal</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                v-model="perfil.email"
                type="email"
                disabled
                class="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Teléfono</label>
              <input
                v-model="perfil.telefono"
                type="tel"
                class="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00f5d4]"
                placeholder="+591 XXXXXXXX"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Tipo de Usuario</label>
              <div class="px-4 py-3 bg-[#0d0d0d] border border-gray-800 rounded-lg">
                <span :class="[
                  'px-3 py-1 rounded-full text-xs font-medium',
                  perfil.tipo_usuario === 'artista' ? 'bg-purple-500/20 text-purple-300' :
                  perfil.tipo_usuario === 'admin' ? 'bg-red-500/20 text-red-300' :
                  'bg-blue-500/20 text-blue-300'
                ]">
                  {{ perfil.tipo_usuario || 'cliente' }}
                </span>
              </div>
            </div>

            <div v-if="perfil.fecha_registro">
              <label class="block text-sm font-medium text-gray-400 mb-2">Miembro desde</label>
              <div class="px-4 py-3 bg-[#0d0d0d] border border-gray-800 rounded-lg text-gray-300">
                {{ formatearFecha(perfil.fecha_registro) }}
              </div>
            </div>
          </div>

          <div class="mt-6 flex gap-3">
            <button
              @click="guardarPerfil"
              :disabled="guardando"
              class="px-6 py-3 bg-[#00f5d4] text-black font-semibold rounded-lg hover:bg-[#00d4bb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ guardando ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
          </div>

          <div v-if="mensajeExito" class="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300">
            {{ mensajeExito }}
          </div>
        </div>

        <!-- Cambiar Contraseña -->
        <div class="bg-[#1a1a1a] rounded-xl border border-gray-800 p-6">
          <h2 class="text-xl font-bold mb-6">Cambiar Contraseña</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Contraseña Actual</label>
              <input
                v-model="cambioContrasena.actual"
                type="password"
                class="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00f5d4]"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Nueva Contraseña</label>
              <input
                v-model="cambioContrasena.nueva"
                type="password"
                class="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00f5d4]"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Confirmar Nueva Contraseña</label>
              <input
                v-model="cambioContrasena.confirmacion"
                type="password"
                class="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00f5d4]"
              />
            </div>
          </div>

          <button
            @click="cambiarContrasena"
            :disabled="cambiandoContrasena"
            class="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ cambiandoContrasena ? 'Cambiando...' : 'Cambiar Contraseña' }}
          </button>

          <div v-if="mensajeContrasena" class="mt-4 p-4 rounded-lg" :class="[
            mensajeContrasena.includes('exitosamente') ? 'bg-green-500/20 border border-green-500/30 text-green-300' : 'bg-red-500/20 border border-red-500/30 text-red-300'
          ]">
            {{ mensajeContrasena }}
          </div>
        </div>

        <!-- Zona de Peligro -->
        <div class="bg-[#1a1a1a] rounded-xl border border-red-900/50 p-6">
          <h2 class="text-xl font-bold mb-4 text-red-400">Zona de Peligro</h2>
          <p class="text-gray-400 mb-4">Una vez eliminada tu cuenta, no podrás recuperarla.</p>
          <button
            @click="confirmarEliminacion"
            class="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Eliminar Cuenta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const perfil = ref({
  email: '',
  telefono: '',
  tipo_usuario: '',
  fecha_registro: ''
});

const cambioContrasena = ref({
  actual: '',
  nueva: '',
  confirmacion: ''
});

const guardando = ref(false);
const cambiandoContrasena = ref(false);
const mensajeExito = ref('');
const mensajeContrasena = ref('');

const cargarPerfil = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/usuarios/perfil', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      perfil.value = data.datos;
    }
  } catch (error) {
    console.error('Error al cargar perfil:', error);
    // Usar datos del authStore como fallback
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    perfil.value = {
      email: usuario.email || authStore.emailUsuario,
      telefono: usuario.telefono || '',
      tipo_usuario: usuario.tipo_usuario || 'cliente',
      fecha_registro: usuario.fecha_registro || usuario.created_at
    };
  }
};

const guardarPerfil = async () => {
  guardando.value = true;
  mensajeExito.value = '';

  try {
    const response = await fetch('http://localhost:3000/api/usuarios/perfil', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        telefono: perfil.value.telefono
      })
    });

    if (response.ok) {
      mensajeExito.value = 'Perfil actualizado exitosamente';
      setTimeout(() => mensajeExito.value = '', 3000);
    }
  } catch (error) {
    console.error('Error al guardar perfil:', error);
  } finally {
    guardando.value = false;
  }
};

const cambiarContrasena = async () => {
  mensajeContrasena.value = '';

  if (cambioContrasena.value.nueva !== cambioContrasena.value.confirmacion) {
    mensajeContrasena.value = 'Las contraseñas no coinciden';
    return;
  }

  if (cambioContrasena.value.nueva.length < 6) {
    mensajeContrasena.value = 'La contraseña debe tener al menos 6 caracteres';
    return;
  }

  cambiandoContrasena.value = true;

  try {
    const response = await fetch('http://localhost:3000/api/usuarios/cambiar-contrasena', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contrasenaActual: cambioContrasena.value.actual,
        contrasenaNueva: cambioContrasena.value.nueva
      })
    });

    if (response.ok) {
      mensajeContrasena.value = 'Contraseña cambiada exitosamente';
      cambioContrasena.value = { actual: '', nueva: '', confirmacion: '' };
    } else {
      const data = await response.json();
      mensajeContrasena.value = data.mensaje || 'Error al cambiar contraseña';
    }
  } catch (error) {
    mensajeContrasena.value = 'Error al cambiar contraseña';
  } finally {
    cambiandoContrasena.value = false;
  }
};

const confirmarEliminacion = () => {
  if (confirm('¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
    eliminarCuenta();
  }
};

const eliminarCuenta = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/usuarios/perfil', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      authStore.cerrarSesion();
      router.push('/login');
    }
  } catch (error) {
    console.error('Error al eliminar cuenta:', error);
  }
};

const formatearFecha = (fecha) => {
  if (!fecha) return 'N/A';
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

onMounted(() => {
  cargarPerfil();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
}
</style>
