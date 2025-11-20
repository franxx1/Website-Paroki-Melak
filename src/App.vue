<script setup>
import Navbar from "./components/navbar.vue";
import HeroSection from "./components/HeroSection.vue";
import JadwalMisa from "./components/jadwalMisa.vue";
import Pelayanan from "./components/pelayanan.vue";
import BeritaPengumuman from "./components/berita_pengumuman.vue";
import Footer from "./components/footer.vue";
</script>

<template>
  <Navbar />
  <HeroSection />
  <JadwalMisa />
  <Pelayanan />
  <BeritaPengumuman />
  <Footer />
  <RouterView />
</template>
