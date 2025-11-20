<template>
  <div class="flex min-h-screen w-full flex-row bg-black font-['Spline_Sans',sans-serif]">
    <!-- Sidebar -->
    <aside class="flex w-64 flex-col bg-[#111111] p-4">
      <div class="flex items-center gap-3 p-3">
        <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAPXDaH4tXzBQsDnfTCamMG-WACKgZ1sowgl31Ucl4w_egTQXmMLAYS9U4j8LBgVLd--RnnO-VJHBJwc-o1B_wdao1FurYauUpizL5ovPxkhBQemAaEtaiPzyGGpOqBiQ5XY7xTtup5dFkK21zxvErIoG3l3hi4Acwb4kmwJlNZrSeV6CkKpngfgd8CbWWzmI1tdowpJEZNGhnxDL1kEG9veppDsy0Y7aUnfpumwwTxwJTtcTOTH61hPvWCKIXAk7v_fdgxeoaf1g");'></div>
        <div class="flex flex-col">
          <h1 class="text-base font-semibold leading-normal text-gray-100">Admin</h1>
          <p class="text-sm font-normal leading-normal text-gray-400">ShowTime Hub</p>
        </div>
      </div>
      
      <nav class="mt-6 flex flex-col gap-2">
        <a 
          v-for="item in menuItems" 
          :key="item.id"
          @click.prevent="seccionActiva = item.id"
          :class="[
            'flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer',
            seccionActiva === item.id
              ? 'bg-[rgba(34,211,238,0.2)] text-[#22d3ee]'
              : 'text-gray-400 hover:bg-white/5 hover:text-gray-100'
          ]"
        >
          <span class="material-symbols-outlined">{{ item.icon }}</span>
          <p class="text-sm font-medium leading-normal">{{ item.label }}</p>
        </a>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 bg-black">
      <header class="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-6">
        <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-100">{{ tituloSeccion }}</h1>
        <div class="flex items-center gap-2">
          <button class="rounded-full p-2 text-gray-400 hover:bg-white/5 hover:text-gray-100 relative">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <!-- User Menu Dropdown -->
          <div class="relative">
            <button 
              @click="mostrarMenuUsuario = !mostrarMenuUsuario"
              class="rounded-full p-2 text-gray-400 hover:bg-white/5 hover:text-gray-100 flex items-center gap-2"
            >
              <span class="material-symbols-outlined">account_circle</span>
              <span class="text-sm font-medium text-gray-100 hidden sm:block">Admin</span>
              <span class="material-symbols-outlined text-sm">{{ mostrarMenuUsuario ? 'expand_less' : 'expand_more' }}</span>
            </button>

            <!-- Dropdown Menu -->
            <div 
              v-if="mostrarMenuUsuario"
              class="absolute right-0 mt-2 w-56 bg-[#111111] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden"
            >
              <div class="px-4 py-3 border-b border-white/10">
                <p class="text-sm font-semibold text-gray-100">Administrador</p>
                <p class="text-xs text-gray-400">admin@showtimehub.com</p>
              </div>
              
              <button 
                @click="irAPerfil"
                class="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 transition-colors text-left"
              >
                <span class="material-symbols-outlined text-gray-400">person</span>
                <span class="text-sm">Mi Perfil</span>
              </button>
              
              <button 
                @click="irAConfiguracion"
                class="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 transition-colors text-left"
              >
                <span class="material-symbols-outlined text-gray-400">settings</span>
                <span class="text-sm">Configuración</span>
              </button>
              
              <div class="border-t border-white/10"></div>
              
              <button 
                @click="cerrarSesion"
                class="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors text-left"
              >
                <span class="material-symbols-outlined">logout</span>
                <span class="text-sm font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div class="p-6">
        <!-- Dashboard Overview -->
        <div v-if="seccionActiva === 'dashboard'" class="space-y-8">
          <!-- Stats Cards -->
          <section class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div class="flex flex-col gap-2 rounded-lg border border-white/10 bg-[#111111] p-6 transition-all hover:border-[#22d3ee]/50 hover:bg-[#181818]">
              <div class="flex items-center justify-between">
                <p class="text-base font-medium leading-normal text-gray-400">Total Usuarios</p>
                <span class="material-symbols-outlined text-gray-400">groups</span>
              </div>
              <p class="text-3xl font-bold leading-tight tracking-tight text-gray-100">1,250</p>
              <p class="text-sm font-medium leading-normal text-green-400">+5.4%</p>
            </div>

            <div class="flex flex-col gap-2 rounded-lg border border-white/10 bg-[#111111] p-6 transition-all hover:border-[#22d3ee]/50 hover:bg-[#181818]">
              <div class="flex items-center justify-between">
                <p class="text-base font-medium leading-normal text-gray-400">Artistas Activos</p>
                <span class="material-symbols-outlined text-gray-400">mic</span>
              </div>
              <p class="text-3xl font-bold leading-tight tracking-tight text-gray-100">340</p>
              <p class="text-sm font-medium leading-normal text-green-400">+2.1%</p>
            </div>

            <div class="flex flex-col gap-2 rounded-lg border border-white/10 bg-[#111111] p-6 transition-all hover:border-[#22d3ee]/50 hover:bg-[#181818]">
              <div class="flex items-center justify-between">
                <p class="text-base font-medium leading-normal text-gray-400">Total de Reservas</p>
                <span class="material-symbols-outlined text-gray-400">calendar_today</span>
              </div>
              <p class="text-3xl font-bold leading-tight tracking-tight text-gray-100">890</p>
              <p class="text-sm font-medium leading-normal text-green-400">+10.2%</p>
            </div>

            <div class="flex flex-col gap-2 rounded-lg border border-white/10 bg-[#111111] p-6 transition-all hover:border-[#22d3ee]/50 hover:bg-[#181818]">
              <div class="flex items-center justify-between">
                <p class="text-base font-medium leading-normal text-gray-400">Ingresos Totales</p>
                <span class="material-symbols-outlined text-gray-400">monetization_on</span>
              </div>
              <p class="text-3xl font-bold leading-tight tracking-tight text-gray-100">$54,800</p>
              <p class="text-sm font-medium leading-normal text-green-400">+15.8%</p>
            </div>
          </section>

          <!-- Chart and Activity -->
          <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <section class="lg:col-span-2">
              <h2 class="px-1 pb-4 text-xl font-semibold leading-tight tracking-tight text-gray-100">Ingresos en los últimos 30 días</h2>
              <div class="flex h-80 items-center justify-center rounded-lg border border-white/10 bg-[#111111] p-4">
                <div class="flex flex-col items-center gap-2 text-center text-gray-400">
                  <span class="material-symbols-outlined text-4xl text-[#22d3ee]">monitoring</span>
                  <p class="text-sm">Data chart placeholder</p>
                </div>
              </div>
            </section>

            <section>
              <h2 class="px-1 pb-4 text-xl font-semibold leading-tight tracking-tight text-gray-100">Actividad Reciente</h2>
              <div class="rounded-lg border border-white/10 bg-[#111111]">
                <div class="overflow-x-auto">
                  <table class="w-full text-left text-sm text-gray-400">
                    <thead class="text-xs uppercase text-gray-400">
                      <tr>
                        <th class="px-6 py-3" scope="col">Artista</th>
                        <th class="px-6 py-3" scope="col">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-t border-white/10">
                        <td class="px-6 py-4 font-medium text-gray-100">DJ Electra</td>
                        <td class="px-6 py-4"><span class="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400">Reserva Confirmada</span></td>
                      </tr>
                      <tr class="border-t border-white/10">
                        <td class="px-6 py-4 font-medium text-gray-100">Mago Supremo</td>
                        <td class="px-6 py-4"><span class="rounded-full bg-[rgba(34,211,238,0.2)] px-2.5 py-0.5 text-xs font-medium text-[#22d3ee]">Nuevo Artista</span></td>
                      </tr>
                      <tr class="border-t border-white/10">
                        <td class="px-6 py-4 font-medium text-gray-100">Banda "The Echoes"</td>
                        <td class="px-6 py-4"><span class="rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-400">Reserva Pendiente</span></td>
                      </tr>
                      <tr class="border-t border-white/10">
                        <td class="px-6 py-4 font-medium text-gray-100">Comediante Risa</td>
                        <td class="px-6 py-4"><span class="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400">Reserva Confirmada</span></td>
                      </tr>
                      <tr class="border-t border-white/10">
                        <td class="px-6 py-4 font-medium text-gray-100">Acróbatas Volare</td>
                        <td class="px-6 py-4"><span class="rounded-full bg-[rgba(34,211,238,0.2)] px-2.5 py-0.5 text-xs font-medium text-[#22d3ee]">Nuevo Artista</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>

        <!-- Gestión de Usuarios -->
        <div v-if="seccionActiva === 'usuarios'" class="space-y-6">
          <div class="rounded-lg border border-gray-800 bg-[#141414]">
            <!-- Filtros y Búsqueda -->
            <div class="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
              <div class="relative w-full md:max-w-xs">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                <input 
                  v-model="busquedaUsuarios"
                  class="w-full rounded-lg border border-gray-700 bg-[#1F1F1F] py-2 pl-10 pr-4 text-gray-200 placeholder-gray-500 focus:border-[#00F5D4] focus:ring-[#00F5D4] focus:outline-none" 
                  placeholder="Buscar usuario..." 
                  type="search"
                />
              </div>
              <div class="flex flex-col gap-4 sm:flex-row">
                <div class="flex items-center gap-2">
                  <select 
                    v-model="filtroRol"
                    class="rounded-lg border border-gray-700 bg-[#1F1F1F] py-2 pl-3 pr-8 text-gray-200 focus:border-[#00F5D4] focus:ring-[#00F5D4] focus:outline-none"
                  >
                    <option value="">Filtrar por Rol</option>
                    <option value="admin">Admin</option>
                    <option value="artista">Artista</option>
                    <option value="cliente">Cliente</option>
                  </select>
                  <select 
                    v-model="filtroEstado"
                    class="rounded-lg border border-gray-700 bg-[#1F1F1F] py-2 pl-3 pr-8 text-gray-200 focus:border-[#00F5D4] focus:ring-[#00F5D4] focus:outline-none"
                  >
                    <option value="">Filtrar por Estado</option>
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>
                <button 
                  @click="mostrarModalNuevoUsuario = true"
                  class="flex items-center justify-center gap-2 rounded-lg bg-[#00F5D4] px-4 py-2 text-sm font-bold text-black hover:bg-[#00F5D4]/90 transition-colors"
                >
                  <span class="material-symbols-outlined">add</span>
                  Agregar Nuevo Usuario
                </button>
              </div>
            </div>

            <!-- Tabla de Usuarios -->
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm text-gray-300">
                <thead class="border-b border-gray-800 bg-transparent text-xs uppercase text-gray-400">
                  <tr>
                    <th class="px-6 py-3" scope="col">Nombre</th>
                    <th class="px-6 py-3" scope="col">Correo Electrónico</th>
                    <th class="px-6 py-3" scope="col">Rol</th>
                    <th class="px-6 py-3" scope="col">Estado</th>
                    <th class="px-6 py-3 text-center" scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-if="cargandoUsuarios"
                    class="border-t border-gray-800"
                  >
                    <td colspan="5" class="px-6 py-8 text-center text-gray-400">
                      <div class="flex items-center justify-center gap-2">
                        <span class="material-symbols-outlined animate-spin">progress_activity</span>
                        Cargando usuarios...
                      </div>
                    </td>
                  </tr>
                  <tr 
                    v-else-if="usuariosFiltrados.length === 0"
                    class="border-t border-gray-800"
                  >
                    <td colspan="5" class="px-6 py-8 text-center text-gray-400">
                      No se encontraron usuarios
                    </td>
                  </tr>
                  <tr 
                    v-else
                    v-for="usuario in usuariosPaginados" 
                    :key="usuario.id" 
                    class="border-t border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
                    <td class="px-6 py-4 font-medium text-gray-100">{{ usuario.nombre || usuario.email.split('@')[0] }}</td>
                    <td class="px-6 py-4">{{ usuario.email }}</td>
                    <td class="px-6 py-4 capitalize">{{ usuario.tipo_usuario }}</td>
                    <td class="px-6 py-4">
                      <span :class="[
                        'rounded-full px-2.5 py-0.5 text-xs',
                        usuario.esta_activo 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      ]">
                        {{ usuario.esta_activo ? 'Activo' : 'Inactivo' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center justify-center gap-2">
                        <button 
                          @click="verDetalleUsuario(usuario)"
                          class="p-1 text-gray-400 hover:text-[#00F5D4] transition-colors"
                          title="Ver detalles"
                        >
                          <span class="material-symbols-outlined">visibility</span>
                        </button>
                        <button 
                          @click="editarUsuario(usuario)"
                          class="p-1 text-gray-400 hover:text-[#00F5D4] transition-colors"
                          title="Editar"
                        >
                          <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button 
                          @click="toggleEstadoUsuario(usuario)"
                          class="p-1 text-gray-400 hover:text-yellow-400 transition-colors"
                          :title="usuario.esta_activo ? 'Desactivar' : 'Activar'"
                        >
                          <span class="material-symbols-outlined">
                            {{ usuario.esta_activo ? 'block' : 'check_circle' }}
                          </span>
                        </button>
                        <button 
                          @click="confirmarEliminarUsuario(usuario)"
                          class="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Eliminar"
                        >
                          <span class="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Paginación -->
            <div class="flex flex-col items-center justify-between gap-4 border-t border-gray-800 p-4 sm:flex-row">
              <span class="text-sm text-gray-400">
                Mostrando 
                <span class="font-semibold text-gray-200">{{ inicioRango }}-{{ finRango }}</span> 
                de 
                <span class="font-semibold text-gray-200">{{ usuariosFiltrados.length }}</span>
              </span>
              <div class="inline-flex items-center -space-x-px text-sm">
                <button 
                  @click="paginaActual--"
                  :disabled="paginaActual === 1"
                  :class="[
                    'flex h-8 items-center justify-center rounded-l-lg border border-gray-700 bg-transparent px-3 leading-tight',
                    paginaActual === 1 
                      ? 'text-gray-600 cursor-not-allowed' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  ]"
                >
                  Anterior
                </button>
                <button 
                  v-for="pagina in paginasVisibles" 
                  :key="pagina"
                  @click="paginaActual = pagina"
                  :class="[
                    'flex h-8 items-center justify-center border px-3 leading-tight',
                    pagina === paginaActual
                      ? 'border-[#00F5D4] bg-[#00F5D4] text-black font-semibold'
                      : 'border-gray-700 bg-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  ]"
                >
                  {{ pagina }}
                </button>
                <button 
                  @click="paginaActual++"
                  :disabled="paginaActual === totalPaginas"
                  :class="[
                    'flex h-8 items-center justify-center rounded-r-lg border border-gray-700 bg-transparent px-3 leading-tight',
                    paginaActual === totalPaginas 
                      ? 'text-gray-600 cursor-not-allowed' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  ]"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Gestión de Artistas -->
        <div v-if="seccionActiva === 'artistas'" class="space-y-6">
          <!-- Header con botón agregar -->
          <div class="flex items-center justify-between">
            <button class="flex items-center gap-2 rounded-lg bg-[#22d3ee] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#1aa3c4]">
              <span class="material-symbols-outlined">add</span>
              Agregar Nuevo Artista
            </button>
          </div>

          <!-- Filtros y Búsqueda -->
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div class="relative w-full md:max-w-sm">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
              <input 
                v-model="busquedaArtistas"
                class="w-full rounded-lg border border-gray-700 bg-[#1F1F1F] py-2 pl-10 pr-4 text-gray-200 placeholder-gray-500 focus:border-[#22d3ee] focus:ring-[#22d3ee] focus:outline-none" 
                placeholder="Buscar artista..." 
                type="search"
              />
            </div>
            <div class="flex flex-wrap items-center gap-4">
              <select 
                v-model="filtroCategoria"
                class="rounded-lg border border-gray-700 bg-[#1F1F1F] py-2 pl-3 pr-8 text-gray-200 focus:border-[#22d3ee] focus:ring-[#22d3ee] focus:outline-none"
              >
                <option value="">Categoría</option>
                <option value="Músico">Músico</option>
                <option value="Mago">Mago</option>
                <option value="Comediante">Comediante</option>
                <option value="Acróbata">Acróbata</option>
              </select>
              <select 
                v-model="filtroEstadoArtista"
                class="rounded-lg border border-gray-700 bg-[#1F1F1F] py-2 pl-3 pr-8 text-gray-200 focus:border-[#22d3ee] focus:ring-[#22d3ee] focus:outline-none"
              >
                <option value="">Estado</option>
                <option value="aprobado">Aprobado</option>
                <option value="pendiente">Pendiente</option>
                <option value="rechazado">Rechazado</option>
              </select>
              <button class="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:border-gray-500 hover:text-gray-200">
                Filtrar
              </button>
            </div>
          </div>

          <!-- Tabla de Artistas -->
          <div class="overflow-hidden rounded-lg border border-gray-800 bg-[#141414]">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm text-gray-400">
                <thead class="bg-black/20 text-xs uppercase text-gray-400">
                  <tr>
                    <th class="px-6 py-3" scope="col">Nombre Artístico</th>
                    <th class="px-6 py-3" scope="col">Categoría</th>
                    <th class="px-6 py-3" scope="col">Ubicación</th>
                    <th class="px-6 py-3" scope="col">Rating</th>
                    <th class="px-6 py-3" scope="col">Estado</th>
                    <th class="px-6 py-3 text-center" scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="artista in artistasPaginados" 
                    :key="artista.id"
                    class="border-t border-gray-800 transition-colors hover:bg-white/5"
                  >
                    <td class="whitespace-nowrap px-6 py-4 font-medium text-gray-100">
                      {{ artista.nombre_artistico || artista.nombre }}
                    </td>
                    <td class="px-6 py-4">{{ artista.categoria }}</td>
                    <td class="px-6 py-4">{{ artista.ciudad }}, {{ artista.pais }}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-1">
                        <span :class="artista.calificacion_promedio ? 'text-yellow-400' : 'text-gray-500'">
                          {{ artista.calificacion_promedio || 'N/A' }}
                        </span>
                        <span v-if="artista.calificacion_promedio" class="material-symbols-outlined text-base text-yellow-400">star</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span :class="[
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                        artista.verificado 
                          ? 'bg-green-500/20 text-green-400' 
                          : artista.estado === 'pendiente'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                      ]">
                        {{ artista.verificado ? 'Aprobado' : artista.estado === 'pendiente' ? 'Pendiente' : 'Rechazado' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center justify-center gap-2">
                        <button 
                          @click="verDetalleArtista(artista)"
                          class="p-1 text-gray-400 hover:text-[#22d3ee]"
                          title="Ver"
                        >
                          <span class="material-symbols-outlined">visibility</span>
                        </button>
                        <button 
                          v-if="!artista.verificado && artista.estado === 'pendiente'"
                          @click="aprobarArtista(artista.id)"
                          class="p-1 text-gray-400 hover:text-green-500"
                          title="Aprobar"
                        >
                          <span class="material-symbols-outlined">check_circle</span>
                        </button>
                        <button 
                          v-if="!artista.verificado && artista.estado === 'pendiente'"
                          @click="rechazarArtista(artista.id)"
                          class="p-1 text-gray-400 hover:text-red-500"
                          title="Rechazar"
                        >
                          <span class="material-symbols-outlined">cancel</span>
                        </button>
                        <button 
                          v-if="artista.verificado"
                          @click="editarArtista(artista)"
                          class="p-1 text-gray-400 hover:text-yellow-400"
                          title="Editar"
                        >
                          <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button 
                          @click="eliminarArtista(artista.id)"
                          class="p-1 text-gray-400 hover:text-red-500"
                          title="Eliminar"
                        >
                          <span class="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="artistasFiltrados.length === 0" class="border-t border-gray-800">
                    <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                      No se encontraron artistas
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Paginación Artistas -->
            <div class="flex flex-col items-center justify-between gap-4 border-t border-gray-800 px-6 py-4 sm:flex-row">
              <p class="text-sm text-gray-400">
                Mostrando 
                <span class="font-medium text-gray-200">1</span> a 
                <span class="font-medium text-gray-200">5</span> de 
                <span class="font-medium text-gray-200">128</span> resultados
              </p>
              <div class="flex items-center gap-2">
                <button class="flex items-center justify-center rounded-lg border border-gray-700 p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-gray-200">
                  <span class="material-symbols-outlined">chevron_left</span>
                </button>
                <nav class="flex items-center gap-2">
                  <a class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#22d3ee] text-sm font-medium text-black" href="#">1</a>
                  <a class="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-white/10 hover:text-gray-200" href="#">2</a>
                  <a class="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-white/10 hover:text-gray-200" href="#">3</a>
                  <span class="text-gray-400">...</span>
                  <a class="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-white/10 hover:text-gray-200" href="#">26</a>
                </nav>
                <button class="flex items-center justify-center rounded-lg border border-gray-700 p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-gray-200">
                  <span class="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Gestión de Reservas -->
        <div v-if="seccionActiva === 'reservas'" class="space-y-6">
          <!-- Filtros y Búsqueda -->
          <div class="rounded-lg border border-gray-800 bg-[#1a1a1a] p-6">
            <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div class="relative flex-grow sm:flex-grow-0 sm:w-80">
                <span class="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                <input 
                  v-model="busquedaReservas"
                  class="w-full rounded-lg border border-gray-700 bg-[#0a0a0a] py-2 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:border-[#00f5d4] focus:outline-none focus:ring-1 focus:ring-[#00f5d4]" 
                  placeholder="Buscar por artista, cliente..." 
                  type="text"
                />
              </div>
              <div class="flex flex-wrap items-center gap-4">
                <div class="relative">
                  <select 
                    v-model="filtroEstadoReserva"
                    class="w-full appearance-none rounded-lg border border-gray-700 bg-[#0a0a0a] py-2 pl-3 pr-8 text-sm text-gray-200 focus:border-[#00f5d4] focus:outline-none focus:ring-1 focus:ring-[#00f5d4] sm:w-auto"
                  >
                    <option value="">Todos los estados</option>
                    <option value="confirmado">Confirmada</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="cancelado">Cancelada</option>
                  </select>
                  <span class="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">expand_more</span>
                </div>
                <button class="flex items-center gap-2 rounded-lg border border-gray-700 bg-transparent px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/5">
                  <span class="material-symbols-outlined text-base">filter_list</span>
                  Filtros
                </button>
              </div>
            </div>

            <!-- Tabla de Reservas -->
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm text-gray-400">
                <thead class="border-b border-gray-700 text-xs uppercase text-gray-400">
                  <tr>
                    <th class="px-6 py-3" scope="col">Artista</th>
                    <th class="px-6 py-3" scope="col">Cliente</th>
                    <th class="px-6 py-3" scope="col">Fecha</th>
                    <th class="px-6 py-3" scope="col">Servicio</th>
                    <th class="px-6 py-3" scope="col">Estado</th>
                    <th class="px-6 py-3 text-right" scope="col">Monto</th>
                    <th class="px-6 py-3 text-center" scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="reserva in reservasPaginadas" 
                    :key="reserva.id"
                    class="border-b border-gray-800 hover:bg-[#0a0a0a]"
                  >
                    <td class="whitespace-nowrap px-6 py-4 font-medium text-gray-200">
                      {{ reserva.artista_nombre }}
                    </td>
                    <td class="px-6 py-4">{{ reserva.cliente_nombre }}</td>
                    <td class="px-6 py-4">{{ formatearFecha(reserva.fecha_evento) }}</td>
                    <td class="px-6 py-4">{{ reserva.servicio || 'N/A' }}</td>
                    <td class="px-6 py-4">
                      <span :class="[
                        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
                        reserva.estado === 'confirmado' || reserva.estado === 'completado'
                          ? 'bg-green-500/10 text-green-400'
                          : reserva.estado === 'pendiente' || reserva.estado === 'firmado'
                            ? 'bg-yellow-500/10 text-yellow-400'
                            : 'bg-red-500/10 text-red-400'
                      ]">
                        <span :class="[
                          'h-1.5 w-1.5 rounded-full',
                          reserva.estado === 'confirmado' || reserva.estado === 'completado'
                            ? 'bg-green-500'
                            : reserva.estado === 'pendiente' || reserva.estado === 'firmado'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        ]"></span>
                        {{ reserva.estado === 'confirmado' ? 'Confirmada' : reserva.estado === 'pendiente' ? 'Pendiente' : reserva.estado === 'cancelado' ? 'Cancelada' : reserva.estado }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-right font-medium text-gray-200">
                      ${{ parseFloat(reserva.monto_total).toFixed(2) }}
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center justify-center gap-2">
                        <button 
                          @click="verDetalleReserva(reserva)"
                          class="p-1 text-gray-400 hover:text-[#00f5d4]"
                          title="Ver"
                        >
                          <span class="material-symbols-outlined text-xl">visibility</span>
                        </button>
                        <button 
                          v-if="reserva.estado === 'pendiente'"
                          @click="confirmarReserva(reserva.id)"
                          class="p-1 text-gray-400 hover:text-green-500"
                          title="Confirmar"
                        >
                          <span class="material-symbols-outlined text-xl">check_circle</span>
                        </button>
                        <button 
                          v-if="reserva.estado !== 'cancelado'"
                          @click="cancelarReserva(reserva.id)"
                          class="p-1 text-gray-400 hover:text-red-500"
                          title="Cancelar"
                        >
                          <span class="material-symbols-outlined text-xl">cancel</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="reservasFiltradas.length === 0" class="border-b border-gray-800">
                    <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                      No se encontraron reservas
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Paginación Reservas -->
            <div class="mt-6 flex flex-col items-center justify-between gap-4 border-t border-gray-700 pt-4 sm:flex-row">
              <p class="text-sm text-gray-400">
                Mostrando 
                <span class="font-medium text-gray-200">1</span> a 
                <span class="font-medium text-gray-200">5</span> de 
                <span class="font-medium text-gray-200">890</span> resultados
              </p>
              <div class="inline-flex items-center gap-1 rounded-lg bg-[#0a0a0a] p-1">
                <button class="rounded-md p-2 text-sm text-gray-400 hover:bg-[#1a1a1a] hover:text-gray-200">
                  <span class="material-symbols-outlined text-base">chevron_left</span>
                </button>
                <button class="rounded-md bg-[#00f5d4] px-3 py-1.5 text-sm font-medium text-[#0a0a0a]">1</button>
                <button class="rounded-md px-3 py-1.5 text-sm text-gray-400 hover:bg-[#1a1a1a] hover:text-gray-200">2</button>
                <button class="rounded-md px-3 py-1.5 text-sm text-gray-400 hover:bg-[#1a1a1a] hover:text-gray-200">3</button>
                <span class="px-1 text-sm text-gray-400">...</span>
                <button class="rounded-md px-3 py-1.5 text-sm text-gray-400 hover:bg-[#1a1a1a] hover:text-gray-200">178</button>
                <button class="rounded-md p-2 text-sm text-gray-400 hover:bg-[#1a1a1a] hover:text-gray-200">
                  <span class="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Reportes -->
        <div v-if="seccionActiva === 'reportes'" class="space-y-6">
          <p class="text-lg font-semibold text-gray-100">Reportes y Analíticas</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="rounded-lg border border-white/10 bg-[#111111] p-6">
              <h3 class="font-semibold text-gray-100 mb-4">Resumen Mensual</h3>
              <div class="flex h-48 items-center justify-center">
                <div class="flex flex-col items-center gap-2 text-center text-gray-400">
                  <span class="material-symbols-outlined text-4xl text-[#22d3ee]">bar_chart</span>
                  <p class="text-sm">Gráfico de barras placeholder</p>
                </div>
              </div>
            </div>

            <div class="rounded-lg border border-white/10 bg-[#111111] p-6">
              <h3 class="font-semibold text-gray-100 mb-4">Categorías Más Populares</h3>
              <div class="flex h-48 items-center justify-center">
                <div class="flex flex-col items-center gap-2 text-center text-gray-400">
                  <span class="material-symbols-outlined text-4xl text-[#22d3ee]">pie_chart</span>
                  <p class="text-sm">Gráfico circular placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Configuración -->
        <div v-if="seccionActiva === 'configuracion'" class="space-y-6">
          <div class="mx-auto max-w-4xl space-y-8">
            <!-- Ajustes Generales -->
            <section class="rounded-lg border border-gray-800 bg-[#111111] p-6">
              <h2 class="text-xl font-semibold leading-tight text-gray-50">Ajustes Generales</h2>
              <p class="mt-1 text-sm text-gray-400">Configura los parámetros generales de la aplicación.</p>
              
              <div class="mt-6 space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-300" for="app-name">Nombre de la Aplicación</label>
                  <input 
                    v-model="configuracion.nombreApp"
                    class="mt-1 w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-gray-200 placeholder-gray-500 focus:border-[#38bdf8] focus:outline-none focus:ring-1 focus:ring-[#38bdf8]" 
                    id="app-name" 
                    type="text"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300" for="contact-email">Email de Contacto</label>
                  <input 
                    v-model="configuracion.emailContacto"
                    class="mt-1 w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-gray-200 placeholder-gray-500 focus:border-[#38bdf8] focus:outline-none focus:ring-1 focus:ring-[#38bdf8]" 
                    id="contact-email" 
                    type="email"
                  />
                </div>
                <div class="flex items-center">
                  <input 
                    v-model="configuracion.modoMantenimiento"
                    class="rounded border-gray-600 bg-gray-800 text-[#38bdf8] shadow-sm focus:border-[#38bdf8] focus:ring focus:ring-[#38bdf8] focus:ring-opacity-50" 
                    id="maintenance-mode" 
                    type="checkbox"
                  />
                  <label class="ml-3 text-sm text-gray-300" for="maintenance-mode">Activar modo de mantenimiento</label>
                </div>
              </div>
              
              <div class="mt-6 border-t border-gray-800 pt-6">
                <button 
                  @click="guardarConfiguracion"
                  class="rounded-md bg-[#38bdf8] px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#38bdf8]/90 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]" 
                  type="button"
                >
                  Guardar Cambios
                </button>
              </div>
            </section>

            <!-- Roles y Permisos -->
            <section class="rounded-lg border border-gray-800 bg-[#111111] p-6">
              <h2 class="text-xl font-semibold leading-tight text-gray-50">Roles y Permisos</h2>
              <p class="mt-1 text-sm text-gray-400">Gestiona los roles de usuario y sus permisos de acceso.</p>
              
              <div class="mt-6 space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-300">Permitir registro de nuevos artistas</span>
                  <button 
                    @click="configuracion.permisos.registroArtistas = !configuracion.permisos.registroArtistas"
                    :class="[
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]',
                      configuracion.permisos.registroArtistas ? 'bg-[#38bdf8]' : 'bg-gray-700'
                    ]"
                    role="switch" 
                    type="button"
                  >
                    <span 
                      :class="[
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                        configuracion.permisos.registroArtistas ? 'translate-x-5' : 'translate-x-0'
                      ]"
                    ></span>
                  </button>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-300">Requerir aprobación de administrador para nuevos artistas</span>
                  <button 
                    @click="configuracion.permisos.aprobacionArtistas = !configuracion.permisos.aprobacionArtistas"
                    :class="[
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]',
                      configuracion.permisos.aprobacionArtistas ? 'bg-[#38bdf8]' : 'bg-gray-700'
                    ]"
                    role="switch" 
                    type="button"
                  >
                    <span 
                      :class="[
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                        configuracion.permisos.aprobacionArtistas ? 'translate-x-5' : 'translate-x-0'
                      ]"
                    ></span>
                  </button>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-300">Permitir a los clientes dejar reseñas</span>
                  <button 
                    @click="configuracion.permisos.resenasClientes = !configuracion.permisos.resenasClientes"
                    :class="[
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]',
                      configuracion.permisos.resenasClientes ? 'bg-[#38bdf8]' : 'bg-gray-700'
                    ]"
                    role="switch" 
                    type="button"
                  >
                    <span 
                      :class="[
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                        configuracion.permisos.resenasClientes ? 'translate-x-5' : 'translate-x-0'
                      ]"
                    ></span>
                  </button>
                </div>
              </div>
              
              <div class="mt-6 border-t border-gray-800 pt-6">
                <button 
                  @click="guardarConfiguracion"
                  class="rounded-md bg-[#38bdf8] px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#38bdf8]/90 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]" 
                  type="button"
                >
                  Guardar Cambios
                </button>
              </div>
            </section>

            <!-- Métodos de Pago -->
            <section class="rounded-lg border border-gray-800 bg-[#111111] p-6">
              <h2 class="text-xl font-semibold leading-tight text-gray-50">Métodos de Pago</h2>
              <p class="mt-1 text-sm text-gray-400">Configura las pasarelas de pago y las comisiones.</p>
              
              <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label class="block text-sm font-medium text-gray-300" for="paypal-key">Clave API de PayPal</label>
                  <input 
                    v-model="configuracion.pagos.paypalKey"
                    class="mt-1 w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-gray-200 placeholder-gray-500 focus:border-[#38bdf8] focus:outline-none focus:ring-1 focus:ring-[#38bdf8]" 
                    id="paypal-key" 
                    type="password"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300" for="stripe-key">Clave API de Stripe</label>
                  <input 
                    v-model="configuracion.pagos.stripeKey"
                    class="mt-1 w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-gray-200 placeholder-gray-500 focus:border-[#38bdf8] focus:outline-none focus:ring-1 focus:ring-[#38bdf8]" 
                    id="stripe-key" 
                    type="password"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-300" for="commission-rate">Tasa de Comisión (%)</label>
                  <input 
                    v-model="configuracion.pagos.tasaComision"
                    class="mt-1 w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-gray-200 placeholder-gray-500 focus:border-[#38bdf8] focus:outline-none focus:ring-1 focus:ring-[#38bdf8]" 
                    id="commission-rate" 
                    type="number"
                  />
                </div>
              </div>
              
              <div class="mt-6 border-t border-gray-800 pt-6">
                <button 
                  @click="guardarConfiguracion"
                  class="rounded-md bg-[#38bdf8] px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#38bdf8]/90 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]" 
                  type="button"
                >
                  Guardar Cambios
                </button>
              </div>
            </section>

            <!-- Notificaciones -->
            <section class="rounded-lg border border-gray-800 bg-[#111111] p-6">
              <h2 class="text-xl font-semibold leading-tight text-gray-50">Notificaciones</h2>
              <p class="mt-1 text-sm text-gray-400">Ajusta qué notificaciones por correo electrónico se envían.</p>
              
              <div class="mt-6 space-y-4">
                <div class="flex items-start">
                  <div class="flex h-5 items-center">
                    <input 
                      v-model="configuracion.notificaciones.nuevaReserva"
                      class="rounded border-gray-600 bg-gray-800 text-[#38bdf8] shadow-sm focus:border-[#38bdf8] focus:ring focus:ring-[#38bdf8] focus:ring-opacity-50" 
                      id="new-booking" 
                      type="checkbox"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label class="font-medium text-gray-300" for="new-booking">Nueva Reserva</label>
                    <p class="text-gray-500">Notificar al artista y al administrador.</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="flex h-5 items-center">
                    <input 
                      v-model="configuracion.notificaciones.cancelacionReserva"
                      class="rounded border-gray-600 bg-gray-800 text-[#38bdf8] shadow-sm focus:border-[#38bdf8] focus:ring focus:ring-[#38bdf8] focus:ring-opacity-50" 
                      id="booking-cancellation" 
                      type="checkbox"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label class="font-medium text-gray-300" for="booking-cancellation">Cancelación de Reserva</label>
                    <p class="text-gray-500">Notificar a las partes involucradas.</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="flex h-5 items-center">
                    <input 
                      v-model="configuracion.notificaciones.nuevoArtista"
                      class="rounded border-gray-600 bg-gray-800 text-[#38bdf8] shadow-sm focus:border-[#38bdf8] focus:ring focus:ring-[#38bdf8] focus:ring-opacity-50" 
                      id="new-artist" 
                      type="checkbox"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label class="font-medium text-gray-300" for="new-artist">Registro de Nuevo Artista</label>
                    <p class="text-gray-500">Notificar al administrador para su aprobación.</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 border-t border-gray-800 pt-6">
                <button 
                  @click="guardarConfiguracion"
                  class="rounded-md bg-[#38bdf8] px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#38bdf8]/90 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]" 
                  type="button"
                >
                  Guardar Cambios
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const seccionActiva = ref('dashboard');
const mostrarMenuUsuario = ref(false);

