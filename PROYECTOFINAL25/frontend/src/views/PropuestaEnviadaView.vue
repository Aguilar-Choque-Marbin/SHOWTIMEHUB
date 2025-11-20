<template>
  <div class="font-display bg-[#000000] text-gray-200 min-h-screen">
    <div class="relative flex min-h-screen w-full flex-col">
      
      <!-- Header -->
      <header class="sticky top-0 z-10 flex w-full items-center justify-start whitespace-nowrap border-b border-solid border-white/10 bg-[#000000] px-4 py-3 backdrop-blur-sm sm:px-8 md:px-10 lg:px-20">
        <div class="flex items-center gap-3 text-white">
          <span class="material-symbols-outlined text-[#00BCD4] text-3xl">
            local_activity
          </span>
          <h1 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">ShowTime Hub</h1>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center sm:py-12 md:py-16">
        <div class="flex w-full max-w-lg flex-col items-center gap-8">
          
          <div class="flex flex-col items-center gap-6">
            <!-- Ícono de éxito -->
            <span class="material-symbols-outlined text-[#00BCD4] !text-7xl font-light">
              check_circle
            </span>

            <!-- Título -->
            <h2 class="text-4xl font-black leading-tight tracking-[-0.033em] text-white sm:text-5xl">
              ¡Propuesta Enviada con Éxito!
            </h2>

            <!-- Descripción -->
            <p class="max-w-md text-base text-gray-300 sm:text-lg">
              El cliente será notificado y revisará tu propuesta. Te avisaremos cuando haya una respuesta.
            </p>
          </div>

          <!-- Botones de acción -->
          <div class="mt-4 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              @click="volverAlDashboard"
              class="flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#00BCD4] px-8 text-base font-bold leading-normal tracking-[0.015em] text-white transition-transform duration-200 hover:scale-105 active:scale-100 sm:w-auto"
            >
              Volver al Dashboard
            </button>

            <button
              @click="verPropuestaEnviada"
              class="flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border border-[#00BCD4] bg-transparent px-8 text-base font-bold leading-normal tracking-[0.015em] text-[#00BCD4] transition-colors duration-200 hover:bg-[#00BCD4]/10 active:bg-[#00BCD4]/20 sm:w-auto"
            >
              Ver Propuesta Enviada
            </button>
          </div>

        </div>
      </main>

    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const solicitudId = route.params.solicitudId

const volverAlDashboard = () => {
  router.push({ name: 'dashboard-artista', query: { seccion: 'contratos' } })
}

const verPropuestaEnviada = () => {
  // Redirigir a una vista de detalles de la propuesta (por implementar)
  // Por ahora, redirigir al dashboard con la sección de contratos
  router.push({ name: 'dashboard-artista', query: { seccion: 'contratos' } })
}
</script>

<style scoped>
/* Importar Material Symbols */
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

/* Importar Inter font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');

.font-display {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
