<script setup>
import { ref, onMounted } from "vue";
import { client } from "../../../prismic";

const pastor = ref([]);
const loading = ref(true);

onMounted(async () => {
    try {
        const pastorRes = await client.getByType("pastor");
        pastor.value = pastorRes.results;
        console.log("HASIL PASTOR:", pastor.value);
    } catch (error) {
        console.error("Error fetching pastor:", error);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <section class="min-h-screen font-sans text-slate-800 flex flex-col" id="pastor">
        <!-- CONTENT SECTION -->
        <div
            class="w-full min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#fff0f0] to-[#fcef91] p-6 md:p-12 relative overflow-x-hidden">
            <div class="container mx-auto max-w-6xl relative z-10">
                <!-- HEADER -->
                <div class="flex flex-col items-center mb-16 mx-10">
                    <h1 class="text-4xl pt-20 md:text-6xl font-serif text-[#5D181E] mb-4 relative text-center">
                        Pastor Paroki
                        <span
                            class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#5D181E] rounded-full"></span>
                    </h1>
                </div>

                <div v-if="loading" class="text-center p-10 text-[#5D181E]">
                    <div class="animate-pulse flex flex-col items-center">
                        <div class="h-8 w-64 bg-[#5D181E]/20 rounded mb-4"></div>
                        <div class="h-4 w-48 bg-[#5D181E]/20 rounded"></div>
                    </div>
                </div>

                <div v-else class="flex flex-wrap justify-center gap-8 mx-4 md:mx-10">
                    <div v-for="(item, index) in pastor" :key="index"
                        class="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] max-w-sm bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#5D181E]/10 group hover:-translate-y-2">

                        <!-- Image Container -->
                        <div class="relative h-80 overflow-hidden">
                            <img v-if="item.data?.gambar_pastor?.url" :src="item.data.gambar_pastor.url"
                                class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                :alt="item.data?.nama_pastor?.[0]?.text || 'Foto Pastor'" />
                            <div v-else
                                class="w-full h-full bg-[#5D181E]/5 flex items-center justify-center text-[#5D181E]/30">
                                <span class="text-4xl">✝</span>
                            </div>

                            <!-- Gradient Overlay -->
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-[#5D181E]/80 via-transparent to-transparent opacity-60">
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="p-6 relative">
                            <!-- Keterangan (Description/Role) - ABOVE NAME as requested -->
                            <div class="mb-3 min-h-[3rem]">
                                <div v-if="item.data?.keterangan"
                                    class="text-[#b8860b] font-medium tracking-wide text-sm uppercase border-b border-[#b8860b]/20 pb-2 inline-block">
                                    {{ item.data.keterangan }}
                                </div>
                            </div>

                            <!-- Name -->
                            <h3 class="text-2xl font-serif text-[#5D181E] font-bold mb-4 leading-tight">
                                {{ item.data?.nama_pastor?.[0]?.text || 'Nama Tidak Tersedia' }}
                            </h3>

                            <!-- Contact Info -->
                            <div class="flex items-center gap-3 text-[#5D181E]/70 bg-[#5D181E]/5 p-3 rounded-lg mt-4">
                                <div class="bg-[#5D181E] text-white p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-4 h-4">
                                        <path fill-rule="evenodd"
                                            d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 5.25V4.5z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <span class="font-mono text-sm">
                                    {{ item.data?.nomor_hp || '-' }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>