// Estados para Gestión de Usuarios
const usuarios = ref([]);
const cargandoUsuarios = ref(false);
const busquedaUsuarios = ref('');
const filtroRol = ref('');
const filtroEstado = ref('');
const paginaActual = ref(1);
const itemsPorPagina = ref(10);
const mostrarModalNuevoUsuario = ref(false);

// Estados para Gestión de Artistas
const artistas = ref([]);
const busquedaArtistas = ref('');
const filtroCategoria = ref('');
const filtroEstadoArtista = ref('');

// Estados para Gestión de Reservas
const reservas = ref([]);
const busquedaReservas = ref('');
const filtroEstadoReserva = ref('');

// Estados para Configuración
const configuracion = ref({
  nombreApp: 'ShowTime Hub',
  emailContacto: 'contacto@showtimehub.com',
  modoMantenimiento: false,
  permisos: {
    registroArtistas: true,
    aprobacionArtistas: true,
    resenasClientes: false
  },
  pagos: {
    paypalKey: '************',
    stripeKey: '************',
    tasaComision: 15
  },
  notificaciones: {
    nuevaReserva: true,
    cancelacionReserva: true,
    nuevoArtista: false
  }
});

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'usuarios', label: 'Gestión de Usuarios', icon: 'groups' },
  { id: 'artistas', label: 'Gestión de Artistas', icon: 'theater_comedy' },
  { id: 'reservas', label: 'Gestión de Reservas', icon: 'book_online' },
  { id: 'reportes', label: 'Reportes', icon: 'bar_chart' },
  { id: 'configuracion', label: 'Configuración', icon: 'settings' }
];

