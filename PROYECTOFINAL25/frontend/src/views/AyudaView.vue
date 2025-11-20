<template>
  <div class="min-h-screen bg-[#121212] text-gray-100">
    <!-- Navbar Component -->
    <NavBar />

    <!-- Main Content -->
    <main class="px-4 sm:px-8 flex flex-1 justify-center py-5 md:py-10">
      <div class="max-w-3xl w-full">
        <!-- Title -->
        <div class="text-center p-4">
          <h1 class="text-gray-100 text-4xl md:text-5xl font-black tracking-tight">Ayuda y Soporte</h1>
        </div>

        <!-- Search Bar -->
        <div class="px-4 py-3 mt-4">
          <div class="flex w-full items-stretch rounded-xl h-14">
            <div class="flex items-center justify-center pl-4 bg-[#1e1e1e] rounded-l-xl text-gray-400">
              <span class="material-symbols-outlined">search</span>
            </div>
            <input
              v-model="busqueda"
              type="text"
              class="flex-1 bg-[#1e1e1e] text-gray-100 rounded-r-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] placeholder:text-gray-500"
              placeholder="Busca en nuestros artículos de ayuda..."
            />
          </div>
        </div>

        <!-- Preguntas Frecuentes (Clientes) -->
        <div class="mt-8">
          <h2 class="text-gray-100 text-xl font-bold px-4 pb-3 pt-5">Preguntas Frecuentes (Clientes)</h2>
          <div class="flex flex-col p-4 gap-2">
            <details
              v-for="pregunta in preguntasClientes"
              :key="pregunta.id"
              class="border-b border-gray-200/10 py-2 group"
            >
              <summary class="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
                <p class="text-gray-100 text-base font-medium">{{ pregunta.pregunta }}</p>
                <span class="material-symbols-outlined text-gray-400 group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <p class="text-gray-400 text-sm pb-2 pt-2">{{ pregunta.respuesta }}</p>
            </details>
          </div>
        </div>

        <!-- Preguntas Frecuentes (Artistas) -->
        <div class="mt-6">
          <h2 class="text-gray-100 text-xl font-bold px-4 pb-3 pt-5">Preguntas Frecuentes (Artistas)</h2>
          <div class="flex flex-col p-4 gap-2">
            <details
              v-for="pregunta in preguntasArtistas"
              :key="pregunta.id"
              class="border-b border-gray-200/10 py-2 group"
            >
              <summary class="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
                <p class="text-gray-100 text-base font-medium">{{ pregunta.pregunta }}</p>
                <span class="material-symbols-outlined text-gray-400 group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <p class="text-gray-400 text-sm pb-2 pt-2">{{ pregunta.respuesta }}</p>
            </details>
          </div>
        </div>

        <!-- Pagos y Facturación -->
        <div class="mt-6">
          <h2 class="text-gray-100 text-xl font-bold px-4 pb-3 pt-5">Pagos y Facturación</h2>
          <div class="flex flex-col p-4 gap-2">
            <details
              v-for="pregunta in preguntasPagos"
              :key="pregunta.id"
              class="border-b border-gray-200/10 py-2 group"
            >
              <summary class="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
                <p class="text-gray-100 text-base font-medium">{{ pregunta.pregunta }}</p>
                <span class="material-symbols-outlined text-gray-400 group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <p class="text-gray-400 text-sm pb-2 pt-2">{{ pregunta.respuesta }}</p>
            </details>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="mt-12 p-4 text-center">
          <h3 class="text-gray-100 text-2xl font-bold">¿Necesitas más ayuda?</h3>
          <p class="text-gray-400 mt-2">Nuestro equipo de soporte está aquí para ayudarte.</p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <button
              @click="contactarSoporte"
              class="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#00BCD4] px-6 py-3 text-base font-bold text-black transition-transform hover:scale-105"
            >
              <span class="material-symbols-outlined">mail</span>
              Contactar a Soporte
            </button>
            <button
              @click="iniciarChat"
              class="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border-2 border-[#00BCD4] bg-transparent px-6 py-3 text-base font-bold text-[#00BCD4] transition-colors hover:bg-[#00BCD4]/10"
            >
              <span class="material-symbols-outlined">chat_bubble</span>
              Iniciar Chat en Vivo
            </button>
          </div>
        </div>

        <!-- Footer -->
        <footer class="mt-12 p-4 border-t border-gray-200/10">
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <router-link to="/terminos" class="text-gray-400 hover:text-white text-sm">
              Términos y Condiciones
            </router-link>
            <router-link to="/privacidad" class="text-gray-400 hover:text-white text-sm">
              Política de Privacidad
            </router-link>
          </div>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const busqueda = ref('');

const preguntasClientes = [
  {
    id: 1,
    pregunta: '¿Cómo contrato a un artista?',
    respuesta: 'Para contratar a un artista, simplemente navega a su perfil, selecciona el paquete de servicio que deseas y haz clic en "Reservar Ahora". Seguirás un proceso de pago seguro para confirmar tu reserva.'
  },
  {
    id: 2,
    pregunta: '¿Es seguro mi pago?',
    respuesta: 'Sí, todos los pagos se procesan a través de una pasarela segura y encriptada. Retenemos el pago hasta que el servicio se haya completado satisfactoriamente para garantizar la protección tanto del cliente como del artista.'
  },
  {
    id: 3,
    pregunta: '¿Cómo puedo dejar una reseña?',
    respuesta: 'Una vez que el servicio haya sido marcado como completado, recibirás una notificación para dejar una reseña sobre tu experiencia con el artista. Puedes acceder a esto desde tu panel de control en la sección "Mis Contrataciones".'
  }
];

const preguntasArtistas = [
  {
    id: 1,
    pregunta: '¿Cómo creo mi perfil de artista?',
    respuesta: 'Regístrate como artista y sigue los pasos para completar tu perfil. Asegúrate de incluir un portafolio de alta calidad, una descripción detallada de tus servicios y establecer tus tarifas en diferentes paquetes.'
  },
  {
    id: 2,
    pregunta: '¿Cuándo y cómo recibo mis pagos?',
    respuesta: 'Una vez que el cliente confirma que el servicio se ha completado, los fondos se liberan a tu cuenta de ShowTime Hub. Puedes retirar tus ganancias a través de los métodos de pago configurados en tu perfil, como transferencia bancaria o PayPal.'
  }
];

const preguntasPagos = [
  {
    id: 1,
    pregunta: '¿Qué métodos de pago se aceptan?',
    respuesta: 'Aceptamos las principales tarjetas de crédito y débito (Visa, MasterCard, American Express) así como pagos a través de PayPal para una mayor flexibilidad y seguridad.'
  }
];

const contactarSoporte = () => {
  // Aquí puedes redirigir a un formulario de contacto o abrir el email
  window.location.href = 'mailto:soporte@showtimehub.com';
};

const iniciarChat = () => {
  // Aquí puedes integrar un servicio de chat en vivo
  alert('Chat en vivo próximamente. Por favor, contáctanos por email.');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
}

details summary::-webkit-details-marker {
  display: none;
}
</style>
