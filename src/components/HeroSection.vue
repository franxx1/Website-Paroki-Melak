<script setup>
import bgImage from '/src/assets/image/gereja.png'
</script>

<template>
  <section
    class="relative h-screen bg-cover bg-center bg-fixed"
    :style="{ backgroundImage: `url(${bgImage})` }"
    id="hero"
  >
    <!-- Background layer dengan overlay -->
    <div class="absolute inset-0 bg-black/70"></div>

    <!-- Konten -->
    <div class="relative z-10 flex flex-col justify-center h-full px-6 md:px-12  text-accent font-merriweather max-w-4xl">
      <h1 class=" text-2xl md:text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">
        Selamat Datang di Paroki<br>Santo Markus Melak
      </h1>
      <p class="text-sm md:text-xl mb-8 opacity-90 leading-relaxed">
        Paroki santo markus melak merupakan paroki yang berada di Keuskupan agung samarinda kevikepan sendawar, berdri tahun 1985
      </p>
      <a
        href="#about"
        class="inline-block px-8 py-4 rounded-lg bg-primary hover:bg-red-dark text-accent transition-all duration-300 transform hover:scale-105 font-semibold text-lg w-fit shadow-lg"
      >
        Pelajari Lebih Lanjut
      </a>
    </div>
  </section>
</template>