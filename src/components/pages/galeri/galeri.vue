<script setup>
import { ref, onMounted } from "vue";
import { client } from "../../../prismic";

const galleries = ref([]);
const loading = ref(true);

onMounted(async () => {
    try {
        const galeriRes = await client.getByType("galeri", {
            orderings: [
                { field: "my.galeri.tanggal_kegiatan", direction: "desc" }
            ],
        });

        galleries.value = galeriRes.results;
    } catch (error) {
        console.error("Error fetching galleries:", error);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <section class="min-h-screen font-sans text-slate-800 flex flex-col" id="galeri">
        <!-- CONTENT SECTION -->
        <div
            class="w-full min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#fff0f0] to-[#fcef91] p-6 md:p-12 relative overflow-x-hidden">
            <!-- Watermark Background -->
            <div
                class="absolute top-0 right-0 -mt-10 -mr-20 text-[8rem] md:text-[10rem] font-serif text-[#5D181E] opacity-[0.03] pointer-events-none select-none leading-none">
                Galeri
            </div>

            <div class="container mx-auto max-w-6xl relative z-10">
                <!-- HEADER -->
                <div class="flex flex-col items-center mb-16 mx-10">
                    <span class="text-[#5D181E] tracking-[0.3em] uppercase text-sm mb-2 font-bold opacity-60">Paroki
                        Santo Markus
                        Melak</span>
                    <h1 class="text-4xl md:text-6xl font-serif text-[#5D181E] mb-4 relative text-center">
                        Galeri Foto
                        <span
                            class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#5D181E] rounded-full"></span>
                    </h1>
                </div>

                <div v-if="loading" class="text-center p-10 text-[#5D181E]">
                    Loading...
                </div>

                <div v-else-if="galleries.length === 0" class="text-center p-10 text-[#5D181E]">
                    Belum ada galeri foto.
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="(item, index) in galleries" :key="index"
                        class="bg-white/40 backdrop-blur-md border border-white/50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full cursor-pointer">
                        <!-- Thumbnail Image -->
                        <div class="h-64 bg-[#5D181E]/10 relative overflow-hidden">
                            <img v-if="item.data?.thumbnail_kegiatan?.url" :src="item.data.thumbnail_kegiatan.url"
                                :alt="item.data.thumbnail_kegiatan.alt || 'Thumbnail Kegiatan'"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div v-else class="w-full h-full flex items-center justify-center text-[#5D181E]/30">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-16 h-16">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-[#5D181E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            </div>
                            <!-- Photo count badge -->
                            <div
                                class="absolute top-4 right-4 bg-[#5D181E]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                {{ item.data?.gallery_photos?.length || 0 }}
                            </div>
                        </div>

                        <div class="p-6 flex flex-col flex-grow">
                            <span class="text-xs font-bold text-[#5D181E]/60 uppercase tracking-wider mb-2">
                                {{
                                    item.data?.tanggal_kegiatan ||
                                "Tanggal tidak tersedia"
                                }}
                            </span>
                            <h3
                                class="text-xl font-serif text-[#5D181E] font-bold mb-3 leading-tight group-hover:text-[#b8860b] transition-colors">
                                {{ item.data?.judul_kegiatan || "Judul Kegiatan" }}
                            </h3>
                            <RouterLink :to="`/galeri/${item.uid}`"
                                class="text-[#5D181E] font-bold text-sm uppercase tracking-wide flex items-center group-hover:underline decoration-2 underline-offset-4 mt-auto">
                                Lihat Galeri
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor"
                                    class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
