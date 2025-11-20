<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary-600">404</h1>
      <h2 class="text-4xl font-bold text-gray-800 mt-4 mb-8">
        Página No Encontrada
      </h2>
      <p class="text-xl text-gray-600 mb-8">
        Lo sentimos, la página que buscas no existe.
      </p>
      <router-link
        to="/"
        class="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
      >
        Volver al Inicio
      </router-link>
    </div>
  </div>
</template>
