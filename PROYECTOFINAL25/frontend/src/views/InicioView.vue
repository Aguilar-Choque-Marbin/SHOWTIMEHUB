<template>
  <div class="min-h-screen bg-[#0A0A0A]">
    <!-- Hero Section -->
    <section class="relative">
      <div class="w-full px-4 sm:px-8 lg:px-12 py-4 sm:py-6">
        <div 
          class="flex min-h-[480px] flex-col gap-8 items-center justify-center text-center p-6 rounded-xl bg-cover bg-center bg-no-repeat"
          style="background-image: linear-gradient(rgba(10, 10, 10, 0.7) 0%, rgba(10, 10, 10, 0.9) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDzmMghe_sPRpnAfCIZc0Z65XXj7t1cQCQcS3V3bw0aQGDJ9P4sY0ftzq1wq7I_S2tr_hmerzl22dQbMAn-9HgHNZflMYf-_60lqQo0wJ1O0XH9IgrSh3UNLYOrA7BxP_S9BU5KfkyMyL5JllTcTyTvJPT7k64-flqb4GROHMUC9Lqe2V1NkK8ZW3_j4TtRfixPO_Llwk0Lznaog8nVZiKzrVSSoWKN4HU01YsPNHIVuNjXeP30jIsh5639IvtsWwtTJ5LywKUJPA');"
        >
          <div class="flex flex-col gap-4 max-w-3xl">
            <h1 class="text-white text-4xl md:text-5xl font-bold tracking-tight">
              Entretenimiento Extraordinario, Contratado Sin Esfuerzo.
            </h1>
            <h2 class="text-slate-200 text-base md:text-lg font-normal">
              El marketplace principal para descubrir y contratar artistas y animadores talentosos para cualquier ocasión.
            </h2>
          </div>
          <div class="flex flex-wrap gap-4 justify-center">
            <button
              @click="$router.push('/artistas')"
              class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#00BCD4] text-[#0A0A0A] text-base font-bold shadow-lg hover:bg-[#00D4EF] transition-colors"
            >
              <span class="truncate">Encuentra un Artista</span>
            </button>
            <button
              @click="$router.push('/registro')"
              class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-slate-100 text-slate-800 text-base font-bold shadow-lg hover:bg-slate-200 transition-colors"
            >
              <span class="truncate">Conviértete en Artista</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Categorías populares -->
    <section class="py-16 sm:py-24">
      <div class="w-full px-4 sm:px-8 lg:px-12">
        <h2 class="text-white text-3xl font-bold tracking-tight text-center mb-12">
          Explora por Categoría
        </h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="categoria in categorias"
            :key="categoria.id"
            @click="irACategoría(categoria.id)"
            class="group flex flex-col gap-3 text-center items-center cursor-pointer"
          >
            <div 
              class="w-full bg-slate-800 bg-center bg-no-repeat aspect-square bg-cover rounded-xl transition-shadow group-hover:shadow-lg group-hover:shadow-[#00BCD4]/30"
              :style="`background-image: url('${categoria.imagen_url || categoria.imagen}')`"
            ></div>
            <div>
              <p class="text-slate-100 text-base font-semibold leading-normal">{{ categoria.nombre }}</p>
              <p class="text-slate-400 text-sm font-normal leading-normal">{{ categoria.descripcion }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Contratación Simplificada -->
    <section class="bg-[#111111] py-16 sm:py-24">
      <div class="w-full px-4 sm:px-8 lg:px-12">
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-white text-3xl font-bold tracking-tight">Contratación Simplificada</h2>
          <p class="mt-4 text-lg text-slate-300">Encuentra y contrata el entretenimiento perfecto para tu evento en solo tres sencillos pasos.</p>
        </div>
        <div class="mt-12 grid md:grid-cols-3 gap-12 text-center">
          <div class="flex flex-col items-center">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-[#00BCD4]/20 text-[#00BCD4] mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-100">1. Busca</h3>
            <p class="mt-2 text-slate-300">Navega por nuestro extenso catálogo de artistas talentosos por categoría, ubicación y tipo de evento.</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-[#00BCD4]/20 text-[#00BCD4] mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-100">2. Conecta</h3>
            <p class="mt-2 text-slate-300">Comunícate directamente con los artistas para discutir los detalles y requisitos de tu evento.</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-[#00BCD4]/20 text-[#00BCD4] mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-100">3. Contrata</h3>
            <p class="mt-2 text-slate-300">Asegura a tu artista elegido con nuestro sistema de contratación y pago simple y seguro.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonios -->
    <section class="py-16 sm:py-24">
      <div class="w-full px-4 sm:px-8 lg:px-12">
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-white text-3xl font-bold tracking-tight">Lo que Dicen Nuestros Clientes</h2>
          <p class="mt-4 text-lg text-slate-300">Estamos orgullosos de haber ayudado a crear eventos inolvidables para nuestros increíbles clientes.</p>
        </div>
        <div class="mt-12 grid md:grid-cols-3 gap-8">
          <div class="bg-slate-900 p-8 rounded-xl border border-slate-800">
            <div class="flex items-center mb-2">
              <span v-for="i in 5" :key="i" class="text-[#00BCD4] text-xl">★</span>
            </div>
            <blockquote class="text-slate-300">"¡La banda que contratamos a través de ShowTime Hub fue absolutamente fenomenal! Hicieron que la recepción de nuestra boda fuera inolvidable. El proceso fue impecable."</blockquote>
            <p class="mt-4 font-semibold text-slate-100">Sarah L.</p>
          </div>
          <div class="bg-slate-900 p-8 rounded-xl border border-slate-800">
            <div class="flex items-center mb-2">
              <span v-for="i in 5" :key="i" class="text-[#00BCD4] text-xl">★</span>
            </div>
            <blockquote class="text-slate-300">"Encontrar un mago para nuestro evento corporativo fue muy fácil. La plataforma es fácil de usar y el talento es de primer nivel. ¡Muy recomendable!"</blockquote>
            <p class="mt-4 font-semibold text-slate-100">Michael B.</p>
          </div>
          <div class="bg-slate-900 p-8 rounded-xl border border-slate-800">
            <div class="flex items-center mb-2">
              <span v-for="i in 5" :key="i" class="text-[#00BCD4] text-xl">★</span>
            </div>
            <blockquote class="text-slate-300">"Como planificadora de eventos, este es mi recurso de referencia. La variedad y calidad de los artistas es inigualable. Me ahorra mucho tiempo y esfuerzo."</blockquote>
            <p class="mt-4 font-semibold text-slate-100">Jessica T.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { artistaService, categoriaService } from '@/services/api';

const router = useRouter();

const busqueda = ref('');
const categoriaSeleccionada = ref('');
const categorias = ref([
  { 
    id: 1, 
    nombre: 'Músicos', 
    descripcion: 'Solistas, bandas y DJs.',
    imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMVaPqkeo9mb4VoqpTVT6RkMr-AfFzh_vnAjiZKV9kO4s2b6ZmNegJMogEnxAwh6Myw8nZUxHpUQNzNsuigYQIVHpkyuBBDEg3S--M2PHBf6bwBspOVKYD72iS3m1XS-QbgLt1vgfpdPFPDFzLndCzE_wwdETSLrNs6aYSDvhClg4oM6sVSxgYZxTmL_qZLTHUC-EIM0pfn7O38DTy3KIBliw3Cv3c8EBf0guxWbbUTdk4pb5Zg7cSbN6Tc_r6O9ZNPcbChwwvCA'
  },
  { 
    id: 2, 
    nombre: 'Magos', 
    descripcion: 'Ilusiones asombrosas.',
    imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGJwLrmP2hJjyHAJjWGRfRRhHrilzQxj97q1rLUW582Uv-9Mcgr6CjiySi59NLewcyuT8JG9D5ik0Ku8vxfWw0cD81MEFmRXkvpyN8-snFzyq04urfyzGehjJiK9XrPD8KDL_SlaGFClO1IJT9T2vdwQMD_Z8UyaJinAguw5s6xLeoLE-bWdwSlCnAOCFSLJYRLlTc1jD4C8vQiLSUh9lz9AGlNcj7-hjxb_JRqPpgqMVnsyQbHAtmDikMRKWWpL-Qzjt1DlKLaw'
  },
  { 
    id: 3, 
    nombre: 'Bailarines', 
    descripcion: 'Grupos elegantes y enérgicos.',
    imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDanDcsE8FvwFE2OYzMlnWiWer5g0XLRM2LJMjgo2-eSmBgftcx-gIrtjByGAYUj80LK3SLrxpCckgEnTFN17tCKa83B251BsNDALOl67lExfCT_8YtQ7kJXYGWqHeNollt_WoSCU77yJ4OzSMs7ULIv1JUw3W_k7f7IKZdvxDHLgtpItXNrWd1jwek-ujLtlOg-Q47Hh0duFl72KAd7QH1yv4f_cnPHOT2DaQxf280-sPITL4XEQPY6PlurqM_9ySBBLQ-WFHezw'
  },
  { 
    id: 4, 
    nombre: 'Comediantes', 
    descripcion: 'Actos de stand-up para cualquier evento.',
    imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1zRpgSIPG1GZ_bzhHsGQ5Db17xJ3RqtiVHXrs3fNqYFRTTWsCWJBW9D1YV2zVY3vL1Tg7kntCCventifc0AGA3HraFg8F0hlTAtErYan5LRRWE_9_CIstzSUFnSD_rAx37K6-Ydl76VvZEPu6zjHqJNTORyIm7SwOSW6SsCbTASdhvLSUBNoEO_pekwMgB6yHJbEW9Vjbds8EPAC42ScDt5fMgmv7TzhdqQQIOihfT7GE1dK7cGAvXDiVACmLHGtbVR7bHQDe8A'
  }
]);
const artistasDestacados = ref([
  {
    id: 1,
    nombre_artistico: 'Juan Pérez Band',
    categoria: 'Músicos',
    calificacion_promedio: 4.8,
    total_calificaciones: 45,
    presupuesto_minimo: 500
  },
  {
    id: 2,
    nombre_artistico: 'DJ Master Mix',
    categoria: 'DJ',
    calificacion_promedio: 4.9,
    total_calificaciones: 62,
    presupuesto_minimo: 300
  },
  {
    id: 3,
    nombre_artistico: 'Ballet Clásico',
    categoria: 'Bailarines',
    calificacion_promedio: 5.0,
    total_calificaciones: 38,
    presupuesto_minimo: 800
  },
  {
    id: 4,
    nombre_artistico: 'Mago Ilusión',
    categoria: 'Magos',
    calificacion_promedio: 4.7,
    total_calificaciones: 29,
    presupuesto_minimo: 400
  }
]);
const cargandoArtistas = ref(false);

const cargarCategorias = async () => {
  try {
    const respuesta = await categoriaService.listar();
    if (respuesta.data.exito && respuesta.data.categorias && respuesta.data.categorias.length > 0) {
      // Mapear categorías con imágenes por defecto si no tienen
      categorias.value = respuesta.data.categorias.map(cat => ({
        ...cat,
        imagen_url: cat.imagen_url || obtenerImagenPorCategoria(cat.nombre)
      }));
    }
  } catch (error) {
    console.error('Error al cargar categorías:', error);
    // Mantener categorías por defecto si falla
  }
};

// Función auxiliar para asignar imágenes según el nombre de la categoría
const obtenerImagenPorCategoria = (nombre) => {
  const imagenes = {
    'Músicos': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMVaPqkeo9mb4VoqpTVT6RkMr-AfFzh_vnAjiZKV9kO4s2b6ZmNegJMogEnxAwh6Myw8nZUxHpUQNzNsuigYQIVHpkyuBBDEg3S--M2PHBf6bwBspOVKYD72iS3m1XS-QbgLt1vgfpdPFPDFzLndCzE_wwdETSLrNs6aYSDvhClg4oM6sVSxgYZxTmL_qZLTHUC-EIM0pfn7O38DTy3KIBliw3Cv3c8EBf0guxWbbUTdk4pb5Zg7cSbN6Tc_r6O9ZNPcbChwwvCA',
    'Magos': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGJwLrmP2hJjyHAJjWGRfRRhHrilzQxj97q1rLUW582Uv-9Mcgr6CjiySi59NLewcyuT8JG9D5ik0Ku8vxfWw0cD81MEFmRXkvpyN8-snFzyq04urfyzGehjJiK9XrPD8KDL_SlaGFClO1IJT9T2vdwQMD_Z8UyaJinAguw5s6xLeoLE-bWdwSlCnAOCFSLJYRLlTc1jD4C8vQiLSUh9lz9AGlNcj7-hjxb_JRqPpgqMVnsyQbHAtmDikMRKWWpL-Qzjt1DlKLaw',
    'Bailarines': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDanDcsE8FvwFE2OYzMlnWiWer5g0XLRM2LJMjgo2-eSmBgftcx-gIrtjByGAYUj80LK3SLrxpCckgEnTFN17tCKa83B251BsNDALOl67lExfCT_8YtQ7kJXYGWqHeNollt_WoSCU77yJ4OzSMs7ULIv1JUw3W_k7f7IKZdvxDHLgtpItXNrWd1jwek-ujLtlOg-Q47Hh0duFl72KAd7QH1yv4f_cnPHOT2DaQxf280-sPITL4XEQPY6PlurqM_9ySBBLQ-WFHezw',
    'Comediantes': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1zRpgSIPG1GZ_bzhHsGQ5Db17xJ3RqtiVHXrs3fNqYFRTTWsCWJBW9D1YV2zVY3vL1Tg7kntCCventifc0AGA3HraFg8F0hlTAtErYan5LRRWE_9_CIstzSUFnSD_rAx37K6-Ydl76VvZEPu6zjHqJNTORyIm7SwOSW6SsCbTASdhvLSUBNoEO_pekwMgB6yHJbEW9Vjbds8EPAC42ScDt5fMgmv7TzhdqQQIOihfT7GE1dK7cGAvXDiVACmLHGtbVR7bHQDe8A',
    'Cantantes': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    'DJs': 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800',
    'Fotógrafos': 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
    'Videógrafos': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800',
    'Payasos': 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800',
    'Actores': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
  };
  return imagenes[nombre] || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800';
};

const cargarArtistasDestacados = async () => {
  cargandoArtistas.value = true;
  try {
    const respuesta = await artistaService.listar({ limite: 8, destacados: true });
    if (respuesta.data.exito) {
      artistasDestacados.value = respuesta.data.artistas;
    }
  } catch (error) {
    console.error('Error al cargar artistas:', error);
    // Mantener artistas por defecto si falla
  } finally {
    cargandoArtistas.value = false;
  }
};

const buscarArtistas = () => {
  const params = {};
  if (busqueda.value) params.busqueda = busqueda.value;
  if (categoriaSeleccionada.value) params.categoria = categoriaSeleccionada.value;
  
  router.push({ name: 'artistas', query: params });
};

const irACategoría = (categoriaId) => {
  router.push({ name: 'artistas', query: { categoria: categoriaId } });
};

const irADetalle = (artistaId) => {
  router.push({ name: 'artista-detalle', params: { id: artistaId } });
};

onMounted(() => {
  cargarCategorias();
  cargarArtistasDestacados();
});
</script>
