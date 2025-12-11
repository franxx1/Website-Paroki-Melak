<script setup>
import { ref, onMounted } from "vue";
import { useParokiStore } from "/src/store/paroki";

const dppStore = useParokiStore();

onMounted(async () => {
   dppStore.fetchDpp();
});
</script>

<template>
    <section class="min-h-screen font-sans text-slate-800 flex flex-col bg-[#FFF9E6]">
        <!-- HERO / HEADER -->
        <div
            class="w-full bg-gradient-to-br from-[#FFF9E6] via-[#fff0f0] to-[#fcef91] px-10 py-10 md:px-12 relative overflow-hidden border-b border-[#5D181E]/10">
            <div
                class="absolute top-0 right-0 -mt-10 -mr-20 text-[8rem] md:text-[10rem] font-serif text-[#5D181E] opacity-[0.03] pointer-events-none select-none leading-none">
                DPP
            </div>

            <div class="container mx-auto max-w-5xl relative z-10 text-center">
                <span class="text-[#5D181E] tracking-[0.3em] uppercase text-sm mb-3 font-bold opacity-60 block">
                    Paroki St.Markus Melak
                </span>

                <h1 v-if="dppStore.dppData?.judul_pengurus"
                    class="text-3xl md:text-5xl font-serif text-[#5D181E] mb-4 font-bold">
                    {{ dppStore.dppData.judul_pengurus }}
                </h1>
                <h1 v-else class="text-3xl md:text-5xl font-serif text-[#5D181E] mb-4 font-bold">
                    Dewan Pastoral Paroki<br></br> St.Markus Melak
                </h1>

                <div v-if="dppStore.dppData?.periode"
                    class="inline-block bg-[#5D181E]/10 px-6 py-2 rounded-full border border-[#5D181E]/20">
                    <span class="text-[#5D181E] font-serif italic text-lg">
                        Periode {{ dppStore.dppData.periode }}
                    </span>
                </div>
            </div>
        </div>

        <!-- CONTENT -->
        <div class="flex-grow py-12 px-4 md:px-8">
            <div class="container mx-auto max-w-5xl">

                <!-- Loading Skeleton -->
                <div v-if="dppStore.loading" class="animate-pulse">
                    <div class="bg-gray-200 rounded-2xl shadow-xl overflow-hidden border border-gray-300">
                        <!-- Table Header Skeleton -->
                        <div class="bg-gray-300 h-16 w-full"></div>

                        <!-- Table Rows Skeleton -->
                        <div class="divide-y divide-gray-200">
                            <div v-for="i in 5" :key="i" class="flex items-center p-4 space-x-4 bg-white">
                                <div class="h-4 bg-gray-300 rounded w-8"></div> <!-- No -->
                                <div class="h-6 bg-gray-300 rounded w-1/3"></div> <!-- Nama -->
                                <div class="h-6 bg-gray-300 rounded w-1/4"></div> <!-- Jabatan -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Error State -->
                <div v-else-if="dppStore.error" class="text-center p-10 text-red-600 bg-red-50 rounded-xl border border-red-100">
                    <p>Maaf, terjadi kesalahan saat memuat data.</p>
                </div>

                <!-- Empty State -->
                <div v-else-if="dppStore.dppItems.length === 0"
                    class="text-center p-10 text-[#5D181E]/60 italic bg-white rounded-xl shadow-sm">
                    Belum ada data pengurus yang tersedia.
                </div>

                <!-- Data Table -->
                <div v-else class="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#5D181E]/10">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-[#5D181E] text-[#FFF9E6]">
                                    <th class="py-4 px-6 font-serif text-lg font-semibold w-16 text-center">No</th>
                                    <th class="py-4 px-6 font-serif text-lg font-semibold">Nama Pengurus</th>
                                    <th class="py-4 px-6 font-serif text-lg font-semibold">Jabatan</th>
                                    <!-- <th class="py-4 px-6 font-serif text-lg font-semibold">Kontak</th> -->
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-[#5D181E]/10">
                                <tr v-for="(item,index) in dppStore.dppItems" :key="index"
                                    class="hover:bg-[#FFF9E6]/30 transition-colors duration-150 group">
                                    <td class="py-4 px-6 text-center text-[#5D181E]/60 font-mono text-sm">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="py-4 px-6">
                                        <div
                                            class="font-bold text-[#5D181E] text-lg group-hover:text-[#b8860b] transition-colors">
                                            {{ item.nama}}
                                        </div>
                                    </td>
                                    <td class="py-4 px-6">
                                        <div
                                            class="inline-flex items-center px-3 py-1 rounded-full bg-[#5D181E]/5 text-[#5D181E] text-sm font-medium border border-[#5D181E]/10">
                                            {{ item.jabatan }}
                                        </div>
                                    </td>
                                    <!-- <td class="py-4 px-6 text-[#5D181E]/80 font-medium">
                                        <div v-if="member.kontak" class="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                fill="currentColor" class="w-4 h-4 opacity-60">
                                                <path fill-rule="evenodd"
                                                    d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            {{ item.kontak }}
                                        </div>
                                        <span v-else class="text-gray-300 text-sm italic">-</span>
                                    </td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Footer of table -->
                    <div
                        class="bg-[#5D181E]/5 p-4 text-center text-sm text-[#5D181E]/60 italic border-t border-[#5D181E]/10">
                        * Data dapat berubah sewaktu-waktu sesuai kebijakan paroki.
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>