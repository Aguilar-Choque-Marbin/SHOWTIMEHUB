<template>
  <div class="font-display bg-[#000000] min-h-screen">
    <div class="relative flex min-h-screen w-full flex-col">
      
      <!-- Header -->
      <header class="sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 bg-[#000000]/80 px-4 py-3 backdrop-blur-sm sm:px-8 md:px-10 lg:px-20">
        <div class="flex items-center gap-4 text-white">
          <span class="material-symbols-outlined text-[#00BCD4] text-3xl">
            local_activity
          </span>
          <h1 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">ShowTime Hub</h1>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex flex-1 items-center justify-center px-4 py-8 sm:py-12 md:py-16">
        <div class="flex w-full max-w-2xl flex-col items-center gap-8 text-center">
          
          <!-- Ícono y Título -->
          <div class="flex flex-col items-center gap-4">
            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-[#00BCD4]/20">
              <span class="material-symbols-outlined text-[#00BCD4] !text-5xl">
                check_circle
              </span>
            </div>
            <h2 class="text-white text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">
              ¡Reserva Confirmada!
            </h2>
            <p class="text-gray-300 max-w-md text-base sm:text-lg">
              Recibirás un correo electrónico con todos los detalles de tu reserva. El artista se pondrá en contacto contigo pronto.
            </p>
          </div>

          <!-- Detalles de la Reserva -->
          <div class="w-full rounded-xl bg-[#1A1A1A] p-6 sm:p-8 text-left">
            <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-4 mb-6 border-b border-white/10">
              Detalles de la Reserva
            </h3>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <p class="text-sm text-gray-400">Artista</p>
                <p class="text-base text-white font-medium">{{ contrato.artista_nombre }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Servicio</p>
                <p class="text-base text-white font-medium">{{ contrato.servicio_nombre }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Fecha</p>
                <p class="text-base text-white font-medium">{{ formatearSoloFecha(contrato.fecha_evento) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Hora</p>
                <p class="text-base text-white font-medium">{{ formatearSoloHora(contrato.fecha_evento) }}</p>
              </div>
              <div class="sm:col-span-2">
                <p class="text-sm text-gray-400">Precio Final</p>
                <p class="text-lg text-[#00BCD4] font-bold">€ {{ contrato.precio_final?.toFixed(2) }}</p>
              </div>
            </div>
          </div>

          <!-- Botones de Acción -->
          <div class="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center pt-4">
            <button
              @click="volverAlDashboard"
              class="flex w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-[#00BCD4] text-black gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 px-8 transition-transform duration-200 hover:scale-105 active:scale-100"
            >
              Volver al Dashboard
            </button>
            <button
              @click="verDetalles"
              class="flex w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-white border border-white/30 gap-2 text-base font-medium leading-normal min-w-0 px-8 transition-colors duration-200 hover:bg-white/10 active:bg-white/5"
            >
              Ver Detalles de la Reserva
            </button>
          </div>

        </div>
      </main>

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

const contratoId = route.params.contratoId

const contrato = ref({
  contrato_id: null,
  artista_nombre: '',
  servicio_nombre: '',
  fecha_evento: '',
  precio_final: 0
})

// Formatear solo fecha
const formatearSoloFecha = (fecha) => {
  if (!fecha) return 'No especificada'
  
  const opciones = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  }
  
  const fechaObj = new Date(fecha)
  return fechaObj.toLocaleDateString('es-ES', opciones)
}

// Formatear solo hora
const formatearSoloHora = (fecha) => {
  if (!fecha) return 'No especificada'
  
  const fechaObj = new Date(fecha)
  const horas = fechaObj.getHours().toString().padStart(2, '0')
  const minutos = fechaObj.getMinutes().toString().padStart(2, '0')
  
  return `${horas}:${minutos}`
}

// Cargar detalles del contrato
onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/contratos/${contratoId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      contrato.value = data
    } else {
      console.error('Error al cargar el contrato')
      alert('No se pudo cargar el contrato')
      router.push({ name: 'dashboard' })
    }
  } catch (error) {
    console.error('Error de red:', error)
    alert('Error al conectar con el servidor')
  }
})

// Volver al dashboard
const volverAlDashboard = () => {
  router.push({ name: 'dashboard', query: { seccion: 'contratos' } })
}

// Ver detalles completos
const verDetalles = () => {
  // Redirigir a una vista de detalles del contrato (por implementar)
  router.push({ name: 'dashboard', query: { seccion: 'contratos' } })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');

.font-display {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
