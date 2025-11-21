<template>
  <div class="min-h-screen bg-[#000000] flex">
    <!-- Sidebar -->
    <aside class="sticky top-0 h-screen w-64 shrink-0 bg-[#181818] p-4 border-r border-white/5 hidden md:flex flex-col">
      <div class="flex flex-col gap-4">
        <!-- Logo -->
        <div class="flex items-center gap-3 mb-4">
          <div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#00f5d4]">
            <span class="text-black font-bold text-xl">ST</span>
          </div>
          <div class="flex flex-col">
            <h1 class="text-white text-base font-medium">ShowTime Hub</h1>
            <p class="text-gray-400 text-sm">Marketplace Profesional</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex flex-col gap-2">
          <button
            @click="seccionActual = 'inicio'"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg text-left',
              seccionActual === 'inicio' ? 'bg-[#00f5d4] text-black' : 'text-white hover:bg-white/10'
            ]"
          >
            <span class="material-symbols-outlined" :class="seccionActual === 'inicio' ? 'fill' : ''">home</span>
            <span class="text-sm font-medium">Inicio</span>
          </button>

          <button
            @click="seccionActual = 'reservas'"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg text-left',
              seccionActual === 'reservas' ? 'bg-[#00f5d4] text-black' : 'text-white hover:bg-white/10'
            ]"
          >
            <span class="material-symbols-outlined" :class="seccionActual === 'reservas' ? 'fill' : ''">calendar_month</span>
            <span class="text-sm font-medium">Mis Reservas</span>
          </button>

          <button
            @click="seccionActual = 'favoritos'"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg text-left',
              seccionActual === 'favoritos' ? 'bg-[#00f5d4] text-black' : 'text-white hover:bg-white/10'
            ]"
          >
            <span class="material-symbols-outlined" :class="seccionActual === 'favoritos' ? 'fill' : ''">favorite</span>
            <span class="text-sm font-medium">Artistas Favoritos</span>
          </button>

          <button
            @click="seccionActual = 'mensajes'"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg text-left',
              seccionActual === 'mensajes' ? 'bg-[#00f5d4] text-black' : 'text-white hover:bg-white/10'
            ]"
          >
            <span class="material-symbols-outlined" :class="seccionActual === 'mensajes' ? 'fill' : ''">mail</span>
            <span class="text-sm font-medium">Mensajes</span>
          </button>

          <button
            @click="seccionActual = 'notificaciones'"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg text-left',
              seccionActual === 'notificaciones' ? 'bg-[#00f5d4] text-black' : 'text-white hover:bg-white/10'
            ]"
          >
            <span class="material-symbols-outlined" :class="seccionActual === 'notificaciones' ? 'fill' : ''">notifications</span>
            <span class="text-sm font-medium">Notificaciones</span>
          </button>

          <button
            @click="seccionActual = 'perfil'"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg text-left',
              seccionActual === 'perfil' ? 'bg-[#00f5d4] text-black' : 'text-white hover:bg-white/10'
            ]"
          >
            <span class="material-symbols-outlined" :class="seccionActual === 'perfil' ? 'fill' : ''">person</span>
            <span class="text-sm font-medium">Perfil</span>
          </button>

          <button
            @click="seccionActual = 'pagos'"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg text-left',
              seccionActual === 'pagos' ? 'bg-[#00f5d4] text-black' : 'text-white hover:bg-white/10'
            ]"
          >
            <span class="material-symbols-outlined" :class="seccionActual === 'pagos' ? 'fill' : ''">payments</span>
            <span class="text-sm font-medium">Historial de Pagos</span>
          </button>
        </nav>

        <!-- Botón de Cerrar Sesión -->
        <div class="mt-auto pt-4 border-t border-white/10">
          <button
            @click="abrirModalCerrarSesion"
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-red-500/20 w-full text-left"
          >
            <span class="material-symbols-outlined">logout</span>
            <span class="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div class="max-w-7xl mx-auto">
        
        <!-- Sección Inicio -->
        <div v-if="seccionActual === 'inicio'">
          <!-- Header -->
          <header class="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div class="flex flex-col gap-1">
              <h1 class="text-[#f0f0f0] text-4xl font-black leading-tight tracking-[-0.033em]">¡Bienvenido de nuevo, {{ authStore.usuario?.email?.split('@')[0] || 'Usuario' }}!</h1>
              <p class="text-[#a0a0a0] text-base font-normal leading-normal">Aquí tienes un resumen de tu actividad.</p>
            </div>
            <div class="flex items-center gap-4">
              <router-link to="/artistas" class="flex items-center justify-center size-10 rounded-full hover:bg-white/10 text-[#f0f0f0] transition-colors cursor-pointer">
                <span class="material-symbols-outlined">search</span>
              </router-link>
              <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 bg-[#00BCD4] flex items-center justify-center text-white font-bold text-xl">
                {{ (authStore.usuario?.email?.[0] || 'U').toUpperCase() }}
              </div>
            </div>
          </header>

          <!-- Próximas Reservas -->
          <section class="mb-10">
            <h2 class="text-[#f0f0f0] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Próximas Reservas</h2>
            <div v-if="cargandoReservas" class="text-center py-8 text-gray-400">
              Cargando reservas...
            </div>
            <div v-else-if="proximasReservas.length === 0" class="text-center py-8 text-gray-400">
              No tienes reservas próximas
            </div>
            <div v-else class="flex overflow-x-auto gap-4 p-4">
              <div v-for="reserva in proximasReservas" :key="reserva.id" class="flex h-full flex-1 flex-col gap-3 rounded-xl bg-[#181818] shadow-[0_0_4px_rgba(0,0,0,0.1)] min-w-60 max-w-72">
                <div class="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-t-xl" :style="`background-image: url('https://picsum.photos/350/250');`"></div>
                <div class="flex flex-col flex-1 justify-between p-3 pt-0 gap-3">
                  <div>
                    <p class="text-[#f0f0f0] text-base font-semibold leading-tight">
                      {{ reserva.nombre_artistico || `${reserva.artista_nombre || ''} ${reserva.artista_apellido || ''}`.trim() || reserva.artista_email }}
                    </p>
                    <div class="flex items-center gap-2 mt-1">
                      <p class="text-[#a0a0a0] text-xs font-normal leading-normal">{{ formatearFecha(reserva.fecha_evento) }}</p>
                      <span :class="[
                        'inline-block px-2 py-0.5 text-xs font-semibold rounded-full',
                        reserva.estado === 'confirmado' ? 'bg-green-500/20 text-green-400' : 
                        reserva.estado === 'pendiente' ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-gray-500/20 text-gray-400'
                      ]">{{ reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1) }}</span>
                    </div>
                  </div>
                  <button @click="verDetalleReserva(reserva)" class="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-[#00f5d4] text-black text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#00f5d4]/80">
                    <span class="truncate">Ver Detalles</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Artistas Favoritos -->
          <section class="mb-10">
            <h2 class="text-[#f0f0f0] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Tus Artistas Favoritos</h2>
            <div v-if="cargandoFavoritos" class="text-center py-8 text-gray-400">
              Cargando favoritos...
            </div>
            <div v-else-if="favoritosDestacados.length === 0" class="text-center py-8 text-gray-400">
              No tienes artistas favoritos aún
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
              <div v-for="favorito in favoritosDestacados" :key="favorito.id" class="group relative flex flex-col gap-2 cursor-pointer hover:scale-105 transition-transform">
                <div class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl" :style="`background-image: url('${favorito.foto_perfil || 'https://picsum.photos/400'}');`"></div>
                <div class="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-b-xl">
                  <p class="text-[#f0f0f0] text-base font-semibold leading-normal">
                    {{ favorito.nombre_artistico || `${favorito.nombre || ''} ${favorito.apellido || ''}`.trim() || favorito.email }}
                  </p>
                  <p v-if="favorito.ciudad" class="text-[#a0a0a0] text-sm mt-1">{{ favorito.ciudad }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Sección Mis Reservas -->
        <div v-if="seccionActual === 'reservas'">
          <!-- Header -->
          <header class="flex flex-wrap justify-between items-center gap-6 mb-8">
            <div class="flex flex-col gap-1">
              <h1 class="text-[#f0f0f0] text-4xl font-black leading-tight tracking-[-0.033em]">Mis Reservas</h1>
              <p class="text-[#a0a0a0] text-base font-normal leading-normal">Gestiona todas tus reservas pasadas, actuales y futuras.</p>
            </div>
            <div class="flex items-center gap-4">
              <button class="flex items-center justify-center size-10 rounded-full hover:bg-white/10 text-[#f0f0f0]">
                <span class="material-symbols-outlined">search</span>
              </button>
              <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDTf93qIt4Her6Mw5FkNCBb6ry_OkWqMy8YBwazO_ot-FwFxqOg2WgbUCUh4eDTJzNXI-JTAhIXC4cFaStvj8z65-2NWVgJtGxShBlx5P5NBxcedH-kX38GqF9UezKdE_p46TNE77A_getwAmBGhJ-lvHbCXRHNJpDSLUq370l0HSsFFqM3pSNTXPynPzMEt7G-gI_N-ouk45K9VaFHpOgk3Pq6p7fj__o-QjimSME6pS1LRKcMzj55u6D32b5QR374fcPLAG5JlA");'></div>
            </div>
          </header>

          <!-- Filtros -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div class="relative w-full sm:max-w-xs">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a0a0]">search</span>
              <input v-model="busquedaReservas" class="w-full bg-[#181818] border border-white/10 rounded-lg h-10 pl-10 pr-4 text-[#f0f0f0] placeholder:text-[#a0a0a0] focus:ring-2 focus:ring-[#00f5d4] focus:border-[#00f5d4]" placeholder="Buscar por artista o servicio..." type="text"/>
            </div>
            <div class="flex items-center gap-2">
              <button @click="filtroEstadoReserva = ''" :class="[
                'px-4 py-2 text-sm font-semibold rounded-lg',
                filtroEstadoReserva === '' ? 'bg-[#00f5d4] text-black' : 'text-[#f0f0f0] bg-white/10 hover:bg-white/20'
              ]">Todas</button>
              <button @click="filtroEstadoReserva = 'confirmado'" :class="[
                'px-4 py-2 text-sm font-semibold rounded-lg',
                filtroEstadoReserva === 'confirmado' ? 'bg-[#00f5d4] text-black' : 'text-[#f0f0f0] bg-white/10 hover:bg-white/20'
              ]">Activas</button>
              <button @click="filtroEstadoReserva = 'completado'" :class="[
                'px-4 py-2 text-sm font-semibold rounded-lg',
                filtroEstadoReserva === 'completado' ? 'bg-[#00f5d4] text-black' : 'text-[#f0f0f0] bg-white/10 hover:bg-white/20'
              ]">Completadas</button>
              <button @click="filtroEstadoReserva = 'cancelado'" :class="[
                'px-4 py-2 text-sm font-semibold rounded-lg',
                filtroEstadoReserva === 'cancelado' ? 'bg-[#00f5d4] text-black' : 'text-[#f0f0f0] bg-white/10 hover:bg-white/20'
              ]">Canceladas</button>
            </div>
          </div>

          <!-- Lista de Reservas -->
          <div v-if="cargandoReservas" class="text-center py-8 text-gray-400">
            Cargando reservas...
          </div>
          <div v-else-if="reservasFiltradas.length === 0" class="text-center py-8 text-gray-400">
            No se encontraron reservas
          </div>
          <div v-else class="flex flex-col gap-4">
            <div v-for="reserva in reservasFiltradas" :key="reserva.id" class="bg-[#181818] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div class="w-full sm:w-24 h-24 sm:h-20 sm:flex-shrink-0 bg-center bg-no-repeat bg-cover rounded-lg" :style="`background-image: url('${reserva.imagen_artista || 'https://picsum.photos/200'}');`"></div>
              <div class="flex-grow grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                <div>
                  <p class="text-xs text-[#a0a0a0] uppercase tracking-wider">Artista</p>
                  <p class="text-[#f0f0f0] font-semibold">{{ reserva.artista_nombre }}</p>
                </div>
                <div>
                  <p class="text-xs text-[#a0a0a0] uppercase tracking-wider">Fecha</p>
                  <p class="text-[#f0f0f0]">{{ formatearFecha(reserva.fecha_evento) }}</p>
                </div>
                <div>
                  <p class="text-xs text-[#a0a0a0] uppercase tracking-wider">Servicio</p>
                  <p class="text-[#f0f0f0]">{{ reserva.servicio }}</p>
                </div>
                <div>
                  <p class="text-xs text-[#a0a0a0] uppercase tracking-wider">Monto</p>
                  <p class="text-[#f0f0f0]">{{ formatearMonto(reserva.monto_total, reserva.moneda) }}</p>
                </div>
              </div>
              <div class="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:ml-4">
                <span :class="[
                  'inline-block text-center px-3 py-1 text-xs font-semibold rounded-full',
                  reserva.estado === 'confirmado' ? 'bg-green-500/20 text-green-400' :
                  reserva.estado === 'pendiente' ? 'bg-yellow-500/20 text-yellow-400' :
                  reserva.estado === 'completado' ? 'bg-gray-500/20 text-gray-400' :
                  'bg-red-500/20 text-red-400'
                ]">{{ reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1) }}</span>
                <button @click="verDetalleReserva(reserva)" :class="[
                  'flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em]',
                  reserva.estado === 'confirmado' || reserva.estado === 'pendiente' ? 'bg-[#00f5d4] text-black hover:bg-[#00f5d4]/80' : 'bg-white/10 text-[#f0f0f0] hover:bg-white/20'
                ]">
                  <span class="truncate">{{ reserva.estado === 'pendiente' ? 'Gestionar Reserva' : 'Ver Detalles' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección Artistas Favoritos -->
        <div v-if="seccionActual === 'favoritos'">
          <!-- Header -->
          <header class="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div class="flex flex-col gap-1">
              <h1 class="text-[#f0f0f0] text-4xl font-black leading-tight tracking-[-0.033em]">Artistas Favoritos</h1>
              <p class="text-[#a0a0a0] text-base font-normal leading-normal">Tus artistas guardados en un solo lugar.</p>
            </div>
            <div class="flex items-center gap-4">
              <button class="flex items-center justify-center size-10 rounded-full hover:bg-white/10 text-[#f0f0f0]">
                <span class="material-symbols-outlined">search</span>
              </button>
              <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDTf93qIt4Her6Mw5FkNCBb6ry_OkWqMy8YBwazO_ot-FwFxqOg2WgbUCUh4eDTJzNXI-JTAhIXC4cFaStvj8z65-2NWVgJtGxShBlx5P5NBxcedH-kX38GqF9UezKdE_p46TNE77A_getwAmBGhJ-lvHbCXRHNJpDSLUq370l0HSsFFqM3pSNTXPynPzMEt7G-gI_N-ouk45K9VaFHpOgk3Pq6p7fj__o-QjimSME6pS1LRKcMzj55u6D32b5QR374fcPLAG5JlA");'></div>
            </div>
          </header>

          <!-- Grid de Favoritos -->
          <section>
            <div v-if="cargandoFavoritos" class="text-center py-8 text-gray-400">
              Cargando favoritos...
            </div>
            <div v-else-if="favoritos.length === 0" class="text-center py-8 text-gray-400">
              No tienes artistas favoritos aún
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div v-for="favorito in favoritos" :key="favorito.id_favorito" class="flex flex-col bg-[#181818] rounded-xl overflow-hidden group">
                <div class="relative">
                  <div class="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover" :style="`background-image: url('${favorito.foto_perfil || 'https://picsum.photos/400/300'}');`"></div>
                  <button @click="abrirModalEliminarFavorito(favorito)" class="absolute top-3 right-3 flex items-center justify-center size-9 bg-black/50 backdrop-blur-sm rounded-full text-[#00f5d4] hover:bg-black/70 transition-colors">
                    <span class="material-symbols-outlined fill">favorite</span>
                  </button>
                </div>
                <div class="p-4 flex flex-col flex-grow">
                  <h3 class="text-lg font-bold text-[#f0f0f0]">{{ favorito.nombre_artistico || favorito.nombre }}</h3>
                  <p class="text-sm text-[#a0a0a0] mb-4">{{ favorito.categoria }}</p>
                  <div class="mt-auto">
                    <button @click="verPerfilArtista(favorito.id_perfil_artista)" class="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#00f5d4] text-black text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#00f5d4]/80 transition-colors">
                      <span class="truncate">Ver Perfil</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Sección Mensajes -->
        <div v-if="seccionActual === 'mensajes'" class="flex h-screen -m-8">
          <!-- Lista de Conversaciones -->
          <div class="flex-shrink-0 w-full md:w-80 lg:w-96 bg-[#181818] border-r border-white/5 flex flex-col">
            <div class="p-4 border-b border-white/5">
              <h2 class="text-xl font-bold text-[#f0f0f0]">Mensajes</h2>
              <div class="relative mt-4">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a0a0]">search</span>
                <input v-model="busquedaMensajes" class="w-full bg-[#000000] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-[#f0f0f0] placeholder-[#a0a0a0] focus:ring-[#00f5d4] focus:border-[#00f5d4]" placeholder="Buscar conversaciones..." type="search"/>
              </div>
            </div>
            <div class="flex-1 overflow-y-auto">
              <div v-if="cargandoConversaciones" class="flex items-center justify-center h-64">
                <div class="animate-spin rounded-full h-8 w-8 border-2 border-[#00f5d4] border-t-transparent"></div>
              </div>
              <div v-else-if="conversaciones.length === 0" class="flex flex-col items-center justify-center h-64 text-center px-6">
                <span class="material-symbols-outlined text-5xl text-[#a0a0a0] mb-4">mail</span>
                <p class="text-[#a0a0a0]">No tienes conversaciones aún</p>
                <p class="text-sm text-[#a0a0a0] mt-2">Contacta a un artista desde tus reservas</p>
              </div>
              <nav v-else>
                <a v-for="conv in conversacionesFiltradas" :key="conv.id" @click="seleccionarConversacion(conv)" :class="[
                  'flex items-center gap-4 p-4 border-b border-white/10 cursor-pointer',
                  conversacionActual?.id === conv.id ? 'bg-white/5' : 'hover:bg-white/5'
                ]">
                  <div class="relative">
                    <div class="w-12 h-12 rounded-full bg-cover bg-center bg-no-repeat" :style="`background-image: url('https://picsum.photos/seed/${conv.otro_usuario_id}/100/100')`">
                      <div v-if="!conv.otro_usuario_id" class="w-full h-full rounded-full bg-gradient-to-br from-[#00f5d4]/20 to-[#00f5d4]/5 flex items-center justify-center">
                        <span class="text-[#00f5d4] text-xl font-bold">{{ conv.nombre?.charAt(0).toUpperCase() }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 overflow-hidden">
                    <div class="flex justify-between items-center">
                      <p class="font-semibold text-[#f0f0f0] truncate">{{ conv.nombre }}</p>
                      <span v-if="conv.fecha_ultimo_mensaje" class="text-xs text-[#a0a0a0]">
                        {{ formatearFechaHora(conv.fecha_ultimo_mensaje) }}
                      </span>
                    </div>
                    <p v-if="conv.ultimo_mensaje" class="text-sm text-[#a0a0a0] truncate">{{ conv.ultimo_mensaje }}</p>
                    <span v-if="conv.mensajes_no_leidos > 0" class="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-black bg-[#00f5d4] rounded-full mt-1">
                      {{ conv.mensajes_no_leidos }}
                    </span>
                  </div>
                </a>
              </nav>
            </div>
          </div>

          <!-- Área de Chat -->
          <div v-if="conversacionActual" class="flex-1 flex flex-col bg-[#000000]">
            <header class="flex items-center gap-4 p-4 border-b border-white/5 shrink-0">
              <div class="w-12 h-12 rounded-full bg-cover bg-center bg-no-repeat" :style="`background-image: url('https://picsum.photos/seed/${conversacionActual.otro_usuario_id}/100/100')`">
                <div v-if="!conversacionActual.otro_usuario_id" class="w-full h-full rounded-full bg-gradient-to-br from-[#00f5d4]/20 to-[#00f5d4]/5 flex items-center justify-center">
                  <span class="text-[#00f5d4] text-xl font-bold">{{ conversacionActual.nombre?.charAt(0).toUpperCase() }}</span>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-bold text-[#f0f0f0]">{{ conversacionActual.nombre }}</h3>
              </div>
            </header>
            <div ref="mensajesContainer" class="flex-1 overflow-y-auto p-6 space-y-4">
              <div v-if="cargandoMensajes" class="flex items-center justify-center h-full">
                <div class="animate-spin rounded-full h-8 w-8 border-2 border-[#00f5d4] border-t-transparent"></div>
              </div>
              <div v-else-if="conversacionActual.mensajes?.length === 0" class="flex flex-col items-center justify-center h-full text-center">
                <span class="material-symbols-outlined text-5xl text-[#a0a0a0] mb-4">chat_bubble</span>
                <p class="text-[#a0a0a0]">No hay mensajes aún</p>
                <p class="text-sm text-[#a0a0a0] mt-2">Inicia la conversación</p>
              </div>
              <div v-else v-for="mensaje in conversacionActual.mensajes" :key="mensaje.id" :class="[
                'flex',
                mensaje.es_propio ? 'justify-end' : 'justify-start'
              ]">
                <div :class="[
                  'rounded-lg p-3 max-w-sm',
                  mensaje.es_propio ? 'bg-[#00f5d4] rounded-br-none' : 'bg-[#181818] rounded-bl-none'
                ]">
                  <p :class="[
                    'text-sm leading-relaxed',
                    mensaje.es_propio ? 'text-black' : 'text-[#f0f0f0]'
                  ]">{{ mensaje.texto }}</p>
                  <span v-if="mensaje.hora" :class="['text-[10px] block mt-1.5', mensaje.es_propio ? 'text-black/60' : 'text-[#a0a0a0]']">
                    {{ mensaje.hora }}
                  </span>
                </div>
              </div>
            </div>
            <div class="p-4 border-t border-white/5 bg-[#000000] mt-auto shrink-0">
              <form @submit.prevent="enviarMensaje" class="flex items-center gap-4">
                <input v-model="nuevoMensaje" class="flex-1 bg-[#181818] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#f0f0f0] placeholder-[#a0a0a0] focus:ring-[#00f5d4] focus:border-[#00f5d4]" placeholder="Escribe un mensaje..." type="text"/>
                <button type="submit" class="flex items-center justify-center w-10 h-10 rounded-lg bg-[#00f5d4] text-black hover:bg-[#00f5d4]/80 shrink-0">
                  <span class="material-symbols-outlined text-[20px]">send</span>
                </button>
              </form>
            </div>
          </div>
          <div v-else class="flex-1 flex items-center justify-center bg-[#000000]">
            <div class="text-center">
              <span class="material-symbols-outlined text-6xl text-gray-600 mb-4">mail</span>
              <p class="text-[#a0a0a0]">Selecciona una conversación para comenzar</p>
            </div>
          </div>
        </div>

        <!-- Sección Notificaciones -->
        <div v-if="seccionActual === 'notificaciones'">
          <header class="flex flex-wrap justify-between items-center gap-4 mb-8">
            <h1 class="text-[#f0f0f0] text-4xl font-black leading-tight tracking-[-0.033em]">Notificaciones</h1>
            <div class="flex items-center gap-2">
              <button @click="filtrarNotificaciones" class="flex items-center gap-2 px-4 py-2 rounded-lg text-[#f0f0f0] text-sm font-medium hover:bg-white/10">
                <span class="material-symbols-outlined text-base">filter_list</span>
                <span>Filtrar</span>
              </button>
              <button @click="marcarTodasLeidas" class="flex items-center gap-2 px-4 py-2 rounded-lg text-[#f0f0f0] text-sm font-medium hover:bg-white/10">
                <span class="material-symbols-outlined text-base">done_all</span>
                <span>Marcar todo como leído</span>
              </button>
            </div>
          </header>
          
          <div v-if="cargandoNotificaciones" class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-2 border-[#00f5d4] border-t-transparent"></div>
          </div>
          
          <div v-else-if="notificaciones.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
            <span class="material-symbols-outlined text-6xl text-[#a0a0a0] mb-4">notifications_off</span>
            <p class="text-[#f0f0f0] text-lg font-semibold mb-2">No tienes notificaciones</p>
            <p class="text-[#a0a0a0] text-sm">Cuando tengas nuevas reservas o mensajes aparecerán aquí</p>
          </div>
          
          <section v-else class="flex flex-col gap-2">
            <div v-for="notif in notificaciones" :key="notif.id" @click="manejarClickNotificacion(notif)" :class="[
              'relative flex items-start gap-4 p-4 rounded-xl bg-[#181818] border border-transparent hover:border-[#00f5d4]/50 transition-colors duration-300 cursor-pointer',
              !notif.leida ? '' : 'bg-[#181818]/60'
            ]">
              <div :class="[
                'flex-shrink-0 size-10 rounded-full flex items-center justify-center',
                !notif.leida ? 'bg-[#00f5d4]/20' : 'bg-white/10'
              ]">
                <span :class="[
                  'material-symbols-outlined',
                  !notif.leida ? 'text-[#00f5d4]' : 'text-[#a0a0a0]'
                ]">{{ notif.icono }}</span>
              </div>
              <div class="flex-1">
                <p :class="[
                  'font-medium',
                  !notif.leida ? 'text-[#f0f0f0]' : 'text-[#f0f0f0]/70'
                ]">{{ notif.titulo }}</p>
                <p class="text-[#a0a0a0] text-sm">{{ notif.mensaje }}</p>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="text-[#a0a0a0] text-xs">{{ notif.tiempo }}</p>
                <span v-if="!notif.leida" aria-label="Notificación no leída" class="mt-2 inline-block size-2 rounded-full bg-[#00f5d4]"></span>
              </div>
            </div>
          </section>
        </div>

        <!-- Sección Perfil -->
        <div v-if="seccionActual === 'perfil'">
          <header class="mb-8">
            <h1 class="text-[#f0f0f0] text-3xl md:text-4xl font-bold tracking-tight">Mi Perfil</h1>
            <p class="text-[#a0a0a0] mt-1">Gestiona tu información personal y la configuración de tu cuenta.</p>
          </header>
          <div class="space-y-10">
            <section>
              <h2 class="text-xl font-semibold text-[#f0f0f0] border-b border-white/10 pb-3 mb-6">Información Personal</h2>
              <form @submit.prevent="guardarPerfil" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="relative flex flex-col">
                  <label class="text-sm font-medium text-[#a0a0a0] mb-2" for="nombre">Nombre Completo</label>
                  <input v-model="perfilUsuario.nombre" class="w-full rounded-md border-white/10 bg-[#181818] text-[#f0f0f0] px-4 py-2.5 focus:border-[#00f5d4] focus:ring-[#00f5d4]" id="nombre" placeholder="Tu nombre" type="text"/>
                </div>
                <div class="relative flex flex-col">
                  <label class="text-sm font-medium text-[#a0a0a0] mb-2" for="email">Correo Electrónico</label>
                  <input v-model="perfilUsuario.email" class="w-full rounded-md border-white/10 bg-[#181818] text-[#f0f0f0] px-4 py-2.5 focus:border-[#00f5d4] focus:ring-[#00f5d4]" id="email" placeholder="tu@email.com" type="email"/>
                </div>
                <div class="relative flex flex-col">
                  <label class="text-sm font-medium text-[#a0a0a0] mb-2" for="telefono">Teléfono</label>
                  <input v-model="perfilUsuario.telefono" class="w-full rounded-md border-white/10 bg-[#181818] text-[#f0f0f0] px-4 py-2.5 focus:border-[#00f5d4] focus:ring-[#00f5d4]" id="telefono" placeholder="+34 600 000 000" type="tel"/>
                </div>
                <div class="relative flex flex-col">
                  <label class="text-sm font-medium text-[#a0a0a0] mb-2" for="ubicacion">Ubicación</label>
                  <input v-model="perfilUsuario.ubicacion" class="w-full rounded-md border-white/10 bg-[#181818] text-[#f0f0f0] px-4 py-2.5 focus:border-[#00f5d4] focus:ring-[#00f5d4]" id="ubicacion" placeholder="Ciudad, País" type="text"/>
                </div>
              </form>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-[#f0f0f0] border-b border-white/10 pb-3 mb-6">Métodos de Pago</h2>
              <div class="space-y-4">
                <div v-for="tarjeta in metodosPago" :key="tarjeta.id" class="flex items-center justify-between p-4 rounded-lg bg-[#181818] border border-white/10">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-white font-bold text-xs">VISA</div>
                    <div>
                      <p class="font-medium text-[#f0f0f0]">{{ tarjeta.tipo }} terminada en {{ tarjeta.ultimos4 }}</p>
                      <p class="text-sm text-[#a0a0a0]">Expira {{ tarjeta.expira }}</p>
                    </div>
                  </div>
                  <button @click="abrirModalEliminarPago(tarjeta)" class="text-[#a0a0a0] hover:text-[#00f5d4]">
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </div>
                <button @click="abrirModalAgregarPago" class="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md h-10 px-4 border border-[#00f5d4] text-[#00f5d4] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#00f5d4]/10">
                  <span class="material-symbols-outlined text-lg">add</span>
                  <span class="truncate">Añadir nuevo método de pago</span>
                </button>
              </div>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-[#f0f0f0] border-b border-white/10 pb-3 mb-6">Configuración de la Cuenta</h2>
              <div class="space-y-4">
                <a @click="abrirModalCambiarContrasena" class="flex items-center justify-between text-[#f0f0f0] hover:text-[#00f5d4] group cursor-pointer">
                  <span>Cambiar contraseña</span>
                  <span class="material-symbols-outlined transition-transform group-hover:translate-x-1">chevron_right</span>
                </a>
                <div class="flex items-center justify-between">
                  <label class="cursor-pointer" for="notifications">Activar notificaciones por correo</label>
                  <div class="relative inline-flex items-center cursor-pointer">
                    <input v-model="notificacionesEmail" class="sr-only peer" id="notifications" type="checkbox"/>
                    <div class="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#00f5d4]/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00f5d4]"></div>
                  </div>
                </div>
              </div>
            </section>

            <div class="flex justify-start pt-6 border-t border-white/10">
              <button @click="guardarPerfil" class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-11 px-6 bg-[#00f5d4] text-black text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#00f5d4]/80">
                <span class="truncate">Guardar Cambios</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección: Historial de Pagos -->
      <div v-if="seccionActual === 'pagos'">
        <h2 class="text-3xl font-bold text-[#f0f0f0] mb-6">Historial de Pagos</h2>
        
        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-[#181818] p-6 rounded-lg border border-white/10">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[#a0a0a0] text-sm">Total Gastado</span>
              <span class="material-symbols-outlined text-[#00f5d4]">payments</span>
            </div>
            <p class="text-3xl font-bold text-[#00f5d4]">{{ formatearMonto(totalGastado) }}</p>
          </div>
          <div class="bg-[#181818] p-6 rounded-lg border border-white/10">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[#a0a0a0] text-sm">Pagos Realizados</span>
              <span class="material-symbols-outlined text-[#00f5d4]">receipt_long</span>
            </div>
            <p class="text-3xl font-bold">{{ pagosList.length }}</p>
          </div>
          <div class="bg-[#181818] p-6 rounded-lg border border-white/10">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[#a0a0a0] text-sm">Último Pago</span>
              <span class="material-symbols-outlined text-[#00f5d4]">schedule</span>
            </div>
            <p class="text-lg font-semibold">{{ ultimoPago }}</p>
          </div>
        </div>

        <!-- Filters -->
        <div class="bg-[#181818] p-6 rounded-lg border border-white/10 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm text-[#a0a0a0] mb-2">Buscar</label>
              <div class="relative">
                <input
                  v-model="busquedaPagos"
                  type="text"
                  placeholder="Buscar por artista o servicio..."
                  class="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-2 pl-10 text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4] transition-colors"
                />
                <span class="material-symbols-outlined absolute left-3 top-2.5 text-[#a0a0a0] text-xl">search</span>
              </div>
            </div>
            <div>
              <label class="block text-sm text-[#a0a0a0] mb-2">Estado</label>
              <select
                v-model="filtroEstadoPago"
                class="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-2 text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4] transition-colors"
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
                v-model="filtroPeriodoPago"
                class="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-2 text-[#f0f0f0] focus:outline-none focus:border-[#00f5d4] transition-colors"
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
        <div class="bg-[#181818] rounded-lg border border-white/10 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-[#111111] border-b border-white/10">
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
              <tbody class="divide-y divide-white/10">
                <tr v-for="pago in pagosFiltrados" :key="pago.id" class="hover:bg-white/5 transition-colors">
                  <td class="px-6 py-4 text-sm">{{ formatearFechaPago(pago.fecha) }}</td>
                  <td class="px-6 py-4">
                    <span class="text-[#00f5d4] font-mono text-sm">{{ pago.id_transaccion }}</span>
                  </td>
                  <td class="px-6 py-4">{{ pago.artista }}</td>
                  <td class="px-6 py-4 text-sm text-[#a0a0a0]">{{ pago.servicio }}</td>
                  <td class="px-6 py-4 font-semibold">{{ formatearMonto(pago.monto) }}</td>
                  <td class="px-6 py-4">
                    <span :class="[
                      'px-3 py-1 rounded-full text-xs font-medium',
                      pago.estado === 'Completado' ? 'bg-green-500/20 text-green-400' :
                      pago.estado === 'Pendiente' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    ]">
                      {{ pago.estado }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <button @click="verDetallePago(pago)" class="text-[#00f5d4] hover:text-[#00d4b8] transition-colors">
                      <span class="material-symbols-outlined">visibility</span>
                    </button>
                  </td>
                </tr>
                <tr v-if="pagosFiltrados.length === 0">
                  <td colspan="7" class="px-6 py-12 text-center text-[#a0a0a0]">
                    <span class="material-symbols-outlined text-6xl mb-4 block opacity-50">receipt_long</span>
                    <p class="text-lg">No se encontraron pagos</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Detalle Reserva -->
    <div v-if="modalDetalleAbierto" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click="cerrarModalDetalle">
      <div class="bg-[#181818] rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10" @click.stop>
        <!-- Header -->
        <div class="flex justify-between items-start mb-6">
          <div>
            <h2 class="text-[#f0f0f0] text-2xl font-bold">Detalles de la Reserva</h2>
            <p class="text-[#a0a0a0] text-sm mt-1">Información completa del contrato</p>
          </div>
          <button @click="cerrarModalDetalle" class="text-[#a0a0a0] hover:text-white transition-colors">
            <span class="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>

        <div v-if="reservaSeleccionada" class="space-y-6">
          <!-- Artista -->
          <div class="bg-[#0f0f0f] rounded-xl p-4 border border-white/5">
            <h3 class="text-[#00f5d4] text-sm font-semibold mb-3 uppercase tracking-wide">Artista</h3>
            <p class="text-[#f0f0f0] text-xl font-bold">
              {{ reservaSeleccionada.nombre_artistico || `${reservaSeleccionada.artista_nombre || ''} ${reservaSeleccionada.artista_apellido || ''}`.trim() || reservaSeleccionada.artista_email }}
            </p>
            <p class="text-[#a0a0a0] text-sm mt-1">{{ reservaSeleccionada.artista_email }}</p>
            <p v-if="reservaSeleccionada.ciudad" class="text-[#a0a0a0] text-sm">📍 {{ reservaSeleccionada.ciudad }}</p>
          </div>

          <!-- Información del Evento -->
          <div class="bg-[#0f0f0f] rounded-xl p-4 border border-white/5">
            <h3 class="text-[#00f5d4] text-sm font-semibold mb-3 uppercase tracking-wide">Información del Evento</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-[#a0a0a0] text-xs mb-1">Fecha y Hora</p>
                <p class="text-[#f0f0f0] font-semibold">📅 {{ formatearFecha(reservaSeleccionada.fecha_evento) }}</p>
              </div>
              <div v-if="reservaSeleccionada.duracion_horas">
                <p class="text-[#a0a0a0] text-xs mb-1">Duración</p>
                <p class="text-[#f0f0f0] font-semibold">⏱️ {{ reservaSeleccionada.duracion_horas }} horas</p>
              </div>
              <div v-if="reservaSeleccionada.ubicacion_evento" class="md:col-span-2">
                <p class="text-[#a0a0a0] text-xs mb-1">Ubicación</p>
                <p class="text-[#f0f0f0] font-semibold">📍 {{ reservaSeleccionada.ubicacion_evento }}</p>
              </div>
            </div>
          </div>

          <!-- Información Financiera -->
          <div class="bg-[#0f0f0f] rounded-xl p-4 border border-white/5">
            <h3 class="text-[#00f5d4] text-sm font-semibold mb-3 uppercase tracking-wide">Información Financiera</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-[#a0a0a0]">Monto Total</span>
                <span class="text-[#f0f0f0] text-2xl font-bold">Bs. {{ reservaSeleccionada.monto_total }}</span>
              </div>
              <div v-if="reservaSeleccionada.anticipo_monto" class="flex justify-between items-center pt-3 border-t border-white/5">
                <span class="text-[#a0a0a0]">Anticipo ({{ reservaSeleccionada.anticipo_porcentaje }}%)</span>
                <span class="text-[#00f5d4] font-semibold">Bs. {{ reservaSeleccionada.anticipo_monto }}</span>
              </div>
              <div v-if="reservaSeleccionada.saldo_pendiente" class="flex justify-between items-center">
                <span class="text-[#a0a0a0]">Saldo Pendiente</span>
                <span class="text-yellow-400 font-semibold">Bs. {{ reservaSeleccionada.saldo_pendiente }}</span>
              </div>
            </div>
          </div>

          <!-- Estado del Contrato -->
          <div class="bg-[#0f0f0f] rounded-xl p-4 border border-white/5">
            <h3 class="text-[#00f5d4] text-sm font-semibold mb-3 uppercase tracking-wide">Estado del Contrato</h3>
            <div class="flex items-center gap-3">
              <span :class="[
                'inline-block px-4 py-2 text-sm font-semibold rounded-full',
                reservaSeleccionada.estado === 'confirmado' ? 'bg-green-500/20 text-green-400' : 
                reservaSeleccionada.estado === 'pendiente' ? 'bg-yellow-500/20 text-yellow-400' : 
                reservaSeleccionada.estado === 'completado' ? 'bg-blue-500/20 text-blue-400' : 
                'bg-gray-500/20 text-gray-400'
              ]">{{ reservaSeleccionada.estado.charAt(0).toUpperCase() + reservaSeleccionada.estado.slice(1) }}</span>
              <p class="text-[#a0a0a0] text-xs">ID: {{ reservaSeleccionada.contrato_id || reservaSeleccionada.id }}</p>
            </div>
          </div>

          <!-- Términos y Condiciones -->
          <div v-if="reservaSeleccionada.terminos_condiciones" class="bg-[#0f0f0f] rounded-xl p-4 border border-white/5">
            <h3 class="text-[#00f5d4] text-sm font-semibold mb-3 uppercase tracking-wide">Términos y Condiciones</h3>
            <p class="text-[#f0f0f0] text-sm leading-relaxed">{{ reservaSeleccionada.terminos_condiciones }}</p>
          </div>

          <!-- Botones de Acción -->
          <div class="flex gap-3 pt-4">
            <button @click="cerrarModalDetalle" class="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-colors">
              Cerrar
            </button>
            <button @click="contactarArtista(reservaSeleccionada)" class="flex-1 px-4 py-3 bg-[#00f5d4] hover:bg-[#00f5d4]/80 text-black rounded-lg font-semibold transition-colors">
              Contactar Artista
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Eliminar Favorito -->
    <div v-if="modalEliminarFavoritoAbierto" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click="cerrarModalEliminarFavorito">
      <div @click.stop class="bg-[#181818] rounded-xl p-6 max-w-md w-full mx-4 border border-white/10">
        <div class="flex items-start gap-4">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 shrink-0">
            <span class="material-symbols-outlined text-red-500 text-2xl">delete</span>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-[#f0f0f0] mb-2">Eliminar de Favoritos</h3>
            <p class="text-[#a0a0a0] text-sm mb-1">
              ¿Estás seguro que deseas eliminar a 
              <span class="text-[#f0f0f0] font-semibold">{{ favoritoAEliminar?.nombre_artistico || favoritoAEliminar?.nombre + ' ' + favoritoAEliminar?.apellido }}</span>
              de tus favoritos?
            </p>
            <p class="text-[#a0a0a0] text-xs">Esta acción no se puede deshacer.</p>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="cerrarModalEliminarFavorito" class="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-[#f0f0f0] rounded-lg font-medium transition-colors">
            Cancelar
          </button>
          <button @click="confirmarEliminarFavorito" class="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Agregar Método de Pago -->
    <div v-if="modalAgregarPagoAbierto" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click="cerrarModalAgregarPago">
      <div @click.stop class="bg-[#181818] rounded-xl p-6 max-w-md w-full mx-4 border border-white/10">
        <div class="flex items-start gap-4 mb-6">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-[#00f5d4]/10 shrink-0">
            <span class="material-symbols-outlined text-[#00f5d4] text-2xl">credit_card</span>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-[#f0f0f0] mb-1">Agregar Método de Pago</h3>
            <p class="text-[#a0a0a0] text-sm">Ingresa los datos de tu tarjeta</p>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-[#a0a0a0] mb-2">Tipo de Tarjeta</label>
            <select v-model="nuevoPago.tipo" class="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] focus:outline-none focus:ring-2 focus:ring-[#00f5d4] focus:border-[#00f5d4]">
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="American Express">American Express</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-[#a0a0a0] mb-2">Número de Tarjeta</label>
            <input 
              v-model="nuevoPago.numero" 
              type="text" 
              placeholder="1234 5678 9012 3456"
              maxlength="19"
              @input="formatearNumeroTarjeta"
              class="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#00f5d4] focus:border-[#00f5d4]"
            />
          </div>
          
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-sm font-medium text-[#a0a0a0] mb-2">Mes</label>
              <input 
                v-model="nuevoPago.expiraMes" 
                type="text" 
                placeholder="12"
                maxlength="2"
                @input="validarMes"
                class="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#00f5d4] focus:border-[#00f5d4]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#a0a0a0] mb-2">Año</label>
              <input 
                v-model="nuevoPago.expiraAnio" 
                type="text" 
                placeholder="2025"
                maxlength="4"
                @input="validarAnio"
                class="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#00f5d4] focus:border-[#00f5d4]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#a0a0a0] mb-2">CVV</label>
              <input 
                v-model="nuevoPago.cvv" 
                type="text" 
                placeholder="123"
                maxlength="3"
                @input="validarCVV"
                class="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#00f5d4] focus:border-[#00f5d4]"
              />
            </div>
          </div>
        </div>
        
        <div class="flex gap-3 mt-6">
          <button @click="cerrarModalAgregarPago" class="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-[#f0f0f0] rounded-lg font-medium transition-colors">
            Cancelar
          </button>
          <button @click="confirmarAgregarPago" class="flex-1 px-4 py-2.5 bg-[#00f5d4] hover:bg-[#00f5d4]/80 text-[#111111] rounded-lg font-medium transition-colors">
            Agregar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Eliminar Método de Pago -->
    <div v-if="modalEliminarPagoAbierto" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click="cerrarModalEliminarPago">
      <div @click.stop class="bg-[#181818] rounded-xl p-6 max-w-md w-full mx-4 border border-white/10">
        <div class="flex items-start gap-4">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 shrink-0">
            <span class="material-symbols-outlined text-red-500 text-2xl">delete</span>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-[#f0f0f0] mb-2">Eliminar Método de Pago</h3>
            <p class="text-[#a0a0a0] text-sm mb-1">
              ¿Estás seguro que deseas eliminar la tarjeta 
              <span class="text-[#f0f0f0] font-semibold">{{ pagoAEliminar?.tipo }} •••• {{ pagoAEliminar?.ultimos4 }}</span>?
            </p>
            <p class="text-[#a0a0a0] text-xs">Esta acción no se puede deshacer.</p>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="cerrarModalEliminarPago" class="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-[#f0f0f0] rounded-lg font-medium transition-colors">
            Cancelar
          </button>
          <button @click="confirmarEliminarPago" class="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Cambiar Contraseña -->
    <div v-if="modalCambiarContrasenaAbierto" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click="cerrarModalCambiarContrasena">
      <div @click.stop class="bg-[#181818] rounded-xl p-6 max-w-md w-full mx-4 border border-white/10">
        <div class="flex items-start gap-4 mb-6">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-[#00f5d4]/10 shrink-0">
            <span class="material-symbols-outlined text-[#00f5d4] text-2xl">lock</span>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-[#f0f0f0] mb-1">Cambiar Contraseña</h3>
            <p class="text-[#a0a0a0] text-sm">Ingresa tu contraseña actual y la nueva</p>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-[#a0a0a0] mb-2">Contraseña Actual</label>
            <input 
              v-model="contrasenas.actual" 
              type="password" 
              placeholder="••••••••"
              class="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#00f5d4] focus:border-[#00f5d4]"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-[#a0a0a0] mb-2">Nueva Contraseña</label>
            <input 
              v-model="contrasenas.nueva" 
              type="password" 
              placeholder="••••••••"
              class="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#00f5d4] focus:border-[#00f5d4]"
            />
            <p class="text-[#a0a0a0] text-xs mt-1">Mínimo 6 caracteres</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-[#a0a0a0] mb-2">Confirmar Nueva Contraseña</label>
            <input 
              v-model="contrasenas.confirmar" 
              type="password" 
              placeholder="••••••••"
              class="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-[#f0f0f0] placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#00f5d4] focus:border-[#00f5d4]"
            />
          </div>
        </div>
        
        <div class="flex gap-3 mt-6">
          <button @click="cerrarModalCambiarContrasena" class="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-[#f0f0f0] rounded-lg font-medium transition-colors">
            Cancelar
          </button>
          <button @click="confirmarCambiarContrasena" class="flex-1 px-4 py-2.5 bg-[#00f5d4] hover:bg-[#00f5d4]/80 text-[#111111] rounded-lg font-medium transition-colors">
            Cambiar Contraseña
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Cerrar Sesión -->
    <div v-if="modalCerrarSesionAbierto" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click="cerrarModalCerrarSesion">
      <div @click.stop class="bg-[#181818] rounded-xl p-6 max-w-md w-full mx-4 border border-white/10">
        <div class="flex items-start gap-4">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 shrink-0">
            <span class="material-symbols-outlined text-red-500 text-2xl">logout</span>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-[#f0f0f0] mb-2">Cerrar Sesión</h3>
            <p class="text-[#a0a0a0] text-sm mb-1">
              ¿Estás seguro que deseas cerrar sesión?
            </p>
            <p class="text-[#a0a0a0] text-xs">Tendrás que volver a iniciar sesión para acceder.</p>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="cerrarModalCerrarSesion" class="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-[#f0f0f0] rounded-lg font-medium transition-colors">
            Cancelar
          </button>
          <button @click="confirmarCerrarSesion" class="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const router = useRouter();
const authStore = useAuthStore();

// Estado
const seccionActual = ref('inicio');
const cargandoReservas = ref(false);
const cargandoFavoritos = ref(false);
const modalDetalleAbierto = ref(false);
const reservaSeleccionada = ref(null);
const modalEliminarFavoritoAbierto = ref(false);
const favoritoAEliminar = ref(null);
const modalAgregarPagoAbierto = ref(false);
const modalEliminarPagoAbierto = ref(false);
const pagoAEliminar = ref(null);
const modalCambiarContrasenaAbierto = ref(false);
const modalCerrarSesionAbierto = ref(false);
const nuevoPago = ref({ tipo: 'Visa', numero: '', expiraMes: '', expiraAnio: '', cvv: '' });
const contrasenas = ref({ actual: '', nueva: '', confirmar: '' });

// Datos
const reservas = ref([]);
const favoritos = ref([]);
const busquedaReservas = ref('');
const filtroEstadoReserva = ref('');

// Mensajes
const conversaciones = ref([]);
const busquedaMensajes = ref('');
const conversacionActual = ref(null);
const nuevoMensaje = ref('');
const mensajesContainer = ref(null);
const cargandoConversaciones = ref(false);
const cargandoMensajes = ref(false);

// Notificaciones
const notificaciones = ref([]);
const cargandoNotificaciones = ref(false);

// Perfil
const perfilUsuario = ref({
  nombre: '',
  email: '',
  telefono: '',
  ubicacion: ''
});
const metodosPago = ref([
  { id: 1, tipo: 'Visa', ultimos4: '1234', expira: '12/2025' }
]);
const notificacionesEmail = ref(true);

// Historial de Pagos
const pagosList = ref([]);
const busquedaPagos = ref('');
const filtroEstadoPago = ref('');
const filtroPeriodoPago = ref('');
const pagoSeleccionado = ref(null);

// Computadas
const nombreUsuario = computed(() => {
  return authStore.usuario?.nombre || 'Usuario';
});

const proximasReservas = computed(() => {
  const ahora = new Date();
  return reservas.value
    .filter(r => {
      const fechaEvento = new Date(r.fecha_evento);
      return fechaEvento > ahora && (r.estado === 'confirmado' || r.estado === 'pendiente');
    })
    .sort((a, b) => new Date(a.fecha_evento) - new Date(b.fecha_evento))
    .slice(0, 3);
});

const favoritosDestacados = computed(() => {
  return favoritos.value.slice(0, 4);
});

const reservasFiltradas = computed(() => {
  let resultado = reservas.value;

  // Filtrar por estado
  if (filtroEstadoReserva.value) {
    resultado = resultado.filter(r => r.estado === filtroEstadoReserva.value);
  }

  // Filtrar por búsqueda
  if (busquedaReservas.value) {
    const busqueda = busquedaReservas.value.toLowerCase();
    resultado = resultado.filter(r => 
      r.artista_nombre.toLowerCase().includes(busqueda) ||
      r.servicio.toLowerCase().includes(busqueda)
    );
  }

  return resultado;
});

const conversacionesFiltradas = computed(() => {
  if (!busquedaMensajes.value) return conversaciones.value;
  
  const busqueda = busquedaMensajes.value.toLowerCase();
  return conversaciones.value.filter(c => 
    c.nombre.toLowerCase().includes(busqueda) ||
    c.ultimo_mensaje.toLowerCase().includes(busqueda)
  );
});

const pagosFiltrados = computed(() => {
  let resultado = [...pagosList.value];

  // Filtro por búsqueda
  if (busquedaPagos.value) {
    const termino = busquedaPagos.value.toLowerCase();
    resultado = resultado.filter(pago =>
      pago.artista.toLowerCase().includes(termino) ||
      pago.servicio.toLowerCase().includes(termino) ||
      pago.id_transaccion.toLowerCase().includes(termino)
    );
  }

  // Filtro por estado
  if (filtroEstadoPago.value) {
    resultado = resultado.filter(pago => pago.estado === filtroEstadoPago.value);
  }

  // Filtro por periodo
  if (filtroPeriodoPago.value) {
    const dias = parseInt(filtroPeriodoPago.value);
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - dias);
    
    resultado = resultado.filter(pago => {
      const fechaPago = new Date(pago.fecha);
      return fechaPago >= fechaLimite;
    });
  }

  return resultado;
});

const totalGastado = computed(() => {
  return pagosFiltrados.value.reduce((total, pago) => total + pago.monto, 0);
});

const ultimoPago = computed(() => {
  if (pagosList.value.length === 0) return 'N/A';
  const ultimo = pagosList.value[0];
  return formatearFechaPago(ultimo.fecha);
});

// Métodos
const cargarReservas = async () => {
  try {
    cargandoReservas.value = true;
    const response = await axios.get('http://localhost:3000/api/contratos/mis-contratos', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });

    if (response.data.exito) {
      reservas.value = response.data.datos;
    }
  } catch (error) {
    console.error('Error al cargar reservas:', error);
  } finally {
    cargandoReservas.value = false;
  }
};

const cargarFavoritos = async () => {
  try {
    cargandoFavoritos.value = true;
    const response = await axios.get('http://localhost:3000/api/favoritos', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });

    if (response.data.exito) {
      favoritos.value = response.data.datos;
    }
  } catch (error) {
    console.error('Error al cargar favoritos:', error);
  } finally {
    cargandoFavoritos.value = false;
  }
};

const formatearFecha = (fecha) => {
  const date = new Date(fecha);
  return date.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
};

const formatearFechaHora = (fecha) => {
  const date = new Date(fecha);
  const ahora = new Date();
  const diff = ahora - date;
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (dias === 0) {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  } else if (dias === 1) {
    return 'Ayer';
  } else if (dias < 7) {
    return `${dias}d`;
  } else {
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  }
};

const formatearMonto = (monto, moneda = 'USD') => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: moneda
  }).format(monto);
};

const verDetalleReserva = (reserva) => {
  reservaSeleccionada.value = reserva;
  modalDetalleAbierto.value = true;
};

const cerrarModalDetalle = () => {
  modalDetalleAbierto.value = false;
  reservaSeleccionada.value = null;
};

const abrirModalEliminarFavorito = (favorito) => {
  favoritoAEliminar.value = favorito;
  modalEliminarFavoritoAbierto.value = true;
};

const cerrarModalEliminarFavorito = () => {
  modalEliminarFavoritoAbierto.value = false;
  favoritoAEliminar.value = null;
};

const confirmarEliminarFavorito = async () => {
  if (!favoritoAEliminar.value) return;

  try {
    const response = await axios.delete(`http://localhost:3000/api/favoritos/artista/${favoritoAEliminar.value.id_perfil_artista}`, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });

    if (response.data.exito) {
      favoritos.value = favoritos.value.filter(f => f.id_perfil_artista !== favoritoAEliminar.value.id_perfil_artista);
      cerrarModalEliminarFavorito();
    }
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
  }
};

const verPerfilArtista = (idArtista) => {
  router.push(`/artista/${idArtista}`);
};

// Mensajes
const cargarConversaciones = async () => {
  try {
    cargandoConversaciones.value = true;
    const token = localStorage.getItem('token');
    const respuesta = await axios.get('http://localhost:3000/api/mensajes', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    conversaciones.value = respuesta.data.map(conv => ({
      ...conv,
      nombre: conv.otro_usuario_nombre || conv.otro_usuario_email,
      mensajes: []
    }));
  } catch (error) {
    console.error('Error al cargar conversaciones:', error);
  } finally {
    cargandoConversaciones.value = false;
  }
};

const cargarMensajes = async (conversacionId) => {
  try {
    cargandoMensajes.value = true;
    const token = localStorage.getItem('token');
    const respuesta = await axios.get(`http://localhost:3000/api/mensajes/${conversacionId}/mensajes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return respuesta.data.map(msg => ({
      id: msg.id,
      texto: msg.contenido_mensaje,
      es_propio: msg.emisor_id === authStore.usuario.id,
      hora: new Date(msg.fecha_envio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }));
  } catch (error) {
    console.error('Error al cargar mensajes:', error);
    return [];
  } finally {
    cargandoMensajes.value = false;
  }
};

const seleccionarConversacion = async (conversacion) => {
  conversacionActual.value = conversacion;
  conversacionActual.value.mensajes = await cargarMensajes(conversacion.id);
  
  // Scroll al final
  setTimeout(() => {
    if (mensajesContainer.value) {
      mensajesContainer.value.scrollTop = mensajesContainer.value.scrollHeight;
    }
  }, 100);
};

const enviarMensaje = async () => {
  if (!nuevoMensaje.value.trim() || !conversacionActual.value) return;
  
  try {
    const token = localStorage.getItem('token');
    const respuesta = await axios.post(
      `http://localhost:3000/api/mensajes/${conversacionActual.value.id}/mensajes`,
      { contenido: nuevoMensaje.value },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    conversacionActual.value.mensajes.push({
      id: respuesta.data.id,
      texto: respuesta.data.contenido_mensaje,
      es_propio: true,
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    });
    
    nuevoMensaje.value = '';
    
    // Scroll al final
    setTimeout(() => {
      if (mensajesContainer.value) {
        mensajesContainer.value.scrollTop = mensajesContainer.value.scrollHeight;
      }
    }, 100);
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
  }
};

const contactarArtista = async (reserva) => {
  cerrarModalDetalle();
  seccionActual.value = 'mensajes';
  
  try {
    const token = localStorage.getItem('token');
    // Obtener o crear conversación con el artista
    const respuesta = await axios.post(
      'http://localhost:3000/api/mensajes/conversacion',
      { otroUsuarioId: reserva.artista_id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    // Recargar conversaciones y seleccionar la nueva
    await cargarConversaciones();
    const conversacion = conversaciones.value.find(c => c.id === respuesta.data.id);
    if (conversacion) {
      await seleccionarConversacion(conversacion);
    }
  } catch (error) {
    console.error('Error al contactar artista:', error);
  }
};

// Notificaciones
const cargarNotificaciones = async () => {
  try {
    cargandoNotificaciones.value = true;
    const notifs = [];
    
    // Notificaciones de contratos recientes (últimos 7 días)
    const contratosRecientes = reservas.value.filter(r => {
      const fecha = new Date(r.created_at || r.fecha_evento);
      const diasDesde = Math.floor((new Date() - fecha) / (1000 * 60 * 60 * 24));
      return diasDesde <= 7;
    });
    
    contratosRecientes.forEach(contrato => {
      const fechaCreacion = new Date(contrato.created_at || contrato.fecha_evento);
      const tiempoAtras = calcularTiempoAtras(fechaCreacion);
      
      if (contrato.estado === 'confirmado') {
        notifs.push({
          id: `contrato-${contrato.id}`,
          icono: 'calendar_add_on',
          titulo: 'Nueva Reserva Confirmada',
          mensaje: `Tu reserva con ${contrato.nombre_artistico || contrato.artista_email} para el ${formatearFecha(contrato.fecha_evento)} ha sido confirmada.`,
          tiempo: tiempoAtras,
          leida: false,
          fecha: fechaCreacion
        });
      } else if (contrato.estado === 'pendiente') {
        notifs.push({
          id: `contrato-pendiente-${contrato.id}`,
          icono: 'update',
          titulo: 'Actualización de Estado',
          mensaje: `Tu reserva con ${contrato.nombre_artistico || contrato.artista_email} está pendiente de confirmación.`,
          tiempo: tiempoAtras,
          leida: false,
          fecha: fechaCreacion
        });
      } else if (contrato.estado === 'completado') {
        notifs.push({
          id: `contrato-completado-${contrato.id}`,
          icono: 'check_circle',
          titulo: 'Reserva Completada',
          mensaje: `Tu evento con ${contrato.nombre_artistico || contrato.artista_email} fue completado. ¡No olvides dejar una reseña!`,
          tiempo: tiempoAtras,
          leida: true,
          fecha: fechaCreacion
        });
      }
    });
    
    // Notificaciones de mensajes no leídos
    const mensajesNoLeidos = conversaciones.value.filter(c => c.mensajes_no_leidos > 0);
    mensajesNoLeidos.forEach(conv => {
      notifs.push({
        id: `mensaje-${conv.id}`,
        icono: 'mail',
        titulo: `Nuevo Mensaje de ${conv.nombre}`,
        mensaje: conv.ultimo_mensaje ? `"${conv.ultimo_mensaje.substring(0, 80)}..."` : 'Tienes un mensaje nuevo',
        tiempo: conv.fecha_ultimo_mensaje ? calcularTiempoAtras(new Date(conv.fecha_ultimo_mensaje)) : 'reciente',
        leida: false,
        fecha: new Date(conv.fecha_ultimo_mensaje || Date.now())
      });
    });
    
    // Ordenar por fecha más reciente
    notificaciones.value = notifs.sort((a, b) => b.fecha - a.fecha);
  } catch (error) {
    console.error('Error al cargar notificaciones:', error);
  } finally {
    cargandoNotificaciones.value = false;
  }
};

const calcularTiempoAtras = (fecha) => {
  const ahora = new Date();
  const diff = ahora - fecha;
  const minutos = Math.floor(diff / (1000 * 60));
  const horas = Math.floor(diff / (1000 * 60 * 60));
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutos < 60) return `hace ${minutos} min`;
  if (horas < 24) return `hace ${horas} hora${horas > 1 ? 's' : ''}`;
  if (dias === 1) return 'ayer';
  return `hace ${dias} días`;
};

const manejarClickNotificacion = async (notif) => {
  // Marcar como leída
  notif.leida = true;
  
  // Navegar según el tipo de notificación
  if (notif.id.startsWith('contrato-')) {
    // Ir a reservas y abrir el modal del contrato
    seccionActual.value = 'reservas';
    const contratoId = parseInt(notif.id.split('-')[1]) || parseInt(notif.id.split('-')[2]);
    const contrato = reservas.value.find(r => r.id === contratoId);
    if (contrato) {
      verDetalleReserva(contrato);
    }
  } else if (notif.id.startsWith('mensaje-')) {
    // Ir a mensajes y abrir la conversación
    seccionActual.value = 'mensajes';
    const conversacionId = parseInt(notif.id.split('-')[1]);
    const conversacion = conversaciones.value.find(c => c.id === conversacionId);
    if (conversacion) {
      await seleccionarConversacion(conversacion);
    }
  }
};

const marcarTodasLeidas = () => {
  notificaciones.value = notificaciones.value.map(n => ({ ...n, leida: true }));
};

const filtrarNotificaciones = () => {
  // Alternar entre mostrar todas o solo no leídas
  const hayNoLeidas = notificaciones.value.some(n => !n.leida);
  if (hayNoLeidas) {
    notificaciones.value = notificaciones.value.filter(n => !n.leida);
  } else {
    cargarNotificaciones();
  }
};

// Perfil
const cargarPerfil = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/usuarios/perfil', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });
    
    if (response.data.exito) {
      const usuario = response.data.datos;
      perfilUsuario.value = {
        nombre: usuario.nombre || authStore.usuario?.nombre || '',
        email: usuario.email || authStore.usuario?.email || '',
        telefono: usuario.telefono || authStore.usuario?.telefono || '',
        ubicacion: usuario.ciudad || authStore.usuario?.ciudad || ''
      };
      
      // Actualizar authStore con los datos más recientes
      if (usuario) {
        authStore.usuario = { ...authStore.usuario, ...usuario };
      }
    }
  } catch (error) {
    console.error('Error al cargar perfil:', error);
    // Fallback a datos del authStore
    perfilUsuario.value = {
      nombre: authStore.usuario?.nombre || '',
      email: authStore.usuario?.email || '',
      telefono: authStore.usuario?.telefono || '',
      ubicacion: authStore.usuario?.ciudad || ''
    };
  }
};

const guardarPerfil = async () => {
  try {
    const datosActualizar = {
      nombre: perfilUsuario.value.nombre,
      telefono: perfilUsuario.value.telefono,
      ciudad: perfilUsuario.value.ubicacion
    };
    
    const response = await axios.put(
      'http://localhost:3000/api/usuarios/perfil',
      datosActualizar,
      {
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        }
      }
    );
    
    if (response.data.exito) {
      alert('Perfil actualizado exitosamente');
      // Actualizar authStore
      authStore.usuario = { ...authStore.usuario, ...response.data.datos };
      await cargarPerfil();
    }
  } catch (error) {
    console.error('Error al guardar perfil:', error);
    alert('Error al guardar el perfil: ' + (error.response?.data?.mensaje || error.message));
  }
};

const abrirModalAgregarPago = () => {
  nuevoPago.value = { tipo: 'Visa', numero: '', expiraMes: '', expiraAnio: '', cvv: '' };
  modalAgregarPagoAbierto.value = true;
};

const cerrarModalAgregarPago = () => {
  modalAgregarPagoAbierto.value = false;
};

const formatearNumeroTarjeta = (e) => {
  let valor = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
  let formateado = valor.match(/.{1,4}/g)?.join(' ') || valor;
  nuevoPago.value.numero = formateado;
};

const validarMes = (e) => {
  let valor = e.target.value.replace(/\D/g, '');
  if (valor.length > 0) {
    let num = parseInt(valor);
    if (num > 12) valor = '12';
    if (num < 1 && valor.length === 2) valor = '01';
  }
  nuevoPago.value.expiraMes = valor;
};

const validarAnio = (e) => {
  let valor = e.target.value.replace(/\D/g, '');
  nuevoPago.value.expiraAnio = valor;
};

const validarCVV = (e) => {
  let valor = e.target.value.replace(/\D/g, '');
  nuevoPago.value.cvv = valor;
};

const confirmarAgregarPago = () => {
  // Limpiar espacios del número de tarjeta
  const numeroLimpio = nuevoPago.value.numero.replace(/\s/g, '');
  
  if (!numeroLimpio || !nuevoPago.value.expiraMes || !nuevoPago.value.expiraAnio || !nuevoPago.value.cvv) {
    alert('Por favor completa todos los campos');
    return;
  }
  
  if (numeroLimpio.length < 13 || numeroLimpio.length > 16) {
    alert('Número de tarjeta inválido');
    return;
  }
  
  const mes = parseInt(nuevoPago.value.expiraMes);
  if (mes < 1 || mes > 12) {
    alert('Mes inválido (01-12)');
    return;
  }
  
  const anio = parseInt(nuevoPago.value.expiraAnio);
  if (anio < 2025 || anio > 2040) {
    alert('Año inválido');
    return;
  }
  
  if (nuevoPago.value.cvv.length !== 3) {
    alert('CVV debe tener 3 dígitos');
    return;
  }
  
  const nuevoMetodo = {
    id: Date.now(),
    tipo: nuevoPago.value.tipo,
    ultimos4: numeroLimpio.slice(-4),
    expira: `${nuevoPago.value.expiraMes.padStart(2, '0')}/${nuevoPago.value.expiraAnio}`
  };
  
  metodosPago.value.push(nuevoMetodo);
  cerrarModalAgregarPago();
};

const abrirModalEliminarPago = (tarjeta) => {
  pagoAEliminar.value = tarjeta;
  modalEliminarPagoAbierto.value = true;
};

const cerrarModalEliminarPago = () => {
  modalEliminarPagoAbierto.value = false;
  pagoAEliminar.value = null;
};

const confirmarEliminarPago = () => {
  if (pagoAEliminar.value) {
    metodosPago.value = metodosPago.value.filter(m => m.id !== pagoAEliminar.value.id);
    cerrarModalEliminarPago();
  }
};

const abrirModalCambiarContrasena = () => {
  contrasenas.value = { actual: '', nueva: '', confirmar: '' };
  modalCambiarContrasenaAbierto.value = true;
};

const cerrarModalCambiarContrasena = () => {
  modalCambiarContrasenaAbierto.value = false;
};

const confirmarCambiarContrasena = async () => {
  if (!contrasenas.value.actual || !contrasenas.value.nueva || !contrasenas.value.confirmar) {
    alert('Por favor completa todos los campos');
    return;
  }
  
  if (contrasenas.value.nueva !== contrasenas.value.confirmar) {
    alert('Las contraseñas no coinciden');
    return;
  }
  
  if (contrasenas.value.nueva.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres');
    return;
  }
  
  try {
    const response = await axios.put(
      'http://localhost:3000/api/usuarios/cambiar-contrasena',
      {
        contrasena_actual: contrasenas.value.actual,
        contrasena_nueva: contrasenas.value.nueva
      },
      {
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        }
      }
    );
    
    if (response.data.exito) {
      alert('Contraseña cambiada exitosamente');
      cerrarModalCambiarContrasena();
    }
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    alert('Error: ' + (error.response?.data?.mensaje || 'No se pudo cambiar la contraseña'));
  }
};

const irAHistorialPagos = () => {
  seccionActual.value = 'pagos';
};

// Pagos
const cargarPagos = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/pagos/historial', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    });
    
    pagosList.value = response.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  } catch (error) {
    console.error('Error al cargar pagos:', error);
    // Datos de prueba como fallback
    pagosList.value = [
      {
        id: 1,
        id_transaccion: 'TXN-2024-001523',
        fecha: '2024-01-19',
        artista: 'Urban Flow Dancers',
        servicio: 'Coreografía personalizada',
        monto: 2000,
        estado: 'Pendiente'
      },
      {
        id: 2,
        id_transaccion: 'TXN-2024-001234',
        fecha: '2024-01-14',
        artista: 'DJ Electra',
        servicio: 'Presentación en vivo - 3 horas',
        monto: 2500,
        estado: 'Completado'
      },
      {
        id: 3,
        id_transaccion: 'TXN-2024-001189',
        fecha: '2024-01-09',
        artista: 'Magnifico the Great',
        servicio: 'Show de magia corporativo',
        monto: 1800,
        estado: 'Completado'
      },
      {
        id: 4,
        id_transaccion: 'TXN-2024-001156',
        fecha: '2024-01-04',
        artista: 'The Groove Makers',
        servicio: 'Banda en vivo - Boda',
        monto: 3500,
        estado: 'Completado'
      },
      {
        id: 5,
        id_transaccion: 'TXN-2024-001098',
        fecha: '2023-12-20',
        artista: 'Luna Acoustic',
        servicio: 'Música acústica - Evento privado',
        monto: 1200,
        estado: 'Reembolsado'
      }
    ].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  }
};

const formatearFechaPago = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

const verDetallePago = (pago) => {
  pagoSeleccionado.value = pago;
  // Aquí podrías abrir un modal con los detalles del pago
  alert(`Detalles del pago:\nID: ${pago.id_transaccion}\nArtista: ${pago.artista}\nMonto: ${formatearMonto(pago.monto)}\nEstado: ${pago.estado}`);
};

const abrirModalCerrarSesion = () => {
  modalCerrarSesionAbierto.value = true;
};

const cerrarModalCerrarSesion = () => {
  modalCerrarSesionAbierto.value = false;
};

const confirmarCerrarSesion = () => {
  authStore.cerrarSesion();
  router.push('/login');
};

// Lifecycle
onMounted(async () => {
  await cargarReservas();
  await cargarFavoritos();
  await cargarPerfil();
  await cargarConversaciones();
  await cargarNotificaciones();
  await cargarPagos();
});
</script>

<style scoped>
/* Ocultar scrollbar pero mantener funcionalidad */
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

.overflow-x-auto {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
