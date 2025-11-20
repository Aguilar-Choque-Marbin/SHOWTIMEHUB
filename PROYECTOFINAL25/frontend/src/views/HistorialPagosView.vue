<template>
  <div class="min-h-screen bg-black text-[#f0f0f0] font-[Spline_Sans]">
    <!-- Header -->
    <header class="bg-[#181818] border-b border-[#282828]">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button @click="volver" class="text-[#00f5d4] hover:opacity-80 transition-opacity">
            <span class="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h1 class="text-2xl font-bold">Historial de Pagos</h1>
        </div>
        <button @click="exportarHistorial" class="bg-[#00f5d4] hover:bg-[#00d4b8] text-black px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <span class="material-symbols-outlined text-xl">download</span>
          Exportar
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-6 py-8">
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-[#181818] p-6 rounded-lg border border-[#282828]">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[#a0a0a0] text-sm">Total Gastado</span>
            <span class="material-symbols-outlined text-[#00f5d4]">payments</span>
          </div>
          <p class="text-3xl font-bold text-[#00f5d4]">{{ formatearMonto(totalGastado) }}</p>
        </div>
        <div class="bg-[#181818] p-6 rounded-lg border border-[#282828]">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[#a0a0a0] text-sm">Pagos Realizados</span>
            <span class="material-symbols-outlined text-[#00f5d4]">receipt_long</span>
          </div>
          <p class="text-3xl font-bold">{{ pagos.length }}</p>
        </div>
        <div class="bg-[#181818] p-6 rounded-lg border border-[#282828]">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[#a0a0a0] text-sm">Último Pago</span>
            <span class="material-symbols-outlined text-[#00f5d4]">schedule</span>
          </div>
          <p class="text-lg font-semibold">{{ ultimoPago }}</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-[#181818] p-6 rounded-lg border border-[#282828] mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm text-[#a0a0a0] mb-2">Buscar</label>
            <div class="relative">
              <input
                v-model="busqueda"
                type="text"
                placeholder="Buscar por artista o servicio..."
                class="w-full bg-black border border-[#282828] rounded-lg px-4 py-2 pl-10 text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4] transition-colors"
              />
              <span class="material-symbols-outlined absolute left-3 top-2.5 text-[#a0a0a0] text-xl">search</span>
            </div>
          </div>
          <div>
            <label class="block text-sm text-[#a0a0a0] mb-2">Estado</label>
            <select
              v-model="filtroEstado"
              class="w-full bg-black border border-[#282828] rounded-lg px-4 py-2 text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4] transition-colors"
            >
              <option value="">Todos</option>
              <option value="Completado">Completado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Reembolsado">Reembolsado</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-[#a0a0a0] mb-2">Periodo</label>
            <select
              v-model="filtroPeriodo"
              class="w-full bg-black border border-[#282828] rounded-lg px-4 py-2 text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4] transition-colors"
            >
              <option value="">Todos</option>
              <option value="30">Últimos 30 días</option>
              <option value="90">Últimos 3 meses</option>
              <option value="180">Últimos 6 meses</option>
              <option value="365">Último año</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Pagos Table -->
      <div class="bg-[#181818] rounded-lg border border-[#282828] overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-black border-b border-[#282828]">
              <tr>
                <th class="text-left px-6 py-4 text-sm font-semibold text-[#a0a0a0]">Fecha</th>
                <th class="text-left px-6 py-4 text-sm font-semibold text-[#a0a0a0]">ID Transacción</th>
                <th class="text-left px-6 py-4 text-sm font-semibold text-[#a0a0a0]">Artista</th>
                <th class="text-left px-6 py-4 text-sm font-semibold text-[#a0a0a0]">Servicio</th>
                <th class="text-left px-6 py-4 text-sm font-semibold text-[#a0a0a0]">Monto</th>
                <th class="text-left px-6 py-4 text-sm font-semibold text-[#a0a0a0]">Estado</th>
                <th class="text-left px-6 py-4 text-sm font-semibold text-[#a0a0a0]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="cargandoPagos" class="border-b border-[#282828]">
                <td colspan="7" class="px-6 py-8 text-center text-[#a0a0a0]">
                  <div class="flex items-center justify-center gap-3">
                    <span class="material-symbols-outlined animate-spin">progress_activity</span>
                    Cargando pagos...
                  </div>
                </td>
              </tr>
              <tr v-else-if="pagosFiltrados.length === 0" class="border-b border-[#282828]">
                <td colspan="7" class="px-6 py-8 text-center text-[#a0a0a0]">
                  <span class="material-symbols-outlined text-4xl mb-2 block">receipt_long</span>
                  No se encontraron pagos
                </td>
              </tr>
              <tr v-else v-for="pago in pagosFiltrados" :key="pago.id" class="border-b border-[#282828] hover:bg-black/50 transition-colors">
                <td class="px-6 py-4 text-sm">{{ formatearFecha(pago.fecha) }}</td>
                <td class="px-6 py-4 text-sm font-mono text-[#00f5d4]">{{ pago.id_transaccion }}</td>
                <td class="px-6 py-4 text-sm">{{ pago.artista }}</td>
                <td class="px-6 py-4 text-sm">{{ pago.servicio }}</td>
                <td class="px-6 py-4 text-sm font-semibold">{{ formatearMonto(pago.monto) }}</td>
                <td class="px-6 py-4">
                  <span
                    :class="{
                      'bg-green-500/20 text-green-400': pago.estado === 'Completado',
                      'bg-yellow-500/20 text-yellow-400': pago.estado === 'Pendiente',
                      'bg-blue-500/20 text-blue-400': pago.estado === 'Reembolsado'
                    }"
                    class="px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {{ pago.estado }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <button @click="verDetallePago(pago)" class="text-[#00f5d4] hover:opacity-80 transition-opacity" title="Ver detalle">
                    <span class="material-symbols-outlined text-xl">visibility</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Modal Detalle Pago -->
    <div v-if="pagoSeleccionado" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" @click.self="cerrarDetalle">
      <div class="bg-[#181818] rounded-lg border border-[#282828] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between p-6 border-b border-[#282828]">
          <h2 class="text-xl font-bold">Detalle de Pago</h2>
          <button @click="cerrarDetalle" class="text-[#a0a0a0] hover:text-[#f0f0f0] transition-colors">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="p-6 space-y-6">
          <!-- ID Transacción -->
          <div>
            <label class="block text-sm text-[#a0a0a0] mb-1">ID de Transacción</label>
            <p class="text-lg font-mono text-[#00f5d4]">{{ pagoSeleccionado.id_transaccion }}</p>
          </div>

          <!-- Información del Pago -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-[#a0a0a0] mb-1">Fecha</label>
              <p class="text-base">{{ formatearFecha(pagoSeleccionado.fecha) }}</p>
            </div>
            <div>
              <label class="block text-sm text-[#a0a0a0] mb-1">Estado</label>
              <span
                :class="{
                  'bg-green-500/20 text-green-400': pagoSeleccionado.estado === 'Completado',
                  'bg-yellow-500/20 text-yellow-400': pagoSeleccionado.estado === 'Pendiente',
                  'bg-blue-500/20 text-blue-400': pagoSeleccionado.estado === 'Reembolsado'
                }"
                class="inline-block px-3 py-1 rounded-full text-xs font-medium"
              >
                {{ pagoSeleccionado.estado }}
              </span>
            </div>
          </div>

          <!-- Información del Artista -->
          <div>
            <label class="block text-sm text-[#a0a0a0] mb-1">Artista</label>
            <p class="text-base">{{ pagoSeleccionado.artista }}</p>
          </div>

          <div>
            <label class="block text-sm text-[#a0a0a0] mb-1">Servicio Contratado</label>
            <p class="text-base">{{ pagoSeleccionado.servicio }}</p>
          </div>

          <!-- Desglose de Pago -->
          <div class="bg-black p-4 rounded-lg border border-[#282828]">
            <h3 class="font-semibold mb-3 text-[#00f5d4]">Desglose del Pago</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-[#a0a0a0]">Subtotal</span>
                <span>{{ formatearMonto(pagoSeleccionado.subtotal || pagoSeleccionado.monto * 0.9) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[#a0a0a0]">Comisión de plataforma (10%)</span>
                <span>{{ formatearMonto(pagoSeleccionado.comision || pagoSeleccionado.monto * 0.1) }}</span>
              </div>
              <div class="border-t border-[#282828] pt-2 mt-2">
                <div class="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span class="text-[#00f5d4]">{{ formatearMonto(pagoSeleccionado.monto) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Método de Pago -->
          <div>
            <label class="block text-sm text-[#a0a0a0] mb-1">Método de Pago</label>
            <p class="text-base">{{ pagoSeleccionado.metodo_pago || 'Visa •••• 4242' }}</p>
          </div>

          <!-- Botones de Acción -->
          <div class="flex gap-3 pt-4">
            <button class="flex-1 bg-[#00f5d4] hover:bg-[#00d4b8] text-black py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-xl">download</span>
              Descargar Recibo
            </button>
            <button v-if="pagoSeleccionado.estado === 'Completado'" class="flex-1 bg-transparent border border-[#282828] hover:border-[#00f5d4] text-[#f0f0f0] py-3 rounded-lg font-medium transition-colors">
              Solicitar Reembolso
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()

// Estado
const cargandoPagos = ref(true)
const pagos = ref([])
const busqueda = ref('')
const filtroEstado = ref('')
const filtroPeriodo = ref('')
const pagoSeleccionado = ref(null)

// Computed
const pagosFiltrados = computed(() => {
  let resultado = [...pagos.value]

  // Filtro por búsqueda
  if (busqueda.value) {
    const termino = busqueda.value.toLowerCase()
    resultado = resultado.filter(pago =>
      pago.artista.toLowerCase().includes(termino) ||
      pago.servicio.toLowerCase().includes(termino) ||
      pago.id_transaccion.toLowerCase().includes(termino)
    )
  }

  // Filtro por estado
  if (filtroEstado.value) {
    resultado = resultado.filter(pago => pago.estado === filtroEstado.value)
  }

  // Filtro por periodo
  if (filtroPeriodo.value) {
    const dias = parseInt(filtroPeriodo.value)
    const fechaLimite = new Date()
    fechaLimite.setDate(fechaLimite.getDate() - dias)
    
    resultado = resultado.filter(pago => {
      const fechaPago = new Date(pago.fecha)
      return fechaPago >= fechaLimite
    })
  }

  return resultado
})

const totalGastado = computed(() => {
  return pagosFiltrados.value.reduce((total, pago) => total + pago.monto, 0)
})

const ultimoPago = computed(() => {
  if (pagos.value.length === 0) return 'N/A'
  const ultimo = pagos.value[0]
  return formatearFecha(ultimo.fecha)
})

// Métodos
const cargarPagos = async () => {
  try {
    cargandoPagos.value = true
    const response = await axios.get('http://localhost:3000/api/pagos/historial', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    pagos.value = response.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  } catch (error) {
    console.error('Error al cargar pagos:', error)
    // Si no hay backend, usar datos de prueba
    pagos.value = [
      {
        id: 1,
        id_transaccion: 'TXN-2024-001234',
        fecha: '2024-01-15',
        artista: 'DJ Electra',
        servicio: 'Presentación en vivo - 3 horas',
        monto: 2500,
        subtotal: 2250,
        comision: 250,
        estado: 'Completado',
        metodo_pago: 'Visa •••• 4242'
      },
      {
        id: 2,
        id_transaccion: 'TXN-2024-001189',
        fecha: '2024-01-10',
        artista: 'Magnifico the Great',
        servicio: 'Show de magia corporativo',
        monto: 1800,
        subtotal: 1620,
        comision: 180,
        estado: 'Completado',
        metodo_pago: 'Mastercard •••• 8888'
      },
      {
        id: 3,
        id_transaccion: 'TXN-2024-001156',
        fecha: '2024-01-05',
        artista: 'The Groove Makers',
        servicio: 'Banda en vivo - Boda',
        monto: 3500,
        subtotal: 3150,
        comision: 350,
        estado: 'Completado',
        metodo_pago: 'Visa •••• 4242'
      },
      {
        id: 4,
        id_transaccion: 'TXN-2024-001098',
        fecha: '2023-12-20',
        artista: 'Luna Acoustic',
        servicio: 'Música acústica - Evento privado',
        monto: 1200,
        subtotal: 1080,
        comision: 120,
        estado: 'Reembolsado',
        metodo_pago: 'Visa •••• 4242'
      },
      {
        id: 5,
        id_transaccion: 'TXN-2024-001523',
        fecha: '2024-01-20',
        artista: 'Urban Flow Dancers',
        servicio: 'Coreografía personalizada',
        monto: 2000,
        subtotal: 1800,
        comision: 200,
        estado: 'Pendiente',
        metodo_pago: 'Visa •••• 4242'
      }
    ].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  } finally {
    cargandoPagos.value = false
  }
}

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const formatearMonto = (monto) => {
  return new Intl.NumberFormat('es-BO', {
    style: 'currency',
    currency: 'BOB'
  }).format(monto)
}

const verDetallePago = (pago) => {
  pagoSeleccionado.value = pago
}

const cerrarDetalle = () => {
  pagoSeleccionado.value = null
}

const exportarHistorial = () => {
  // TODO: Implementar exportación a PDF/Excel
  alert('Exportando historial de pagos...')
}

const volver = () => {
  router.push('/dashboard-usuario')
}

onMounted(() => {
  cargarPagos()
})
</script>
