<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import { client } from "../../../prismic";

const route = useRoute();
const gallery = ref(null);
const loading = ref(true);
const currentPhotoIndex = ref(0);

onMounted(async () => {
    try {
        const uid = route.params.uid;
        const response = await client.getByUID("galeri", uid);
        gallery.value = response;
    } catch (error) {
        console.error("Error fetching gallery:", error);
    } finally {
        loading.value = false;
    }

    // Add keyboard navigation
    window.addEventListener("keydown", handleKeyPress);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyPress);
});

const photos = computed(() => {
    return gallery.value?.data?.gallery_photos || [];
});

const currentPhoto = computed(() => {
    return photos.value[currentPhotoIndex.value];
});

const totalPhotos = computed(() => {
    return photos.value.length;
});

const goToPhoto = (index) => {
    if (index >= 0 && index < totalPhotos.value) {
        currentPhotoIndex.value = index;
    }
};

const nextPhoto = () => {
    if (currentPhotoIndex.value < totalPhotos.value - 1) {
        currentPhotoIndex.value++;
    }
};

const prevPhoto = () => {
    if (currentPhotoIndex.value > 0) {
        currentPhotoIndex.value--;
    }
};

const handleKeyPress = (e) => {
    if (e.key === "ArrowRight") {
        nextPhoto();
    } else if (e.key === "ArrowLeft") {
        prevPhoto();
    }
};
</script>

<template>
    <section class="min-h-screen font-sans text-slate-800 flex flex-col bg-[#FFF9E6]">
        <div v-if="loading" class="flex items-center justify-center min-h-screen">
            <div class="text-center p-10 text-[#5D181E]">
                Loading...
            </div>
        </div>

        <div v-else-if="!gallery" class="flex items-center justify-center min-h-screen">
            <div class="text-center p-10 text-[#5D181E]">
                Galeri tidak ditemukan.
            </div>
        </div>

        <div v-else class="w-full min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#fff0f0] to-[#fcef91] p-6 md:p-12">
            <div class="container mx-auto max-w-6xl">
                <!-- Header -->
                <div class="mb-8">
                    <RouterLink to="/galeri"
                        class="inline-flex items-center text-[#5D181E] hover:underline mb-4 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-5 h-5 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Kembali ke Galeri
                    </RouterLink>
                    <h1 class="text-3xl md:text-5xl font-serif text-[#5D181E] mb-2">
                        {{ gallery.data?.judul_kegiatan || "Judul Kegiatan" }}
                    </h1>
                    <p class="text-[#5D181E]/70 font-medium">
                        {{ gallery.data?.tanggal_kegiatan || "Tanggal tidak tersedia" }}
                    </p>
                </div>

                <!-- Main Photo Viewer -->
                <div v-if="totalPhotos > 0" class="mb-8">
                    <div
                        class="bg-white/40 backdrop-blur-md border border-white/50 rounded-xl overflow-hidden shadow-xl">
                        <!-- Photo Display -->
                        <div class="relative bg-black/5">
                            <img v-if="currentPhoto?.image?.url" :src="currentPhoto.image.url"
                                :alt="currentPhoto.image.alt || `Foto ${currentPhotoIndex + 1}`"
                                class="w-full h-auto max-h-[70vh] object-contain mx-auto" />

                            <!-- Navigation Buttons -->
                            <button v-if="currentPhotoIndex > 0" @click="prevPhoto"
                                class="absolute left-4 top-1/2 -translate-y-1/2 bg-[#5D181E]/80 hover:bg-[#5D181E] text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                                aria-label="Previous photo">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>

                            <button v-if="currentPhotoIndex < totalPhotos - 1" @click="nextPhoto"
                                class="absolute right-4 top-1/2 -translate-y-1/2 bg-[#5D181E]/80 hover:bg-[#5D181E] text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                                aria-label="Next photo">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>

                            <!-- Photo Counter -->
                            <div
                                class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#5D181E]/80 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium">
                                {{ currentPhotoIndex + 1 }} / {{ totalPhotos }}
                            </div>
                        </div>
                    </div>

                    <!-- Keyboard Navigation Hint -->
                    <div class="text-center mt-4 text-sm text-[#5D181E]/60">
                        <span class="inline-flex items-center gap-2">
                            <kbd class="px-2 py-1 bg-white/50 rounded border border-[#5D181E]/20">←</kbd>
                            <kbd class="px-2 py-1 bg-white/50 rounded border border-[#5D181E]/20">→</kbd>
                            untuk navigasi
                        </span>
                    </div>
                </div>

                <!-- Thumbnail Grid -->
                <div v-if="totalPhotos > 1" class="mt-8">
                    <h2 class="text-xl font-serif text-[#5D181E] mb-4">Semua Foto</h2>
                    <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        <button v-for="(photo, index) in photos" :key="index" @click="goToPhoto(index)" :class="[
                            'relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300',
                            currentPhotoIndex === index
                                ? 'border-[#5D181E] ring-2 ring-[#5D181E]/30 scale-95'
                                : 'border-transparent hover:border-[#5D181E]/50'
                        ]">
                            <img v-if="photo?.image?.url" :src="photo.image.url"
                                :alt="photo.image.alt || `Thumbnail ${index + 1}`" class="w-full h-full object-cover" />
                            <div v-if="currentPhotoIndex === index"
                                class="absolute inset-0 bg-[#5D181E]/20 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-8 h-8 text-white">
                                    <path fill-rule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- No Photos Message -->
                <div v-else class="text-center p-10 text-[#5D181E]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-16 h-16 mx-auto mb-4 opacity-30">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <p class="text-lg">Belum ada foto dalam galeri ini.</p>
                </div>
            </div>
        </div>
    </section>
</template>
