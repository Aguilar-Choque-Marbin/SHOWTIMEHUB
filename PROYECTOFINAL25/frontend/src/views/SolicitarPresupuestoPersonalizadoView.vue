<template>
  <div class="relative flex min-h-screen w-full flex-col bg-black">
    <!-- Header -->
    <header class="sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 bg-black/80 px-4 py-3 backdrop-blur-sm sm:px-8 md:px-10 lg:px-20">
      <div class="flex items-center gap-4 text-white">
        <span class="material-symbols-outlined text-[#00BCD4] text-3xl">local_activity</span>
        <h1 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">ShowTime Hub</h1>
      </div>
      <div class="flex flex-1 items-center justify-end gap-3">
        <p class="hidden text-sm text-gray-300 sm:block">Solicitud para:</p>
        <div class="flex items-center gap-3">
          <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" :style="`background-image: url('${artistaInfo.foto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(artistaInfo.nombre_artistico) + '&background=00BCD4&color=000'}')`"></div>
          <p class="text-white font-bold">{{ artistaInfo.nombre_artistico }}</p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex flex-1 justify-center px-4 py-8 sm:py-12 md:py-16">
      <div class="flex w-full max-w-4xl flex-col gap-8">
        <div>
          <p class="text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72 text-center sm:text-left">
            Solicitar Presupuesto a {{ artistaInfo.nombre_artistico }}
          </p>
        </div>

        <form @submit.prevent="enviarSolicitud" class="flex w-full flex-col gap-10 rounded-xl bg-[#1A1A1A] p-6 sm:p-8">
          <!-- 1. Detalles del Evento -->
          <section>
            <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-4 border-b border-white/10 mb-6">
              1. Detalles del Evento
            </h3>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label class="flex flex-col min-w-40 flex-1">
                  <p class="text-gray-200 text-sm font-medium leading-normal pb-2">Tipo de Evento</p>
                  <div class="relative flex w-full flex-1 items-center">
                    <select 
                      v-model="formulario.tipo_evento"
                      class="form-select w-full min-w-0 flex-1 appearance-none overflow-hidden rounded-lg border border-white/20 bg-[#1A1A1A] p-3 pr-10 text-base font-normal leading-normal text-white placeholder:text-gray-400 focus:border-[#00BCD4] focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 h-12"
                      required
                    >
                      <option disabled value="">Selecciona un tipo de evento</option>
                      <option value="boda">Boda</option>
                      <option value="cumpleanos">Cumpleaños</option>
                      <option value="evento-corporativo">Evento Corporativo</option>
                      <option value="fiesta-privada">Fiesta Privada</option>
                      <option value="otro">Otro</option>
                    </select>
                    <span class="material-symbols-outlined absolute right-3 pointer-events-none text-gray-400">expand_more</span>
                  </div>
                </label>
              </div>
              <div>
                <label class="flex flex-col min-w-40 flex-1">
                  <p class="text-gray-200 text-sm font-medium leading-normal pb-2">Fecha y Hora del Evento</p>
                  <div class="relative flex w-full flex-1 items-center">
                    <input 
                      v-model="formulario.fecha_evento"
                      class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-white/20 bg-[#1A1A1A] focus:border-[#00BCD4] h-12 placeholder:text-gray-400 p-3 pr-10 text-base font-normal leading-normal [color-scheme:dark]" 
                      placeholder="Seleccionar fecha y hora" 
                      type="datetime-local"
                      required
                    />
                    <span class="material-symbols-outlined absolute right-3 text-gray-400 pointer-events-none">calendar_today</span>
                  </div>
                </label>
              </div>
              <div class="md:col-span-2">
                <label class="flex flex-col min-w-40 flex-1">
                  <p class="text-gray-200 text-sm font-medium leading-normal pb-2">Ubicación del Evento</p>
                  <div class="relative flex w-full flex-1 items-center">
                    <span class="material-symbols-outlined absolute left-3 text-gray-400">location_on</span>
                    <input 
                      v-model="formulario.ubicacion"
                      class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-white/20 bg-[#1A1A1A] focus:border-[#00BCD4] h-12 placeholder:text-gray-400 pl-10 p-3 text-base font-normal leading-normal" 
                      placeholder="Ej: Calle Falsa 123, Springfield"
                      required
                    />
                  </div>
                </label>
              </div>
            </div>
          </section>

          <!-- 2. Mensaje al Artista -->
          <section>
            <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-4 border-b border-white/10 mb-6">
              2. Mensaje al Artista
            </h3>
            <label class="flex flex-col min-w-40 flex-1">
              <p class="text-gray-200 text-sm font-medium leading-normal pb-2">Tu Mensaje</p>
              <textarea 
                v-model="formulario.mensaje"
                class="form-textarea w-full min-h-32 resize-y rounded-lg border border-white/20 bg-[#1A1A1A] p-3 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/50 focus:border-[#00BCD4]" 
                placeholder="Describe tu evento, número de invitados, necesidades especiales, estilo de música preferido, etc."
                required
              ></textarea>
            </label>
          </section>

          <!-- 3. Tus Datos de Contacto -->
          <section>
            <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-4 border-b border-white/10 mb-6">
              3. Tus Datos de Contacto
            </h3>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label class="flex flex-col min-w-40 flex-1">
                <p class="text-gray-200 text-sm font-medium leading-normal pb-2">Nombre Completo</p>
                <input 
                  v-model="formulario.nombre_completo"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-white/20 bg-[#1A1A1A] focus:border-[#00BCD4] h-12 placeholder:text-gray-400 p-3 text-base font-normal leading-normal" 
                  placeholder="Tu nombre y apellido"
                  required
                />
              </label>
              <label class="flex flex-col min-w-40 flex-1">
                <p class="text-gray-200 text-sm font-medium leading-normal pb-2">Correo Electrónico</p>
                <input 
                  v-model="formulario.email"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-white/20 bg-[#1A1A1A] focus:border-[#00BCD4] h-12 placeholder:text-gray-400 p-3 text-base font-normal leading-normal" 
                  placeholder="tu@email.com" 
                  type="email"
                  required
                />
              </label>
              <div class="md:col-span-2">
                <label class="flex flex-col min-w-40 flex-1">
                  <p class="text-gray-200 text-sm font-medium leading-normal pb-2">Teléfono (Opcional)</p>
                  <input 
                    v-model="formulario.telefono"
                    class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-white/20 bg-[#1A1A1A] focus:border-[#00BCD4] h-12 placeholder:text-gray-400 p-3 text-base font-normal leading-normal" 
                    placeholder="+1 (555) 123-4567" 
                    type="tel"
                  />
                </label>
              </div>
            </div>
          </section>

          <!-- Submit Section -->
          <section class="border-t border-white/10 pt-8 mt-4">
            <div class="flex flex-col items-center justify-center gap-6 sm:flex-row sm:justify-between sm:gap-4">
              <p class="text-sm text-gray-400 text-center sm:text-left max-w-md">
                Al enviar, aceptas nuestros Términos de Servicio. El artista recibirá tus datos para contactarte.
              </p>
              <button 
                type="submit"
                :disabled="enviando"
                class="flex w-full sm:w-auto max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-[#00BCD4] text-black gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 px-8 transition-transform duration-200 hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ enviando ? 'Enviando...' : 'Enviar Solicitud de Presupuesto' }}
              </button>
            </div>
          </section>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const artistaInfo = ref({
  nombre_artistico: '',
  foto: ''
})

const formulario = ref({
  tipo_evento: '',
  fecha_evento: '',
  ubicacion: '',
  mensaje: '',
  nombre_completo: '',
  email: '',
  telefono: ''
})

const enviando = ref(false)

onMounted(async () => {
  // Cargar información del artista
  const artistaId = route.params.artistaId

  try {
    // Cargar datos del artista
    const resArtista = await fetch(`http://localhost:3000/api/artistas/${artistaId}`)
    const dataArtista = await resArtista.json()
    artistaInfo.value = dataArtista

    // Pre-llenar datos del usuario si está autenticado
    if (authStore.usuario) {
      formulario.value.nombre_completo = authStore.usuario.nombre || ''
      formulario.value.email = authStore.usuario.email || ''
      formulario.value.telefono = authStore.usuario.telefono || ''
    }
  } catch (error) {
    console.error('Error cargando datos:', error)
  }
})

async function enviarSolicitud() {
  if (enviando.value) return

  enviando.value = true

  try {
    const response = await fetch('http://localhost:3000/api/contratos/solicitar-personalizado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify({
        artista_id: route.params.artistaId,
        tipo_evento: formulario.value.tipo_evento,
        fecha_evento: formulario.value.fecha_evento,
        ubicacion: formulario.value.ubicacion,
        mensaje: formulario.value.mensaje,
        nombre_contacto: formulario.value.nombre_completo,
        email_contacto: formulario.value.email,
        telefono_contacto: formulario.value.telefono
      })
    })

    if (response.ok) {
      alert('¡Solicitud enviada exitosamente! El artista te contactará pronto.')
      router.push('/dashboard')
    } else {
      throw new Error('Error al enviar la solicitud')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Hubo un error al enviar la solicitud. Por favor intenta nuevamente.')
  } finally {
    enviando.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  font-size: 24px;
}

* {
  font-family: 'Inter', sans-serif;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
