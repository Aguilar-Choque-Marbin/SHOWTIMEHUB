<template>
  <div class="min-h-screen bg-[#0A0A0A]">
    <main class="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="cargando" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BCD4]"></div>
        <p class="mt-4 text-gray-400">Cargando perfil...</p>
      </div>

      <div v-else-if="error" class="text-center py-20">
        <p class="text-red-400">{{ error }}</p>
        <button @click="$router.push('/artistas')" class="mt-4 text-[#00BCD4] hover:underline">
          Volver a artistas
        </button>
      </div>

      <div v-else class="layout-content-container flex flex-col flex-1">
        <!-- Header del perfil -->
        <div class="flex flex-col sm:flex-row items-center gap-6 mb-6">
          <div 
            class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-36 w-36 min-w-36 border-4 border-[#0A0A0A] shadow-lg"
            :style="`background-image: url('${artista.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(artista.nombre_artistico || 'Artista') + '&background=00BCD4&color=fff'}')`"
          ></div>
          <div class="flex flex-col justify-center text-center sm:text-left">
            <p class="text-white text-3xl font-bold leading-tight tracking-[-0.015em]">{{ artista.nombre_artistico || 'Artista' }}</p>
            <p class="text-gray-400 text-lg font-normal leading-normal">{{ artista.categoria_principal || 'Artista' }}</p>
            <p class="text-gray-400 text-base font-normal leading-normal">{{ artista.ciudad || 'Bolivia' }}, {{ artista.pais || 'Bolivia' }}</p>
          </div>
        </div>

        <!-- Barra de información y botones -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-b border-gray-800">
          <div class="flex items-center gap-6 text-gray-300">
            <div class="flex items-center gap-1">
              <span class="text-yellow-500 text-xl">★</span>
              <span class="font-bold text-white">{{ artista.calificacion_promedio ? Number(artista.calificacion_promedio).toFixed(1) : '0.0' }}</span>
              <span class="text-sm">({{ artista.total_resenas || 0 }} reseñas)</span>
            </div>
            <div class="hidden sm:block border-l border-gray-800 h-6"></div>
            <p class="text-sm">Desde <span class="font-bold text-white">Bs. {{ formatearPrecio(artista.precio_minimo || 0) }}/hora</span></p>
          </div>
          <div class="flex w-full sm:w-auto max-w-[480px] gap-3">
            <button 
              @click="contactar"
              class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-800 text-white text-sm font-bold leading-normal tracking-[0.015em] flex-1 hover:bg-gray-700"
            >
              <span class="truncate">Contactar</span>
            </button>
            <button 
              @click="solicitarPresupuesto"
              class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#00BCD4] text-black text-sm font-bold leading-normal tracking-[0.015em] flex-1 hover:bg-[#00D4EF]"
            >
              <span class="truncate">Solicitar presupuesto</span>
            </button>
          </div>
        </div>

        <!-- Navegación por pestañas -->
        <div class="py-3">
          <div class="flex border-b border-gray-800 gap-8 overflow-x-auto">
            <a 
              v-for="tab in tabs" 
              :key="tab.id"
              @click.prevent="tabActiva = tab.id"
              :class="[
                'flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 whitespace-nowrap cursor-pointer',
                tabActiva === tab.id 
                  ? 'border-b-[#00BCD4] text-white' 
                  : 'border-b-transparent text-gray-400 hover:text-[#00BCD4]'
              ]"
              href="#"
            >
              <p class="text-sm font-bold leading-normal tracking-[0.015em]">{{ tab.nombre }}</p>
            </a>
          </div>
        </div>

        <!-- Contenido principal con sidebar -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
          <div class="lg:col-span-2">
            <!-- Sección Acerca de -->
            <section v-show="tabActiva === 'acerca'" id="about">
              <h2 class="text-white text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">Acerca de {{ artista.nombre_artistico }}</h2>
              <p class="text-gray-300 leading-relaxed mb-6">
                {{ artista.biografia || 'Artista profesional con amplia experiencia en eventos.' }}
              </p>
              <div v-if="tags.length" class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in tags" 
                  :key="tag"
                  class="bg-[#00BCD4]/20 text-[#00BCD4] text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
            </section>

            <!-- Sección Servicios y Precios -->
            <section v-show="tabActiva === 'servicios'" id="services">
              <h2 class="text-white text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">Servicios y Precios</h2>
              <div v-if="cargandoServicios" class="text-center py-8 text-gray-400">
                Cargando servicios...
              </div>
              <div v-else-if="servicios.length === 0" class="text-center py-8 text-gray-400">
                No hay servicios disponibles
              </div>
              <div v-else class="space-y-4">
                <div
                  v-for="servicio in servicios"
                  :key="servicio.id"
                  class="block p-6 bg-gray-900/50 hover:bg-gray-900 rounded-xl border border-gray-800 transition-colors duration-200 cursor-pointer"
                  @click="solicitarServicio(servicio)"
                >
                  <div class="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h3 class="font-bold text-white text-lg">{{ servicio.titulo_servicio }}</h3>
                      <p class="text-gray-400 mt-1 max-w-lg">{{ servicio.descripcion }}</p>
                    </div>
                    <div class="flex-shrink-0 text-left sm:text-right">
                      <p class="text-[#00BCD4] text-lg font-bold">
                        Bs. {{ formatearPrecio(servicio.precio_base) }}
                        <span v-if="servicio.precio_hora"> / Bs. {{ formatearPrecio(servicio.precio_hora) }}/hora</span>
                      </p>
                    </div>
                  </div>
                  <div class="mt-4">
                    <span class="inline-flex items-center gap-2 text-[#00BCD4] text-sm font-bold leading-normal tracking-[0.015em]">
                      Solicitar este servicio
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <!-- Sección Galería -->
            <section v-show="tabActiva === 'galeria'" id="gallery">
              <h2 class="text-white text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">Galería</h2>
              <div v-if="cargandoGaleria" class="text-center py-8 text-gray-400">
                Cargando galería...
              </div>
              <div v-else-if="galeria.length === 0" class="text-center py-8 text-gray-400">
                No hay imágenes en la galería
              </div>
              <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div
                  v-for="(item, index) in galeria.slice(0, 5)"
                  :key="item.id"
                  class="aspect-square bg-gray-900 rounded-lg overflow-hidden cursor-pointer relative"
                  @click="abrirGaleria(index)"
                >
                  <img class="w-full h-full object-cover" :src="item.url" :alt="item.titulo || 'Imagen de galería'"/>
                  <div v-if="item.tipo_media === 'video'" class="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span class="text-white text-5xl">▶</span>
                  </div>
                </div>
                <div 
                  v-if="galeria.length > 5"
                  class="aspect-square bg-[#00BCD4]/20 rounded-lg flex items-center justify-center cursor-pointer"
                  @click="verMasGaleria"
                >
                  <span class="text-[#00BCD4] font-bold">+{{ galeria.length - 5 }} Más</span>
                </div>
              </div>
            </section>

            <!-- Sección Reseñas -->
            <section v-show="tabActiva === 'resenas'" id="reviews">
              <h2 class="text-white text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">Reseñas y Calificaciones</h2>
              <div v-if="cargandoResenas" class="text-center py-8 text-gray-400">
                Cargando reseñas...
              </div>
              <div v-else-if="resenas.length === 0" class="text-center py-8 text-gray-400">
                No hay reseñas aún
              </div>
              <div v-else class="space-y-6">
                <div 
                  v-for="resena in resenas.slice(0, 5)"
                  :key="resena.id"
                  class="border-b border-gray-800 pb-6"
                >
                  <div class="flex items-start gap-4">
                    <img 
                      class="w-12 h-12 rounded-full" 
                      :src="resena.avatar_cliente || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(resena.nombre_cliente)" 
                      :alt="'Foto de ' + resena.nombre_cliente"
                    />
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <h3 class="font-bold text-white">{{ resena.nombre_cliente }}</h3>
                        <div class="flex text-yellow-500">
                          <span v-for="i in 5" :key="i" class="text-base">{{ i <= resena.calificacion ? '★' : '☆' }}</span>
                        </div>
                      </div>
                      <p class="text-sm text-gray-400">{{ formatearFecha(resena.fecha_calificacion) }}</p>
                      <p class="mt-2 text-gray-300">{{ resena.comentario }}</p>
                    </div>
                  </div>
                </div>
                <button 
                  v-if="resenas.length > 5"
                  @click="verTodasResenas"
                  class="text-[#00BCD4] font-bold text-sm hover:text-[#00D4EF]"
                >
                  Mostrar las {{ artista.total_resenas }} reseñas
                </button>
              </div>
            </section>
          </div>

          <!-- Sidebar - Disponibilidad -->
          <aside class="lg:col-span-1">
            <div class="sticky top-24">
              <h2 class="text-white text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">Disponibilidad</h2>
              <div class="bg-gray-900 p-4 rounded-xl border border-gray-800">
                <div class="flex justify-between items-center mb-4">
                  <button 
                    @click="mesAnterior"
                    class="text-gray-400 hover:text-white"
                  >
                    ←
                  </button>
                  <h3 class="font-bold text-white">{{ nombreMes }} {{ ano }}</h3>
                  <button 
                    @click="mesSiguiente"
                    class="text-gray-400 hover:text-white"
                  >
                    →
                  </button>
                </div>
                <div class="grid grid-cols-7 text-center text-xs font-semibold text-gray-400 mb-2">
                  <span>Do</span><span>Lu</span><span>Ma</span><span>Mi</span><span>Ju</span><span>Vi</span><span>Sá</span>
                </div>
                <div class="grid grid-cols-7 text-center text-sm">
                  <span 
                    v-for="dia in diasCalendario" 
                    :key="dia.fecha"
                    :class="[
                      'p-2',
                      dia.otroMes ? 'text-gray-500' : '',
                      dia.reservado ? 'bg-[#00BCD4] text-black font-semibold rounded-full' : '',
                      dia.pendiente ? 'bg-yellow-400/20 text-yellow-300 font-semibold rounded-full' : '',
                      dia.noDisponible ? 'bg-red-500/20 text-red-300 font-semibold rounded-full' : ''
                    ]"
                  >
                    {{ dia.dia }}
                  </span>
                </div>
                <div class="mt-4 flex flex-col gap-2 text-xs text-gray-400">
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-[#00BCD4]"></span> Reservado
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-yellow-400/20 border border-yellow-700"></span> Pendiente
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-red-500/20 border border-red-700"></span> No disponible
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { artistaService } from '@/services/api';

const route = useRoute();
const router = useRouter();

const cargando = ref(true);
const error = ref('');

const artista = ref({});
const servicios = ref([]);
const galeria = ref([]);
const resenas = ref([]);
const tags = ref(['Eventos Corporativos', 'Fiestas Privadas', 'Bodas']);

const cargandoServicios = ref(false);
const cargandoGaleria = ref(false);
const cargandoResenas = ref(false);

const tabActiva = ref('acerca');
const tabs = [
  { id: 'acerca', nombre: 'Acerca de' },
  { id: 'servicios', nombre: 'Servicios y Precios' },
  { id: 'galeria', nombre: 'Galería' },
  { id: 'resenas', nombre: 'Reseñas' },
  { id: 'disponibilidad', nombre: 'Disponibilidad' }
];

// Calendario
const mesActual = ref(new Date().getMonth());
const ano = ref(new Date().getFullYear());

const nombreMes = computed(() => {
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return meses[mesActual.value];
});

const diasCalendario = computed(() => {
  const primerDia = new Date(ano.value, mesActual.value, 1);
  const ultimoDia = new Date(ano.value, mesActual.value + 1, 0);
  const diasMesAnterior = new Date(ano.value, mesActual.value, 0).getDate();
  
  const dias = [];
  const primerDiaSemana = primerDia.getDay();
  
  // Días del mes anterior
  for (let i = primerDiaSemana - 1; i >= 0; i--) {
    dias.push({
      dia: diasMesAnterior - i,
      fecha: `${ano.value}-${mesActual.value}-${diasMesAnterior - i}`,
      otroMes: true
    });
  }
  
  // Días del mes actual
  for (let i = 1; i <= ultimoDia.getDate(); i++) {
    dias.push({
      dia: i,
      fecha: `${ano.value}-${mesActual.value + 1}-${i}`,
      otroMes: false,
      reservado: [10, 11, 25].includes(i),
      pendiente: [20].includes(i),
      noDisponible: [4].includes(i)
    });
  }
  
  // Días del siguiente mes
  const diasRestantes = 42 - dias.length;
  for (let i = 1; i <= diasRestantes; i++) {
    dias.push({
      dia: i,
      fecha: `${ano.value}-${mesActual.value + 2}-${i}`,
      otroMes: true
    });
  }
  
  return dias;
});

const cargarArtista = async () => {
  cargando.value = true;
  error.value = '';
  
  try {
    const respuesta = await artistaService.obtenerPorId(route.params.id);
    if (respuesta.data.exito) {
      artista.value = respuesta.data.artista;
      
      // Cargar datos adicionales (por ahora con datos de ejemplo)
      cargarServicios();
      cargarGaleria();
      cargarResenas();
    }
  } catch (err) {
    console.error('Error al cargar artista:', err);
    error.value = 'No se pudo cargar el perfil del artista';
  } finally {
    cargando.value = false;
  }
};

const cargarServicios = () => {
  cargandoServicios.value = true;
  // Datos de ejemplo por ahora
  setTimeout(() => {
    servicios.value = [
      {
        id: 1,
        titulo_servicio: 'Show de Magia Estándar',
        descripcion: 'Un espectáculo de 45 minutos de magia clásica y mentalismo, perfecto para fiestas de cumpleaños y reuniones familiares.',
        precio_base: 3000,
        precio_hora: null
      },
      {
        id: 2,
        titulo_servicio: 'Magia de Cerca Itinerante',
        descripcion: 'Marco se mezcla con sus invitados, realizando trucos de cartas íntimos e ilusiones de manos para pequeños grupos.',
        precio_base: null,
        precio_hora: 500
      },
      {
        id: 3,
        titulo_servicio: 'Gran Ilusión de Escenario',
        descripcion: 'Un espectáculo completo de 90 minutos con grandes ilusiones, participación del público y efectos especiales.',
        precio_base: 10000,
        precio_hora: null
      }
    ];
    cargandoServicios.value = false;
  }, 500);
};

const cargarGaleria = () => {
  cargandoGaleria.value = true;
  // Datos de ejemplo
  setTimeout(() => {
    galeria.value = [];
    cargandoGaleria.value = false;
  }, 500);
};

const cargarResenas = () => {
  cargandoResenas.value = true;
  // Datos de ejemplo
  setTimeout(() => {
    resenas.value = [
      {
        id: 1,
        nombre_cliente: 'Lucía G.',
        calificacion: 5,
        comentario: '¡Marco fue lo más destacado de la fiesta anual de nuestra empresa! Fue profesional, simpático y absolutamente alucinante. Nuestros empleados todavía hablan de su actuación. ¡Muy recomendable!',
        fecha_calificacion: '2023-10-25',
        avatar_cliente: null
      },
      {
        id: 2,
        nombre_cliente: 'David Pérez',
        calificacion: 5,
        comentario: 'Contratamos a Marco para la recepción de nuestra boda y fue increíble. Se mezcló con los invitados realizando magia de cerca y todos quedaron asombrados. Añadió un toque verdaderamente mágico a nuestro día especial.',
        fecha_calificacion: '2023-09-12',
        avatar_cliente: null
      }
    ];
    cargandoResenas.value = false;
  }, 500);
};

const formatearPrecio = (precio) => {
  if (!precio) return '0';
  return new Intl.NumberFormat('es-BO').format(precio);
};

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const contactar = () => {
  // Redirigir a mensajes o abrir chat con el artista
  router.push({ name: 'dashboard', query: { seccion: 'mensajes', artista: artistaId } });
};

const solicitarPresupuesto = () => {
  // Redirigir a solicitud de presupuesto personalizado (sin servicio específico)
  router.push({ 
    name: 'solicitar-presupuesto-personalizado', 
    params: { artistaId: artistaId } 
  });
};

const solicitarServicio = (servicio) => {
  // Redirigir a solicitud de presupuesto con servicio específico
  router.push({ 
    name: 'solicitar-presupuesto', 
    params: { 
      artistaId: artistaId,
      servicioId: servicio.servicio_id 
    } 
  });
};

const abrirGaleria = (index) => {
  console.log('Abrir galería en índice:', index);
};

const verMasGaleria = () => {
  console.log('Ver más imágenes');
};

const verTodasResenas = () => {
  console.log('Ver todas las reseñas');
};

const mesAnterior = () => {
  if (mesActual.value === 0) {
    mesActual.value = 11;
    ano.value--;
  } else {
    mesActual.value--;
  }
};

const mesSiguiente = () => {
  if (mesActual.value === 11) {
    mesActual.value = 0;
    ano.value++;
  } else {
    mesActual.value++;
  }
};

onMounted(() => {
  cargarArtista();
});
</script>
