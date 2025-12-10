<script setup>
import navbar from './components/navbar.vue';
import Footer from './components/footer.vue';
import DefaultLayout from './components/DefaultLayout.vue';
</script>

<template>
  <DefaultLayout />
  <RouterView />
  <Footer/>
</template>
