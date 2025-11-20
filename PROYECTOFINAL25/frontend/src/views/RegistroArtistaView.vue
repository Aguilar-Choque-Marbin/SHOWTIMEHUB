<template>
  <div class="relative flex min-h-screen w-full items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#0A0A0A]">
    <div class="w-full max-w-2xl">
      <!-- Logo -->
      <div class="flex justify-center items-center gap-2 pb-8">
        <div class="size-8 text-[#00BCD4]">
          <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill-rule="evenodd"></path>
          </svg>
        </div>
        <span class="text-2xl font-bold text-white">ShowTime Hub</span>
      </div>

      <!-- Card -->
      <div class="bg-[#1A1A1A] p-6 sm:p-8 lg:p-10 rounded-xl shadow-lg border border-[#2C2C2C]">
        <div class="flex flex-col gap-8">
          <!-- Título -->
          <div class="flex flex-wrap justify-between gap-2">
            <h1 class="text-white text-3xl sm:text-4xl font-black tracking-tighter">
              Regístrate como Artista - ¡Casi listo para brillar!
            </h1>
          </div>

          <!-- Mensajes -->
          <div v-if="mensajeError" class="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
            {{ mensajeError }}
          </div>

          <div v-if="mensajeExito" class="bg-green-900/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg">
            {{ mensajeExito }}
          </div>

          <!-- Formulario -->
          <form @submit.prevent="registrarArtista" class="flex flex-col gap-6">
            <!-- Nombre y Nombre Artístico -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label class="flex flex-col flex-1">
                <p class="text-gray-300 text-sm font-medium leading-normal pb-2">Nombre Completo</p>
                <input 
                  v-model="formulario.nombre"
                  required
                  class="form-input flex w-full resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-[#2C2C2C] bg-[#0A0A0A] focus:border-[#00BCD4] h-12 placeholder:text-gray-500 px-4 text-base font-normal" 
                  placeholder="Ingresa tu nombre completo"
                />
              </label>
              <label class="flex flex-col flex-1">
                <p class="text-gray-300 text-sm font-medium leading-normal pb-2">Nombre Artístico/Escénico</p>
                <input 
                  v-model="formulario.nombre_artistico"
                  required
                  class="form-input flex w-full resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-[#2C2C2C] bg-[#0A0A0A] focus:border-[#00BCD4] h-12 placeholder:text-gray-500 px-4 text-base font-normal" 
                  placeholder="p. ej., La Asombrosa Jane"
                />
              </label>
            </div>

            <!-- Email y Teléfono -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label class="flex flex-col flex-1">
                <p class="text-gray-300 text-sm font-medium leading-normal pb-2">Correo Electrónico de Contacto</p>
                <input 
                  v-model="formulario.email"
                  type="email"
                  required
                  class="form-input flex w-full resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-[#2C2C2C] bg-[#0A0A0A] focus:border-[#00BCD4] h-12 placeholder:text-gray-500 px-4 text-base font-normal" 
                  placeholder="tu@ejemplo.com"
                />
              </label>
              <label class="flex flex-col flex-1">
                <p class="text-gray-300 text-sm font-medium leading-normal pb-2">Número de Teléfono</p>
                <input 
                  v-model="formulario.telefono"
                  type="tel"
                  required
                  class="form-input flex w-full resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-[#2C2C2C] bg-[#0A0A0A] focus:border-[#00BCD4] h-12 placeholder:text-gray-500 px-4 text-base font-normal" 
                  placeholder="(123) 456-7890"
                />
              </label>
            </div>

            <!-- Contraseña -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label class="flex flex-col flex-1">
                <p class="text-gray-300 text-sm font-medium leading-normal pb-2">Contraseña</p>
                <input 
                  v-model="formulario.contrasena"
                  type="password"
                  required
                  minlength="6"
                  class="form-input flex w-full resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-[#2C2C2C] bg-[#0A0A0A] focus:border-[#00BCD4] h-12 placeholder:text-gray-500 px-4 text-base font-normal" 
                  placeholder="Mínimo 6 caracteres"
                />
              </label>
              <label class="flex flex-col flex-1">
                <p class="text-gray-300 text-sm font-medium leading-normal pb-2">Confirmar Contraseña</p>
                <input 
                  v-model="formulario.confirmarContrasena"
                  type="password"
                  required
                  minlength="6"
                  class="form-input flex w-full resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-[#2C2C2C] bg-[#0A0A0A] focus:border-[#00BCD4] h-12 placeholder:text-gray-500 px-4 text-base font-normal" 
                  placeholder="Repite tu contraseña"
                />
              </label>
            </div>

            <!-- Categoría y Ubicación -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label class="flex flex-col flex-1">
                <p class="text-gray-300 text-sm font-medium leading-normal pb-2">Tipo de Artista/Categoría Principal</p>
                <select 
                  v-model="formulario.categoria_id"
                  required
                  class="form-select flex w-full overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-[#2C2C2C] bg-[#0A0A0A] focus:border-[#00BCD4] h-12 placeholder:text-gray-500 px-4 text-base font-normal"
                >
                  <option value="" disabled>Selecciona una categoría</option>
                  <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nombre }}</option>
                </select>
              </label>
              <label class="flex flex-col flex-1">
                <p class="text-gray-300 text-sm font-medium leading-normal pb-2">Ubicación (Ciudad)</p>
                <input 
                  v-model="formulario.ciudad"
                  required
                  class="form-input flex w-full resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-[#2C2C2C] bg-[#0A0A0A] focus:border-[#00BCD4] h-12 placeholder:text-gray-500 px-4 text-base font-normal" 
                  placeholder="Ciudad"
                />
              </label>
            </div>

            <!-- Descripción -->
            <div class="grid grid-cols-1 gap-6">
              <label class="flex flex-col flex-1">
                <p class="text-gray-300 text-sm font-medium leading-normal pb-2">
                  Breve descripción de tus servicios <span class="text-gray-500">(Opcional)</span>
                </p>
                <textarea 
                  v-model="formulario.biografia"
                  class="form-textarea flex w-full resize-y overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-[#2C2C2C] bg-[#0A0A0A] focus:border-[#00BCD4] min-h-[80px] placeholder:text-gray-500 px-4 py-3 text-base font-normal" 
                  placeholder="Describe brevemente lo que ofreces..."
                ></textarea>
              </label>
            </div>

            <!-- Precios -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label class="flex flex-col flex-1">
                <p class="text-gray-300 text-sm font-medium leading-normal pb-2">
                  Precio Mínimo <span class="text-gray-500">(Opcional)</span>
                </p>
                <input 
                  v-model.number="formulario.precio_minimo"
                  type="number"
                  min="0"
                  step="0.01"
                  class="form-input flex w-full resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-[#2C2C2C] bg-[#0A0A0A] focus:border-[#00BCD4] h-12 placeholder:text-gray-500 px-4 text-base font-normal" 
                  placeholder="p. ej., 150"
                />
              </label>
              <label class="flex flex-col flex-1">
                <p class="text-gray-300 text-sm font-medium leading-normal pb-2">
                  Precio Máximo <span class="text-gray-500">(Opcional)</span>
                </p>
                <input 
                  v-model.number="formulario.precio_maximo"
                  type="number"
                  min="0"
                  step="0.01"
                  class="form-input flex w-full resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-[#2C2C2C] bg-[#0A0A0A] focus:border-[#00BCD4] h-12 placeholder:text-gray-500 px-4 text-base font-normal" 
                  placeholder="p. ej., 500"
                />
              </label>
            </div>

            <!-- Términos -->
            <div class="flex flex-col gap-4">
              <label class="flex items-center gap-3 cursor-pointer">
                <input 
                  v-model="formulario.aceptaTerminos"
                  type="checkbox"
                  required
                  class="form-checkbox h-5 w-5 rounded bg-[#0A0A0A] border-[#2C2C2C] text-[#00BCD4] focus:ring-[#00BCD4]/50"
                />
                <span class="text-gray-300 text-sm">
                  Acepto los <router-link to="/terminos" class="text-[#00BCD4] hover:underline">Términos y Condiciones</router-link>
                </span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input 
                  v-model="formulario.aceptaPrivacidad"
                  type="checkbox"
                  required
                  class="form-checkbox h-5 w-5 rounded bg-[#0A0A0A] border-[#2C2C2C] text-[#00BCD4] focus:ring-[#00BCD4]/50"
                />
                <span class="text-gray-300 text-sm">
                  Acepto la <router-link to="/privacidad" class="text-[#00BCD4] hover:underline">Política de Privacidad</router-link>
                </span>
              </label>
            </div>

            <!-- Botón -->
            <div class="pt-8 mt-8 border-t border-[#2C2C2C]">
              <button 
                :disabled="registrando"
                type="submit"
                class="flex items-center justify-center gap-2 w-full h-12 px-6 font-semibold text-sm rounded-lg bg-[#00BCD4] text-black hover:bg-[#00D4EF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!registrando">Completar Registro</span>
                <span v-else>Registrando...</span>
                <span v-if="!registrando">🚀</span>
              </button>
            </div>

            <div class="text-center">
              <p class="text-gray-400 text-sm">
                ¿Ya tienes cuenta? 
                <router-link to="/login" class="text-[#00BCD4] hover:underline">Inicia sesión aquí</router-link>
              </p>
            </div>
          </form>
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