const tituloSeccion = computed(() => {
  const item = menuItems.find(i => i.id === seccionActiva.value);
  return item ? item.label : 'Dashboard';
});

// Computed para filtros de usuarios
const usuariosFiltrados = computed(() => {
  let resultado = usuarios.value;

  // Filtrar por búsqueda
  if (busquedaUsuarios.value) {
    const termino = busquedaUsuarios.value.toLowerCase();
    resultado = resultado.filter(u => 
      u.email.toLowerCase().includes(termino) ||
      (u.nombre && u.nombre.toLowerCase().includes(termino))
    );
  }

  // Filtrar por rol
  if (filtroRol.value) {
    resultado = resultado.filter(u => u.tipo_usuario === filtroRol.value);
  }

  // Filtrar por estado
  if (filtroEstado.value !== '') {
    const estadoBoolean = filtroEstado.value === 'true';
    resultado = resultado.filter(u => u.esta_activo === estadoBoolean);
  }

  return resultado;
});

// Paginación
const totalPaginas = computed(() => {
  return Math.ceil(usuariosFiltrados.value.length / itemsPorPagina.value);
});

const usuariosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * itemsPorPagina.value;
  const fin = inicio + itemsPorPagina.value;
  return usuariosFiltrados.value.slice(inicio, fin);
});

