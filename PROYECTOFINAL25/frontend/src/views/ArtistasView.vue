<template>
  <div class="min-h-screen bg-[#0A0A0A]">
    <main class="flex-1 w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
      <div class="flex flex-col gap-8">
        <!-- Header -->
        <div class="flex flex-col gap-2">
          <h1 class="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Encuentra el Artista Perfecto
          </h1>
          <p class="text-slate-400 text-lg">
            Explora nuestra lista seleccionada de artistas profesionales para tu próximo evento.
          </p>
        </div>

        <!-- Filtros -->
        <div class="flex flex-col gap-4">
          <!-- Búsqueda principal -->
          <div class="w-full">
            <label class="sr-only" for="search-artist">Buscar por nombre, especialidad...</label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <input
                v-model="filtros.busqueda"
                @input="buscarArtistas"
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-slate-700 bg-slate-900/50 h-14 placeholder:text-slate-500 pl-12 pr-4 text-base font-normal"
                id="search-artist"
                placeholder="Buscar por nombre, especialidad, ej. 'Banda de Rock'"
                type="text"
              />
            </div>
          </div>

          <!-- Filtros de ubicación y precio -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <input
                v-model="filtros.ubicacion"
                @input="buscarArtistas"
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-slate-700 bg-slate-900/50 h-12 placeholder:text-slate-500 pl-12 p-3 text-base font-normal"
                placeholder="Ubicación"
                type="text"
              />
            </div>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <input
                v-model="filtros.precioMaximo"
                @input="buscarArtistas"
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#00BCD4]/50 border border-slate-700 bg-slate-900/50 h-12 placeholder:text-slate-500 pl-12 p-3 text-base font-normal"
                placeholder="Rango de Precio"
                type="number"
              />
            </div>
          </div>

          <!-- Filtros de categoría -->
          <div class="flex gap-2 sm:gap-3 py-2 overflow-x-auto">
            <button
              @click="filtrarPorCategoria(null)"
              :class="[
                'flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors',
                filtros.categoriaId === null 
                  ? 'bg-[#00BCD4] text-[#0A0A0A]' 
                  : 'bg-slate-900/50 border border-slate-700 text-slate-100 hover:bg-slate-800/60'
              ]"
            >
              <p class="text-sm font-semibold">Todos</p>
            </button>
            <button
              v-for="categoria in categorias"
              :key="categoria.id"
              @click="filtrarPorCategoria(categoria.id)"
              :class="[
                'flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors',
                filtros.categoriaId === categoria.id 
                  ? 'bg-[#00BCD4] text-[#0A0A0A]' 
                  : 'bg-slate-900/50 border border-slate-700 text-slate-100 hover:bg-slate-800/60'
              ]"
            >
              <p class="text-sm font-semibold">{{ categoria.nombre }}</p>
            </button>
          </div>
        </div>
      </div>

      <!-- Grid de artistas -->
      <div class="mt-12">
        <div v-if="cargando" class="text-center py-12">
          <p class="text-slate-400 text-lg">Cargando artistas...</p>
        </div>

        <div v-else-if="artistas.length === 0" class="text-center py-12">
          <p class="text-slate-400 text-lg">No se encontraron artistas.</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="artista in artistas"
            :key="artista.id"
            class="flex flex-col bg-slate-900/50 rounded-xl transition-all duration-300 overflow-hidden group border border-slate-800 hover:border-[#00BCD4]/50 hover:shadow-2xl hover:shadow-[#00BCD4]/10 cursor-pointer"
            @click="verPerfil(artista.id)"
          >
            <!-- Imagen -->
            <div class="relative">
              <img
                :src="artista.imagen_portada || artista.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(artista.nombre_artistico) + '&background=00BCD4&color=0A0A0A'"
                :alt="artista.nombre_artistico"
                class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                v-if="artista.verificado"
                class="absolute top-4 right-4 flex items-center gap-1.5 bg-[#0A0A0A]/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold"
              >
                <svg class="w-4 h-4 text-[#00BCD4]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-[#00BCD4]">Verificado</span>
              </div>
            </div>

            <!-- Información -->
            <div class="p-5 flex flex-col flex-1">
              <div class="flex justify-between items-start">
                <h3 class="text-lg font-bold text-white">{{ artista.nombre_artistico }}</h3>
                <div class="flex items-center gap-1 text-slate-400">
                  <svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="font-bold text-sm">{{ artista.calificacion_promedio || '0.0' }}</span>
                </div>
              </div>
              <p class="text-sm text-slate-400">
                {{ artista.categoria_principal }} • {{ artista.ciudad || 'Ciudad no especificada' }}
              </p>

              <div class="mt-4 flex-1 flex flex-col justify-end gap-4">
                <p class="text-lg font-semibold text-slate-400">
                  <span class="font-bold text-xl text-white">${{ artista.precio_minimo || '0' }}</span>
                  <span v-if="artista.precio_por"> /{{ artista.precio_por }}</span>
                  <span v-else> /hr</span>
                </p>
                <button
                  @click.stop="verPerfil(artista.id)"
                  class="w-full flex items-center justify-center rounded-lg h-11 px-4 bg-[#00BCD4] text-[#0A0A0A] text-sm font-bold hover:bg-[#00D4EF] transition-colors"
                >
                  Ver Perfil
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Paginación -->
        <div v-if="artistas.length > 0" class="mt-12 flex justify-center items-center gap-4">
          <button
            @click="cambiarPagina(paginacion.paginaActual - 1)"
            :disabled="paginacion.paginaActual === 1"
            class="flex items-center justify-center rounded-lg h-11 px-5 bg-slate-900/50 border border-slate-700 text-slate-400 text-sm font-bold hover:bg-slate-800/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span class="text-sm text-slate-400">
            Página {{ paginacion.paginaActual }} de {{ paginacion.totalPaginas }}
          </span>
          <button
            @click="cambiarPagina(paginacion.paginaActual + 1)"
            :disabled="paginacion.paginaActual === paginacion.totalPaginas"
            class="flex items-center justify-center rounded-lg h-11 px-5 bg-slate-900/50 border border-slate-700 text-white text-sm font-bold hover:bg-slate-800/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { artistaService, categoriaService } from '@/services/api';

