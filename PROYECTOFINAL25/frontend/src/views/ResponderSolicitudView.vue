<template>
  <div class="min-h-screen bg-[#0A0A0A] text-[#EAEAEA]">
    <!-- Header -->
    <header class="w-full border-b border-solid border-[#333333]">
      <div class="mx-auto flex max-w-7xl items-center justify-between whitespace-nowrap px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center gap-4 text-[#EAEAEA]">
          <div class="size-8 text-[#00BCD4]">
            <span class="material-symbols-outlined !text-[32px]">
              local_activity
            </span>
          </div>
          <h2 class="text-[#EAEAEA] text-xl font-bold leading-tight tracking-[-0.015em]">ShowTime Hub</h2>
        </div>
        <div class="flex items-center">
          <p class="text-[#A0A0A0] text-sm sm:text-base">
            Respondiendo a: <span class="text-[#EAEAEA] font-medium">{{ solicitud.nombre_contacto }}</span>
          </p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex h-full grow flex-col">
      <div class="flex flex-1 justify-center py-5 sm:px-6 lg:px-8">
        <div class="flex flex-col w-full max-w-4xl flex-1 px-4">
          <main class="flex flex-col gap-10 pt-8">
            
            <!-- Sección 1: Detalles de la Solicitud -->
            <section class="bg-[#1A1A1A] p-6 rounded-xl">
              <h2 class="text-[#EAEAEA] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-5">
                Detalles de la Solicitud
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-[25%_1fr] gap-x-6">
                
                <div class="col-span-1 md:col-span-2 grid md:grid-cols-subgrid border-t border-t-[#333333] py-5">
                  <p class="text-[#A0A0A0] text-sm font-normal leading-normal mb-1 md:mb-0">Tipo de Evento</p>
                  <p class="text-[#EAEAEA] text-sm font-normal leading-normal capitalize">{{ solicitud.tipo_evento || 'No especificado' }}</p>
                </div>

                <div class="col-span-1 md:col-span-2 grid md:grid-cols-subgrid border-t border-t-[#333333] py-5">
                  <p class="text-[#A0A0A0] text-sm font-normal leading-normal mb-1 md:mb-0">Fecha y Hora</p>
                  <p class="text-[#EAEAEA] text-sm font-normal leading-normal">{{ formatearFechaEvento(solicitud.fecha_evento) }}</p>
                </div>

                <div class="col-span-1 md:col-span-2 grid md:grid-cols-subgrid border-t border-t-[#333333] py-5">
                  <p class="text-[#A0A0A0] text-sm font-normal leading-normal mb-1 md:mb-0">Ubicación</p>
                  <p class="text-[#EAEAEA] text-sm font-normal leading-normal">{{ solicitud.ubicacion }}</p>
                </div>

                <div class="col-span-1 md:col-span-2 grid md:grid-cols-subgrid border-t border-t-[#333333] py-5">
                  <p class="text-[#A0A0A0] text-sm font-normal leading-normal mb-1 md:mb-0">Mensaje del Cliente</p>
                  <p class="text-[#EAEAEA] text-sm font-normal leading-normal">{{ solicitud.mensaje }}</p>
                </div>

              </div>
            </section>

            <!-- Sección 2: Crear Propuesta -->
            <section class="bg-[#1A1A1A] p-6 rounded-xl">
              <h2 class="text-[#EAEAEA] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-5">
                Crea tu Propuesta
              </h2>
              <form @submit.prevent="enviarPropuesta" class="flex flex-col gap-6">
                
                <!-- Precio -->
                <div>
                  <label class="block text-sm font-medium text-[#A0A0A0] mb-2" for="precio">
                    Precio Propuesto
                  </label>
                  <div class="relative">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span class="text-[#A0A0A0] sm:text-sm">€</span>
                    </div>
                    <input
                      v-model="propuesta.precio"
                      type="number"
                      step="0.01"
                      min="0"
                      id="precio"
                      name="precio"
                      required
                      placeholder="0.00"
                      class="block w-full rounded-lg border border-[#333333] bg-[#0A0A0A] py-2.5 pl-7 pr-3 text-[#EAEAEA] placeholder:text-[#A0A0A0]/50 focus:ring-2 focus:ring-inset focus:ring-[#00BCD4] focus:border-transparent sm:text-sm"
                    />
                  </div>
                </div>

                <!-- Servicios Incluidos -->
                <div>
                  <label class="block text-sm font-medium text-[#A0A0A0] mb-2" for="servicios">
                    Servicios Incluidos en la Propuesta
                  </label>
                  <textarea
                    v-model="propuesta.servicios_incluidos"
                    id="servicios"
                    name="servicios"
                    required
                    rows="4"
                    placeholder="Ej: Show de magia de 1 hora, trucos personalizados, interacción con invitados..."
                    class="block w-full rounded-lg border border-[#333333] bg-[#0A0A0A] py-2.5 px-3 text-[#EAEAEA] placeholder:text-[#A0A0A0]/50 focus:ring-2 focus:ring-inset focus:ring-[#00BCD4] focus:border-transparent sm:text-sm"
                  ></textarea>
                </div>

                <!-- Mensaje al Cliente -->
                <div>
                  <label class="block text-sm font-medium text-[#A0A0A0] mb-2" for="mensaje">
                    Mensaje al Cliente
                  </label>
                  <textarea
                    v-model="propuesta.mensaje"
                    id="mensaje"
                    name="mensaje"
                    required
                    rows="4"
                    :placeholder="`Añade un mensaje personal para ${solicitud.nombre_contacto}...`"
                    class="block w-full rounded-lg border border-[#333333] bg-[#0A0A0A] py-2.5 px-3 text-[#EAEAEA] placeholder:text-[#A0A0A0]/50 focus:ring-2 focus:ring-inset focus:ring-[#00BCD4] focus:border-transparent sm:text-sm"
                  ></textarea>
                </div>

                <!-- Botón Enviar -->
                <div class="flex justify-end pt-4">
                  <button
                    type="submit"
                    :disabled="enviando"
                    class="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-lg bg-[#00BCD4] px-8 py-3 text-sm font-semibold text-[#0A0A0A] shadow-sm hover:bg-[#00BCD4]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BCD4] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <span v-if="!enviando">Enviar Propuesta</span>
                    <span v-else class="flex items-center gap-2">
                      <span class="material-symbols-outlined animate-spin">refresh</span>
                      Enviando...
                    </span>
                  </button>
                </div>

              </form>
            </section>

          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const solicitudId = route.params.solicitudId