const inicioRango = computed(() => {
  return usuariosFiltrados.value.length === 0 ? 0 : (paginaActual.value - 1) * itemsPorPagina.value + 1;
});

const finRango = computed(() => {
  const fin = paginaActual.value * itemsPorPagina.value;
  return fin > usuariosFiltrados.value.length ? usuariosFiltrados.value.length : fin;
});

const paginasVisibles = computed(() => {
  const paginas = [];
  const maxPaginas = 5;
  let inicio = Math.max(1, paginaActual.value - Math.floor(maxPaginas / 2));
  let fin = Math.min(totalPaginas.value, inicio + maxPaginas - 1);
  
  if (fin - inicio < maxPaginas - 1) {
    inicio = Math.max(1, fin - maxPaginas + 1);
  }
  
  for (let i = inicio; i <= fin; i++) {
    paginas.push(i);
  }
  
  return paginas;
});

// Funciones de API
const cargarUsuarios = async () => {
  cargandoUsuarios.value = true;
  try {
    const response = await fetch('http://localhost:3000/api/usuarios', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      usuarios.value = data.datos || data;
    } else {
      console.error('Error al cargar usuarios');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    cargandoUsuarios.value = false;
  }
};

const toggleEstadoUsuario = async (usuario) => {
  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}/estado`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ esta_activo: !usuario.esta_activo })
    });
    
    if (response.ok) {
      usuario.esta_activo = !usuario.esta_activo;
    } else {
      alert('Error al cambiar el estado del usuario');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al cambiar el estado del usuario');
  }
};

const verDetalleUsuario = (usuario) => {
  alert(`Ver detalles de: ${usuario.email}`);
  // Aquí puedes abrir un modal con los detalles
};

const editarUsuario = (usuario) => {
  alert(`Editar usuario: ${usuario.email}`);
  // Aquí puedes abrir un modal de edición
};

const confirmarEliminarUsuario = (usuario) => {
  if (confirm(`¿Estás seguro de eliminar al usuario ${usuario.email}?`)) {
    eliminarUsuario(usuario);
  }
};

const eliminarUsuario = async (usuario) => {
  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (response.ok) {
      usuarios.value = usuarios.value.filter(u => u.id !== usuario.id);
      alert('Usuario eliminado exitosamente');
    } else {
      alert('Error al eliminar el usuario');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al eliminar el usuario');
  }
};

const irAPerfil = () => {
  mostrarMenuUsuario.value = false;
  router.push('/perfil');
};

const irAConfiguracion = () => {
  mostrarMenuUsuario.value = false;
  seccionActiva.value = 'configuracion';
};

const cerrarSesion = () => {
  authStore.cerrarSesion();
  router.push('/');
};

// ==================== GESTIÓN DE ARTISTAS ====================

const artistasFiltrados = computed(() => {
  let resultado = artistas.value.map(a => ({
    ...a,
    estado: !a.verificado ? 'pendiente' : 'aprobado'
  }));

  // Búsqueda
  if (busquedaArtistas.value) {
    const termino = busquedaArtistas.value.toLowerCase();
    resultado = resultado.filter(a =>
      (a.nombre_artistico && a.nombre_artistico.toLowerCase().includes(termino)) ||
      (a.nombre && a.nombre.toLowerCase().includes(termino)) ||
      (a.ciudad && a.ciudad.toLowerCase().includes(termino))
    );
  }

  // Filtrar por categoría
  if (filtroCategoria.value) {
    resultado = resultado.filter(a => a.categoria && a.categoria.includes(filtroCategoria.value));
  }

  // Filtrar por estado
  if (filtroEstadoArtista.value) {
    if (filtroEstadoArtista.value === 'aprobado') {
      resultado = resultado.filter(a => a.verificado === true);
    } else if (filtroEstadoArtista.value === 'pendiente') {
      resultado = resultado.filter(a => !a.verificado && a.estado === 'pendiente');
    } else if (filtroEstadoArtista.value === 'rechazado') {
      resultado = resultado.filter(a => !a.verificado && a.estado === 'rechazado');
    }
  }

  return resultado;
});

const artistasPaginados = computed(() => {
  return artistasFiltrados.value.slice(0, 5); // Placeholder, implementar paginación real
});

const cargarArtistas = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/artistas?incluirNoVerificados=true', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      artistas.value = data.artistas || data.datos || data;
    }
  } catch (error) {
    console.error('Error al cargar artistas:', error);
  }
};

const verDetalleArtista = (artista) => {
  alert(`Ver detalle de: ${artista.nombre_artistico || artista.nombre}`);
};

const aprobarArtista = async (id) => {
  if (confirm('¿Aprobar este artista?')) {
    try {
      const response = await fetch(`http://localhost:3000/api/artistas/${id}/aprobar`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        alert('Artista aprobado exitosamente');
        cargarArtistas();
      }
    } catch (error) {
      console.error('Error al aprobar artista:', error);
    }
  }
};

