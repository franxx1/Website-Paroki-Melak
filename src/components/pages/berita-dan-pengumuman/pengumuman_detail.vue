<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { client } from "../../../prismic";
import { asHTML } from "@prismicio/client";
import { usePengumumanStore } from "../../../store/pengumuman";

const pengumumanStore = usePengumumanStore();

const route = useRoute();
const pengumuman = ref(null);
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    const uid = route.params.uid;

    const doc = await pengumumanStore.fetchPengumumanDetail(uid);
    pengumumanStore.pengumuman = doc;
  } catch (err) {
    console.error("Gagal mengambil detail pengumuman:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
    <section class="container mx-auto px-4 pt-10 pb-10">
        <!-- Loading -->
        <div v-if="loading" class="text-center text-gray-600">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="text-center text-red-600">
            Terjadi kesalahan saat memuat pengumuman.
        </div>

        <!-- Konten Pengumuman -->
        <div v-else class="max-w-3xl mx-auto">
            <!-- Judul -->
            <h1 class="text-3xl font-bold text-[#5D181E] mb-4">
                {{
                    pengumumanStore.pengumuman.data?.judul_pengumuman?.[0]?.text || "Judul Pengumuman"
                }}
            </h1>

            <!-- Tanggal -->
            <p class="text-gray-500 mb-6">
                {{ pengumumanStore.pengumuman.data.tanggal_rilis_pengumuman }}
            </p>

            <!-- Isi Pengumuman (render HTML) -->
            <div class="text-[#5D181E]/80 text-sm mb-4"
                v-html="pengumumanStore.pengumuman ? asHTML(pengumumanStore.pengumuman.data.isi_pengumuman) : ''"></div>

            <!-- File Viewer (PDF/Image) -->
            <div v-if="pengumumanStore.pengumuman?.data.pengumuman_file?.url" class="mt-8">
                <!-- PDF Viewer -->
                <div v-if="pengumumanStore.pengumuman.data.pengumuman_file.url.toLowerCase().includes('.pdf')"
                    class="w-full h-[600px] border border-gray-200 rounded-lg overflow-hidden mb-4">
                    <iframe :src="pengumumanStore.pengumuman.data.pengumuman_file.url" class="w-full h-full" frameborder="0"></iframe>
                </div>

                <!-- Image Viewer -->
                <div v-else-if="['.jpg', '.jpeg', '.png', '.gif', '.webp'].some(ext => pengumumanStore.pengumuman.data.pengumuman_file.url.toLowerCase().includes(ext))"
                    class="mb-4">
                    <img :src="pengumumanStore.pengumuman.data.pengumuman_file.url" alt="Lampiran Pengumuman"
                        class="w-full h-auto rounded-lg border border-gray-200 shadow-sm" />
                </div>

                <!-- Download Link (Always visible as fallback/option) -->
                <a :href="pengumumanStore.pengumuman.data.pengumuman_file.url" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-[#5D181E] text-[#FFF9E6] rounded-lg hover:bg-[#4a1318] transition-colors text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Unduh / Buka File Asli
                </a>
            </div>

            <!-- Tombol Kembali -->
            <RouterLink to="/pengumuman" class="inline-block mt-8 text-[#5D181E] font-semibold hover:underline">
                ← Kembali ke pengumuman
            </RouterLink>
        </div>
    </section>
</template>
