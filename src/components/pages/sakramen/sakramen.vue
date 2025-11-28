<script setup>
import { ref, onMounted } from "vue";
import { client } from "../../../prismic";
import { RouterLink } from "vue-router";

const sakramenList = ref([]);
const loading = ref(true);

onMounted(async () => {
    try {
        const response = await client.get({
            type: "sakramen"
        });
        // Filter out items that don't have a title/name
        sakramenList.value = response.results.filter(item => item.data?.nama_sakramen?.[0]?.text);
    } catch (error) {
        console.error("Error fetching sakramen:", error);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <section class="min-h-screen font-sans text-slate-800 flex flex-col">
        <!-- HERO / HEADER -->
        <div
            class="w-full bg-gradient-to-br from-[#FFF9E6] via-[#fff0f0] to-[#fcef91] py-20 px-6 md:px-12 relative overflow-hidden">
            <div
                class="absolute top-0 right-0 -mt-10 -mr-20 text-[8rem] md:text-[10rem] font-serif text-[#5D181E] opacity-[0.03] pointer-events-none select-none leading-none">
                Sakramen
            </div>

            <div class="container mx-auto max-w-6xl relative z-10 text-center">
                <span class="text-[#5D181E] tracking-[0.3em] uppercase text-sm mb-2 font-bold opacity-60 block">
                    Paroki Cilandak
                </span>
                <h1 class="text-4xl md:text-6xl font-serif text-[#5D181E] mb-4 relative inline-block">
                    Sakramen
                    <span
                        class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#5D181E] rounded-full"></span>
                </h1>
            </div>
        </div>

        <!-- CONTENT -->
        <div class="flex-grow bg-[#FFF9E6]/30 py-16 px-6 md:px-12">
            <div class="container mx-auto max-w-6xl">

                <div v-if="loading" class="text-center p-10 text-[#5D181E]">
                    Loading...
                </div>

                <div v-else-if="sakramenList.length === 0" class="text-center p-10 text-[#5D181E] italic">
                    Belum ada data sakramen.
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="item in sakramenList" :key="item.uid"
                        class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-[#5D181E]/5">
                        <!-- Image -->
                        <div class="h-56 bg-[#5D181E]/10 relative overflow-hidden">
                            <img v-if="item.data?.gambar_sakramen?.url" :src="item.data.gambar_sakramen.url"
                                :alt="item.data.gambar_sakramen.alt || 'Sakramen Image'"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div v-else class="w-full h-full flex items-center justify-center text-[#5D181E]/30">
                                <span class="text-5xl">✝</span>
                            </div>
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-[#5D181E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="p-6 flex flex-col flex-grow relative">
                            <!-- Number/Index (Optional, purely decorative based on target site) -->
                            <div
                                class="absolute -top-8 right-6 w-12 h-12 bg-[#5D181E] text-[#FFF9E6] rounded-full flex items-center justify-center font-serif text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                                {{ sakramenList.indexOf(item) + 1 }}
                            </div>

                            <h3
                                class="text-2xl font-serif text-[#5D181E] font-bold mb-4 mt-2 leading-tight group-hover:text-[#b8860b] transition-colors">
                                {{ item.data?.nama_sakramen?.[0]?.text }}
                            </h3>

                            <div class="mt-auto pt-4">
                                <RouterLink :to="`/sakramen/${item.uid}`"
                                    class="inline-flex items-center text-[#5D181E] font-bold text-sm uppercase tracking-wide group-hover:underline decoration-2 underline-offset-4">
                                    Learn More
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="2" stroke="currentColor"
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
        </div>
    </section>
</template>
