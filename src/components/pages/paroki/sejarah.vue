<script setup>
import { ref, onMounted } from "vue";
import { useParokiStore } from "/src/store/paroki";

const sejarahStore = useParokiStore();


onMounted(async () => {
    sejarahStore.fetchSejarah();
});
</script>

<template>
    <section class="container mx-auto px-4 pt-32 pb-10">
        <!-- Loading -->
        <!-- Loading Skeleton -->
        <div v-if="sejarahStore.loading" class="max-w-3xl mx-auto animate-pulse">
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
            <img v-if="sejarahStore.sejarahData?.data.gambar_gereja?.url" :src="sejarahStore.sejarahData?.data.gambar_gereja.url"
                class="w-full rounded-lg mb-6 shadow" alt="Foto Berita" />
            <h1 class="text-3xl font-bold text-[#5D181E] mb-4">
                {{ sejarahStore.sejarahData?.data?.judul?.[0]?.text }}
            </h1>


            <!-- Isi Berita -->
            <p class="text-[#5D181E]/80 text-sm mb-4 flex-grow whitespace-pre-line">
                {{sejarahStore.sejarahData?.data?.isi_sejarah?.map(block => block.text).join("\n\n")}}
            </p>

            <!-- Tombol Kembali -->
            <RouterLink to="/" class="inline-block mt-8 text-[#5D181E] font-semibold hover:underline">
                ← Kembali ke Berita
            </RouterLink>
        </div>
    </section>
</template>