const solicitud = ref({
  solicitud_id: null,
  tipo_evento: '',
  fecha_evento: '',
  ubicacion: '',
  mensaje: '',
  nombre_contacto: '',
  email_contacto: '',
  telefono_contacto: ''
})

const propuesta = ref({
  precio: '',
  servicios_incluidos: '',
  mensaje: ''
})

const enviando = ref(false)

// Formatear fecha para display
const formatearFechaEvento = (fecha) => {
  if (!fecha) return 'No especificada'
  
  const opciones = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  
  const fechaObj = new Date(fecha)
  return fechaObj.toLocaleDateString('es-ES', opciones)
}

// Cargar detalles de la solicitud
onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/contratos/solicitudes/${solicitudId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      solicitud.value = data
    } else {
      console.error('Error al cargar la solicitud')
      alert('No se pudo cargar la solicitud')
      router.push({ name: 'dashboard-artista', query: { seccion: 'contratos' } })
    }
  } catch (error) {
    console.error('Error de red:', error)
    alert('Error al conectar con el servidor')
  }
})

// Enviar propuesta
const enviarPropuesta = async () => {
  enviando.value = true

  try {
    const response = await fetch(`http://localhost:3000/api/contratos/solicitudes/${solicitudId}/propuesta`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify({
        precio: parseFloat(propuesta.value.precio),
        servicios_incluidos: propuesta.value.servicios_incluidos,
        mensaje: propuesta.value.mensaje
      })
    })

    if (response.ok) {
      // Redirigir a la vista de confirmación
      router.push({ name: 'propuesta-enviada', params: { solicitudId: solicitudId } })
    } else {
      const errorData = await response.json()
      alert(errorData.error || 'Error al enviar la propuesta')
    }
  } catch (error) {
    console.error('Error de red:', error)
    alert('Error al conectar con el servidor')
  } finally {
    enviando.value = false
  }
}
</script>

<style scoped>
/* Importar Material Symbols */
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

/* Importar Inter font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
</style>
