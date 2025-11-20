<template>
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
        <button class="relative rounded-full p-2 hover:bg-[#1a1a1a] text-[#a3a3a3] hover:text-[#f0f0f0]">
          <span class="material-symbols-outlined">notifications</span>
          <span class="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
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
              <p class="text-[#f0f0f0] tracking-tight text-3xl font-bold">12</p>
            </div>
            <div class="flex flex-col gap-2 rounded-xl p-6 bg-[#1a1a1a] border border-[#1a1a1a]/50">
              <p class="text-[#a3a3a3] text-base font-medium">Ganancias Estimadas</p>
              <p class="text-[#f0f0f0] tracking-tight text-3xl font-bold">$4,500</p>
            </div>
            <div class="flex flex-col gap-2 rounded-xl p-6 bg-[#1a1a1a] border border-[#1a1a1a]/50">
              <p class="text-[#a3a3a3] text-base font-medium">Valoración Promedio</p>
              <p class="text-[#f0f0f0] tracking-tight text-3xl font-bold flex items-center gap-2">
                4.9
                <span class="material-symbols-outlined text-yellow-400" style="font-variation-settings: 'FILL' 1;">star</span>
              </p>
            </div>
          </div>

          <!-- Próximas Reservas -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
              <h2 class="text-[#f0f0f0] text-2xl font-bold tracking-[-0.015em] pb-4">Próximas Reservas</h2>
              <div class="flex flex-col gap-2 bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl p-2">
                <div class="flex items-center gap-4 hover:bg-[#0d0d0d] p-3 rounded-lg">
                  <div class="text-[#f0f0f0] flex items-center justify-center rounded-lg bg-[#0d0d0d] shrink-0 size-12">
                    <span class="material-symbols-outlined">celebration</span>
                  </div>
                  <div class="flex flex-col justify-center flex-1">
                    <p class="text-[#f0f0f0] text-base font-medium line-clamp-1">Actuación en Gala Corporativa</p>
                    <p class="text-[#a3a3a3] text-sm line-clamp-2">Cliente: John Smith | Fecha: 26 Oct, 2024</p>
                  </div>
                  <a class="shrink-0 text-sm font-medium text-[#00f5d4] hover:underline cursor-pointer">Ver Detalles</a>
                </div>
                <div class="flex items-center gap-4 hover:bg-[#0d0d0d] p-3 rounded-lg">
                  <div class="text-[#f0f0f0] flex items-center justify-center rounded-lg bg-[#0d0d0d] shrink-0 size-12">
                    <span class="material-symbols-outlined">cake</span>
                  </div>
                  <div class="flex flex-col justify-center flex-1">
                    <p class="text-[#f0f0f0] text-base font-medium line-clamp-1">Show de Magia para Cumpleaños</p>
                    <p class="text-[#a3a3a3] text-sm line-clamp-2">Cliente: Jane Doe | Fecha: 02 Nov, 2024</p>
                  </div>
                  <a class="shrink-0 text-sm font-medium text-[#00f5d4] hover:underline cursor-pointer">Ver Detalles</a>
                </div>
                <div class="flex items-center gap-4 hover:bg-[#0d0d0d] p-3 rounded-lg">
                  <div class="text-[#f0f0f0] flex items-center justify-center rounded-lg bg-[#0d0d0d] shrink-0 size-12">
                    <span class="material-symbols-outlined">music_note</span>
                  </div>
                  <div class="flex flex-col justify-center flex-1">
                    <p class="text-[#f0f0f0] text-base font-medium line-clamp-1">Set Acústico en el Café Local</p>
                    <p class="text-[#a3a3a3] text-sm line-clamp-2">Cliente: The Local Cafe | Fecha: 05 Nov, 2024</p>
                  </div>
                  <a class="shrink-0 text-sm font-medium text-[#00f5d4] hover:underline cursor-pointer">Ver Detalles</a>
                </div>
              </div>
            </div>

            <!-- Acciones Rápidas y Calendario -->
            <div class="lg:col-span-1">
              <h2 class="text-[#f0f0f0] text-2xl font-bold tracking-[-0.015em] pb-4">Acciones Rápidas</h2>
              <div class="flex flex-col gap-4">
                <button @click="seccionActual = 'servicios'" class="w-full text-black bg-[#00f5d4] hover:bg-[#00f5d4]/90 focus:ring-4 focus:ring-[#00f5d4]/30 font-medium rounded-lg text-sm px-5 py-3 text-center flex items-center justify-center gap-2">
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
                    <button class="p-1 rounded-full text-[#a3a3a3] hover:bg-[#0d0d0d] hover:text-[#f0f0f0]">
                      <span class="material-symbols-outlined">chevron_left</span>
                    </button>
                    <h3 class="font-medium text-[#f0f0f0]">Octubre 2024</h3>
                    <button class="p-1 rounded-full text-[#a3a3a3] hover:bg-[#0d0d0d] hover:text-[#f0f0f0]">
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
                    <div class="py-2 text-[#a3a3a3]/50">29</div>
                    <div class="py-2 text-[#a3a3a3]/50">30</div>
                    <div class="py-2">1</div>
                    <div class="py-2">2</div>
                    <div class="py-2">3</div>
                    <div class="py-2 relative"><span class="relative z-10">4</span><span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-7 bg-[#00f5d4]/20 rounded-full"></span></div>
                    <div class="py-2">5</div>
                    <div class="py-2">6</div>
                    <div class="py-2">7</div>
                    <div class="py-2">8</div>
                    <div class="py-2">9</div>
                    <div class="py-2">10</div>
                    <div class="py-2">11</div>
                    <div class="py-2">12</div>
                    <div class="py-2">13</div>
                    <div class="py-2">14</div>
                    <div class="py-2">15</div>
                    <div class="py-2">16</div>
                    <div class="py-2">17</div>
                    <div class="py-2">18</div>
                    <div class="py-2">19</div>
                    <div class="py-2">20</div>
                    <div class="py-2 relative"><span class="relative z-10">21</span><span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-7 bg-[#00f5d4]/20 rounded-full"></span></div>
                    <div class="py-2">22</div>
                    <div class="py-2 text-black bg-[#00f5d4] rounded-full">23</div>
                    <div class="py-2">24</div>
                    <div class="py-2">25</div>
                    <div class="py-2 relative"><span class="relative z-10">26</span><span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-7 bg-[#00f5d4]/20 rounded-full"></span></div>
                    <div class="py-2">27</div>
                    <div class="py-2">28</div>
                    <div class="py-2">29</div>
                    <div class="py-2">30</div>
                    <div class="py-2">31</div>
                    <div class="py-2 text-[#a3a3a3]/50">1</div>
                    <div class="py-2 text-[#a3a3a3]/50">2</div>
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
            <button class="w-full sm:w-auto text-black bg-[#00f5d4] hover:bg-[#00f5d4]/90 focus:ring-4 focus:ring-[#00f5d4]/30 font-medium rounded-lg text-sm px-5 py-3 text-center flex items-center justify-center gap-2">
              <span class="material-symbols-outlined" style="font-size: 20px;">add_circle</span> Añadir Nuevo Servicio
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <!-- Servicio 1 -->
            <div class="flex flex-col bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl p-6">
              <div class="flex justify-between items-start mb-4">
                <h2 class="text-[#f0f0f0] text-xl font-bold">Show de Magia para Fiestas</h2>
                <span class="text-sm font-semibold text-[#00f5d4] bg-[#00f5d4]/10 px-2.5 py-1 rounded-full">$250</span>
              </div>
              <p class="text-[#a3a3a3] text-sm leading-relaxed mb-6 flex-grow">Un espectáculo de magia interactivo y divertido, perfecto para cumpleaños y eventos familiares. Duración de 45 minutos con trucos asombrosos.</p>
              <div class="flex flex-col sm:flex-row gap-3">
                <button class="flex-1 text-[#f0f0f0] bg-[#1a1a1a] border border-[#a3a3a3]/50 hover:bg-[#a3a3a3]/10 font-medium rounded-lg text-xs px-4 py-2 flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 16px;">edit</span> Editar
                </button>
                <button class="flex-1 text-[#f0f0f0] bg-[#1a1a1a] border border-[#a3a3a3]/50 hover:bg-[#a3a3a3]/10 font-medium rounded-lg text-xs px-4 py-2 flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 16px;">toggle_off</span> Desactivar
                </button>
                <button class="flex-1 text-red-400 bg-[#1a1a1a] border border-red-400/50 hover:bg-red-400/10 font-medium rounded-lg text-xs px-4 py-2 flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 16px;">delete</span> Eliminar
                </button>
              </div>
            </div>

            <!-- Servicio 2 -->
            <div class="flex flex-col bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl p-6">
              <div class="flex justify-between items-start mb-4">
                <h2 class="text-[#f0f0f0] text-xl font-bold">Set Acústico en Vivo</h2>
                <span class="text-sm font-semibold text-[#00f5d4] bg-[#00f5d4]/10 px-2.5 py-1 rounded-full">$400</span>
              </div>
              <p class="text-[#a3a3a3] text-sm leading-relaxed mb-6 flex-grow">Música acústica en vivo para bodas, cafés o eventos privados. Repertorio personalizable que abarca pop, rock y folk. 2 horas de música.</p>
              <div class="flex flex-col sm:flex-row gap-3">
                <button class="flex-1 text-[#f0f0f0] bg-[#1a1a1a] border border-[#a3a3a3]/50 hover:bg-[#a3a3a3]/10 font-medium rounded-lg text-xs px-4 py-2 flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 16px;">edit</span> Editar
                </button>
                <button class="flex-1 text-[#f0f0f0] bg-[#1a1a1a] border border-[#a3a3a3]/50 hover:bg-[#a3a3a3]/10 font-medium rounded-lg text-xs px-4 py-2 flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 16px;">toggle_on</span> Activar
                </button>
                <button class="flex-1 text-red-400 bg-[#1a1a1a] border border-red-400/50 hover:bg-red-400/10 font-medium rounded-lg text-xs px-4 py-2 flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 16px;">delete</span> Eliminar
                </button>
              </div>
            </div>

            <!-- Servicio 3 -->
            <div class="flex flex-col bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl p-6">
              <div class="flex justify-between items-start mb-4">
                <h2 class="text-[#f0f0f0] text-xl font-bold">Taller de Malabares</h2>
                <span class="text-sm font-semibold text-[#00f5d4] bg-[#00f5d4]/10 px-2.5 py-1 rounded-full">$150/hr</span>
              </div>
              <p class="text-[#a3a3a3] text-sm leading-relaxed mb-6 flex-grow">Un taller práctico para todas las edades para aprender los conceptos básicos de los malabares. Ideal para escuelas, campamentos o team building.</p>
              <div class="flex flex-col sm:flex-row gap-3">
                <button class="flex-1 text-[#f0f0f0] bg-[#1a1a1a] border border-[#a3a3a3]/50 hover:bg-[#a3a3a3]/10 font-medium rounded-lg text-xs px-4 py-2 flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 16px;">edit</span> Editar
                </button>
                <button class="flex-1 text-[#f0f0f0] bg-[#1a1a1a] border border-[#a3a3a3]/50 hover:bg-[#a3a3a3]/10 font-medium rounded-lg text-xs px-4 py-2 flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 16px;">toggle_off</span> Desactivar
                </button>
                <button class="flex-1 text-red-400 bg-[#1a1a1a] border border-red-400/50 hover:bg-red-400/10 font-medium rounded-lg text-xs px-4 py-2 flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 16px;">delete</span> Eliminar
                </button>
              </div>
            </div>

            <!-- Servicio 4 (Inactivo) -->
            <div class="flex flex-col bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl p-6 opacity-60">
              <div class="flex justify-between items-start mb-4">
                <h2 class="text-[#f0f0f0] text-xl font-bold">Actuación Cómica (Stand-up)</h2>
                <span class="text-sm font-semibold text-[#00f5d4] bg-[#00f5d4]/10 px-2.5 py-1 rounded-full">$300</span>
              </div>
              <p class="text-[#a3a3a3] text-sm leading-relaxed mb-6 flex-grow">Rutina de comedia de 30 minutos para eventos corporativos o clubes de comedia. Contenido adaptable al público (familiar o adulto).</p>
              <div class="flex flex-col sm:flex-row gap-3">
                <button class="flex-1 text-[#f0f0f0] bg-[#1a1a1a] border border-[#a3a3a3]/50 hover:bg-[#a3a3a3]/10 font-medium rounded-lg text-xs px-4 py-2 flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 16px;">edit</span> Editar
                </button>
                <button class="flex-1 text-[#f0f0f0] bg-[#1a1a1a] border border-[#a3a3a3]/50 hover:bg-[#a3a3a3]/10 font-medium rounded-lg text-xs px-4 py-2 flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 16px;">toggle_on</span> Activar
                </button>
                <button class="flex-1 text-red-400 bg-[#1a1a1a] border border-red-400/50 hover:bg-red-400/10 font-medium rounded-lg text-xs px-4 py-2 flex items-center justify-center gap-2">
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
                class="w-full bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#f0f0f0] placeholder:text-[#a3a3a3] focus:ring-[#00f5d4] focus:border-[#00f5d4]" 
                placeholder="Buscar por cliente, servicio..." 
                type="text"
              />
            </div>
            <div class="flex gap-2">
              <button class="px-4 py-2 text-sm font-medium rounded-lg bg-[#00f5d4] text-black">Todos</button>
              <button class="px-4 py-2 text-sm font-medium rounded-lg bg-[#1a1a1a] text-[#a3a3a3] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]/70">Pendientes</button>
              <button class="px-4 py-2 text-sm font-medium rounded-lg bg-[#1a1a1a] text-[#a3a3a3] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]/70">Confirmadas</button>
              <button class="px-4 py-2 text-sm font-medium rounded-lg bg-[#1a1a1a] text-[#a3a3a3] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]/70">Pasadas</button>
            </div>
          </div>

          <!-- Tabla de Reservas -->
          <div class="bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl overflow-hidden">
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
                  <!-- Reserva 1 -->
                  <tr class="hover:bg-[#0d0d0d]/50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#f0f0f0] font-medium">John Smith</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">Actuación en Gala Corporativa</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">26 Oct, 2024</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">$850.00</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-400/20 text-yellow-400">
                        <span class="w-2 h-2 mr-2 rounded-full bg-yellow-400"></span>Pendiente
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <div class="flex justify-end items-center gap-2">
                        <button class="px-3 py-1 text-xs font-semibold rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30">Confirmar</button>
                        <button class="px-3 py-1 text-xs font-semibold rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30">Rechazar</button>
                      </div>
                    </td>
                  </tr>
                  <!-- Reserva 2 -->
                  <tr class="hover:bg-[#0d0d0d]/50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#f0f0f0] font-medium">Jane Doe</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">Show de Magia para Cumpleaños</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">02 Nov, 2024</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">$500.00</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-400/20 text-green-400">
                        <span class="w-2 h-2 mr-2 rounded-full bg-green-400"></span>Confirmada
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <a class="text-[#00f5d4] hover:underline cursor-pointer">Ver Detalles</a>
                    </td>
                  </tr>
                  <!-- Reserva 3 -->
                  <tr class="hover:bg-[#0d0d0d]/50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#f0f0f0] font-medium">The Local Cafe</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">Set Acústico Semanal</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">18 Oct, 2024</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">$200.00</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-400/20 text-gray-400">
                        <span class="w-2 h-2 mr-2 rounded-full bg-gray-400"></span>Pasada
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <a class="text-[#00f5d4] hover:underline cursor-pointer">Ver Detalles</a>
                    </td>
                  </tr>
                  <!-- Reserva 4 -->
                  <tr class="hover:bg-[#0d0d0d]/50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#f0f0f0] font-medium">Emily White</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">Clase Privada de Batería</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">15 Dic, 2024</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">$150.00</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-400/20 text-red-400">
                        <span class="w-2 h-2 mr-2 rounded-full bg-red-400"></span>Cancelada
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <a class="text-[#00f5d4] hover:underline cursor-pointer">Ver Detalles</a>
                    </td>
                  </tr>
                  <!-- Reserva 5 -->
                  <tr class="hover:bg-[#0d0d0d]/50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#f0f0f0] font-medium">Michael Brown</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">DJ para Boda</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">29 Nov, 2024</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#a3a3a3]">$1,200.00</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-400/20 text-green-400">
                        <span class="w-2 h-2 mr-2 rounded-full bg-green-400"></span>Confirmada
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <a class="text-[#00f5d4] hover:underline cursor-pointer">Ver Detalles</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex items-center justify-between px-6 py-3 border-t border-[#1a1a1a]/50">
              <p class="text-sm text-[#a3a3a3]">Mostrando 1-5 de 23 reservas</p>
              <div class="flex items-center gap-2">
                <button class="px-3 py-1 text-sm font-medium rounded-md bg-[#1a1a1a]/70 hover:bg-[#1a1a1a]/90 text-[#f0f0f0] disabled:opacity-50 disabled:cursor-not-allowed" disabled>Anterior</button>
                <button class="px-3 py-1 text-sm font-medium rounded-md bg-[#1a1a1a]/70 hover:bg-[#1a1a1a]/90 text-[#f0f0f0]">Siguiente</button>
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
              <button class="text-[#f0f0f0] bg-[#1a1a1a] border border-[#1a1a1a]/50 hover:bg-[#1a1a1a]/80 font-medium rounded-lg text-sm px-5 py-3 text-center flex items-center justify-center gap-2">
                <span class="material-symbols-outlined" style="font-size: 20px;"></span> Añadir Bloqueo
              </button>
              <button class="text-black bg-[#00f5d4] hover:bg-[#00f5d4]/90 font-medium rounded-lg text-sm px-5 py-3 text-center flex items-center justify-center gap-2">
                <span class="material-symbols-outlined" style="font-size: 20px;"></span> Editar Disponibilidad
              </button>
            </div>
          </div>

          <div class="bg-[#1a1a1a] border border-[#1a1a1a]/50 rounded-xl p-4 sm:p-6">
            <div class="flex items-center justify-between mb-6">
              <button class="p-1.5 rounded-full text-[#a3a3a3] hover:bg-[#0d0d0d] hover:text-[#f0f0f0]">
                <span class="material-symbols-outlined"></span>
              </button>
              <h2 class="font-bold text-[#f0f0f0] text-xl">Octubre 2024</h2>
              <button class="p-1.5 rounded-full text-[#a3a3a3] hover:bg-[#0d0d0d] hover:text-[#f0f0f0]">
                <span class="material-symbols-outlined"></span>
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

            <div class="grid grid-cols-7 grid-rows-5 text-sm text-[#f0f0f0] gap-1">
              <div class="py-2 px-1 text-center text-[#a3a3a3]/50 border border-transparent">29</div>
              <div class="py-2 px-1 text-center text-[#a3a3a3]/50 border border-transparent">30</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">1</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">2</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">3</div>
              <div class="relative py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">
                <span>4</span>
                <div class="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                  <span class="size-1.5 bg-[#00f5d4] rounded-full"></span>
                </div>
              </div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">5</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">6</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">7</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">8</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">9</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">10</div>
              <div class="relative py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">
                <span>11</span>
                <div class="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                  <span class="size-1.5 bg-red-500 rounded-full"></span>
                </div>
              </div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">12</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">13</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">14</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">15</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">16</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">17</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">18</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">19</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">20</div>
              <div class="relative py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">
                <span>21</span>
                <div class="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                  <span class="size-1.5 bg-[#00f5d4] rounded-full"></span>
                  <span class="size-1.5 bg-[#00f5d4] rounded-full"></span>
                </div>
              </div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">22</div>
              <div class="py-2 px-1 text-center bg-[#00f5d4] text-black font-bold rounded-lg cursor-pointer">23</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">24</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">25</div>
              <div class="relative py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">
                <span>26</span>
                <div class="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                  <span class="size-1.5 bg-[#00f5d4] rounded-full"></span>
                </div>
              </div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">27</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">28</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">29</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">30</div>
              <div class="py-2 px-1 text-center border border-transparent hover:border-[#00f5d4]/50 rounded-lg cursor-pointer">31</div>
              <div class="py-2 px-1 text-center text-[#a3a3a3]/50 border border-transparent">1</div>
              <div class="py-2 px-1 text-center text-[#a3a3a3]/50 border border-transparent">2</div>
            </div>

            <div class="mt-6 pt-4 border-t border-[#1a1a1a]/50 flex flex-col sm:flex-row sm:items-center gap-4">
              <div class="flex items-center gap-2">
                <span class="size-3 bg-[#00f5d4] rounded-full"></span>
                <span class="text-[#a3a3a3] text-sm">Reserva agendada</span>
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const seccionActual = ref('inicio')

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

function cerrarSesion() {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    authStore.cerrarSesion()
    router.push('/login')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  font-size: 24px;
}
</style>

