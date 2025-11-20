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
            @click="router.push('/historial-pagos')"
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-left text-white hover:bg-white/10"
          >
            <span class="material-symbols-outlined">payments</span>
            <span class="text-sm font-medium">Historial de Pagos</span>
          </button>
        </nav>

        <!-- Botón de Cerrar Sesión -->
        <div class="mt-auto pt-4 border-t border-white/10">
          <button
            @click="cerrarSesion"
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-red-500/20 w-full text-left"
          >
            <span class="material-symbols-outlined"></span>
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
                  <button @click="eliminarFavorito(favorito.id_perfil_artista)" class="absolute top-3 right-3 flex items-center justify-center size-9 bg-black/50 backdrop-blur-sm rounded-full text-[#00f5d4] hover:bg-black/70 transition-colors">
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
        <div v-if="seccionActual === 'mensajes'" class="flex h-[calc(100vh-8rem)] -m-8">
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
              <nav>
                <a v-for="conv in conversacionesFiltradas" :key="conv.id" @click="seleccionarConversacion(conv)" :class="[
                  'flex items-center gap-4 p-4 border-b border-white/10 cursor-pointer',
                  conversacionActual?.id === conv.id ? 'bg-white/5' : 'hover:bg-white/5'
                ]">
                  <div class="relative">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#00f5d4]/20 to-[#00f5d4]/5"></div>
                    <span v-if="conv.en_linea" class="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-[#181818]"></span>
                  </div>
                  <div class="flex-1 overflow-hidden">
                    <div class="flex justify-between items-center">
                      <p class="font-semibold text-[#f0f0f0] truncate">{{ conv.nombre }}</p>
                      <span class="text-xs text-[#a0a0a0]">{{ conv.hora }}</span>
                    </div>
                    <p class="text-sm text-[#a0a0a0] truncate">{{ conv.ultimo_mensaje }}</p>
                  </div>
                </a>
              </nav>
            </div>
          </div>

          <!-- Área de Chat -->
          <div v-if="conversacionActual" class="flex-1 flex flex-col bg-[#000000]">
            <header class="flex items-center gap-4 p-4 border-b border-white/5 shrink-0">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#00f5d4]/20 to-[#00f5d4]/5"></div>
              <div>
                <h3 class="text-lg font-bold text-[#f0f0f0]">{{ conversacionActual.nombre }}</h3>
                <p v-if="conversacionActual.en_linea" class="text-sm text-green-400 flex items-center gap-1.5">
                  <span class="block h-2 w-2 rounded-full bg-green-500"></span> En línea
                </p>
              </div>
            </header>
            <div ref="mensajesContainer" class="flex-1 overflow-y-auto p-6 space-y-4">
              <div v-for="mensaje in conversacionActual.mensajes" :key="mensaje.id" :class="[
                'flex',
                mensaje.es_propio ? 'justify-end' : 'justify-start'
              ]">
                <div :class="[
                  'rounded-lg p-3 max-w-sm',
                  mensaje.es_propio ? 'bg-[#00f5d4] rounded-br-none' : 'bg-[#181818] rounded-bl-none'
                ]">
                  <p :class="[
                    'text-sm',
                    mensaje.es_propio ? 'text-black' : 'text-[#f0f0f0]'
                  ]">{{ mensaje.texto }}</p>
                </div>
              </div>
            </div>
            <div class="p-4 border-t border-white/5 bg-[#000000] mt-auto shrink-0">
              <form @submit.prevent="enviarMensaje" class="flex items-center gap-4">
                <input v-model="nuevoMensaje" class="flex-1 bg-[#181818] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#f0f0f0] placeholder-[#a0a0a0] focus:ring-[#00f5d4] focus:border-[#00f5d4]" placeholder="Escribe un mensaje..." type="text"/>
                <button type="submit" class="flex items-center justify-center size-10 rounded-lg bg-[#00f5d4] text-black hover:bg-[#00f5d4]/80 shrink-0">
                  <span class="material-symbols-outlined">send</span>
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
          <section class="flex flex-col gap-2">
            <div v-for="notif in notificaciones" :key="notif.id" :class="[
              'relative flex items-start gap-4 p-4 rounded-xl bg-[#181818] border border-transparent hover:border-[#00f5d4]/50 transition-colors duration-300',
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
              <h2 class="text-xl font-semibold text-[#f0f0f0] border-b border-white/10 pb-3 mb-6">Historial de Reservas</h2>
              <a @click="irAHistorialPagos" class="inline-flex items-center gap-2 text-[#00f5d4] hover:underline cursor-pointer">
                <span>Ver listado completo de reservas</span>
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
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
                  <button @click="eliminarMetodoPago(tarjeta.id)" class="text-[#a0a0a0] hover:text-[#00f5d4]">
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </div>
                <button @click="agregarMetodoPago" class="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md h-10 px-4 border border-[#00f5d4] text-[#00f5d4] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#00f5d4]/10">
                  <span class="material-symbols-outlined text-lg">add</span>
                  <span class="truncate">Añadir nuevo método de pago</span>
                </button>
              </div>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-[#f0f0f0] border-b border-white/10 pb-3 mb-6">Configuración de la Cuenta</h2>
              <div class="space-y-4">
                <a @click="cambiarContrasena" class="flex items-center justify-between text-[#f0f0f0] hover:text-[#00f5d4] group cursor-pointer">
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

            <div class="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-white/10">
              <button @click="guardarPerfil" class="w-full sm:w-auto flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-11 px-6 bg-[#00f5d4] text-black text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#00f5d4]/80">
                <span class="truncate">Guardar Cambios</span>
              </button>
              <button @click="cerrarSesion" class="w-full sm:w-auto flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-11 px-6 bg-transparent text-[#a0a0a0] hover:bg-white/10 hover:text-[#f0f0f0] text-base font-bold leading-normal tracking-[0.015em]">
                <span class="truncate">Cerrar Sesión</span>
              </button>
            </div>
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
            <button class="flex-1 px-4 py-3 bg-[#00f5d4] hover:bg-[#00f5d4]/80 text-black rounded-lg font-semibold transition-colors">
              Contactar Artista
            </button>
          </div>
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

// Datos
const reservas = ref([]);
const favoritos = ref([]);
const busquedaReservas = ref('');
const filtroEstadoReserva = ref('');

// Mensajes
const conversaciones = ref([
  {
    id: 1,
    nombre: 'DJ Electra',
    ultimo_mensaje: '¡Claro! Enviaré la lista de canciones...',
    hora: '10:42 AM',
    en_linea: true,
    mensajes: [
      { id: 1, texto: 'Hola Elena, gracias por contactarme. ¿Cómo puedo ayudarte con tu evento corporativo?', es_propio: false },
      { id: 2, texto: '¡Hola! Estamos muy emocionados. ¿Podrías enviarme una lista de canciones sugeridas?', es_propio: true },
      { id: 3, texto: '¡Claro! Enviaré la lista de canciones en un momento. ¿Alguna preferencia de género en particular?', es_propio: false }
    ]
  },
  {
    id: 2,
    nombre: 'Magnifico the Great',
    ultimo_mensaje: 'Gracias por la oportunidad, ¡será un...',
    hora: 'Ayer',
    en_linea: false,
    mensajes: [
      { id: 1, texto: 'Gracias por la oportunidad, ¡será un placer trabajar contigo!', es_propio: false }
    ]
  },
  {
    id: 3,
    nombre: 'The Groove Makers',
    ultimo_mensaje: 'Hemos recibido la solicitud. Estamos...',
    hora: '2d',
    en_linea: false,
    mensajes: [
      { id: 1, texto: 'Hemos recibido la solicitud. Estamos revisando los detalles.', es_propio: false }
    ]
  }
]);
const busquedaMensajes = ref('');
const conversacionActual = ref(null);
const nuevoMensaje = ref('');
const mensajesContainer = ref(null);

// Notificaciones
const notificaciones = ref([
  {
    id: 1,
    icono: 'calendar_add_on',
    titulo: 'Nueva Reserva Confirmada',
    mensaje: 'Tu reserva con DJ Electra para el 15 de Noviembre ha sido confirmada.',
    tiempo: 'hace 5 min',
    leida: false
  },
  {
    id: 2,
    icono: 'mail',
    titulo: 'Nuevo Mensaje de Magnifico the Great',
    mensaje: '"¡Hola! Solo para confirmar los detalles para la fiesta del Sábado..."',
    tiempo: 'hace 1 hora',
    leida: false
  },
  {
    id: 3,
    icono: 'update',
    titulo: 'Actualización de Estado',
    mensaje: 'Tu reserva con Magnifico the Great ahora está pendiente de pago.',
    tiempo: 'hace 3 horas',
    leida: false
  },
  {
    id: 4,
    icono: 'local_offer',
    titulo: 'Promoción Especial de Halloween',
    mensaje: '¡15% de descuento en artistas de terror y misterio hasta el 31 de Oct!',
    tiempo: 'ayer',
    leida: true
  },
  {
    id: 5,
    icono: 'calendar_add_on',
    titulo: 'Reserva Completada',
    mensaje: 'Tu evento con The Groove Makers fue completado. ¡No olvides dejar una reseña!',
    tiempo: 'hace 2 días',
    leida: true
  }
]);

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

const eliminarFavorito = async (idArtista) => {
  if (!confirm('¿Estás seguro de eliminar este artista de favoritos?')) {
    return;
  }

  try {
    const response = await axios.delete(`http://localhost:3000/api/favoritos/artista/${idArtista}`, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });

    if (response.data.exito) {
      favoritos.value = favoritos.value.filter(f => f.id_perfil_artista !== idArtista);
    }
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    alert('Error al eliminar favorito');
  }
};