const rechazarArtista = async (id) => {
  if (confirm('¿Rechazar este artista?')) {
    try {
      const response = await fetch(`http://localhost:3000/api/artistas/${id}/rechazar`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        alert('Artista rechazado');
        cargarArtistas();
      }
    } catch (error) {
      console.error('Error al rechazar artista:', error);
    }
  }
};

const editarArtista = (artista) => {
  alert(`Editar artista: ${artista.nombre_artistico || artista.nombre}`);
};

const eliminarArtista = async (id) => {
  if (confirm('¿Estás seguro de eliminar este artista?')) {
    try {
      const response = await fetch(`http://localhost:3000/api/artistas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        }
      });
      if (response.ok) {
        alert('Artista eliminado');
        cargarArtistas();
      }
    } catch (error) {
      console.error('Error al eliminar artista:', error);
    }
  }
};

// ==================== GESTIÓN DE RESERVAS ====================

const reservasFiltradas = computed(() => {
  let resultado = reservas.value;

  // Búsqueda
  if (busquedaReservas.value) {
    const termino = busquedaReservas.value.toLowerCase();
    resultado = resultado.filter(r =>
      (r.artista_nombre && r.artista_nombre.toLowerCase().includes(termino)) ||
      (r.cliente_nombre && r.cliente_nombre.toLowerCase().includes(termino))
    );
  }

  // Filtrar por estado
  if (filtroEstadoReserva.value) {
    resultado = resultado.filter(r => r.estado === filtroEstadoReserva.value);
  }

  return resultado;
});

const reservasPaginadas = computed(() => {
  return reservasFiltradas.value.slice(0, 5); // Placeholder, implementar paginación real
});

const cargarReservas = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/contratos/admin/todos', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      reservas.value = data.datos || data;
    } else if (response.status === 403) {
      console.warn('No tienes permisos de administrador para ver todas las reservas');
      alert('Debes iniciar sesión como administrador para acceder a esta sección');
      router.push('/login');
    }
  } catch (error) {
    console.error('Error al cargar reservas:', error);
  }
};

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-ES');
};

const verDetalleReserva = (reserva) => {
  alert(`Ver detalle de reserva #${reserva.contrato_id}`);
};

const confirmarReserva = async (id) => {
  if (confirm('¿Confirmar esta reserva?')) {
    try {
      const response = await fetch(`http://localhost:3000/api/contratos/${id}/confirmar`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        alert('Reserva confirmada');
        cargarReservas();
      }
    } catch (error) {
      console.error('Error al confirmar reserva:', error);
    }
  }
};

const cancelarReserva = async (id) => {
  if (confirm('¿Cancelar esta reserva?')) {
    try {
      const response = await fetch(`http://localhost:3000/api/contratos/${id}/cancelar`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        alert('Reserva cancelada');
        cargarReservas();
      }
    } catch (error) {
      console.error('Error al cancelar reserva:', error);
    }
  }
};

// ==================== CONFIGURACIÓN ====================

const guardarConfiguracion = () => {
  alert('Configuración guardada exitosamente');
  console.log('Configuración:', configuracion.value);
};

// Cerrar el menú cuando se hace clic fuera de él
const cerrarMenuAlClickFuera = (evento) => {
  if (mostrarMenuUsuario.value && !evento.target.closest('.relative')) {
    mostrarMenuUsuario.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', cerrarMenuAlClickFuera);
  cargarUsuarios();
  cargarArtistas();
  cargarReservas();
});

onBeforeUnmount(() => {
  document.removeEventListener('click', cerrarMenuAlClickFuera);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
