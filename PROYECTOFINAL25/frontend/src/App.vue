<script setup>
import { RouterView, useRoute } from 'vue-router';
import { onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import NavBar from '@/components/NavBar.vue';

const authStore = useAuthStore();
const route = useRoute();

// Rutas donde NO se debe mostrar el NavBar
const rutasSinNavBar = ['/dashboard-admin', '/dashboard-usuario', '/dashboard-artista', '/historial-pagos', '/login', '/registro', '/seleccion-rol'];

const mostrarNavBar = computed(() => {
  return !rutasSinNavBar.includes(route.path);
});

onMounted(() => {
  authStore.inicializar();
});
</script>

<template>
  <div class="app">
    <NavBar v-if="mostrarNavBar" />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

body {
  font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #0A0A0A;
  color: #F1F5F9;
}

.app {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #0A0A0A;
}

main {
  flex: 1;
  width: 100%;
  padding: 0;
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
}
</style>

