<template>
  <div class="grid min-h-screen w-full lg:grid-cols-2 bg-[#101010]">
    <!-- Imagen lateral - solo visible en desktop -->
    <div class="relative hidden lg:block">
      <img
        alt="Artista en un escenario iluminado"
        class="absolute inset-0 h-full w-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxQ9ynIEAV3dLSW0JBuM9LubYtunTpgaxn-HBvwWW54tjm2Ndvd0uWNl9MsdgsTwQf-AGYh2QNmhVGR5CIkPhZ4ND6wOxCEBlgy9AhC5NgoQl0YjJz9roZJZqHXJMljd6AmZKW3j6af_u42GdpJUc7w8R6-F8__Wwf23oc1KZumpDlzs56Xe7ahEaSLkPswpA7Qo5wiU3edL96k1WZLdhwsTFpjVaxZ6Gu4L1wU5WqkZJhOVG6I7EP_y1j6al1HGasLkfeMIQg1A"
      />
      <div class="absolute inset-0 bg-black/60"></div>
    </div>

    <!-- Formulario de Login -->
    <div class="flex flex-col items-center justify-center p-4 sm:p-8">
      <div class="w-full max-w-md">
        <!-- Header -->
        <div class="flex flex-col items-center text-center">
          <div class="flex items-center gap-3 text-white">
            <div class="size-8 text-[#00BCD4]">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill-rule="evenodd"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold tracking-tight">ShowTime Hub</h2>
          </div>
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-white pt-8 pb-2">
            Bienvenido de Nuevo
          </h1>
          <p class="text-base font-normal leading-normal text-gray-400">
            Inicia sesión en tu cuenta para continuar
          </p>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleLogin" class="space-y-6 pt-8">
          <div>
            <label class="flex flex-col flex-1">
              <p class="text-sm font-medium text-gray-300 pb-2">Correo Electrónico</p>
              <input
                v-model="formulario.email"
                type="email"
                required
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-gray-900/50 text-gray-100 placeholder:text-gray-500 border border-gray-700 focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/30 h-12 px-4 py-2 text-base font-normal leading-normal"
                placeholder="tu_nombre@ejemplo.com"
              />
            </label>
          </div>

          <div>
            <label class="flex flex-col flex-1">
              <div class="flex justify-between items-center pb-2">
                <p class="text-sm font-medium text-gray-300">Contraseña</p>
                <router-link to="/recuperar-contrasena" class="text-sm font-medium text-[#00BCD4] hover:underline">
                  ¿Olvidaste la Contraseña?
                </router-link>
              </div>
              <div class="relative flex w-full flex-1 items-stretch">
                <input
                  v-model="formulario.contrasena"
                  :type="mostrarContrasena ? 'text' : 'password'"
                  required
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-gray-900/50 text-gray-100 placeholder:text-gray-500 border border-gray-700 focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/30 h-12 pl-4 pr-10 py-2 text-base font-normal leading-normal"
                  placeholder="Ingresa tu contraseña"
                />
                <button
                  @click="mostrarContrasena = !mostrarContrasena"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#00BCD4]"
                  type="button"
                >
                  <svg v-if="!mostrarContrasena" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </label>
          </div>

          <div v-if="error" class="p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-sm">
            {{ error }}
          </div>

          <div>
            <button
              type="submit"
              :disabled="authStore.cargando"
              class="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-[#00BCD4] text-[#0A0A0A] text-base font-bold leading-normal tracking-wide shadow-sm hover:bg-[#00D4EF] focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2 focus:ring-offset-[#101010] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="authStore.cargando">Cargando...</span>
              <span v-else class="truncate">Iniciar Sesión</span>
            </button>
          </div>
        </form>

        <!-- Divisor -->
        <div class="relative py-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-700"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-[#101010] px-2 text-gray-400">O continúa con</span>
          </div>
        </div>

        <!-- Botones sociales -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            class="flex h-12 w-full items-center justify-center rounded-lg border border-gray-700 bg-gray-900/50 px-4 text-sm font-medium text-white hover:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#101010]"
          >
            <svg class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar con Google
          </button>

          <button
            type="button"
            class="flex h-12 w-full items-center justify-center rounded-lg border border-gray-700 bg-gray-900/50 px-4 text-sm font-medium text-white hover:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#101010]"
          >
            <svg class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h5.699c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z"/>
            </svg>
            Continuar con Facebook
          </button>
        </div>

        <!-- Footer -->
        <div class="pt-8 text-center">
          <p class="text-sm text-gray-400">
            ¿No tienes una cuenta?
            <router-link to="/registro" class="font-medium text-[#00BCD4] hover:underline">
              Regístrate
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const formulario = ref({
  email: '',
  contrasena: ''
});

const error = ref('');
const mostrarContrasena = ref(false);

const handleLogin = async () => {
  error.value = '';
  
  const resultado = await authStore.iniciarSesion(formulario.value);
  
  if (resultado.exito) {
    // Redirigir según el tipo de usuario
    if (authStore.esAdmin) {
      router.push('/dashboard-admin');
    } else if (authStore.esArtista) {
      router.push('/dashboard-artista');
    } else {
      // Usuario tipo cliente
      router.push('/dashboard-usuario');
    }
  } else {
    error.value = resultado.mensaje;
  }
};
</script>