const categorias = ref([]);
const registrando = ref(false);
const mensajeError = ref('');
const mensajeExito = ref('');

const formulario = ref({
  nombre: 'Juan Pérez',
  nombre_artistico: 'El Fantástico Juan',
  email: `artista${Date.now()}@ejemplo.com`,
  telefono: '71234567',
  contrasena: 'password123',
  confirmarContrasena: 'password123',
  categoria_id: '1',
  ciudad: 'La Paz',
  biografia: 'Artista profesional con más de 5 años de experiencia en eventos corporativos y privados. Especializado en música en vivo y entretenimiento.',
  precio_minimo: 500,
  precio_maximo: 2000,
  aceptaTerminos: true,
  aceptaPrivacidad: true
});

onMounted(async () => {
  try {
    const respuesta = await fetch('http://localhost:3000/api/categorias');
    const datos = await respuesta.json();
    if (datos.exito) {
      categorias.value = datos.datos;
    }
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
});

const registrarArtista = async () => {
  mensajeError.value = '';
  mensajeExito.value = '';

  // Validar contraseñas
  if (formulario.value.contrasena !== formulario.value.confirmarContrasena) {
    mensajeError.value = 'Las contraseñas no coinciden';
    return;
  }

  if (!formulario.value.aceptaTerminos || !formulario.value.aceptaPrivacidad) {
    mensajeError.value = 'Debes aceptar los términos y la política de privacidad';
    return;
  }

  registrando.value = true;

  try {
    // 1. Registrar usuario
    const respuestaUsuario = await fetch('http://localhost:3000/api/autenticacion/registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: formulario.value.nombre,
        apellido: '', // Los artistas pueden no tener apellido separado
        email: formulario.value.email,
        contrasena: formulario.value.contrasena,
        tipo_usuario: 'artista',
        telefono: formulario.value.telefono
      })
    });

    const datosUsuario = await respuestaUsuario.json();

    if (!datosUsuario.exito) {
      mensajeError.value = datosUsuario.mensaje || 'Error al registrar usuario';
      return;
    }

    // 2. Crear perfil de artista
    const token = datosUsuario.datos.token;
    
    const respuestaPerfil = await fetch('http://localhost:3000/api/artistas/perfil', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        nombre_artistico: formulario.value.nombre_artistico,
        biografia: formulario.value.biografia,
        ciudad: formulario.value.ciudad,
        pais: 'Bolivia',
        precio_minimo: formulario.value.precio_minimo,
        precio_maximo: formulario.value.precio_maximo
      })
    });

    const datosPerfil = await respuestaPerfil.json();

    if (!datosPerfil.exito) {
      mensajeError.value = 'Usuario creado pero error al crear perfil de artista';
      return;
    }

    // 3. Asignar categoría
    if (formulario.value.categoria_id) {
      await fetch('http://localhost:3000/api/artistas/servicios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          categoria_id: formulario.value.categoria_id,
          titulo_servicio: 'Servicio Principal',
          descripcion: formulario.value.biografia || 'Servicio de artista',
          esta_activo: true
        })
      });
    }

    mensajeExito.value = '¡Registro exitoso! Redirigiendo...';
    
    // Guardar token y redirigir
    localStorage.setItem('token', token);
    authStore.usuario = datosUsuario.datos.usuario;
    authStore.token = token;

    setTimeout(() => {
      router.push('/dashboard-artista');
    }, 2000);

  } catch (error) {
    console.error('Error al registrar artista:', error);
    mensajeError.value = 'Error al conectar con el servidor. Por favor, intenta de nuevo.';
  } finally {
    registrando.value = false;
  }
};
</script>