const router = useRouter();
const route = useRoute();

const artistas = ref([]);
const categorias = ref([
  { id: 1, nombre: 'Músicos' },
  { id: 2, nombre: 'Magos' },
  { id: 10, nombre: 'DJs' },
  { id: 4, nombre: 'Comediantes' },
  { id: 5, nombre: 'Bailarines' }
]);
const cargando = ref(false);

const filtros = ref({
  busqueda: route.query.busqueda || '',
  categoriaId: route.query.categoria ? Number(route.query.categoria) : null,
  ubicacion: route.query.ubicacion || '',
  precioMaximo: route.query.precioMaximo ? Number(route.query.precioMaximo) : null
});

const paginacion = ref({
  paginaActual: 1,
  totalPaginas: 1,
  totalResultados: 0,
  resultadosPorPagina: 12
});

const cargarCategorias = async () => {
  try {
    const respuesta = await categoriaService.listar();
    if (respuesta.data.exito && respuesta.data.categorias) {
      categorias.value = respuesta.data.categorias;
    }
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
};

const buscarArtistas = async () => {
  cargando.value = true;
  try {
    const params = {
      pagina: paginacion.value.paginaActual,
      limite: paginacion.value.resultadosPorPagina
    };

    if (filtros.value.busqueda) params.busqueda = filtros.value.busqueda;
    if (filtros.value.categoriaId) params.categoria = filtros.value.categoriaId;
    if (filtros.value.ubicacion) params.ciudad = filtros.value.ubicacion;
    if (filtros.value.precioMaximo) params.precio_maximo = filtros.value.precioMaximo;

    const respuesta = await artistaService.listar(params);
    
    if (respuesta.data.exito) {
      artistas.value = respuesta.data.artistas || [];
      paginacion.value.totalResultados = respuesta.data.total || 0;
      paginacion.value.totalPaginas = Math.ceil(paginacion.value.totalResultados / paginacion.value.resultadosPorPagina);
    }
  } catch (error) {
    console.error('Error al buscar artistas:', error);
    // Datos de respaldo si falla la API
    artistas.value = [];
  } finally {
    cargando.value = false;
  }
};

const filtrarPorCategoria = (categoriaId) => {
  filtros.value.categoriaId = categoriaId;
  paginacion.value.paginaActual = 1;
  buscarArtistas();
};

const cambiarPagina = (nuevaPagina) => {
  if (nuevaPagina >= 1 && nuevaPagina <= paginacion.value.totalPaginas) {
    paginacion.value.paginaActual = nuevaPagina;
    buscarArtistas();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const verPerfil = (artistaId) => {
  router.push({ name: 'artista-detalle', params: { id: artistaId } });
};

onMounted(() => {
  cargarCategorias();
  buscarArtistas();
});
</script>
