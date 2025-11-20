<template>
  <nav class="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#0A0A0A]/80 backdrop-blur-lg">
    <div class="w-full px-4 sm:px-8 lg:px-12">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2">
          <div class="w-6 h-6 text-[#00BCD4]">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill-rule="evenodd"></path>
            </svg>
          </div>
          <span class="text-white text-xl font-bold">ShowTime Hub</span>
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-8">
          <nav class="flex items-center gap-6">
            <router-link
              to="/"
              class="text-slate-300 text-sm font-medium hover:text-[#00BCD4] transition-colors"
            >
              Explorar
            </router-link>
            <router-link
              to="/artistas"
              class="text-slate-300 text-sm font-medium hover:text-[#00BCD4] transition-colors"
            >
              Categorías
            </router-link>
            <a
              href="#como-funciona"
              class="text-slate-300 text-sm font-medium hover:text-[#00BCD4] transition-colors"
            >
              Cómo funciona
            </a>
            <router-link
              to="/artistas"
              class="text-slate-300 text-sm font-medium hover:text-[#00BCD4] transition-colors"
            >
              Buscar
            </router-link>
          </nav>

          <!-- Usuario no autenticado -->
          <template v-if="!authStore.estaAutenticado">
            <router-link
              to="/login"
              class="text-slate-300 text-sm font-medium hover:text-[#00BCD4] transition-colors"
            >
              Iniciar Sesión
            </router-link>
            <router-link
              to="/registro"
              class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#00BCD4] text-[#0A0A0A] text-sm font-bold shadow hover:bg-[#00D4EF] transition-colors"
            >
              Registrarse
            </router-link>
          </template>

          <!-- Usuario autenticado -->
          <template v-else>
            <router-link
              v-if="authStore.esUsuarioNormal"
              to="/favoritos"
              class="text-slate-300 text-sm font-medium hover:text-[#00BCD4] transition-colors"
            >
              Favoritos
            </router-link>
            
            <!-- Dropdown de usuario -->
            <div class="relative" ref="dropdownRef">
              <button
                @click="menuAbierto = !menuAbierto"
                class="flex items-center space-x-2 text-slate-300 hover:text-[#00BCD4] transition-colors"
              >
                <span>{{ authStore.nombreUsuario }}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="menuAbierto"
                class="absolute right-0 mt-2 w-48 bg-slate-900 rounded-lg shadow-lg py-2 border border-slate-800"
              >
                <router-link
                  to="/perfil"
                  @click="menuAbierto = false"
                  class="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-[#00BCD4] transition-colors"
                >
                  Mi Perfil
                </router-link>
                
                <router-link
                  v-if="authStore.esUsuarioNormal"
                  to="/dashboard-usuario"
                  @click="menuAbierto = false"
                  class="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-[#00BCD4] transition-colors"
                >
                  Dashboard
                </router-link>

                <router-link
                  v-if="authStore.esArtista"
                  to="/dashboard-artista"
                  @click="menuAbierto = false"
                  class="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-[#00BCD4] transition-colors"
                >
                  Dashboard Artista
                </router-link>

                <router-link
                  v-if="authStore.esAdmin"
                  to="/dashboard-admin"
                  @click="menuAbierto = false"
                  class="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-[#00BCD4] transition-colors"
                >
                  Dashboard Admin
                </router-link>

                <router-link
                  to="/cotizaciones"
                  @click="menuAbierto = false"
                  class="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-[#00BCD4] transition-colors"
                >
                  Cotizaciones
                </router-link>

                <router-link
                  to="/contratos"
                  @click="menuAbierto = false"
                  class="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-[#00BCD4] transition-colors"
                >
                  Contratos
                </router-link>

                <hr class="my-2 border-slate-800">

                <button
                  @click="cerrarSesion"
                  class="block w-full text-left px-4 py-2 text-red-400 hover:bg-slate-800 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </template>
        </div>

        <!-- Mobile menu button -->
        <button
          @click="menuMovilAbierto = !menuMovilAbierto"
          class="md:hidden text-slate-300 p-2"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!menuMovilAbierto"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="menuMovilAbierto" class="md:hidden py-4 border-t border-slate-800">
        <router-link
          to="/"
          @click="menuMovilAbierto = false"
          class="block py-2 text-slate-300 hover:text-[#00BCD4] transition-colors"
        >
          Explorar
        </router-link>
        <router-link
          to="/artistas"
          @click="menuMovilAbierto = false"
          class="block py-2 text-slate-300 hover:text-[#00BCD4] transition-colors"
        >
          Buscar Artistas
        </router-link>

        <template v-if="!authStore.estaAutenticado">
          <router-link
            to="/login"
            @click="menuMovilAbierto = false"
            class="block py-2 text-slate-300 hover:text-[#00BCD4] transition-colors"
          >
            Iniciar Sesión
          </router-link>
          <router-link
            to="/registro"
            @click="menuMovilAbierto = false"
            class="block py-2 text-[#00BCD4] font-semibold hover:text-[#00D4EF] transition-colors"
          >
            Registrarse
          </router-link>
        </template>

        <template v-else>
          <div class="border-t border-slate-800 mt-2 pt-2">
            <p class="py-2 text-sm text-slate-500">{{ authStore.nombreUsuario }}</p>
            <router-link
              to="/perfil"
              @click="menuMovilAbierto = false"
              class="block py-2 text-slate-300 hover:text-[#00BCD4] transition-colors"
            >
              Mi Perfil
            </router-link>
            <router-link
              v-if="authStore.esUsuarioNormal"
              to="/favoritos"
              @click="menuMovilAbierto = false"
              class="block py-2 text-slate-300 hover:text-[#00BCD4] transition-colors"
            >
              Favoritos
            </router-link>
            <router-link
              v-if="authStore.esUsuarioNormal"
              to="/dashboard"
              @click="menuMovilAbierto = false"
              class="block py-2 text-slate-300 hover:text-[#00BCD4] transition-colors"
            >
              Dashboard
            </router-link>
            <router-link
              v-if="authStore.esArtista"
              to="/dashboard-artista"
              @click="menuMovilAbierto = false"
              class="block py-2 text-slate-300 hover:text-[#00BCD4] transition-colors"
            >
              Dashboard Artista
            </router-link>
            <router-link
              v-if="authStore.esAdmin"
              to="/dashboard-admin"
              @click="menuMovilAbierto = false"
              class="block py-2 text-slate-300 hover:text-[#00BCD4] transition-colors"
            >
              Dashboard Admin
            </router-link>
            <router-link
              to="/cotizaciones"
              @click="menuMovilAbierto = false"
              class="block py-2 text-slate-300 hover:text-[#00BCD4] transition-colors"
            >
              Cotizaciones
            </router-link>
            <router-link
              to="/contratos"
              @click="menuMovilAbierto = false"
              class="block py-2 text-slate-300 hover:text-[#00BCD4] transition-colors"
            >
              Contratos
            </router-link>
            <button
              @click="cerrarSesion"
              class="block w-full text-left py-2 text-red-400 hover:text-red-300 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const menuAbierto = ref(false);
const menuMovilAbierto = ref(false);
const dropdownRef = ref(null);

const cerrarSesion = () => {
  authStore.cerrarSesion();
  menuAbierto.value = false;
  menuMovilAbierto.value = false;
  router.push('/');
};

// Cerrar dropdown al hacer clic fuera
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    menuAbierto.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
