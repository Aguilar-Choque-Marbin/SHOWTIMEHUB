<template>
  <div class="grid min-h-screen w-full lg:grid-cols-2">
    <!-- Imagen de fondo (solo visible en pantallas grandes) -->
    <div class="relative hidden lg:block">
      <img 
        alt="Artista en un escenario iluminado" 
        class="absolute inset-0 h-full w-full object-cover" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxQ9ynIEAV3dLSW0JBuM9LubYtunTpgaxn-HBvwWW54tjm2Ndvd0uWNl9MsdgsTwQf-AGYh2QNmhVGR5CIkPhZ4ND6wOxCEBlgy9AhC5NgoQl0YjJz9roZJZqHXJMljd6AmZKW3j6af_u42GdpJUc7w8R6-F8__Wwf23oc1KZumpDlzs56Xe7ahEaSLkPswpA7Qo5wiU3edL96k1WZLdhwsTFpjVaxZ6Gu4L1wU5WqkZJhOVG6I7EP_y1j6al1HGasLkfeMIQg1A"
      />
      <div class="absolute inset-0 bg-black/60"></div>
    </div>

    <!-- Formulario -->
    <div class="flex flex-col items-center justify-center p-4 sm:p-8 bg-[#0A0A0A]">
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
        </div>
        <div class="pt-8 text-center">
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-white pb-2">Restablece tu Contraseña</h1>
          <p class="text-base font-normal leading-normal text-gray-400 max-w-sm mx-auto">
            Crea una nueva contraseña segura para tu cuenta. Debe tener al menos 8 caracteres.
          </p>
        </div>

        <!-- Verificando token -->
        <div v-if="verificandoToken" class="flex flex-col items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BCD4]"></div>
          <p class="mt-4 text-gray-400">Verificando enlace...</p>
        </div>

        <!-- Token inválido -->
        <div v-else-if="tokenInvalido" class="pt-8">
          <div class="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-4">
            El enlace de recuperación es inválido o ha expirado.
          </div>
          <router-link 
            to="/recuperar-contrasena"
            class="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-[#00BCD4] text-[#0A0A0A] text-base font-bold leading-normal tracking-wide shadow-sm hover:bg-[#00D4EF]"
          >
            Solicitar nuevo enlace
          </router-link>
        </div>

        <!-- Formulario de nueva contraseña -->
        <form v-else @submit.prevent="restablecerContrasena" class="mt-8 space-y-6 text-left">
          <!-- Mensaje de éxito -->
          <div v-if="mensajeExito" class="bg-green-900/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg">
            {{ mensajeExito }}
          </div>

          <!-- Mensaje de error -->
          <div v-if="mensajeError" class="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
            {{ mensajeError }}
          </div>

          <div>
            <label class="flex flex-col flex-1">
              <p class="text-sm font-medium text-gray-300 pb-2">Nueva Contraseña</p>
              <div class="relative flex w-full flex-1 items-stretch">
                <input 
                  v-model="nuevaContrasena"
                  :type="mostrarContrasena ? 'text' : 'password'"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-gray-900/50 text-gray-100 placeholder:text-gray-500 border border-gray-700 focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/30 h-12 pl-4 pr-10 py-2 text-base font-normal leading-normal" 
                  placeholder="Mínimo 6 caracteres"
                  required
                  minlength="6"
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

          <div>
            <label class="flex flex-col flex-1">
              <p class="text-sm font-medium text-gray-300 pb-2">Confirmar Contraseña</p>
              <div class="relative flex w-full flex-1 items-stretch">
                <input 
                  v-model="confirmarContrasena"
                  :type="mostrarConfirmar ? 'text' : 'password'"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-gray-900/50 text-gray-100 placeholder:text-gray-500 border border-gray-700 focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/30 h-12 pl-4 pr-10 py-2 text-base font-normal leading-normal" 
                  placeholder="Confirma tu nueva contraseña"
                  required
                />
                <button
                  @click="mostrarConfirmar = !mostrarConfirmar"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#00BCD4]"
                  type="button"
                >
                  <svg v-if="!mostrarConfirmar" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          <div>
            <button 
              :disabled="restableciendo"
              class="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-[#00BCD4] text-[#0A0A0A] text-base font-bold leading-normal tracking-wide shadow-sm hover:bg-[#00D4EF] focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2 focus:ring-offset-[#0A0A0A] disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              <span v-if="!restableciendo" class="truncate">Restablecer Contraseña</span>
              <span v-else class="truncate">Restableciendo...</span>
            </button>
          </div>
        </form>

        <!-- Volver a login -->
        <div class="pt-8 text-center">
          <router-link 
            to="/login"
            class="text-sm font-medium text-[#00BCD4] hover:underline"
          >
            <span class="inline-flex items-center gap-1">
              <span>←</span>
              <span>Volver a Iniciar Sesión</span>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const token = ref('');
const emailUsuario = ref('');
const nuevaContrasena = ref('');
const confirmarContrasena = ref('');
const mostrarContrasena = ref(false);
const mostrarConfirmar = ref(false);
const verificandoToken = ref(true);
const tokenInvalido = ref(false);
const restableciendo = ref(false);
const mensajeExito = ref('');
const mensajeError = ref('');

onMounted(async () => {
  // Obtener el token de la URL
  token.value = route.query.token;
  
  if (!token.value) {
    tokenInvalido.value = true;
    verificandoToken.value = false;
    return;
  }

  // Verificar el token
  try {
    const respuesta = await fetch(`http://localhost:3000/api/autenticacion/verificar-token/${token.value}`);
    const datos = await respuesta.json();

    if (datos.exito) {
      emailUsuario.value = datos.email;
      tokenInvalido.value = false;
    } else {
      tokenInvalido.value = true;
    }
  } catch (error) {
    console.error('Error al verificar token:', error);
    tokenInvalido.value = true;
  } finally {
    verificandoToken.value = false;
  }
});

const restablecerContrasena = async () => {
  mensajeExito.value = '';
  mensajeError.value = '';

  // Validar que las contraseñas coincidan
  if (nuevaContrasena.value !== confirmarContrasena.value) {
    mensajeError.value = 'Las contraseñas no coinciden';
    return;
  }

  if (nuevaContrasena.value.length < 6) {
    mensajeError.value = 'La contraseña debe tener al menos 6 caracteres';
    return;
  }

  restableciendo.value = true;

  try {
    const respuesta = await fetch('http://localhost:3000/api/autenticacion/restablecer-contrasena', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token.value,
        nuevaContrasena: nuevaContrasena.value
      })
    });

    const datos = await respuesta.json();

    if (datos.exito) {
      mensajeExito.value = 'Contraseña restablecida exitosamente. Redirigiendo al login...';
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      mensajeError.value = datos.mensaje || 'Error al restablecer la contraseña';
    }
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    mensajeError.value = 'No se pudo conectar con el servidor. Por favor, intenta de nuevo.';
  } finally {
    restableciendo.value = false;
  }
};
</script>