const verPerfilArtista = (idArtista) => {
  router.push(`/artista/${idArtista}`);
};

// Mensajes
const seleccionarConversacion = (conversacion) => {
  conversacionActual.value = conversacion;
  // Simular scroll al final
  setTimeout(() => {
    if (mensajesContainer.value) {
      mensajesContainer.value.scrollTop = mensajesContainer.value.scrollHeight;
    }
  }, 100);
};

const enviarMensaje = () => {
  if (!nuevoMensaje.value.trim() || !conversacionActual.value) return;
  
  conversacionActual.value.mensajes.push({
    id: Date.now(),
    texto: nuevoMensaje.value,
    es_propio: true
  });
  
  nuevoMensaje.value = '';
  
  // Simular scroll al final
  setTimeout(() => {
    if (mensajesContainer.value) {
      mensajesContainer.value.scrollTop = mensajesContainer.value.scrollHeight;
    }
  }, 100);
};

// Notificaciones
const marcarTodasLeidas = () => {
  notificaciones.value.forEach(n => n.leida = true);
};

const filtrarNotificaciones = () => {
  alert('Filtrar notificaciones (por implementar)');
};

// Perfil
const cargarPerfil = () => {
  perfilUsuario.value = {
    nombre: authStore.usuario?.nombre || '',
    email: authStore.usuario?.email || '',
    telefono: authStore.usuario?.telefono || '',
    ubicacion: authStore.usuario?.ciudad || ''
  };
};

const guardarPerfil = () => {
  alert('Perfil guardado correctamente');
  // TODO: Implementar guardado en backend
};

const agregarMetodoPago = () => {
  alert('Agregar método de pago (por implementar)');
};

const eliminarMetodoPago = (id) => {
  if (confirm('¿Eliminar este método de pago?')) {
    metodosPago.value = metodosPago.value.filter(m => m.id !== id);
  }
};

const cambiarContrasena = () => {
  alert('Cambiar contraseña (por implementar)');
};

const irAHistorialPagos = () => {
  router.push('/historial-pagos');
};

const cerrarSesion = () => {
  if (confirm('¿Estás seguro de cerrar sesión?')) {
    authStore.cerrarSesion();
    router.push('/login');
  }
};

// Lifecycle
onMounted(() => {
  cargarReservas();
  cargarFavoritos();
  cargarPerfil();
  
  // Seleccionar primera conversación por defecto
  if (conversaciones.value.length > 0) {
    conversacionActual.value = conversaciones.value[0];
  }
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
