<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col items-center justify-center bg-[#0A0A0A] p-4 md:p-6">
    <div class="layout-container flex h-full grow flex-col justify-center">
      <div class="flex flex-1 items-center justify-center py-5">
        <div class="layout-content-container flex flex-col max-w-[960px] flex-1 items-center">
          <div class="w-full max-w-lg text-center">
            <h1 class="text-gray-50 text-[32px] font-bold leading-tight px-4 pb-3 pt-6">
              ¿Cómo quieres usar ShowTime Hub?
            </h1>
            <p class="text-gray-400 text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              Selecciona tu rol para personalizar tu experiencia.
            </p>
          </div>
          
          <div class="mt-8 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            <!-- Cliente -->
            <div 
              @click="seleccionarRol('cliente')"
              class="group relative flex cursor-pointer flex-col items-center gap-4 rounded-lg border border-gray-800 bg-gray-900/50 p-8 text-center transition-all duration-300 hover:border-[#00BCD4]/50 hover:bg-[#00BCD4]/10"
            >
              <div class="flex h-20 w-20 items-center justify-center rounded-full bg-[#00BCD4]/20 text-[#00BCD4] transition-colors duration-300 group-hover:bg-[#00BCD4] group-hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div class="flex flex-col gap-1">
                <p class="text-gray-50 text-lg font-bold leading-tight">Buscar Artistas</p>
                <p class="text-gray-400 text-base font-normal leading-normal">(Soy Cliente)</p>
              </div>
              <button class="mt-4 flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#00BCD4] text-black text-sm font-bold leading-normal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span class="truncate">Seleccionar rol</span>
              </button>
            </div>

            <!-- Artista -->
            <div 
              @click="seleccionarRol('artista')"
              class="group relative flex cursor-pointer flex-col items-center gap-4 rounded-lg border border-gray-800 bg-gray-900/50 p-8 text-center transition-all duration-300 hover:border-[#00BCD4]/50 hover:bg-[#00BCD4]/10"
            >
              <div class="flex h-20 w-20 items-center justify-center rounded-full bg-[#00BCD4]/20 text-[#00BCD4] transition-colors duration-300 group-hover:bg-[#00BCD4] group-hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div class="flex flex-col gap-1">
                <p class="text-gray-50 text-lg font-bold leading-tight">Ofrecer mis Servicios</p>
                <p class="text-gray-400 text-base font-normal leading-normal">(Soy Artista)</p>
              </div>
              <button class="mt-4 flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#00BCD4] text-black text-sm font-bold leading-normal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span class="truncate">Seleccionar rol</span>
              </button>
            </div>
          </div>

          <div class="mt-12">
            <router-link 
              to="/"
              class="text-gray-400 text-sm font-normal leading-normal underline cursor-pointer hover:text-[#00BCD4] transition-colors"
            >
              Continuar más tarde
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const seleccionarRol = async (rol) => {
  try {
    // Actualizar el tipo de usuario en el backend
    const response = await fetch('http://localhost:3000/api/usuarios/actualizar-tipo', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tipo_usuario: rol })
    });

    if (response.ok) {
      // Actualizar el usuario en el store
      const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      usuario.tipo_usuario = rol;
      localStorage.setItem('usuario', JSON.stringify(usuario));
      authStore.usuario = usuario;

      // Redirigir según el rol
      if (rol === 'cliente') {
        router.push('/dashboard-usuario');
      } else {
        router.push('/registro-artista');
      }
    }
  } catch (error) {
    console.error('Error al actualizar tipo de usuario:', error);
  }
};
</script>
