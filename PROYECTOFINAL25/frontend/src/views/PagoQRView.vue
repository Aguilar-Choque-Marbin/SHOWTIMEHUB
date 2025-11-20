<template>
  <div class="font-display bg-[#f7f5f8] dark:bg-[#121212] min-h-screen">
    <div class="relative flex min-h-screen w-full flex-col">
      
      <!-- Header -->
      <header class="w-full border-b border-white/10 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <div class="flex items-center gap-4 text-white">
            <div class="h-6 w-6 text-white">
              <span class="material-symbols-outlined !text-2xl">
                local_activity
              </span>
            </div>
            <h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">ShowTime Hub</h2>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl">
          
          <!-- Título -->
          <div class="mb-8">
            <p class="text-white text-4xl font-black leading-tight tracking-[-0.033em]">Completa tu Pago</p>
            <p class="text-neutral-300 text-base font-normal leading-normal mt-2">
              Revisa los detalles de tu reserva y elige un método de pago seguro.
            </p>
          </div>

          <div class="flex flex-col gap-8">
            
            <!-- Resumen de Reserva -->
            <div class="rounded-xl bg-neutral-900 p-6">
              <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
                Resumen de tu Reserva
              </h2>
              
              <!-- Detalles -->
              <div class="space-y-3 border-b border-white/10 pb-4">
                <div class="flex justify-between gap-x-6">
                  <p class="text-neutral-300 text-sm font-normal leading-normal">Artista</p>
                  <p class="text-white text-sm font-medium leading-normal text-right">{{ propuesta.artista_nombre }}</p>
                </div>
                <div class="flex justify-between gap-x-6">
                  <p class="text-neutral-300 text-sm font-normal leading-normal">Servicio</p>
                  <p class="text-white text-sm font-medium leading-normal text-right">{{ propuesta.servicio_nombre }}</p>
                </div>
                <div class="flex justify-between gap-x-6">
                  <p class="text-neutral-300 text-sm font-normal leading-normal">Fecha y Hora</p>
                  <p class="text-white text-sm font-medium leading-normal text-right">{{ formatearFecha(propuesta.fecha_evento) }}</p>
                </div>
              </div>

              <!-- Totales -->
              <div class="space-y-3 pt-4">
                <div class="flex justify-between gap-x-6">
                  <p class="text-neutral-300 text-sm font-normal leading-normal">Subtotal</p>
                  <p class="text-white text-sm font-normal leading-normal text-right">€{{ subtotal.toFixed(2) }}</p>
                </div>
                <div class="flex justify-between gap-x-6">
                  <p class="text-neutral-300 text-sm font-normal leading-normal">Tasa de Servicio</p>
                  <p class="text-white text-sm font-normal leading-normal text-right">€{{ tasaServicio.toFixed(2) }}</p>
                </div>
                <div class="flex justify-between gap-x-6 pt-2">
                  <p class="text-white text-base font-bold leading-normal">Total a Pagar</p>
                  <p class="text-white text-base font-bold leading-normal text-right">€{{ total.toFixed(2) }}</p>
                </div>
              </div>
            </div>

            <!-- Pago con QR -->
            <div class="rounded-xl bg-neutral-900 p-6 text-center">
              <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6">
                Paga escaneando el código QR
              </h2>
              
              <div class="flex flex-col items-center gap-6">
                <!-- Código QR -->
                <div class="bg-white p-4 rounded-lg">
                  <div v-if="codigoQR" class="w-48 h-48 flex items-center justify-center">
                    <img :src="codigoQR" alt="Código QR de pago" class="w-full h-full object-contain" />
                  </div>
                  <div v-else class="w-48 h-48 flex items-center justify-center bg-gray-100">
                    <span class="material-symbols-outlined text-gray-400 !text-6xl animate-spin">
                      refresh
                    </span>
                  </div>
                </div>

                <p class="text-neutral-300 text-sm">
                  Escanea con tu aplicación de banco preferida o billetera digital.
                </p>

                <!-- Botón de Confirmación -->
                <div class="w-full max-w-xs">
                  <button
                    @click="confirmarPago"
                    :disabled="procesando"
                    class="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00BCD4] px-8 py-3 text-base font-bold text-white transition-colors hover:bg-[#00BCD4]/90 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2 focus:ring-offset-[#121212] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span v-if="!procesando">Confirmar Pago</span>
                    <span v-else class="flex items-center gap-2">
                      <span class="material-symbols-outlined animate-spin">refresh</span>
                      Verificando...
                    </span>
                  </button>
                  <div class="mt-4 flex items-center justify-center gap-2 text-sm text-neutral-400">
                    <span class="material-symbols-outlined text-base">lock</span>
                    <span>Pago 100% Seguro</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const propuestaId = route.params.propuestaId

const propuesta = ref({
  propuesta_id: null,
  artista_nombre: '',
  servicio_nombre: '',
  fecha_evento: '',
  precio: 0
})

const codigoQR = ref(null)
const procesando = ref(false)

// Cálculos
const subtotal = computed(() => propuesta.value.precio || 0)
const tasaServicio = computed(() => subtotal.value * 0.10) // 10% de comisión
const total = computed(() => subtotal.value + tasaServicio.value)

// Formatear fecha
const formatearFecha = (fecha) => {
  if (!fecha) return 'No especificada'
  
  const opciones = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  
  const fechaObj = new Date(fecha)
  return fechaObj.toLocaleDateString('es-ES', opciones)
}

// Cargar detalles y generar QR
onMounted(async () => {
  try {
    // Cargar propuesta
    const propuestaResponse = await fetch(`http://localhost:3000/api/pagos/propuestas/${propuestaId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (propuestaResponse.ok) {
      const data = await propuestaResponse.json()
      propuesta.value = data
    } else {
      console.error('Error al cargar la propuesta')
      alert('No se pudo cargar la propuesta')
      router.push({ name: 'dashboard' })
      return
    }

    // Generar código QR
    const qrResponse = await fetch('http://localhost:3000/api/pagos/generar-qr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify({
        propuesta_id: propuestaId,
        monto: total.value
      })
    })

    if (qrResponse.ok) {
      const qrData = await qrResponse.json()
      codigoQR.value = qrData.qr_image // Base64 o URL del QR
    } else {
      console.error('Error al generar código QR')
    }
  } catch (error) {
    console.error('Error de red:', error)
    alert('Error al conectar con el servidor')
  }
})

// Confirmar pago
const confirmarPago = async () => {
  procesando.value = true

  try {
    const datosPago = {
      propuesta_id: propuestaId,
      metodo_pago: 'qr',
      monto_total: total.value,
      monto_artista: subtotal.value,
      comision_plataforma: tasaServicio.value
    }

    const response = await fetch('http://localhost:3000/api/pagos/procesar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify(datosPago)
    })

    if (response.ok) {
      const data = await response.json()
      // Redirigir a confirmación
      router.push({ 
        name: 'reserva-confirmada', 
        params: { contratoId: data.contrato_id }
      })
    } else {
      const errorData = await response.json()
      alert(errorData.error || 'Error al procesar el pago')
    }
  } catch (error) {
    console.error('Error de red:', error)
    alert('Error al conectar con el servidor')
  } finally {
    procesando.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.font-display {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
