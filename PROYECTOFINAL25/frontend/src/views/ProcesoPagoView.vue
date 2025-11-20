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

            <!-- Métodos de Pago -->
            <div class="rounded-xl bg-neutral-900 p-6">
              <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6">
                Selecciona un Método de Pago
              </h2>

              <form @submit.prevent="procesarPago" class="space-y-4">
                
                <!-- Opción: Tarjeta de Crédito/Débito -->
                <div class="relative">
                  <input
                    v-model="metodoPago"
                    value="tarjeta"
                    class="peer hidden"
                    id="creditCard"
                    name="paymentMethod"
                    type="radio"
                  />
                  <label
                    class="flex cursor-pointer items-center justify-between rounded-lg border-2 border-neutral-700 bg-neutral-800 p-4 ring-[#00BCD4] peer-checked:border-[#00BCD4] peer-checked:ring-2"
                    for="creditCard"
                  >
                    <div class="flex items-center gap-4">
                      <span class="material-symbols-outlined text-white">credit_card</span>
                      <span class="text-white font-medium">Tarjeta de Crédito/Débito</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-neutral-400 text-xs">Visa, Mastercard</span>
                    </div>
                  </label>
                </div>

                <!-- Formulario de Tarjeta (visible solo si tarjeta seleccionada) -->
                <div v-if="metodoPago === 'tarjeta'" class="space-y-4 pt-4 pl-4">
                  <div>
                    <label class="block text-sm font-medium text-neutral-300 mb-1" for="cardNumber">
                      Número de Tarjeta
                    </label>
                    <input
                      v-model="datosTarjeta.numero"
                      class="w-full rounded-md border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 focus:border-[#00BCD4] focus:ring-[#00BCD4]"
                      id="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      type="text"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-300 mb-1" for="cardName">
                      Nombre del Titular
                    </label>
                    <input
                      v-model="datosTarjeta.nombre"
                      class="w-full rounded-md border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 focus:border-[#00BCD4] focus:ring-[#00BCD4]"
                      id="cardName"
                      placeholder="Nombre Apellido"
                      type="text"
                      required
                    />
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-neutral-300 mb-1" for="expiryDate">
                        Fecha de Vencimiento
                      </label>
                      <input
                        v-model="datosTarjeta.vencimiento"
                        class="w-full rounded-md border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 focus:border-[#00BCD4] focus:ring-[#00BCD4]"
                        id="expiryDate"
                        placeholder="MM/AA"
                        type="text"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-300 mb-1" for="cvv">
                        Código de Seguridad (CVV)
                      </label>
                      <input
                        v-model="datosTarjeta.cvv"
                        class="w-full rounded-md border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 focus:border-[#00BCD4] focus:ring-[#00BCD4]"
                        id="cvv"
                        placeholder="123"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                </div>

                <!-- Opción: PayPal -->
                <div class="relative">
                  <input
                    v-model="metodoPago"
                    value="paypal"
                    class="peer hidden"
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                  />
                  <label
                    class="flex cursor-pointer items-center justify-between rounded-lg border-2 border-neutral-700 bg-neutral-800 p-4 ring-[#00BCD4] peer-checked:border-[#00BCD4] peer-checked:ring-2"
                    for="paypal"
                  >
                    <div class="flex items-center gap-4">
                      <span class="material-symbols-outlined text-white">account_balance_wallet</span>
                      <span class="text-white font-medium">PayPal</span>
                    </div>
                  </label>
                </div>

                <!-- Opción: Google Pay -->
                <div class="relative">
                  <input
                    v-model="metodoPago"
                    value="googlepay"
                    class="peer hidden"
                    id="googlepay"
                    name="paymentMethod"
                    type="radio"
                  />
                  <label
                    class="flex cursor-pointer items-center justify-between rounded-lg border-2 border-neutral-700 bg-neutral-800 p-4 ring-[#00BCD4] peer-checked:border-[#00BCD4] peer-checked:ring-2"
                    for="googlepay"
                  >
                    <div class="flex items-center gap-4">
                      <span class="material-symbols-outlined text-white">phone_android</span>
                      <span class="text-white font-medium">Google Pay</span>
                    </div>
                  </label>
                </div>

                <!-- Opción: Código QR -->
                <div class="relative">
                  <input
                    v-model="metodoPago"
                    value="qr"
                    class="peer hidden"
                    id="qr"
                    name="paymentMethod"
                    type="radio"
                  />
                  <label
                    class="flex cursor-pointer items-center justify-between rounded-lg border-2 border-neutral-700 bg-neutral-800 p-4 ring-[#00BCD4] peer-checked:border-[#00BCD4] peer-checked:ring-2"
                    for="qr"
                  >
                    <div class="flex items-center gap-4">
                      <span class="material-symbols-outlined text-white">qr_code</span>
                      <span class="text-white font-medium">Código QR</span>
                    </div>
                  </label>
                </div>

                <!-- Botón de Pago -->
                <div class="mt-8 flex flex-col items-center">
                  <button
                    type="submit"
                    :disabled="procesando || !metodoPago"
                    class="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00BCD4] px-8 py-3 text-base font-bold text-white transition-colors hover:bg-[#00BCD4]/90 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2 focus:ring-offset-[#121212] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span v-if="!procesando">Pagar €{{ total.toFixed(2) }}</span>
                    <span v-else class="flex items-center gap-2">
                      <span class="material-symbols-outlined animate-spin">refresh</span>
                      Procesando...
                    </span>
                  </button>
                  <div class="mt-4 flex items-center gap-2 text-sm text-neutral-400">
                    <span class="material-symbols-outlined text-base">lock</span>
                    <span>Pago 100% Seguro</span>
                  </div>
                </div>

              </form>
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

const metodoPago = ref('tarjeta')
const procesando = ref(false)

const datosTarjeta = ref({
  numero: '',
  nombre: '',
  vencimiento: '',
  cvv: ''
})

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

// Cargar detalles de la propuesta
onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/pagos/propuestas/${propuestaId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      propuesta.value = data
    } else {
      console.error('Error al cargar la propuesta')
      alert('No se pudo cargar la propuesta')
      router.push({ name: 'dashboard' })
    }
  } catch (error) {
    console.error('Error de red:', error)
    alert('Error al conectar con el servidor')
  }
})

// Procesar pago
const procesarPago = async () => {
  procesando.value = true

  try {
    // Si es pago QR, redirigir a vista QR
    if (metodoPago.value === 'qr') {
      router.push({ 
        name: 'pago-qr', 
        params: { propuestaId: propuestaId }
      })
      return
    }

    // Para otros métodos, procesar pago directamente
    const datosPago = {
      propuesta_id: propuestaId,
      metodo_pago: metodoPago.value,
      monto_total: total.value,
      monto_artista: subtotal.value,
      comision_plataforma: tasaServicio.value
    }

    // Si es tarjeta, incluir datos (en producción esto debe ir encriptado)
    if (metodoPago.value === 'tarjeta') {
      datosPago.datos_tarjeta = {
        numero_enmascarado: datosTarjeta.value.numero.slice(-4),
        nombre_titular: datosTarjeta.value.nombre
      }
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
