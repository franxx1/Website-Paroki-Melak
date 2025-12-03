<script setup>
import Navbar from './navbar.vue';
import Footer from './footer.vue';
</script>
<template>
  <Navbar />
  <div class="pt-[100px]">
    <slot />
  </div>
</template>