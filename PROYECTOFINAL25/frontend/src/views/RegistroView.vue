<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col bg-[#0A0A0A] overflow-x-hidden">
    <div class="layout-container flex h-full grow flex-col">
      <div class="grid flex-1 grid-cols-1 lg:grid-cols-2">
        <!-- Imagen lateral - solo visible en desktop -->
        <div class="relative hidden lg:block">
          <img
            alt="Fondo de entretenimiento"
            class="absolute inset-0 h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUF5Bpsseg9LpSVxqpep_lzobAVGHujXsL4Qv4MZa9MlKPf3yxeHFvuGGOG2cYXJ_MkWUW5CwQRblZZPhiGqaNn4Q5fJmNdThWMHdzWcl9UkIZ9z3HNyi4VjNY1yucJUVN4yjXsXaOdH5Upd4ACJ1vLtVYVjq84Pb0Y6hGcXok4FyzD5L-pcatlNEDxqkXjPOzbaTeKQH2zTokBziuUvQ8EORb7-419T6Aelv0fYW5OR2hkRhJB2fWy5me_4GsXX5KrVLkchj2-Q"
          />
          <div class="absolute inset-0 bg-black/70"></div>
        </div>

        <!-- Formulario de Registro -->
        <div class="flex flex-1 items-start justify-center py-2 sm:px-6 lg:px-8">
          <div class="layout-content-container flex flex-col w-full max-w-md flex-1">
            <!-- Header para todas las pantallas -->
            <header class="flex items-center justify-center whitespace-nowrap px-4 py-1 sm:px-0 mb-3">
              <div class="flex flex-col items-center gap-2 text-white">
                <div class="flex items-center gap-3">
                  <div class="size-7 text-[#00BCD4]">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fill-rule="evenodd"></path>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold tracking-tight">ShowTime Hub</h2>
                </div>
              </div>
            </header>

            <main class="flex flex-col flex-1 px-4 sm:px-0">
              <div class="text-center mb-6">
                <h1 class="text-white text-3xl font-bold tracking-tight">Crea Tu Cuenta</h1>
                <p class="text-slate-400 mt-2">Únete a nuestra comunidad de artistas y clientes.</p>
              </div>

              <form @submit.prevent="handleRegistro" class="space-y-5">
                <!-- Nombre Completo -->
                <div class="flex flex-col">
                  <label class="text-white text-sm font-medium leading-normal pb-2" for="full-name">
                    Nombre Completo
                  </label>
                  <input
                    v-model="formulario.nombre"
                    autocomplete="name"
                    class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-gray-700 bg-gray-900/50 focus:border-[#00BCD4] h-12 placeholder:text-gray-500 p-3 text-base font-normal leading-normal"
                    id="full-name"
                    name="full-name"
                    placeholder="Ingresa tu nombre completo"
                    required
                    type="text"
                  />
                </div>

                <!-- Correo Electrónico -->
                <div class="flex flex-col">
                  <label class="text-white text-sm font-medium leading-normal pb-2" for="email">
                    Correo Electrónico
                  </label>
                  <input
                    v-model="formulario.email"
                    autocomplete="email"
                    class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-gray-700 bg-gray-900/50 focus:border-[#00BCD4] h-12 placeholder:text-gray-500 p-3 text-base font-normal leading-normal"
                    id="email"
                    name="email"
                    placeholder="tucorreo@ejemplo.com"
                    required
                    type="email"
                  />
                </div>

                <!-- Contraseña -->
                <div class="flex flex-col">
                  <label class="text-white text-sm font-medium leading-normal pb-2" for="password">
                    Contraseña
                  </label>
                  <div class="relative flex w-full flex-1 items-stretch">
                    <input
                      v-model="formulario.contrasena"
                      autocomplete="new-password"
                      :type="mostrarContrasena ? 'text' : 'password'"
                      class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-gray-700 bg-gray-900/50 focus:border-[#00BCD4] focus:z-10 h-12 placeholder:text-gray-500 p-3 pr-10 text-base font-normal leading-normal"
                      id="password"
                      name="password"
                      placeholder="Ingresa tu contraseña"
                      required
                      minlength="8"
                    />
                    <button
                      @click="mostrarContrasena = !mostrarContrasena"
                      aria-label="Toggle password visibility"
                      class="absolute inset-y-0 right-0 flex items-center pr-3 z-20 text-gray-500 hover:text-white"
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
                  <p class="text-xs text-gray-500 mt-2">Debe tener al menos 8 caracteres.</p>
                </div>

                <!-- Confirmar Contraseña -->
                <div class="flex flex-col">
                  <label class="text-white text-sm font-medium leading-normal pb-2" for="confirm-password">
                    Confirmar Contraseña
                  </label>
                  <div class="relative flex w-full flex-1 items-stretch">
                    <input
                      v-model="formulario.confirmarContrasena"
                      autocomplete="new-password"
                      :type="mostrarConfirmarContrasena ? 'text' : 'password'"
                      :class="[
                        'form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:z-10 h-12 placeholder:text-gray-500 p-3 pr-10 text-base font-normal leading-normal',
                        errorConfirmacion ? 'focus:ring-2 focus:ring-red-500/50 border border-red-500 bg-gray-900/50 focus:border-red-500' : 'focus:ring-2 focus:ring-[#00BCD4]/50 border border-gray-700 bg-gray-900/50 focus:border-[#00BCD4]'
                      ]"
                      id="confirm-password"
                      name="confirm-password"
                      placeholder="Vuelve a ingresar tu contraseña"
                      required
                      @blur="validarConfirmacion"
                    />
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 z-20">
                      <button
                        v-if="!errorConfirmacion"
                        @click="mostrarConfirmarContrasena = !mostrarConfirmarContrasena"
                        type="button"
                        class="text-gray-500 hover:text-white"
                      >
                        <svg v-if="!mostrarConfirmarContrasena" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      </button>
                      <svg v-else class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p v-if="errorConfirmacion" class="text-xs text-red-500 mt-2">Las contraseñas no coinciden.</p>
                </div>

                <!-- Mensaje de error general -->
                <div v-if="error" class="p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-sm">
                  {{ error }}
                </div>

                <!-- Botón de registro -->
                <div>
                  <button
                    type="submit"
                    :disabled="authStore.cargando || errorConfirmacion"
                    class="flex w-full items-center justify-center rounded-lg bg-[#00BCD4] h-12 px-6 text-base font-semibold text-[#0A0A0A] shadow-sm hover:bg-[#00D4EF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BCD4] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span v-if="authStore.cargando">Creando cuenta...</span>
                    <span v-else>Crear Cuenta</span>
                  </button>
                </div>
              </form>

              <div class="mt-8 text-center">
                <p class="text-sm text-slate-400">
                  Al registrarte, aceptas nuestros
                  <a class="font-medium text-[#00BCD4] hover:underline" href="#">Términos</a> y
                  <a class="font-medium text-[#00BCD4] hover:underline" href="#">Política de Privacidad</a>.
                </p>
                <p class="mt-4 text-sm text-slate-400">
                  ¿Ya tienes una cuenta?
                  <router-link to="/login" class="font-medium text-[#00BCD4] hover:underline">
                    Iniciar Sesión
                  </router-link>
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const formulario = ref({
  nombre: 'Usuario Test',
  email: `test${Date.now()}@ejemplo.com`,
  contrasena: 'password123',
  confirmarContrasena: 'password123'
});

const error = ref('');
const errorConfirmacion = ref(false);
const mostrarContrasena = ref(false);
const mostrarConfirmarContrasena = ref(false);

const validarConfirmacion = () => {
  if (formulario.value.confirmarContrasena && formulario.value.contrasena !== formulario.value.confirmarContrasena) {
    errorConfirmacion.value = true;
  } else {
    errorConfirmacion.value = false;
  }
};

const handleRegistro = async () => {
  error.value = '';
  validarConfirmacion();

  if (errorConfirmacion.value) {
    error.value = 'Las contraseñas no coinciden';
    return;
  }

  if (formulario.value.contrasena.length < 8) {
    error.value = 'La contraseña debe tener al menos 8 caracteres';
    return;
  }

  const datosRegistro = {
    email: formulario.value.email,
    contrasena: formulario.value.contrasena,
    nombre: formulario.value.nombre,
    tipo_usuario: 'pendiente' // Tipo pendiente hasta que seleccione
  };

  const resultado = await authStore.registrar(datosRegistro);

  if (resultado.exito) {
    // Redirigir a selección de rol
    router.push('/seleccion-rol');
  } else {
    error.value = resultado.mensaje || 'Error al crear la cuenta';
  }
};
</script>
