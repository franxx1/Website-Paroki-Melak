<script setup>
import { ref, onMounted } from "vue";
import { client } from "../../../prismic";

const sejarah = ref(null);
const loading = ref(true);
const error = ref(false);


onMounted(async () => {
    try {
        const sejarahRes = await client.getByType("sejarahpost");
        sejarah.value = sejarahRes.results[0];
    } catch (error) {
        console.error("Error fetching sejarah:", error);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <section class="container mx-auto px-4 pt-32 pb-10">
        <!-- Loading -->
        <!-- Loading Skeleton -->
        <div v-if="loading" class="max-w-3xl mx-auto animate-pulse">
            <!-- Image Skeleton -->
            <div class="w-full h-64 bg-gray-300 rounded-lg mb-6"></div>

            <!-- Title Skeleton -->
            <div class="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>

            <!-- Text Skeleton -->
            <div class="space-y-3">
                <div class="h-4 bg-gray-300 rounded w-full"></div>
                <div class="h-4 bg-gray-300 rounded w-full"></div>
                <div class="h-4 bg-gray-300 rounded w-5/6"></div>
                <div class="h-4 bg-gray-300 rounded w-full"></div>
                <div class="h-4 bg-gray-300 rounded w-4/5"></div>
            </div>
        </div>

        <!-- Konten Berita -->
        <div v-else class="max-w-3xl mx-auto">
            <!-- Judul -->
            <img v-if="sejarah?.data?.gambar_gereja?.url" :src="sejarah.data.gambar_gereja.url"
                class="w-full rounded-lg mb-6 shadow" alt="Foto Berita" />
            <h1 class="text-3xl font-bold text-[#5D181E] mb-4">
                {{ sejarah.data?.judul?.[0]?.text }}
            </h1>


            <!-- Isi Berita -->
            <p class="text-[#5D181E]/80 text-sm mb-4 flex-grow whitespace-pre-line">
                {{sejarah.data?.isi_sejarah?.map(block => block.text).join("\n\n")}}
            </p>

            <!-- Tombol Kembali -->
            <RouterLink to="/" class="inline-block mt-8 text-[#5D181E] font-semibold hover:underline">
                ← Kembali ke Berita
            </RouterLink>
        </div>
    </section>
</template>
