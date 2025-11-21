<template>
    <!-- Modal Confirmación Eliminar Bloqueo -->
    <div v-if="modalConfirmarEliminar.visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div class="bg-[#18181b] rounded-xl shadow-lg p-8 max-w-sm w-full border border-red-500/40">
        <h3 class="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined text-2xl">warning</span>
          Confirmar eliminación
        </h3>
        <p class="text-[#f0f0f0] mb-6">¿Estás seguro de que deseas eliminar este bloqueo y habilitar el día?</p>
        <div class="flex gap-3 justify-end">
          <button @click="modalConfirmarEliminar.visible = false" class="px-4 py-2 rounded-lg bg-[#27272a] text-[#a3a3a3] hover:bg-[#232323]">Cancelar</button>
          <button @click="eliminarBloqueoConfirmado" class="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600">Eliminar</button>
        </div>
      </div>
    </div>
  <div class="min-h-screen bg-[#0d0d0d] flex font-[Spline_Sans]">
    <!-- Sidebar -->
    <aside class="flex flex-col w-64 bg-[#0d0d0d] border-r border-[#1a1a1a]/50">
      <div class="flex flex-col grow p-4">
        <!-- Logo -->
        <div class="flex gap-3 items-center mb-8 px-2">
          <div class="bg-[#00f5d4] rounded-full size-10 flex items-center justify-center">
            <span class="text-black font-bold text-xl">ST</span>
          </div>
          <div class="flex flex-col">
            <h1 class="text-[#f0f0f0] text-base font-medium">ShowTime Hub</h1>
            <p class="text-[#a3a3a3] text-sm">Panel de Artista</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex flex-col gap-2">
          <button
            @click="seccionActual = 'inicio'"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg text-left',
              seccionActual === 'inicio' ? 'bg-[#00f5d4] text-black' : 'text-[#a3a3a3] hover:bg-[#1a1a1a] hover:text-[#f0f0f0]'
            ]"
          >
            <span class="material-symbols-outlined"></span>
            <p class="text-sm font-medium">Dashboard</p>
          </button>

          <button
            @click="seccionActual = 'servicios'"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg text-left',
              seccionActual === 'servicios' ? 'bg-[#00f5d4] text-black' : 'text-[#a3a3a3] hover:bg-[#1a1a1a] hover:text-[#f0f0f0]'
            ]"
          >
            <span class="material-symbols-outlined"></span>
            <p class="text-sm font-medium">Mis Servicios</p>
          </button>

          <button
            @click="seccionActual = 'reservas'"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg text-left',
              seccionActual === 'reservas' ? 'bg-[#00f5d4] text-black' : 'text-[#a3a3a3] hover:bg-[#1a1a1a] hover:text-[#f0f0f0]'
            ]"
          >
            <span class="material-symbols-outlined"></span>
            <p class="text-sm font-medium">Reservas</p>
          </button>

          <button
            @click="seccionActual = 'calendario'"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg text-left',
              seccionActual === 'calendario' ? 'bg-[#00f5d4] text-black' : 'text-[#a3a3a3] hover:bg-[#1a1a1a] hover:text-[#f0f0f0]'
            ]"
          >
            <span class="material-symbols-outlined"></span>
            <p class="text-sm font-medium">Calendario</p>
          </button>

          <button
            @click="seccionActual = 'mensajes'"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg text-left',
              seccionActual === 'mensajes' ? 'bg-[#00f5d4] text-black' : 'text-[#a3a3a3] hover:bg-[#1a1a1a] hover:text-[#f0f0f0]'
            ]"
          >
            <span class="material-symbols-outlined"></span>
            <p class="text-sm font-medium">Mensajes</p>
          </button>

          <button
            @click="seccionActual = 'ganancias'"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg text-left',
              seccionActual === 'ganancias' ? 'bg-[#00f5d4] text-black' : 'text-[#a3a3a3] hover:bg-[#1a1a1a] hover:text-[#f0f0f0]'
            ]"
          >
            <span class="material-symbols-outlined"></span>
            <p class="text-sm font-medium">Ganancias</p>
          </button>

          <button
            @click="seccionActual = 'perfil'"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg text-left',
              seccionActual === 'perfil' ? 'bg-[#00f5d4] text-black' : 'text-[#a3a3a3] hover:bg-[#1a1a1a] hover:text-[#f0f0f0]'
            ]"
          >
            <span class="material-symbols-outlined"></span>
            <p class="text-sm font-medium">Perfil</p>
          </button>
        </nav>
      </div>

      <!-- Footer -->
      <div class="flex flex-col gap-1 p-4 border-t border-[#1a1a1a]/50">
        <button
          @click="seccionActual = 'ajustes'"
          :class="[
            'flex items-center gap-3 px-3 py-2 rounded-lg text-left',
            seccionActual === 'ajustes' ? 'bg-[#00f5d4] text-black' : 'text-[#a3a3a3] hover:bg-[#1a1a1a] hover:text-[#f0f0f0]'
          ]"
        >
          <span class="material-symbols-outlined"></span>
          <p class="text-sm font-medium">Ajustes</p>
        </button>
        <button
          @click="cerrarSesion"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-[#a3a3a3] hover:bg-[#1a1a1a] hover:text-[#f0f0f0] text-left"
        >
          <span class="material-symbols-outlined"></span>
          <p class="text-sm font-medium">Cerrar Sesión</p>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto">
      <!-- Top Header -->
      <header class="sticky top-0 z-10 flex h-16 items-center justify-end gap-4 border-b border-[#1a1a1a]/50 bg-[#0d0d0d]/80 backdrop-blur-sm px-6">
        <button @click="irANotificaciones" class="relative rounded-full p-2 hover:bg-[#1a1a1a] text-[#a3a3a3] hover:text-[#f0f0f0]">
          <span class="material-symbols-outlined">notifications</span>
          <span v-if="cantidadNotificaciones > 0" class="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5d4] opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00f5d4]"></span>
          </span>
        </button>
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-[#00f5d4] flex items-center justify-center text-black font-bold">
            {{ iniciales }}
          </div>
          <div class="flex flex-col text-left">
            <p class="text-sm font-medium text-[#f0f0f0]">{{ nombreArtista }}</p>
            <p class="text-xs text-[#a3a3a3]">Artista</p>
          </div>
        </div>
      </header>

      <div class="p-6 md:p-8 lg:p-10">
        <!-- Sección Inicio -->
        <div v-if="seccionActual === 'inicio'">
          <h1 class="text-[#f0f0f0] tracking-tight text-3xl font-bold pb-2">¡Bienvenido de nuevo, {{ nombreArtista }}!</h1>
          <p class="text-[#a3a3a3] mb-8">Aquí tienes un resumen de tu actividad de hoy.</p>

          <!-- Estadísticas -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div class="flex flex-col gap-2 rounded-xl p-6 bg-[#1a1a1a] border border-[#1a1a1a]/50">
              <p class="text-[#a3a3a3] text-base font-medium">Reservas Activas</p>
              <p class="text-[#f0f0f0] tracking-tight text-3xl font-bold">
                <span v-if="cargandoEstadisticas" class="text-[#a3a3a3]">...</span>
                <span v-else>{{ estadisticas.reservas_activas }}</span>
              </p>
            </div>
            <div class="flex flex-col gap-2 rounded-xl p-6 bg-[#1a1a1a] border border-[#1a1a1a]/50">
              <p class="text-[#a3a3a3] text-base font-medium">Ganancias Estimadas</p>
              <p class="text-[#f0f0f0] tracking-tight text-3xl font-bold">
                <span v-if="cargandoEstadisticas" class="text-[#a3a3a3]">...</span>
                <span v-else>{{ formatearMonto(estadisticas.ganancias_estimadas) }}</span>
              </p>
            </div>
            <div class="flex flex-col gap-2 rounded-xl p-6 bg-[#1a1a1a] border border-[#1a1a1a]/50">
              <p class="text-[#a3a3a3] text-base font-medium">Valoración Promedio</p>
              <p class="text-[#f0f0f0] tracking-tight text-3xl font-bold flex items-center gap-2">
                <span v-if="cargandoEstadisticas" class="text-[#a3a3a3]">...</span>
                <span v-else>{{ Number(estadisticas.valoracion_promedio).toFixed(1) }}</span>
                <span class="material-symbols-outlined text-yellow-400" style="font-variation-settings: 'FILL' 1;">star</span>
              </p>
            </div>
          </div>

          <!-- Próximas Reservas -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
              <h2 class="text-[#f0f0f0] text-2xl font-bold tracking-[-0.015em] pb-4">Próximas Reservas</h2>
              <div class="flex flex-col gap-2 bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl p-2">
                <!-- Loading -->
                <div v-if="cargandoReservas" class="p-8 text-center">
                  <p class="text-[#a3a3a3]">Cargando reservas...</p>
                </div>
                
                <!-- Sin reservas -->
                <div v-else-if="proximasReservas.length === 0" class="p-8 text-center">
                  <span class="material-symbols-outlined text-[#a3a3a3] text-5xl mb-2">event_busy</span>
                  <p class="text-[#a3a3a3]">No tienes reservas próximas</p>
                </div>
                
                <!-- Lista de reservas -->
                <div v-else v-for="reserva in proximasReservas" :key="reserva.id" class="flex items-center gap-4 hover:bg-[#0d0d0d] p-3 rounded-lg">
                  <div class="text-[#f0f0f0] flex items-center justify-center rounded-lg bg-[#0d0d0d] shrink-0 size-12">
                    <span class="material-symbols-outlined">{{ obtenerIconoServicio(reserva.servicio_nombre) }}</span>
                  </div>
                  <div class="flex flex-col justify-center flex-1">
                    <p class="text-[#f0f0f0] text-base font-medium line-clamp-1">{{ reserva.servicio_nombre || 'Evento' }}</p>
                    <p class="text-[#a3a3a3] text-sm line-clamp-2">
                      Cliente: {{ reserva.cliente_nombre }} {{ reserva.cliente_apellido || '' }} | 
                      Fecha: {{ formatearFecha(reserva.fecha_evento) }}
                    </p>
                  </div>
                  <a @click="abrirDetalleReserva(reserva)" class="shrink-0 text-sm font-medium text-[#00f5d4] hover:underline cursor-pointer">Ver Detalles</a>
                </div>
              </div>
            </div>

            <!-- Acciones Rápidas y Calendario -->
            <div class="lg:col-span-1">
              <h2 class="text-[#f0f0f0] text-2xl font-bold tracking-[-0.015em] pb-4">Acciones Rápidas</h2>
              <div class="flex flex-col gap-4">
                <button @click="abrirModalNuevoServicio" class="w-full text-black bg-[#00f5d4] hover:bg-[#00f5d4]/90 focus:ring-4 focus:ring-[#00f5d4]/30 font-medium rounded-lg text-sm px-5 py-3 text-center flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 20px;">add_circle</span> Añadir Nuevo Servicio
                </button>
                <button @click="seccionActual = 'perfil'" class="w-full text-black bg-[#00f5d4] hover:bg-[#00f5d4]/90 focus:ring-4 focus:ring-[#00f5d4]/30 font-medium rounded-lg text-sm px-5 py-3 text-center flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 20px;">edit</span> Editar Perfil
                </button>
              </div>

              <!-- Calendario Mini -->
              <div class="mt-8">
                <h2 class="text-[#f0f0f0] text-2xl font-bold tracking-[-0.015em] pb-4">Disponibilidad</h2>
                <div class="p-4 bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl">
                  <div class="flex items-center justify-between mb-4">
                    <button @click="mesAnterior" class="p-1 rounded-full text-[#a3a3a3] hover:bg-[#0d0d0d] hover:text-[#f0f0f0]">
                      <span class="material-symbols-outlined">chevron_left</span>
                    </button>
                    <h3 class="font-medium text-[#f0f0f0]">{{ nombreMes }}</h3>
                    <button @click="mesSiguiente" class="p-1 rounded-full text-[#a3a3a3] hover:bg-[#0d0d0d] hover:text-[#f0f0f0]">
                      <span class="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                  <div class="grid grid-cols-7 text-center text-xs text-[#a3a3a3]">
                    <div class="py-2">Do</div>
                    <div class="py-2">Lu</div>
                    <div class="py-2">Ma</div>
                    <div class="py-2">Mi</div>
                    <div class="py-2">Ju</div>
                    <div class="py-2">Vi</div>
                    <div class="py-2">Sá</div>
                  </div>
                  <div class="grid grid-cols-7 text-center text-sm text-[#f0f0f0]">
                    <div v-for="(diaObj, index) in diasDelMes" :key="index" 
                      :class="[
                        'py-2 relative',
                        !diaObj.esDelMesActual ? 'text-[#a3a3a3]/50' : '',
                        diaObj.esHoy ? 'text-black bg-[#00f5d4] rounded-full font-bold' : ''
                      ]">
                      <span class="relative z-10">{{ diaObj.dia }}</span>
                      <span v-if="diaObj.tieneEvento && !diaObj.esHoy" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-7 bg-[#00f5d4]/20 rounded-full"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección Servicios -->
        <div v-if="seccionActual === 'servicios'">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 class="text-[#f0f0f0] tracking-tight text-3xl font-bold pb-2">Mis Servicios</h1>
              <p class="text-[#a3a3a3]">Gestiona los servicios de entretenimiento que ofreces a los clientes.</p>
            </div>
            <button @click="abrirModalNuevoServicio" class="w-full sm:w-auto text-black bg-[#00f5d4] hover:bg-[#00f5d4]/90 focus:ring-4 focus:ring-[#00f5d4]/30 font-medium rounded-lg text-sm px-5 py-3 text-center flex items-center justify-center gap-2">
              <span class="material-symbols-outlined" style="font-size: 20px;">add_circle</span> Añadir Nuevo Servicio
            </button>
          </div>

          <!-- Loading -->
          <div v-if="cargandoServicios" class="flex justify-center items-center h-64">
            <p class="text-[#a3a3a3]">Cargando servicios...</p>
          </div>

          <!-- Sin servicios -->
          <div v-else-if="servicios.length === 0" class="bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl p-12 text-center">
            <span class="material-symbols-outlined text-[#a3a3a3] text-6xl mb-4">category</span>
            <p class="text-[#a3a3a3] text-lg mb-4">No tienes servicios registrados</p>
            <button @click="abrirModalNuevoServicio" class="text-black bg-[#00f5d4] hover:bg-[#00f5d4]/90 font-medium rounded-lg text-sm px-5 py-3 inline-flex items-center gap-2">
              <span class="material-symbols-outlined" style="font-size: 20px;">add_circle</span> Crear tu primer servicio
            </button>
          </div>

          <!-- Grid de servicios -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="servicio in servicios" :key="servicio.id" 
              :class="[
                'flex flex-col bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl p-6',
                !servicio.esta_activo ? 'opacity-60' : ''
              ]">
              <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                  <h2 class="text-[#f0f0f0] text-xl font-bold mb-1">{{ servicio.nombre }}</h2>
                  <span v-if="!servicio.esta_activo" class="inline-block px-2 py-1 text-xs font-medium bg-gray-500/20 text-gray-400 rounded-full">
                    Inactivo
                  </span>
                </div>
                <span class="text-sm font-semibold text-[#00f5d4] bg-[#00f5d4]/10 px-2.5 py-1 rounded-full">
                  {{ formatearMonto(servicio.precio_base) }}
                </span>
              </div>
              <p class="text-[#a3a3a3] text-sm leading-relaxed mb-2 flex-grow">{{ servicio.descripcion }}</p>
              <p class="text-[#a3a3a3] text-xs mb-4">Duración: {{ servicio.duracion_horas }} hora(s)</p>
              <div class="flex flex-col sm:flex-row gap-3">
                <button @click="abrirModalEditarServicio(servicio)" class="flex-1 text-[#f0f0f0] bg-[#1a1a1a] border border-[#a3a3a3]/50 hover:bg-[#a3a3a3]/10 font-medium rounded-lg text-xs px-4 py-2 flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 16px;">edit</span> Editar
                </button>
                <button @click="toggleEstadoServicio(servicio)" class="flex-1 text-[#f0f0f0] bg-[#1a1a1a] border border-[#a3a3a3]/50 hover:bg-[#a3a3a3]/10 font-medium rounded-lg text-xs px-4 py-2 flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 16px;">{{ servicio.esta_activo ? 'toggle_off' : 'toggle_on' }}</span>
                  {{ servicio.esta_activo ? 'Desactivar' : 'Activar' }}
                </button>
                <button @click="abrirModalEliminarServicio(servicio)" class="flex-1 text-red-400 bg-[#1a1a1a] border border-red-400/50 hover:bg-red-400/10 font-medium rounded-lg text-xs px-4 py-2 flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 16px;">delete</span> Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección Reservas -->
        <div v-if="seccionActual === 'reservas'">
          <h1 class="text-[#f0f0f0] tracking-tight text-3xl font-bold pb-2">Gestionar Reservas</h1>
          <p class="text-[#a3a3a3] mb-8">Revisa y gestiona todas tus reservas en un solo lugar.</p>

          <!-- Filtros -->
          <div class="flex flex-col md:flex-row gap-4 mb-6">
            <div class="relative flex-1">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a3a3]" style="font-size: 20px;">search</span>
              <input 
                v-model="busquedaReserva"
                @input="buscarReservas"
                class="w-full bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#f0f0f0] placeholder:text-[#a3a3a3] focus:ring-[#00f5d4] focus:border-[#00f5d4]" 
                placeholder="Buscar por cliente, servicio..." 
                type="text"
              />
            </div>
            <div class="flex gap-2">
              <button 
                @click="cambiarFiltroReserva('todos')"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  filtroReserva === 'todos' ? 'bg-[#00f5d4] text-black' : 'bg-[#1a1a1a] text-[#a3a3a3] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]/70'
                ]">
                Todos
              </button>
              <button 
                @click="cambiarFiltroReserva('pendiente')"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  filtroReserva === 'pendiente' ? 'bg-[#00f5d4] text-black' : 'bg-[#1a1a1a] text-[#a3a3a3] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]/70'
                ]">
                Pendientes
              </button>
              <button 
                @click="cambiarFiltroReserva('confirmado')"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  filtroReserva === 'confirmado' ? 'bg-[#00f5d4] text-black' : 'bg-[#1a1a1a] text-[#a3a3a3] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]/70'
                ]">
                Confirmadas
              </button>
              <button 
                @click="cambiarFiltroReserva('completado')"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  filtroReserva === 'completado' ? 'bg-[#00f5d4] text-black' : 'bg-[#1a1a1a] text-[#a3a3a3] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]/70'
                ]">
                Pasadas
              </button>
            </div>
          </div>

          <!-- Estado de carga -->
          <div v-if="cargandoReservasCompletas" class="bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl p-12 text-center">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#00f5d4] border-t-transparent"></div>
            <p class="text-[#a3a3a3] mt-4">Cargando reservas...</p>
          </div>

          <!-- Estado vacío -->
          <div v-else-if="reservasPaginadas.length === 0" class="bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl p-12 text-center">
            <span class="material-symbols-outlined text-[#a3a3a3] text-6xl mb-4 inline-block">event_busy</span>
            <h3 class="text-[#f0f0f0] text-lg font-semibold mb-2">No hay reservas</h3>
            <p class="text-[#a3a3a3]">
              {{ filtroReserva === 'todos' ? 'No tienes ninguna reserva aún' : `No hay reservas con estado "${obtenerTextoEstado(filtroReserva)}"` }}
            </p>
          </div>

          <!-- Tabla de Reservas -->
          <div v-else class="bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead class="bg-[#1a1a1a]/50">
                  <tr>
                    <th class="px-6 py-3 text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider">Cliente</th>
                    <th class="px-6 py-3 text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider">Servicio</th>
                    <th class="px-6 py-3 text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider">Fecha</th>
                    <th class="px-6 py-3 text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider">Monto</th>
                    <th class="px-6 py-3 text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#1a1a1a]/50">
                  <tr v-for="reserva in reservasPaginadas" :key="reserva.id" class="hover:bg-[#0d0d0d]/50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#f0f0f0] font-medium">
                      {{ reserva.cliente_nombre }} {{ reserva.cliente_apellido || '' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">{{ reserva.servicio_nombre || 'Evento' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">{{ formatearFecha(reserva.fecha_evento) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">{{ formatearMonto(reserva.monto_total) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <span 
                        :class="[
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          obtenerClaseEstado(reserva.estado).bg,
                          obtenerClaseEstado(reserva.estado).text
                        ]">
                        <span :class="['w-2 h-2 mr-2 rounded-full', obtenerClaseEstado(reserva.estado).dot]"></span>
                        {{ obtenerTextoEstado(reserva.estado) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <div v-if="reserva.estado === 'pendiente'" class="flex justify-end items-center gap-2">
                        <button 
                          @click="confirmarReserva(reserva)"
                          class="px-3 py-1 text-xs font-semibold rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30">
                          Confirmar
                        </button>
                        <button 
                          @click="rechazarReserva(reserva)"
                          class="px-3 py-1 text-xs font-semibold rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30">
                          Rechazar
                        </button>
                      </div>
                      <a 
                        v-else
                        @click="abrirDetalleReserva(reserva)" 
                        class="text-[#00f5d4] hover:underline cursor-pointer">
                        Ver Detalles
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex items-center justify-between px-6 py-3 border-t border-[#1a1a1a]/50">
              <p class="text-sm text-[#a3a3a3]">
                Mostrando {{ (paginaActual - 1) * reservasPorPagina + 1 }}-{{ Math.min(paginaActual * reservasPorPagina, reservasFiltradas.length) }} de {{ reservasFiltradas.length }} reservas
              </p>
              <div class="flex items-center gap-2">
                <button 
                  @click="paginaAnterior"
                  :disabled="paginaActual === 1"
                  class="px-3 py-1 text-sm font-medium rounded-md bg-[#1a1a1a]/70 hover:bg-[#1a1a1a]/90 text-[#f0f0f0] disabled:opacity-50 disabled:cursor-not-allowed">
                  Anterior
                </button>
                <button 
                  @click="paginaSiguiente"
                  :disabled="paginaActual >= totalPaginas"
                  class="px-3 py-1 text-sm font-medium rounded-md bg-[#1a1a1a]/70 hover:bg-[#1a1a1a]/90 text-[#f0f0f0] disabled:opacity-50 disabled:cursor-not-allowed">
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección Calendario -->
        <div v-if="seccionActual === 'calendario'">
          <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 class="text-[#f0f0f0] tracking-tight text-3xl font-bold leading-tight pb-2">Calendario y Disponibilidad</h1>
              <p class="text-[#a3a3a3]">Gestiona tus reservas y marca tus días no disponibles.</p>
            </div>
            <div class="flex gap-2 sm:gap-4">
              <button @click="abrirModalBloqueo" class="text-[#f0f0f0] bg-[#1a1a1a] border border-[#1a1a1a]/50 hover:bg-[#1a1a1a]/80 font-medium rounded-lg text-sm px-5 py-3 text-center flex items-center justify-center gap-2">
                <span class="material-symbols-outlined" style="font-size: 20px;">block</span> Añadir Bloqueo
              </button>
              <button @click="abrirModalDisponibilidad" class="text-black bg-[#00f5d4] hover:bg-[#00f5d4]/90 font-medium rounded-lg text-sm px-5 py-3 text-center flex items-center justify-center gap-2">
                <span class="material-symbols-outlined" style="font-size: 20px;">edit_calendar</span> Editar Disponibilidad
              </button>
            </div>
          </div>

          <div class="bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl p-4 sm:p-6">
            <div class="flex items-center justify-between mb-6">
              <button @click="mesAnterior" class="p-1.5 rounded-full text-[#a3a3a3] hover:bg-[#0d0d0d] hover:text-[#f0f0f0]">
                <span class="material-symbols-outlined">chevron_left</span>
              </button>
              <h2 class="font-bold text-[#f0f0f0] text-xl">{{ nombreMes }}</h2>
              <button @click="mesSiguiente" class="p-1.5 rounded-full text-[#a3a3a3] hover:bg-[#0d0d0d] hover:text-[#f0f0f0]">
                <span class="material-symbols-outlined">chevron_right</span>
              </button>
            </div>

            <div class="grid grid-cols-7 text-center text-sm font-medium text-[#a3a3a3]">
              <div class="py-2">DOM</div>
              <div class="py-2">LUN</div>
              <div class="py-2">MAR</div>
              <div class="py-2">MIÉ</div>
              <div class="py-2">JUE</div>
              <div class="py-2">VIE</div>
              <div class="py-2">SÁB</div>
            </div>

            <div class="grid grid-cols-7 text-sm text-[#f0f0f0] gap-1">
              <div 
                v-for="(diaObj, index) in diasDelMes" 
                :key="index"
                @click="verDetalleDia(diaObj)"
                :class="[
                  'relative py-2 px-1 text-center border border-transparent cursor-pointer',
                  !diaObj.esDelMesActual ? 'text-[#a3a3a3]/50' : '',
                  diaObj.esHoy ? 'bg-[#00f5d4] text-black font-bold rounded-lg' : 'hover:border-[#00f5d4]/50 rounded-lg',
                  diaObj.estaBloqueado && !diaObj.esHoy ? 'bg-red-500/20 border-red-500/50' : ''
                ]">
                <span>{{ diaObj.dia }}</span>
                <div v-if="diaObj.tieneEvento && !diaObj.esHoy && !diaObj.estaBloqueado" class="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                  <span class="size-1.5 bg-[#00f5d4] rounded-full"></span>
                </div>
                <div v-if="diaObj.estaBloqueado && !diaObj.esHoy" class="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                  <span class="size-1.5 bg-red-500 rounded-full"></span>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-[#1a1a1a]/50 flex flex-col sm:flex-row sm:items-center gap-4">
              <div class="flex items-center gap-2">
                <span class="size-3 bg-[#00f5d4] rounded-full"></span>
                <span class="text-[#a3a3a3] text-sm">Reserva agendada ({{ proximasReservas.length }})</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="size-3 bg-red-500 rounded-full"></span>
                <span class="text-[#a3a3a3] text-sm">Día bloqueado</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección Mensajes -->
        <div v-if="seccionActual === 'mensajes'" class="flex h-[calc(100vh-8rem)] gap-0">
          <!-- Lista de Conversaciones -->
          <div class="w-full md:w-1/3 lg:w-1/4 flex-col border-r border-[#1a1a1a]/50 bg-[#1a1a1a] hidden md:flex rounded-l-xl overflow-hidden">
            <div class="p-4 border-b border-[#1a1a1a]/50">
              <h2 class="text-lg font-bold text-[#f0f0f0]">Conversaciones</h2>
            </div>
            <div class="flex-1 overflow-y-auto">
              <div class="flex flex-col">
                <a href="#" class="flex items-center gap-4 p-4 bg-[#0d0d0d] border-r-2 border-[#00f5d4]">
                  <div class="relative">
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12" style="background-image: url('https://ui-avatars.com/api/?name=Jane+Doe&background=00f5d4&color=000');"></div>
                    <span class="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-[#0d0d0d]"></span>
                  </div>
                  <div class="flex-1 overflow-hidden">
                    <div class="flex justify-between items-center">
                      <h3 class="text-sm font-semibold text-[#f0f0f0] truncate">Jane Doe</h3>
                      <p class="text-xs text-[#a3a3a3]">10:45 AM</p>
                    </div>
                    <p class="text-sm text-[#a3a3a3] truncate">¡Absolutamente! Estoy deseando ver tu...</p>
                  </div>
                </a>
                <a href="#" class="flex items-center gap-4 p-4 hover:bg-[#0d0d0d]/50">
                  <div class="relative">
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12" style="background-image: url('https://ui-avatars.com/api/?name=John+Smith&background=1a1a1a&color=a3a3a3');"></div>
                  </div>
                  <div class="flex-1 overflow-hidden">
                    <div class="flex justify-between items-center">
                      <h3 class="text-sm font-semibold text-[#f0f0f0] truncate">John Smith</h3>
                      <p class="text-xs text-[#a3a3a3]">Ayer</p>
                    </div>
                    <p class="text-sm text-[#a3a3a3] truncate">Gracias por la rápida respuesta. Te confirmo...</p>
                  </div>
                </a>
                <a href="#" class="flex items-center gap-4 p-4 hover:bg-[#0d0d0d]/50">
                  <div class="relative">
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12" style="background-image: url('https://ui-avatars.com/api/?name=The+Local+Cafe&background=1a1a1a&color=a3a3a3');"></div>
                    <span class="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-[#0d0d0d]"></span>
                  </div>
                  <div class="flex-1 overflow-hidden">
                    <div class="flex justify-between items-center">
                      <h3 class="text-sm font-semibold text-[#f0f0f0] truncate">The Local Cafe</h3>
                      <p class="text-xs text-[#a3a3a3]">2d</p>
                    </div>
                    <p class="text-sm text-[#a3a3a3] truncate">¡Nos encantó tu actuación! ¿Estarías dis...</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- Área de Chat -->
          <div class="flex flex-1 flex-col bg-[#0d0d0d] rounded-r-xl overflow-hidden">
            <div class="flex items-center gap-4 p-3 border-b border-[#1a1a1a]/50">
              <button class="md:hidden text-[#f0f0f0]">
                <span class="material-symbols-outlined"></span>
              </button>
              <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style="background-image: url('https://ui-avatars.com/api/?name=Jane+Doe&background=00f5d4&color=000');"></div>
              <div class="flex flex-col">
                <h3 class="font-semibold text-[#f0f0f0]">Jane Doe</h3>
                <p class="text-xs text-[#a3a3a3]">En línea</p>
              </div>
            </div>

            <div class="flex-1 overflow-y-auto p-6 space-y-6">
              <div class="flex items-start gap-3 max-w-lg">
                <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0" style="background-image: url('https://ui-avatars.com/api/?name=Jane+Doe&background=00f5d4&color=000');"></div>
                <div class="flex flex-col gap-1">
                  <div class="bg-[#1a1a1a] rounded-xl rounded-tl-none p-3">
                    <p class="text-sm text-[#f0f0f0]">Hola Alex, solo quería confirmar los detalles para la fiesta de cumpleaños de mi hijo el próximo mes. ¿Está todo en orden?</p>
                  </div>
                  <span class="text-xs text-[#a3a3a3] px-1">10:42 AM</span>
                </div>
              </div>

              <div class="flex items-start gap-3 justify-end">
                <div class="flex flex-col gap-1 items-end">
                  <div class="bg-[#00f5d4] rounded-xl rounded-tr-none p-3 max-w-lg">
                    <p class="text-sm text-black">¡Hola Jane! Sí, todo confirmado por mi parte. El equipo y yo estamos muy emocionados por el evento. ¿Tenéis alguna petición especial de canciones?</p>
                  </div>
                  <span class="text-xs text-[#a3a3a3] px-1">10:44 AM</span>
                </div>
                <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0" style="background-image: url('https://ui-avatars.com/api/?name={{ iniciales }}&background=00f5d4&color=000');"></div>
              </div>

              <div class="flex items-start gap-3 max-w-lg">
                <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0" style="background-image: url('https://ui-avatars.com/api/?name=Jane+Doe&background=00f5d4&color=000');"></div>
                <div class="flex flex-col gap-1">
                  <div class="bg-[#1a1a1a] rounded-xl rounded-tl-none p-3">
                    <p class="text-sm text-[#f0f0f0]">¡Absolutamente! Estoy deseando ver tu actuación. Te enviaré una lista de canciones más tarde hoy. ¡Gracias!</p>
                  </div>
                  <span class="text-xs text-[#a3a3a3] px-1">10:45 AM</span>
                </div>
              </div>
            </div>

            <div class="p-4 border-t border-[#1a1a1a]/50 bg-[#0d0d0d]">
              <div class="flex items-center gap-4">
                <input class="flex-1 bg-[#1a1a1a] border border-[#1a1a1a]/50 text-[#f0f0f0] text-sm rounded-lg focus:ring-[#00f5d4] focus:border-[#00f5d4] block w-full p-3.5" placeholder="Escribe tu mensaje..." type="text"/>
                <button class="inline-flex justify-center items-center p-3 text-black bg-[#00f5d4] rounded-full cursor-pointer hover:bg-[#00f5d4]/90">
                  <span class="material-symbols-outlined" style="font-size: 24px;"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección Ganancias -->
        <div v-if="seccionActual === 'ganancias'">
          <h1 class="text-[#f0f0f0] tracking-tight text-3xl font-bold leading-tight pb-2">Ganancias</h1>
          <p class="text-[#a3a3a3] mb-8">Administra y revisa tus ingresos y transacciones.</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="flex flex-col gap-2 rounded-xl p-6 bg-[#1a1a1a] border border-[#1a1a1a]/50">
              <p class="text-[#a3a3a3] text-base font-medium leading-normal">Balance Actual</p>
              <p class="text-[#f0f0f0] tracking-tight text-3xl font-bold leading-tight">$6,750.00</p>
            </div>
            <div class="flex flex-col gap-2 rounded-xl p-6 bg-[#1a1a1a] border border-[#1a1a1a]/50">
              <p class="text-[#a3a3a3] text-base font-medium leading-normal">Próximos Pagos</p>
              <p class="text-[#f0f0f0] tracking-tight text-3xl font-bold leading-tight">$1,200.00</p>
            </div>
          </div>

          <div class="bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl p-6 mb-8">
            <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 class="text-[#f0f0f0] text-xl font-bold leading-tight">Resumen de Ganancias</h2>
              <div class="flex items-center gap-2">
                <button class="px-3 py-1.5 text-sm font-medium rounded-lg text-black bg-[#00f5d4]">Mensual</button>
                <button class="px-3 py-1.5 text-sm font-medium rounded-lg text-[#a3a3a3] bg-[#0d0d0d] hover:bg-[#1a1a1a]/50 hover:text-[#f0f0f0]">Anual</button>
              </div>
            </div>
            <div class="h-80 flex items-center justify-center bg-[#0d0d0d]/50 rounded-lg">
              <div class="text-center">
                <span class="material-symbols-outlined text-[#a3a3a3] text-6xl mb-4"></span>
                <p class="text-[#a3a3a3]">Gráfico de ganancias mensuales</p>
              </div>
            </div>
          </div>

          <div class="bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl">
            <div class="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-[#1a1a1a]/50">
              <h2 class="text-[#f0f0f0] text-xl font-bold leading-tight">Historial de Transacciones</h2>
              <div class="flex items-center gap-4">
                <div class="relative">
                  <input class="bg-[#0d0d0d] border border-[#1a1a1a]/50 text-[#f0f0f0] text-sm rounded-lg focus:ring-[#00f5d4] focus:border-[#00f5d4] block w-full pl-10 p-2.5" placeholder="Filtrar por fecha" type="text"/>
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span class="material-symbols-outlined text-[#a3a3a3]" style="font-size: 20px;"></span>
                  </div>
                </div>
                <button class="text-black bg-[#00f5d4] hover:bg-[#00f5d4]/90 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 20px;"></span>
                  Exportar
                </button>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-[#a3a3a3]">
                <thead class="text-xs text-[#a3a3a3] uppercase bg-[#0d0d0d]">
                  <tr>
                    <th scope="col" class="px-6 py-3">Fecha</th>
                    <th scope="col" class="px-6 py-3">Descripción</th>
                    <th scope="col" class="px-6 py-3">Monto</th>
                    <th scope="col" class="px-6 py-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-[#1a1a1a]/50 hover:bg-[#0d0d0d]">
                    <td class="px-6 py-4 font-medium text-[#f0f0f0] whitespace-nowrap">26 Oct, 2024</td>
                    <td class="px-6 py-4 text-[#f0f0f0]">Pago por "Actuación en Gala Corporativa"</td>
                    <td class="px-6 py-4 text-[#00f5d4] font-medium">+$850.00</td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-900/50 px-2.5 py-1 rounded-full">
                        <span class="size-2 bg-green-400 rounded-full"></span>
                        Pagado
                      </span>
                    </td>
                  </tr>
                  <tr class="border-b border-[#1a1a1a]/50 hover:bg-[#0d0d0d]">
                    <td class="px-6 py-4 font-medium text-[#f0f0f0] whitespace-nowrap">15 Oct, 2024</td>
                    <td class="px-6 py-4 text-[#f0f0f0]">Retiro a cuenta bancaria</td>
                    <td class="px-6 py-4 text-[#f0f0f0] font-medium">-$2,000.00</td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-900/50 px-2.5 py-1 rounded-full">
                        <span class="size-2 bg-green-400 rounded-full"></span>
                        Completado
                      </span>
                    </td>
                  </tr>
                  <tr class="border-b border-[#1a1a1a]/50 hover:bg-[#0d0d0d]">
                    <td class="px-6 py-4 font-medium text-[#f0f0f0] whitespace-nowrap">02 Nov, 2024</td>
                    <td class="px-6 py-4 text-[#f0f0f0]">Pago por "Show de Magia para Cumpleaños"</td>
                    <td class="px-6 py-4 text-[#00f5d4] font-medium">+$450.00</td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-1.5 text-xs font-medium text-yellow-400 bg-yellow-900/50 px-2.5 py-1 rounded-full">
                        <span class="size-2 bg-yellow-400 rounded-full"></span>
                        Pendiente
                      </span>
                    </td>
                  </tr>
                  <tr class="border-b border-[#1a1a1a]/50 hover:bg-[#0d0d0d]">
                    <td class="px-6 py-4 font-medium text-[#f0f0f0] whitespace-nowrap">10 Oct, 2024</td>
                    <td class="px-6 py-4 text-[#f0f0f0]">Pago por "Clase de Batería Privada"</td>
                    <td class="px-6 py-4 text-[#00f5d4] font-medium">+$150.00</td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-900/50 px-2.5 py-1 rounded-full">
                        <span class="size-2 bg-green-400 rounded-full"></span>
                        Pagado
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 font-medium text-[#f0f0f0] whitespace-nowrap">05 Nov, 2024</td>
                    <td class="px-6 py-4 text-[#f0f0f0]">Pago por "Set Acústico en el Café Local"</td>
                    <td class="px-6 py-4 text-[#00f5d4] font-medium">+$750.00</td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-1.5 text-xs font-medium text-yellow-400 bg-yellow-900/50 px-2.5 py-1 rounded-full">
                        <span class="size-2 bg-yellow-400 rounded-full"></span>
                        Pendiente
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Sección Perfil -->
        <div v-if="seccionActual === 'perfil'">
          <div class="mx-auto max-w-5xl">
            <form>
              <div class="space-y-6">
                <!-- Información Pública -->
                <div class="rounded-xl border border-[#1a1a1a]/50 bg-[#1a1a1a] p-6">
                  <div class="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
                    <div class="md:col-span-1">
                      <h2 class="text-lg font-semibold text-[#f0f0f0]">Información Pública</h2>
                      <p class="mt-1 text-sm text-[#a3a3a3]">Esta información se mostrará públicamente en tu perfil.</p>
                    </div>
                    <div class="grid grid-cols-1 gap-6 md:col-span-2 sm:grid-cols-6">
                      <div class="sm:col-span-6">
                        <label class="block text-sm font-medium text-[#f0f0f0]" for="profile-photo">Foto de Perfil</label>
                        <div class="mt-2 flex items-center gap-x-4">
                          <div class="flex h-24 w-24 items-center justify-center rounded-full bg-[#0d0d0d]">
                            <span class="material-symbols-outlined text-4xl text-[#a3a3a3]"></span>
                          </div>
                          <button class="rounded-lg border border-[#1a1a1a]/50 bg-[#0d0d0d] px-3 py-2 text-sm font-medium text-[#f0f0f0] hover:border-[#a3a3a3]" type="button">Cambiar Foto</button>
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label class="block text-sm font-medium text-[#f0f0f0]" for="artist-name">Nombre Artístico</label>
                        <input class="mt-1 w-full rounded-lg border border-[#1a1a1a]/50 bg-[#0d0d0d] px-3 py-2 text-[#f0f0f0] text-sm focus:border-[#00f5d4] focus:ring-0" id="artist-name" type="text" value="Alex Drummer"/>
                      </div>
                      <div class="sm:col-span-3">
                        <label class="block text-sm font-medium text-[#f0f0f0]" for="category">Categoría Principal</label>
                        <select class="mt-1 w-full rounded-lg border border-[#1a1a1a]/50 bg-[#0d0d0d] px-3 py-2 text-[#f0f0f0] text-sm focus:border-[#00f5d4] focus:ring-0" id="category">
                          <option>Músico</option>
                          <option selected>Baterista</option>
                          <option>Mago</option>
                          <option>Comediante</option>
                        </select>
                      </div>
                      <div class="sm:col-span-3">
                        <label class="block text-sm font-medium text-[#f0f0f0]" for="location">Ubicación</label>
                        <input class="mt-1 w-full rounded-lg border border-[#1a1a1a]/50 bg-[#0d0d0d] px-3 py-2 text-[#f0f0f0] text-sm focus:border-[#00f5d4] focus:ring-0" id="location" type="text" value="Madrid, España"/>
                      </div>
                      <div class="sm:col-span-6">
                        <label class="block text-sm font-medium text-[#f0f0f0]" for="description">Descripción / Biografía</label>
                        <textarea class="mt-1 w-full rounded-lg border border-[#1a1a1a]/50 bg-[#0d0d0d] px-3 py-2 text-[#f0f0f0] text-sm focus:border-[#00f5d4] focus:ring-0" id="description" rows="4">Baterista profesional con más de 10 años de experiencia en giras internacionales y sesiones de estudio. Especializado en rock, funk y jazz.</textarea>
                      </div>
                      <div class="sm:col-span-6">
                        <label class="block text-sm font-medium text-[#f0f0f0]">Rango de Precios (€)</label>
                        <div class="mt-1 grid grid-cols-2 gap-4">
                          <div>
                            <input class="w-full rounded-lg border border-[#1a1a1a]/50 bg-[#0d0d0d] px-3 py-2 text-[#f0f0f0] text-sm focus:border-[#00f5d4] focus:ring-0" placeholder="Desde" type="number" value="150"/>
                          </div>
                          <div>
                            <input class="w-full rounded-lg border border-[#1a1a1a]/50 bg-[#0d0d0d] px-3 py-2 text-[#f0f0f0] text-sm focus:border-[#00f5d4] focus:ring-0" placeholder="Hasta" type="number" value="1200"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Portafolio y Redes -->
                <div class="rounded-xl border border-[#1a1a1a]/50 bg-[#1a1a1a] p-6">
                  <div class="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
                    <div class="md:col-span-1">
                      <h2 class="text-lg font-semibold text-[#f0f0f0]">Portafolio y Redes</h2>
                      <p class="mt-1 text-sm text-[#a3a3a3]">Añade enlaces a tu trabajo y perfiles sociales.</p>
                    </div>
                    <div class="grid grid-cols-1 gap-6 md:col-span-2 sm:grid-cols-6">
                      <div class="sm:col-span-6">
                        <label class="block text-sm font-medium text-[#f0f0f0]" for="portfolio-url">Enlace a Portafolio (web, Behance, etc.)</label>
                        <input class="mt-1 w-full rounded-lg border border-[#1a1a1a]/50 bg-[#0d0d0d] px-3 py-2 text-[#f0f0f0] text-sm focus:border-[#00f5d4] focus:ring-0" id="portfolio-url" type="url" value="https://alexdrummer.com"/>
                      </div>
                      <div class="sm:col-span-3">
                        <label class="block text-sm font-medium text-[#f0f0f0]" for="instagram-url">Instagram</label>
                        <input class="mt-1 w-full rounded-lg border border-[#1a1a1a]/50 bg-[#0d0d0d] px-3 py-2 text-[#f0f0f0] text-sm focus:border-[#00f5d4] focus:ring-0" id="instagram-url" placeholder="https://instagram.com/..." type="url" value="https://instagram.com/alexdrummer"/>
                      </div>
                      <div class="sm:col-span-3">
                        <label class="block text-sm font-medium text-[#f0f0f0]" for="youtube-url">YouTube</label>
                        <input class="mt-1 w-full rounded-lg border border-[#1a1a1a]/50 bg-[#0d0d0d] px-3 py-2 text-[#f0f0f0] text-sm focus:border-[#00f5d4] focus:ring-0" id="youtube-url" placeholder="https://youtube.com/..." type="url" value="https://youtube.com/c/alexdrummer"/>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Fotos y Videos -->
                <div class="rounded-xl border border-[#1a1a1a]/50 bg-[#1a1a1a] p-6">
                  <div class="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
                    <div class="md:col-span-1">
                      <h2 class="text-lg font-semibold text-[#f0f0f0]">Fotos y Videos</h2>
                      <p class="mt-1 text-sm text-[#a3a3a3]">Sube imágenes y videos que muestren tu talento.</p>
                    </div>
                    <div class="md:col-span-2">
                      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        <div class="aspect-square rounded-lg bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400');"></div>
                        <div class="aspect-square rounded-lg bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400');"></div>
                        <div class="aspect-square rounded-lg bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=400');"></div>
                        <div class="flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-[#1a1a1a]/50 bg-[#0d0d0d] hover:border-[#a3a3a3]">
                          <div class="text-center">
                            <span class="material-symbols-outlined text-4xl text-[#a3a3a3]"></span>
                            <p class="mt-1 text-sm text-[#a3a3a3]">Añadir</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Verificación de Perfil -->
                <div class="rounded-xl border border-[#1a1a1a]/50 bg-[#1a1a1a]">
                  <div class="flex items-center justify-between p-6">
                    <div class="flex flex-col">
                      <h2 class="text-lg font-semibold text-[#f0f0f0]">Verificación de Perfil</h2>
                      <p class="mt-1 text-sm text-[#a3a3a3]">Aumenta la confianza de los clientes con un perfil verificado.</p>
                    </div>
                    <div class="flex shrink-0 items-center gap-4">
                      <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-[#00f5d4]" style="font-variation-settings: 'FILL' 1;"></span>
                        <p class="font-medium text-[#f0f0f0]">Verificado</p>
                      </div>
                      <button class="text-sm font-medium text-[#00f5d4] hover:underline" type="button">Gestionar</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-8 flex justify-end gap-4">
                <button class="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00f5d4] px-6 py-3 text-center text-sm font-bold text-[#0d0d0d] hover:bg-[#00f5d4]/90 focus:outline-none focus:ring-4 focus:ring-[#00f5d4]/30 sm:w-auto" type="submit">
                  <span class="material-symbols-outlined" style="font-size: 20px;"></span>
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Sección Ajustes -->
        <div v-if="seccionActual === 'ajustes'">
          <h2 class="text-white text-3xl font-bold mb-6">Ajustes</h2>
          <div class="bg-[#1a1a1a] rounded-xl p-8 text-center">
            <span class="material-symbols-outlined text-gray-400 text-6xl mb-4">settings</span>
            <p class="text-gray-400 text-lg">Configuración de cuenta y preferencias</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Detalle Reserva -->
    <div v-if="modalDetalleReservaAbierto && reservaSeleccionada" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click="cerrarDetalleReserva">
      <div @click.stop class="bg-[#181818] rounded-xl p-6 max-w-2xl w-full mx-4 border border-white/10 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-[#f0f0f0]">Detalle de Reserva</h3>
          <button @click="cerrarDetalleReserva" class="text-[#a3a3a3] hover:text-[#f0f0f0]">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div class="space-y-4">
          <!-- ID Contrato -->
          <div class="flex items-center gap-3 p-4 bg-[#0d0d0d] rounded-lg">
            <span class="material-symbols-outlined text-[#00f5d4]">confirmation_number</span>
            <div>
              <p class="text-[#a3a3a3] text-sm">ID Contrato</p>
              <p class="text-[#f0f0f0] font-medium">{{ reservaSeleccionada.contrato_id }}</p>
            </div>
          </div>

          <!-- Servicio -->
          <div class="flex items-center gap-3 p-4 bg-[#0d0d0d] rounded-lg">
            <span class="material-symbols-outlined text-[#00f5d4]">{{ obtenerIconoServicio(reservaSeleccionada.servicio_nombre) }}</span>
            <div>
              <p class="text-[#a3a3a3] text-sm">Servicio</p>
              <p class="text-[#f0f0f0] font-medium">{{ reservaSeleccionada.servicio_nombre || 'Evento' }}</p>
            </div>
          </div>

          <!-- Cliente -->
          <div class="flex items-center gap-3 p-4 bg-[#0d0d0d] rounded-lg">
            <span class="material-symbols-outlined text-[#00f5d4]">person</span>
            <div>
              <p class="text-[#a3a3a3] text-sm">Cliente</p>
              <p class="text-[#f0f0f0] font-medium">{{ reservaSeleccionada.cliente_nombre }} {{ reservaSeleccionada.cliente_apellido || '' }}</p>
              <p class="text-[#a3a3a3] text-xs">{{ reservaSeleccionada.cliente_email }}</p>
            </div>
          </div>

          <!-- Fecha y Hora -->
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center gap-3 p-4 bg-[#0d0d0d] rounded-lg">
              <span class="material-symbols-outlined text-[#00f5d4]">calendar_today</span>
              <div>
                <p class="text-[#a3a3a3] text-sm">Fecha</p>
                <p class="text-[#f0f0f0] font-medium">{{ formatearFecha(reservaSeleccionada.fecha_evento) }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#0d0d0d] rounded-lg">
              <span class="material-symbols-outlined text-[#00f5d4]">schedule</span>
              <div>
                <p class="text-[#a3a3a3] text-sm">Duración</p>
                <p class="text-[#f0f0f0] font-medium">{{ reservaSeleccionada.duracion_horas }} horas</p>
              </div>
            </div>
          </div>

          <!-- Ubicación -->
          <div class="flex items-center gap-3 p-4 bg-[#0d0d0d] rounded-lg">
            <span class="material-symbols-outlined text-[#00f5d4]">location_on</span>
            <div>
              <p class="text-[#a3a3a3] text-sm">Ubicación</p>
              <p class="text-[#f0f0f0] font-medium">{{ reservaSeleccionada.ubicacion_evento }}</p>
            </div>
          </div>

          <!-- Monto -->
          <div class="flex items-center gap-3 p-4 bg-[#0d0d0d] rounded-lg">
            <span class="material-symbols-outlined text-[#00f5d4]">payments</span>
            <div>
              <p class="text-[#a3a3a3] text-sm">Monto Total</p>
              <p class="text-[#f0f0f0] font-bold text-xl">{{ formatearMonto(reservaSeleccionada.monto_total) }}</p>
            </div>
          </div>

          <!-- Estado -->
          <div class="flex items-center gap-3 p-4 bg-[#0d0d0d] rounded-lg">
            <span class="material-symbols-outlined text-[#00f5d4]">info</span>
            <div>
              <p class="text-[#a3a3a3] text-sm">Estado</p>
              <span :class="[
                'inline-block px-3 py-1 rounded-full text-xs font-medium',
                reservaSeleccionada.estado === 'confirmado' ? 'bg-green-500/20 text-green-400' :
                reservaSeleccionada.estado === 'aceptado' ? 'bg-blue-500/20 text-blue-400' :
                'bg-yellow-500/20 text-yellow-400'
              ]">
                {{ reservaSeleccionada.estado.charAt(0).toUpperCase() + reservaSeleccionada.estado.slice(1) }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button @click="cerrarDetalleReserva" class="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-[#f0f0f0] rounded-lg font-medium transition-colors">
            Cerrar
          </button>
          <button @click="contactarCliente(reservaSeleccionada)" class="flex-1 px-4 py-2.5 bg-[#00f5d4] hover:bg-[#00f5d4]/80 text-[#111111] rounded-lg font-medium transition-colors">
            Contactar Cliente
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Nuevo Servicio -->
    <div v-if="modalNuevoServicioAbierto" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click="cerrarModalNuevoServicio">
      <div @click.stop class="bg-[#181818] rounded-xl p-6 max-w-2xl w-full mx-4 border border-white/10 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-[#f0f0f0]">Añadir Nuevo Servicio</h3>
          <button @click="cerrarModalNuevoServicio" class="text-[#a3a3a3] hover:text-[#f0f0f0]">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <form @submit.prevent="confirmarCrearServicio" class="space-y-4">
          <!-- Nombre del Servicio -->
          <div>
            <label class="block text-[#f0f0f0] text-sm font-medium mb-2">Nombre del Servicio</label>
            <input v-model="nuevoServicio.nombre" type="text" placeholder="Ej: Show de magia, Música en vivo..." class="w-full px-4 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] placeholder-[#a3a3a3] focus:outline-none focus:border-[#00f5d4]" required>
          </div>

          <!-- Categoría -->
          <div>
            <label class="block text-[#f0f0f0] text-sm font-medium mb-2">Categoría</label>
            <select v-model="nuevoServicio.categoria_id" class="w-full px-4 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" required>
              <option value="">Selecciona una categoría</option>
              <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.nombre }}</option>
            </select>
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-[#f0f0f0] text-sm font-medium mb-2">Descripción</label>
            <textarea v-model="nuevoServicio.descripcion" rows="4" placeholder="Describe tu servicio, incluye detalles importantes..." class="w-full px-4 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] placeholder-[#a3a3a3] focus:outline-none focus:border-[#00f5d4] resize-none" required></textarea>
          </div>

          <!-- Precio y Duración -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-[#f0f0f0] text-sm font-medium mb-2">Precio Base (€)</label>
              <input v-model.number="nuevoServicio.precio_base" type="number" placeholder="500" class="w-full px-4 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] placeholder-[#a3a3a3] focus:outline-none focus:border-[#00f5d4]" required>
            </div>
            <div>
              <label class="block text-[#f0f0f0] text-sm font-medium mb-2">Duración (horas)</label>
              <input v-model.number="nuevoServicio.duracion_horas" type="number" step="0.5" placeholder="2" class="w-full px-4 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] placeholder-[#a3a3a3] focus:outline-none focus:border-[#00f5d4]" required>
            </div>
          </div>

          <!-- Incluye -->
          <div>
            <label class="block text-[#f0f0f0] text-sm font-medium mb-2">Incluye</label>
            <textarea v-model="nuevoServicio.incluye" rows="3" placeholder="- Equipo de sonido&#10;- Transporte incluido&#10;- 2 cambios de vestuario" class="w-full px-4 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] placeholder-[#a3a3a3] focus:outline-none focus:border-[#00f5d4] resize-none"></textarea>
          </div>

          <!-- Botones -->
          <div class="flex gap-3 mt-6">
            <button type="button" @click="cerrarModalNuevoServicio" class="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-[#f0f0f0] rounded-lg font-medium transition-colors">
              Cancelar
            </button>
            <button type="submit" class="flex-1 px-4 py-2.5 bg-[#00f5d4] hover:bg-[#00f5d4]/80 text-[#111111] rounded-lg font-medium transition-colors">
              Crear Servicio
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Editar Servicio -->
    <div v-if="modalEditarServicioAbierto && servicioSeleccionado" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click="cerrarModalEditarServicio">
      <div @click.stop class="bg-[#181818] rounded-xl p-6 max-w-2xl w-full mx-4 border border-white/10 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-[#f0f0f0]">Editar Servicio</h3>
          <button @click="cerrarModalEditarServicio" class="text-[#a3a3a3] hover:text-[#f0f0f0]">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <form @submit.prevent="confirmarEditarServicio" class="space-y-4">
          <div>
            <label class="block text-[#f0f0f0] text-sm font-medium mb-2">Nombre del Servicio</label>
            <input v-model="servicioSeleccionado.nombre" type="text" class="w-full px-4 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" required>
          </div>

          <div>
            <label class="block text-[#f0f0f0] text-sm font-medium mb-2">Categoría</label>
            <select v-model="servicioSeleccionado.categoria_id" class="w-full px-4 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" required>
              <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.nombre }}</option>
            </select>
          </div>

          <div>
            <label class="block text-[#f0f0f0] text-sm font-medium mb-2">Descripción</label>
            <textarea v-model="servicioSeleccionado.descripcion" rows="4" class="w-full px-4 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4] resize-none" required></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-[#f0f0f0] text-sm font-medium mb-2">Precio Base (€)</label>
              <input v-model.number="servicioSeleccionado.precio_base" type="number" class="w-full px-4 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" required>
            </div>
            <div>
              <label class="block text-[#f0f0f0] text-sm font-medium mb-2">Duración (horas)</label>
              <input v-model.number="servicioSeleccionado.duracion_horas" type="number" step="0.5" class="w-full px-4 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" required>
            </div>
          </div>

          <div>
            <label class="block text-[#f0f0f0] text-sm font-medium mb-2">Incluye</label>
            <textarea v-model="servicioSeleccionado.incluye" rows="3" class="w-full px-4 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4] resize-none"></textarea>
          </div>

          <div class="flex gap-3 mt-6">
            <button type="button" @click="cerrarModalEditarServicio" class="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-[#f0f0f0] rounded-lg font-medium transition-colors">
              Cancelar
            </button>
            <button type="submit" class="flex-1 px-4 py-2.5 bg-[#00f5d4] hover:bg-[#00f5d4]/80 text-[#111111] rounded-lg font-medium transition-colors">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Eliminar Servicio -->
    <div v-if="modalEliminarServicioAbierto && servicioSeleccionado" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click="cerrarModalEliminarServicio">
      <div @click.stop class="bg-[#181818] rounded-xl p-6 max-w-md w-full mx-4 border border-white/10">
        <div class="flex items-start gap-4 mb-6">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 shrink-0">
            <span class="material-symbols-outlined text-red-500 text-2xl">delete</span>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-[#f0f0f0] mb-2">Eliminar Servicio</h3>
            <p class="text-[#a3a3a3] text-sm mb-1">¿Estás seguro que deseas eliminar "{{ servicioSeleccionado.nombre }}"?</p>
            <p class="text-[#a3a3a3] text-xs">Esta acción no se puede deshacer.</p>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="cerrarModalEliminarServicio" class="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-[#f0f0f0] rounded-lg font-medium transition-colors">
            Cancelar
          </button>
          <button @click="confirmarEliminarServicio" class="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Detalle del Día -->
    <div v-if="modalDetalleDiaAbierto && diaSeleccionado" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click="cerrarModalDetalleDia">
      <div @click.stop class="bg-[#181818] rounded-xl p-6 max-w-2xl w-full mx-4 border border-white/10 max-h-[80vh] overflow-y-auto">
        <div class="flex items-start justify-between mb-6">
          <div>
            <h3 class="text-2xl font-bold text-[#f0f0f0] mb-1">
              {{ diaSeleccionado.dia }} de {{ nombreMes }}
            </h3>
            <p class="text-[#a3a3a3] text-sm">{{ diaSeleccionado.fecha }}</p>
          </div>
          <button @click="cerrarModalDetalleDia" class="text-[#a3a3a3] hover:text-[#f0f0f0] transition-colors">
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <!-- Información de bloqueo -->
        <div v-if="bloqueoDelDia" class="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-start gap-3 flex-1">
              <span class="material-symbols-outlined text-red-500 text-2xl">block</span>
              <div class="flex-1">
                <h4 class="text-lg font-semibold text-red-400 mb-1">Día Bloqueado</h4>
                <p class="text-[#a3a3a3] text-sm mb-2">Este día está marcado como no disponible</p>
                <div v-if="bloqueoDelDia.motivo" class="bg-black/20 rounded-lg p-3 mb-3">
                  <p class="text-sm text-[#f0f0f0]"><span class="font-medium">Motivo:</span> {{ bloqueoDelDia.motivo }}</p>
                </div>
                <div class="text-xs text-[#a3a3a3] space-y-1">
                  <p><span class="font-medium">Desde:</span> {{ formatearFechaBloqueo(bloqueoDelDia.fecha_inicio) }}</p>
                  <p><span class="font-medium">Hasta:</span> {{ formatearFechaBloqueo(bloqueoDelDia.fecha_fin) }}</p>
                </div>
              </div>
            </div>
          </div>
          <button 
            @click.stop="confirmarEliminarBloqueo(bloqueoDelDia.id)"
            class="w-full px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-lg">delete</span>
            Eliminar Bloqueo y Habilitar Día
          </button>
        </div>

        <!-- Reservas del día -->
        <div v-if="reservasDia.length > 0" class="space-y-4">
          <h4 class="text-lg font-semibold text-[#f0f0f0] flex items-center gap-2">
            <span class="material-symbols-outlined text-[#00f5d4]">event</span>
            Reservas ({{ reservasDia.length }})
          </h4>
          
          <div v-for="reserva in reservasDia" :key="reserva.id" class="bg-[#1a1a1a] rounded-lg p-4 border border-white/5 hover:border-[#00f5d4]/30 transition-colors">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h5 class="text-[#f0f0f0] font-semibold mb-1">{{ reserva.servicio_nombre || 'Evento' }}</h5>
                <p class="text-[#a3a3a3] text-sm">Cliente: {{ reserva.cliente_nombre }} {{ reserva.cliente_apellido || '' }}</p>
              </div>
              <span 
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  obtenerClaseEstado(reserva.estado).bg,
                  obtenerClaseEstado(reserva.estado).text
                ]">
                <span :class="['w-2 h-2 mr-1.5 rounded-full', obtenerClaseEstado(reserva.estado).dot]"></span>
                {{ obtenerTextoEstado(reserva.estado) }}
              </span>
            </div>
            
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="flex items-center gap-2 text-[#a3a3a3]">
                <span class="material-symbols-outlined text-base">schedule</span>
                <span>{{ reserva.duracion_horas ? `${reserva.duracion_horas}h` : 'N/A' }}</span>
              </div>
              <div class="flex items-center gap-2 text-[#a3a3a3]">
                <span class="material-symbols-outlined text-base">payments</span>
                <span>{{ formatearMonto(reserva.monto_total) }}</span>
              </div>
            </div>

            <div v-if="reserva.ubicacion_evento" class="mt-3 flex items-start gap-2 text-sm text-[#a3a3a3]">
              <span class="material-symbols-outlined text-base">location_on</span>
              <span class="flex-1">{{ reserva.ubicacion_evento }}</span>
            </div>

            <div class="flex gap-2 mt-4">
              <button 
                @click="abrirDetalleReserva(reserva); cerrarModalDetalleDia()"
                class="flex-1 px-3 py-2 bg-[#00f5d4]/10 hover:bg-[#00f5d4]/20 text-[#00f5d4] rounded-lg text-sm font-medium transition-colors">
                Ver Detalles Completos
              </button>
            </div>
          </div>
        </div>

        <!-- Sin reservas -->
        <div v-else class="text-center py-8">
          <span class="material-symbols-outlined text-[#a3a3a3] text-5xl mb-3 block">event_available</span>
          <p class="text-[#a3a3a3]">No hay reservas para este día</p>
          <p class="text-[#a3a3a3] text-sm mt-1">Día disponible para nuevas reservas</p>
        </div>

        <div class="flex gap-3 mt-6 pt-6 border-t border-white/10">
          <button @click="cerrarModalDetalleDia" class="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-[#f0f0f0] rounded-lg font-medium transition-colors">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Añadir Bloqueo -->
  <div v-if="modalBloqueoAbierto" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-lg border border-white/10">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-semibold text-[#f0f0f0] flex items-center gap-2">
          <span class="material-symbols-outlined text-[#00f5d4]">block</span>
          Añadir Bloqueo de Fechas
        </h3>
        <button @click="cerrarModalBloqueo" class="text-[#a3a3a3] hover:text-[#f0f0f0]">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-[#f0f0f0] mb-2">
            Fecha de Inicio
          </label>
          <input 
            v-model="nuevoBloqueo.fecha_inicio"
            type="date" 
            class="w-full px-4 py-2.5 bg-[#0f0f0f] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]"
            :min="new Date().toISOString().split('T')[0]"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-[#f0f0f0] mb-2">
            Fecha de Fin
          </label>
          <input 
            v-model="nuevoBloqueo.fecha_fin"
            type="date" 
            class="w-full px-4 py-2.5 bg-[#0f0f0f] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]"
            :min="nuevoBloqueo.fecha_inicio || new Date().toISOString().split('T')[0]"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-[#f0f0f0] mb-2">
            Motivo (opcional)
          </label>
          <textarea 
            v-model="nuevoBloqueo.motivo"
            rows="3"
            placeholder="Ej: Vacaciones, evento personal, mantenimiento de equipo..."
            class="w-full px-4 py-2.5 bg-[#0f0f0f] border border-white/10 rounded-lg text-[#f0f0f0] placeholder-[#a3a3a3] focus:outline-none focus:border-[#00f5d4] resize-none"
          ></textarea>
        </div>

        <div class="bg-[#00f5d4]/10 border border-[#00f5d4]/20 rounded-lg p-3 flex gap-3">
          <span class="material-symbols-outlined text-[#00f5d4] text-xl">info</span>
          <p class="text-sm text-[#a3a3a3]">
            Durante estas fechas no recibirás nuevas reservas y aparecerás como no disponible en el calendario.
          </p>
        </div>
      </div>

      <div class="flex gap-3 mt-6">
        <button 
          @click="cerrarModalBloqueo"
          class="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-[#f0f0f0] rounded-lg font-medium transition-colors">
          Cancelar
        </button>
        <button 
          @click="guardarBloqueo"
          class="flex-1 px-4 py-2.5 bg-[#00f5d4] hover:bg-[#00f5d4]/90 text-black rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-lg">save</span>
          Guardar Bloqueo
        </button>
      </div>
    </div>
  </div>

  <!-- Modal Editar Disponibilidad -->
  <div v-if="modalDisponibilidadAbierto" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-semibold text-[#f0f0f0] flex items-center gap-2">
          <span class="material-symbols-outlined text-[#00f5d4]">edit_calendar</span>
          Editar Disponibilidad
        </h3>
        <button @click="cerrarModalDisponibilidad" class="text-[#a3a3a3] hover:text-[#f0f0f0]">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="space-y-6">
        <!-- Disponibilidad General -->
        <div class="bg-[#0f0f0f] rounded-lg p-4 border border-white/10">
          <h4 class="text-[#f0f0f0] font-medium mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-[#00f5d4]">schedule</span>
            Horario General
          </h4>
          
          <div class="space-y-4">
            <!-- Lunes -->
            <div class="flex items-center gap-4">
              <div class="w-24">
                <label class="flex items-center gap-2 text-[#f0f0f0]">
                  <input v-model="horarioDisponibilidad.lunes.activo" type="checkbox" class="w-4 h-4 rounded bg-[#1a1a1a] border-white/20 text-[#00f5d4] focus:ring-[#00f5d4]">
                  <span>Lunes</span>
                </label>
              </div>
              <div class="flex-1 flex gap-3 items-center">
                <input v-model="horarioDisponibilidad.lunes.hora_inicio" type="time" class="px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" :disabled="!horarioDisponibilidad.lunes.activo">
                <span class="text-[#a3a3a3]">-</span>
                <input v-model="horarioDisponibilidad.lunes.hora_fin" type="time" class="px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" :disabled="!horarioDisponibilidad.lunes.activo">
              </div>
            </div>

            <!-- Martes -->
            <div class="flex items-center gap-4">
              <div class="w-24">
                <label class="flex items-center gap-2 text-[#f0f0f0]">
                  <input v-model="horarioDisponibilidad.martes.activo" type="checkbox" class="w-4 h-4 rounded bg-[#1a1a1a] border-white/20 text-[#00f5d4] focus:ring-[#00f5d4]">
                  <span>Martes</span>
                </label>
              </div>
              <div class="flex-1 flex gap-3 items-center">
                <input v-model="horarioDisponibilidad.martes.hora_inicio" type="time" class="px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" :disabled="!horarioDisponibilidad.martes.activo">
                <span class="text-[#a3a3a3]">-</span>
                <input v-model="horarioDisponibilidad.martes.hora_fin" type="time" class="px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" :disabled="!horarioDisponibilidad.martes.activo">
              </div>
            </div>

            <!-- Miércoles -->
            <div class="flex items-center gap-4">
              <div class="w-24">
                <label class="flex items-center gap-2 text-[#f0f0f0]">
                  <input v-model="horarioDisponibilidad.miercoles.activo" type="checkbox" class="w-4 h-4 rounded bg-[#1a1a1a] border-white/20 text-[#00f5d4] focus:ring-[#00f5d4]">
                  <span>Miércoles</span>
                </label>
              </div>
              <div class="flex-1 flex gap-3 items-center">
                <input v-model="horarioDisponibilidad.miercoles.hora_inicio" type="time" class="px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" :disabled="!horarioDisponibilidad.miercoles.activo">
                <span class="text-[#a3a3a3]">-</span>
                <input v-model="horarioDisponibilidad.miercoles.hora_fin" type="time" class="px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" :disabled="!horarioDisponibilidad.miercoles.activo">
              </div>
            </div>

            <!-- Jueves -->
            <div class="flex items-center gap-4">
              <div class="w-24">
                <label class="flex items-center gap-2 text-[#f0f0f0]">
                  <input v-model="horarioDisponibilidad.jueves.activo" type="checkbox" class="w-4 h-4 rounded bg-[#1a1a1a] border-white/20 text-[#00f5d4] focus:ring-[#00f5d4]">
                  <span>Jueves</span>
                </label>
              </div>
              <div class="flex-1 flex gap-3 items-center">
                <input v-model="horarioDisponibilidad.jueves.hora_inicio" type="time" class="px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" :disabled="!horarioDisponibilidad.jueves.activo">
                <span class="text-[#a3a3a3]">-</span>
                <input v-model="horarioDisponibilidad.jueves.hora_fin" type="time" class="px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" :disabled="!horarioDisponibilidad.jueves.activo">
              </div>
            </div>

            <!-- Viernes -->
            <div class="flex items-center gap-4">
              <div class="w-24">
                <label class="flex items-center gap-2 text-[#f0f0f0]">
                  <input v-model="horarioDisponibilidad.viernes.activo" type="checkbox" class="w-4 h-4 rounded bg-[#1a1a1a] border-white/20 text-[#00f5d4] focus:ring-[#00f5d4]">
                  <span>Viernes</span>
                </label>
              </div>
              <div class="flex-1 flex gap-3 items-center">
                <input v-model="horarioDisponibilidad.viernes.hora_inicio" type="time" class="px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" :disabled="!horarioDisponibilidad.viernes.activo">
                <span class="text-[#a3a3a3]">-</span>
                <input v-model="horarioDisponibilidad.viernes.hora_fin" type="time" class="px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" :disabled="!horarioDisponibilidad.viernes.activo">
              </div>
            </div>

            <!-- Sábado -->
            <div class="flex items-center gap-4">
              <div class="w-24">
                <label class="flex items-center gap-2 text-[#f0f0f0]">
                  <input v-model="horarioDisponibilidad.sabado.activo" type="checkbox" class="w-4 h-4 rounded bg-[#1a1a1a] border-white/20 text-[#00f5d4] focus:ring-[#00f5d4]">
                  <span>Sábado</span>
                </label>
              </div>
              <div class="flex-1 flex gap-3 items-center">
                <input v-model="horarioDisponibilidad.sabado.hora_inicio" type="time" class="px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" :disabled="!horarioDisponibilidad.sabado.activo">
                <span class="text-[#a3a3a3]">-</span>
                <input v-model="horarioDisponibilidad.sabado.hora_fin" type="time" class="px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" :disabled="!horarioDisponibilidad.sabado.activo">
              </div>
            </div>

            <!-- Domingo -->
            <div class="flex items-center gap-4">
              <div class="w-24">
                <label class="flex items-center gap-2 text-[#f0f0f0]">
                  <input v-model="horarioDisponibilidad.domingo.activo" type="checkbox" class="w-4 h-4 rounded bg-[#1a1a1a] border-white/20 text-[#00f5d4] focus:ring-[#00f5d4]">
                  <span>Domingo</span>
                </label>
              </div>
              <div class="flex-1 flex gap-3 items-center">
                <input v-model="horarioDisponibilidad.domingo.hora_inicio" type="time" class="px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" :disabled="!horarioDisponibilidad.domingo.activo">
                <span class="text-[#a3a3a3]">-</span>
                <input v-model="horarioDisponibilidad.domingo.hora_fin" type="time" class="px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4]" :disabled="!horarioDisponibilidad.domingo.activo">
              </div>
            </div>
          </div>
        </div>

        <!-- Información -->
        <div class="bg-[#00f5d4]/10 border border-[#00f5d4]/20 rounded-lg p-4 flex gap-3">
          <span class="material-symbols-outlined text-[#00f5d4] text-xl">info</span>
          <div class="text-sm text-[#a3a3a3]">
            <p class="mb-2">Define tu horario de disponibilidad para recibir reservas.</p>
            <ul class="list-disc list-inside space-y-1">
              <li>Desmarca los días que no estés disponible</li>
              <li>Ajusta los horarios según tu preferencia</li>
              <li>Los cambios se aplicarán de inmediato</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex gap-3 mt-6 pt-6 border-t border-white/10">
        <button 
          @click="cerrarModalDisponibilidad"
          class="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-[#f0f0f0] rounded-lg font-medium transition-colors">
          Cancelar
        </button>
        <button 
          @click="guardarDisponibilidad"
          class="flex-1 px-4 py-2.5 bg-[#00f5d4] hover:bg-[#00f5d4]/90 text-black rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-lg">save</span>
          Guardar Cambios
        </button>
      </div>
    </div>
  </div>

  <!-- Notificación Toast -->
  <div v-if="notificacion.visible" class="fixed top-4 right-4 z-[60] animate-fade-in">
    <div :class="[
      'px-6 py-4 rounded-lg shadow-2xl border flex items-center gap-3 min-w-[300px]',
      notificacion.tipo === 'exito' ? 'bg-green-500/90 border-green-400 text-white' : 'bg-red-500/90 border-red-400 text-white'
    ]">
      <span class="material-symbols-outlined text-2xl">
        {{ notificacion.tipo === 'exito' ? 'check_circle' : 'error' }}
      </span>
      <p class="font-medium">{{ notificacion.mensaje }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()

const seccionActual = ref('inicio')

// Estados para datos dinámicos
const estadisticas = ref({
  reservas_activas: 0,
  ganancias_estimadas: 0,
  valoracion_promedio: 0
})

const proximasReservas = ref([])
const cargandoEstadisticas = ref(true)
const cargandoReservas = ref(true)

// Estados para modales
const modalDetalleReservaAbierto = ref(false)
const reservaSeleccionada = ref(null)
const modalNuevoServicioAbierto = ref(false)
const modalEditarServicioAbierto = ref(false)
const modalEliminarServicioAbierto = ref(false)
const servicioSeleccionado = ref(null)

// Estados para servicios
const servicios = ref([])
const categorias = ref([])
const cargandoServicios = ref(false)
const nuevoServicio = ref({
  nombre: '',
  categoria_id: '',
  descripcion: '',
  precio_base: '',
  duracion_horas: '',
  incluye: ''
})

// Estados para reservas completas
const reservas = ref([])
const reservasFiltradas = ref([])
const cargandoReservasCompletas = ref(false)
const filtroReserva = ref('todos')
const busquedaReserva = ref('')
const paginaActual = ref(1)
const reservasPorPagina = 5

// Estados para calendario
const mesActual = ref(new Date().getMonth())
const anioActual = ref(new Date().getFullYear())
const diasConEventos = ref(new Set())
const modalDetalleDiaAbierto = ref(false)
const diaSeleccionado = ref(null)
const reservasDia = ref([])
const bloqueoDelDia = ref(null)
const modalBloqueoAbierto = ref(false)
const modalDisponibilidadAbierto = ref(false)
const nuevoBloqueo = ref({
  fecha_inicio: '',
  fecha_fin: '',
  motivo: ''
})
const horarioDisponibilidad = ref({
  lunes: { activo: true, hora_inicio: '09:00', hora_fin: '18:00' },
  martes: { activo: true, hora_inicio: '09:00', hora_fin: '18:00' },
  miercoles: { activo: true, hora_inicio: '09:00', hora_fin: '18:00' },
  jueves: { activo: true, hora_inicio: '09:00', hora_fin: '18:00' },
  viernes: { activo: true, hora_inicio: '09:00', hora_fin: '18:00' },
  sabado: { activo: false, hora_inicio: '10:00', hora_fin: '14:00' },
  domingo: { activo: false, hora_inicio: '10:00', hora_fin: '14:00' }
})
const bloqueos = ref([])
const diasBloqueados = ref(new Set())

// Estados para notificaciones
const notificacion = ref({
  visible: false,
  tipo: 'exito',
  mensaje: ''
})

// Función para mostrar notificación
const mostrarNotificacion = (mensaje, tipo = 'exito') => {
  notificacion.value = {
    visible: true,
    tipo,
    mensaje
  }
  setTimeout(() => {
    notificacion.value.visible = false
  }, 3000)
}

// Contador de notificaciones (puedes hacerlo dinámico después)
const cantidadNotificaciones = computed(() => estadisticas.value.reservas_activas || 0)

// Computed para calendario
const nombreMes = computed(() => {
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  return `${meses[mesActual.value]} ${anioActual.value}`
})

const diasDelMes = computed(() => {
  const primerDia = new Date(anioActual.value, mesActual.value, 1)
  const ultimoDia = new Date(anioActual.value, mesActual.value + 1, 0)
  const diasMesAnterior = new Date(anioActual.value, mesActual.value, 0).getDate()
  const primerDiaSemana = primerDia.getDay()
  
  // Actualizar días bloqueados para el mes actual
  actualizarDiasBloqueados()
  
  const dias = []
  
  // Días del mes anterior
  for (let i = primerDiaSemana - 1; i >= 0; i--) {
    const mesAnterior = mesActual.value === 0 ? 11 : mesActual.value - 1
    const anioAnterior = mesActual.value === 0 ? anioActual.value - 1 : anioActual.value
    const fechaCompleta = `${anioAnterior}-${String(mesAnterior + 1).padStart(2, '0')}-${String(diasMesAnterior - i).padStart(2, '0')}`
    dias.push({
      dia: diasMesAnterior - i,
      esDelMesActual: false,
      fecha: fechaCompleta
    })
  }
  
  // Días del mes actual
  for (let i = 1; i <= ultimoDia.getDate(); i++) {
    const fechaCompleta = `${anioActual.value}-${String(mesActual.value + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    const esHoy = i === new Date().getDate() && mesActual.value === new Date().getMonth() && anioActual.value === new Date().getFullYear()
    const tieneEvento = diasConEventos.value.has(fechaCompleta)
    const estaBloqueado = diasBloqueados.value.has(i)
    
    dias.push({
      dia: i,
      esDelMesActual: true,
      esHoy,
      tieneEvento,
      estaBloqueado,
      fecha: fechaCompleta
    })
  }
  
  // Días del mes siguiente para completar la semana
  const diasRestantes = 42 - dias.length
  for (let i = 1; i <= diasRestantes; i++) {
    const mesSiguiente = mesActual.value === 11 ? 0 : mesActual.value + 1
    const anioSiguiente = mesActual.value === 11 ? anioActual.value + 1 : anioActual.value
    const fechaCompleta = `${anioSiguiente}-${String(mesSiguiente + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    dias.push({
      dia: i,
      esDelMesActual: false,
      fecha: fechaCompleta
    })
  }
  
  return dias
})

const nombreArtista = computed(() => {
  return authStore.usuario?.nombre || 'Alex'
})

const iniciales = computed(() => {
  const nombre = authStore.usuario?.nombre || 'A'
  const nombres = nombre.split(' ')
  return nombres.length > 1 
    ? nombres[0][0] + nombres[1][0] 
    : nombres[0][0]
})

// Cargar todas las reservas del artista
const cargarTodasReservas = async () => {
  cargandoReservasCompletas.value = true
  try {
    const idArtista = authStore.usuario?.id
    
    if (!idArtista) {
      console.error('No se encontró el ID del artista')
      cargandoReservasCompletas.value = false
      return
    }
    
    const response = await axios.get(`http://localhost:3000/api/contratos/artista/${idArtista}`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    
    if (response.data.exito) {
      reservas.value = response.data.datos
      aplicarFiltros()
    }
  } catch (error) {
    console.error('Error al cargar reservas:', error)
    console.error('Respuesta del servidor:', error.response?.data)
  } finally {
    cargandoReservasCompletas.value = false
  }
}

// Aplicar filtros a las reservas
const aplicarFiltros = () => {
  let resultado = [...reservas.value]
  
  // Filtro por estado
  if (filtroReserva.value !== 'todos') {
    resultado = resultado.filter(r => r.estado === filtroReserva.value)
  }
  
  // Filtro por búsqueda
  if (busquedaReserva.value.trim()) {
    const busqueda = busquedaReserva.value.toLowerCase()
    resultado = resultado.filter(r => 
      (r.cliente_nombre && r.cliente_nombre.toLowerCase().includes(busqueda)) ||
      (r.servicio_nombre && r.servicio_nombre.toLowerCase().includes(busqueda))
    )
  }
  
  reservasFiltradas.value = resultado
  paginaActual.value = 1
}

// Cambiar filtro
const cambiarFiltroReserva = (filtro) => {
  filtroReserva.value = filtro
  aplicarFiltros()
}

// Watch para búsqueda en tiempo real
const buscarReservas = () => {
  aplicarFiltros()
}

// Reservas paginadas
const reservasPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * reservasPorPagina
  const fin = inicio + reservasPorPagina
  return reservasFiltradas.value.slice(inicio, fin)
})

const totalPaginas = computed(() => {
  return Math.ceil(reservasFiltradas.value.length / reservasPorPagina)
})

const paginaAnterior = () => {
  if (paginaActual.value > 1) {
    paginaActual.value--
  }
}

const paginaSiguiente = () => {
  if (paginaActual.value < totalPaginas.value) {
    paginaActual.value++
  }
}

// Obtener clase de estado
const obtenerClaseEstado = (estado) => {
  const estados = {
    pendiente: { bg: 'bg-yellow-400/20', text: 'text-yellow-400', dot: 'bg-yellow-400' },
    firmado: { bg: 'bg-blue-400/20', text: 'text-blue-400', dot: 'bg-blue-400' },
    confirmado: { bg: 'bg-green-400/20', text: 'text-green-400', dot: 'bg-green-400' },
    en_progreso: { bg: 'bg-purple-400/20', text: 'text-purple-400', dot: 'bg-purple-400' },
    completado: { bg: 'bg-gray-400/20', text: 'text-gray-400', dot: 'bg-gray-400' },
    cancelado: { bg: 'bg-red-400/20', text: 'text-red-400', dot: 'bg-red-400' },
    en_disputa: { bg: 'bg-orange-400/20', text: 'text-orange-400', dot: 'bg-orange-400' }
  }
  return estados[estado] || estados.pendiente
}

const obtenerTextoEstado = (estado) => {
  const textos = {
    pendiente: 'Pendiente',
    firmado: 'Firmado',
    confirmado: 'Confirmada',
    en_progreso: 'En Progreso',
    completado: 'Completada',
    cancelado: 'Cancelada',
    en_disputa: 'En Disputa'
  }
  return textos[estado] || estado
}

// Confirmar reserva
const confirmarReserva = async (reserva) => {
  try {
    await axios.put(
      `http://localhost:3000/api/contratos/${reserva.id}/estado`,
      { estado: 'confirmado' },
      { headers: { Authorization: `Bearer ${authStore.token}` } }
    )
    
    // Recargar reservas
    await cargarTodasReservas()
    await cargarEstadisticas()
  } catch (error) {
    console.error('Error al confirmar reserva:', error)
    alert('Error al confirmar la reserva')
  }
}

// Rechazar reserva
const rechazarReserva = async (reserva) => {
  try {
    await axios.put(
      `http://localhost:3000/api/contratos/${reserva.id}/estado`,
      { estado: 'cancelado' },
      { headers: { Authorization: `Bearer ${authStore.token}` } }
    )
    
    // Recargar reservas
    await cargarTodasReservas()
    await cargarEstadisticas()
  } catch (error) {
    console.error('Error al rechazar reserva:', error)
    alert('Error al rechazar la reserva')
  }
}

// Cargar estadísticas del artista
const cargarEstadisticas = async () => {
  try {
    cargandoEstadisticas.value = true
    const response = await axios.get('http://localhost:3000/api/contratos/artista/estadisticas', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })
    estadisticas.value = response.data
  } catch (error) {
    console.error('Error al cargar estadísticas:', error)
  } finally {
    cargandoEstadisticas.value = false
  }
}

// Cargar próximas reservas
const cargarProximasReservas = async () => {
  try {
    cargandoReservas.value = true
    const response = await axios.get('http://localhost:3000/api/contratos/artista/proximas-reservas', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })
    proximasReservas.value = response.data
  } catch (error) {
    console.error('Error al cargar próximas reservas:', error)
  } finally {
    cargandoReservas.value = false
  }
}

// Formatear fecha
const formatearFecha = (fecha) => {
  const opciones = { day: '2-digit', month: 'short', year: 'numeric' }
  return new Date(fecha).toLocaleDateString('es-ES', opciones)
}

// Formatear monto
const formatearMonto = (monto) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  }).format(monto)
}

// Obtener icono según el servicio
const obtenerIconoServicio = (servicio) => {
  if (!servicio) return 'event'
  const servicioLower = servicio.toLowerCase()
  if (servicioLower.includes('música') || servicioLower.includes('acústico')) return 'music_note'
  if (servicioLower.includes('magia')) return 'cake'
  if (servicioLower.includes('gala') || servicioLower.includes('corporativ')) return 'celebration'
  return 'event'
}

// Funciones para modales
const abrirDetalleReserva = (reserva) => {
  reservaSeleccionada.value = reserva
  modalDetalleReservaAbierto.value = true
}

const cerrarDetalleReserva = () => {
  modalDetalleReservaAbierto.value = false
  reservaSeleccionada.value = null
}

const abrirModalNuevoServicio = () => {
  modalNuevoServicioAbierto.value = true
}

const cerrarModalNuevoServicio = () => {
  modalNuevoServicioAbierto.value = false
}

const irANotificaciones = () => {
  seccionActual.value = 'mensajes'
}

const contactarCliente = (reserva) => {
  // Aquí puedes implementar lógica para abrir el chat con el cliente específico
  cerrarDetalleReserva()
  seccionActual.value = 'mensajes'
  // TODO: Seleccionar la conversación del cliente automáticamente
}

const mesAnterior = () => {
  if (mesActual.value === 0) {
    mesActual.value = 11
    anioActual.value--
  } else {
    mesActual.value--
  }
}

const mesSiguiente = () => {
  if (mesActual.value === 11) {
    mesActual.value = 0
    anioActual.value++
  } else {
    mesActual.value++
  }
}

// Manejar clic en día del calendario
const verDetalleDia = (diaObj) => {
  if (!diaObj.fecha) return
  
  diaSeleccionado.value = diaObj
  
  // Filtrar reservas para ese día
  reservasDia.value = proximasReservas.value.filter(reserva => {
    const fechaReserva = reserva.fecha_evento.split('T')[0]
    return fechaReserva === diaObj.fecha
  })
  
  // Buscar si hay un bloqueo para este día
  bloqueoDelDia.value = bloqueos.value.find(bloqueo => {
    // Convertir fechas a formato YYYY-MM-DD para comparar solo días
    const fechaInicio = new Date(bloqueo.fecha_inicio)
    const fechaFin = new Date(bloqueo.fecha_fin)
    const fechaDia = new Date(diaObj.fecha)
    const toYMD = d => d.toISOString().slice(0, 10)
    return toYMD(fechaDia) >= toYMD(fechaInicio) && toYMD(fechaDia) <= toYMD(fechaFin)
  })
  
  modalDetalleDiaAbierto.value = true
}

const cerrarModalDetalleDia = () => {
  modalDetalleDiaAbierto.value = false
  diaSeleccionado.value = null
  reservasDia.value = []
  bloqueoDelDia.value = null
}

// Funciones para gestionar bloqueos
const abrirModalBloqueo = () => {
  modalBloqueoAbierto.value = true
}

const cerrarModalBloqueo = () => {
  modalBloqueoAbierto.value = false
  nuevoBloqueo.value = {
    fecha_inicio: '',
    fecha_fin: '',
    motivo: ''
  }
}

const guardarBloqueo = async () => {
  if (!nuevoBloqueo.value.fecha_inicio || !nuevoBloqueo.value.fecha_fin) {
    mostrarNotificacion('Por favor, completa las fechas de inicio y fin', 'error')
    return
  }

  // Validar que la fecha de inicio no sea posterior a la de fin
  if (new Date(nuevoBloqueo.value.fecha_inicio) > new Date(nuevoBloqueo.value.fecha_fin)) {
    mostrarNotificacion('La fecha de inicio no puede ser posterior a la fecha de fin', 'error')
    return
  }

  try {
    const token = localStorage.getItem('token')
    const respuesta = await axios.post(
      'http://localhost:3000/api/disponibilidad/bloqueos',
      {
        fecha_inicio: nuevoBloqueo.value.fecha_inicio,
        fecha_fin: nuevoBloqueo.value.fecha_fin,
        motivo: nuevoBloqueo.value.motivo
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    if (respuesta.data.exito) {
      mostrarNotificacion('Bloqueo guardado exitosamente', 'exito')
      cerrarModalBloqueo()
      // Recargar bloqueos
      await cargarBloqueos()
      // Actualizar calendario
      await cargarTodasReservas()
    }
  } catch (error) {
    console.error('Error al guardar bloqueo:', error)
    if (error.response?.data?.mensaje) {
      mostrarNotificacion(error.response.data.mensaje, 'error')
    } else {
      mostrarNotificacion('Error al guardar el bloqueo', 'error')
    }
  }
}

// Funciones para gestionar disponibilidad
const abrirModalDisponibilidad = async () => {
  // Cargar el horario actual antes de abrir el modal
  await cargarHorarioDisponibilidad()
  modalDisponibilidadAbierto.value = true
}

const cerrarModalDisponibilidad = () => {
  modalDisponibilidadAbierto.value = false
}

const guardarDisponibilidad = async () => {
  try {
    const token = localStorage.getItem('token')
    const respuesta = await axios.put(
      'http://localhost:3000/api/disponibilidad/horario',
      { horario: horarioDisponibilidad.value },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    if (respuesta.data.exito) {
      mostrarNotificacion('Horario actualizado exitosamente', 'exito')
      cerrarModalDisponibilidad()
    }
  } catch (error) {
    console.error('Error al guardar disponibilidad:', error)
    if (error.response?.data?.mensaje) {
      mostrarNotificacion(error.response.data.mensaje, 'error')
    } else {
      mostrarNotificacion('Error al actualizar el horario', 'error')
    }
  }
}

// Cargar horario de disponibilidad desde el backend
const cargarHorarioDisponibilidad = async () => {
  try {
    const token = localStorage.getItem('token')
    const respuesta = await axios.get(
      'http://localhost:3000/api/disponibilidad/horario',
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    if (respuesta.data.exito && respuesta.data.datos) {
      horarioDisponibilidad.value = respuesta.data.datos
    }
  } catch (error) {
    console.error('Error al cargar horario:', error)
  }
}



// Modal de confirmación para eliminar bloqueo
const modalConfirmarEliminar = reactive({
  visible: false,
  bloqueoId: null
})

const confirmarEliminarBloqueo = (bloqueoId) => {
  cerrarModalDetalleDia();
  setTimeout(() => {
    modalConfirmarEliminar.visible = true;
    modalConfirmarEliminar.bloqueoId = bloqueoId;
  }, 200);
}

const eliminarBloqueoConfirmado = async () => {
  const bloqueoId = modalConfirmarEliminar.bloqueoId
  modalConfirmarEliminar.visible = false
  if (!bloqueoId) return
  try {
    const token = localStorage.getItem('token')
    const respuesta = await axios.delete(
      `http://localhost:3000/api/disponibilidad/bloqueos/${bloqueoId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    if (respuesta.data.exito) {
      mostrarNotificacion('Bloqueo eliminado exitosamente. Día habilitado', 'exito')
      cerrarModalDetalleDia()
      await cargarBloqueos()
      await cargarTodasReservas()
    }
  } catch (error) {
    console.error('Error al eliminar bloqueo:', error)
    if (error.response?.data?.mensaje) {
      mostrarNotificacion(error.response.data.mensaje, 'error')
    } else {
      mostrarNotificacion('Error al eliminar el bloqueo', 'error')
    }
  }
}

// Cargar bloqueos del artista
const cargarBloqueos = async () => {
  try {
    const token = localStorage.getItem('token')
    const respuesta = await axios.get(
      'http://localhost:3000/api/disponibilidad/bloqueos',
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    if (respuesta.data.exito) {
      bloqueos.value = respuesta.data.datos
      actualizarDiasBloqueados()
    }
  } catch (error) {
    console.error('Error al cargar bloqueos:', error)
  }
}

// Formatear fecha de bloqueo para mostrar
const formatearFechaBloqueo = (fecha) => {
  const date = new Date(fecha)
  const opciones = { day: 'numeric', month: 'long', year: 'numeric' }
  return date.toLocaleDateString('es-ES', opciones)
}

// Actualizar set de días bloqueados
const actualizarDiasBloqueados = () => {
  diasBloqueados.value.clear()
  
  bloqueos.value.forEach(bloqueo => {
    const fechaInicio = new Date(bloqueo.fecha_inicio)
    const fechaFin = new Date(bloqueo.fecha_fin)
    
    // Iterar desde fecha_inicio hasta fecha_fin
    const fechaActual = new Date(fechaInicio)
    while (fechaActual <= fechaFin) {
      // Solo agregar si es del mes actual
      if (fechaActual.getMonth() === mesActual.value && fechaActual.getFullYear() === anioActual.value) {
        diasBloqueados.value.add(fechaActual.getDate())
      }
      fechaActual.setDate(fechaActual.getDate() + 1)
    }
  })
}

// Procesar fechas de eventos para el calendario
const procesarFechasEventos = () => {
  diasConEventos.value = new Set()
  proximasReservas.value.forEach(reserva => {
    const fecha = new Date(reserva.fecha_evento)
    const fechaString = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`
    diasConEventos.value.add(fechaString)
  })
}

// Funciones para servicios
const cargarServicios = async () => {
  try {
    cargandoServicios.value = true
    const response = await axios.get('http://localhost:3000/api/servicios', {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    servicios.value = response.data
  } catch (error) {
    console.error('Error al cargar servicios:', error)
  } finally {
    cargandoServicios.value = false
  }
}

const cargarCategorias = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/categorias')
    categorias.value = response.data.datos || response.data
  } catch (error) {
    console.error('Error al cargar categorías:', error)
  }
}

const abrirModalEditarServicio = (servicio) => {
  servicioSeleccionado.value = { ...servicio }
  modalEditarServicioAbierto.value = true
}

const cerrarModalEditarServicio = () => {
  modalEditarServicioAbierto.value = false
  servicioSeleccionado.value = null
}

const abrirModalEliminarServicio = (servicio) => {
  servicioSeleccionado.value = servicio
  modalEliminarServicioAbierto.value = true
}

const cerrarModalEliminarServicio = () => {
  modalEliminarServicioAbierto.value = false
  servicioSeleccionado.value = null
}

const confirmarCrearServicio = async () => {
  try {
    await axios.post('http://localhost:3000/api/servicios', nuevoServicio.value, {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    cerrarModalNuevoServicio()
    cargarServicios()
    // Resetear formulario
    nuevoServicio.value = {
      nombre: '',
      categoria_id: '',
      descripcion: '',
      precio_base: '',
      duracion_horas: '',
      incluye: ''
    }
  } catch (error) {
    console.error('Error al crear servicio:', error)
    alert('Error al crear el servicio')
  }
}

const confirmarEditarServicio = async () => {
  try {
    await axios.put(`http://localhost:3000/api/servicios/${servicioSeleccionado.value.id}`, servicioSeleccionado.value, {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    cerrarModalEditarServicio()
    cargarServicios()
  } catch (error) {
    console.error('Error al editar servicio:', error)
    alert('Error al editar el servicio')
  }
}

const confirmarEliminarServicio = async () => {
  try {
    await axios.delete(`http://localhost:3000/api/servicios/${servicioSeleccionado.value.id}`, {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    cerrarModalEliminarServicio()
    cargarServicios()
  } catch (error) {
    console.error('Error al eliminar servicio:', error)
    alert('Error al eliminar el servicio')
  }
}

const toggleEstadoServicio = async (servicio) => {
  try {
    await axios.patch(`http://localhost:3000/api/servicios/${servicio.id}/estado`, {
      esta_activo: !servicio.esta_activo
    }, {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    cargarServicios()
  } catch (error) {
    console.error('Error al cambiar estado:', error)
    alert('Error al cambiar el estado del servicio')
  }
}

function cerrarSesion() {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    authStore.cerrarSesion()
    router.push('/login')
  }
}

onMounted(() => {
  cargarEstadisticas()
  cargarProximasReservas().then(() => {
    procesarFechasEventos()
  })
  cargarServicios()
  cargarCategorias()
  cargarTodasReservas()
  cargarBloqueos()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  font-size: 24px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>

