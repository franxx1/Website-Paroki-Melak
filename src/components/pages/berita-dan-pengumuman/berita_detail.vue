<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useBeritaStore } from "/src/store/berita";

const route = useRoute();
const beritaStore = useBeritaStore();


const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    const uid = route.params.uid;

    const doc = await beritaStore.fetchBeritaDetail(uid);
    beritaStore.berita = doc;
  } catch (err) {
    console.error("Gagal mengambil detail berita:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>


<template>
  <section class="container mx-auto px-4 pt-10 pb-10">
    <!-- Loading -->        
    <div v-if="loading" class="text-center text-gray-600">
      Loading...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-red-600">
      Terjadi kesalahan saat memuat berita.
    </div>

    <!-- Konten Berita -->
    <div v-else-if="beritaStore.berita" class="max-w-3xl mx-auto">
      <!-- Judul -->
      <h1 class="text-3xl font-bold text-[#5D181E] mb-4">
        {{ beritaStore.berita.judul_berita[0].text }}
      </h1>

      <!-- Tanggal -->
      <p class="text-gray-500 mb-6">
        {{ beritaStore.berita.tanggal_rilis_berita }}
      </p>

      <!-- Foto -->
      <img
        v-if="beritaStore.berita.gambar_berita"
        :src="beritaStore.berita.gambar_berita.url"
        class="w-full rounded-lg mb-6 shadow"
        alt="Foto Berita"
      />

      <!-- Isi Berita -->
      <p class="text-[#5D181E]/80 text-sm mb-4 flex-grow whitespace-pre-line">
        {{ beritaStore.berita.isi_berita[0].text }}
      </p>

      <!-- Tombol Kembali -->
      <RouterLink
        to="/berita"
        class="inline-block mt-8 text-[#5D181E] font-semibold hover:underline"
      >
        ← Kembali ke Berita
      </RouterLink>
    </div>
  </section>
</template>
