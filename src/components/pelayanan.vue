<script setup>
import { ref, onMounted } from "vue";
import { client } from "../prismic";

const sakramenList = ref([]);

onMounted(async () => {
  try {
    const response = await client.get({
      type: "sakramen",
    });
    sakramenList.value = response.results.filter(item => item.data?.nama_sakramen?.[0]?.text);
  } catch (error) {
    console.error("Error fetching sakramen:", error);
  }
});
</script>

<template>
  <section class="min-h-screen font-sans text-slate-800 flex flex-col overflow-hidden" id="pelayanan">
    <!-- CONTENT SECTION (Full Width) -->
    <div
      class="w-full min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#fff0f0] to-[#fcef91] p-6 md:p-12 relative overflow-y-auto overflow-x-hidden flex justify-center items-center">
      <!-- Watermark Background -->
      <div
        class="absolute top-0 right-0 -mt-10 -mr-20 text-[10rem] font-serif text-[#5D181E] opacity-[0.03] pointer-events-none select-none leading-none">
        Pelayanan
      </div>

      <div class="container mx-auto max-w-4xl relative z-10">
        <!-- HEADER -->
        <div class="flex flex-col items-center mb-16">
          <span class="text-[#5D181E] tracking-[0.3em] uppercase text-sm mb-2 font-bold opacity-60">Informasi &
            Jadwal</span>
          <h1 class="text-6xl font-serif text-[#5D181E] mb-4 relative">
            Pelayanan
            <span class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#5D181E] rounded-full"></span>
          </h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- SEKRETARIAT SECTION -->
          <div class="space-y-6">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-12 h-12 rounded-full bg-[#5D181E] flex items-center justify-center text-[#FFF9E6]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2
                class="text-2xl text-[#5D181E] font-serif tracking-wide uppercase border-b-2 border-[#5D181E]/20 pb-1">
                Sekretariat
              </h2>
            </div>

            <div
              class="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <ul class="space-y-4 text-[#5D181E]">
                <li class="flex items-center p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <span class="w-2 h-2 rounded-full bg-[#5D181E] mr-3"></span>
                  <span class="font-medium">Buka setiap hari kerja (Senin - Sabtu)</span>
                </li>
                <li class="flex items-center p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <span class="w-2 h-2 rounded-full bg-[#5D181E] mr-3"></span>
                  <span class="font-medium">Pukul 08:00 - 16:00 WIB</span>
                </li>
                <li class="flex items-center p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <span class="w-2 h-2 rounded-full bg-[#5D181E] mr-3"></span>
                  <span class="font-medium">Melayani administrasi umat</span>
                </li>
                <li class="flex items-center p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <span class="w-2 h-2 rounded-full bg-[#5D181E] mr-3"></span>
                  <span class="font-medium">Pendaftaran Intensi Misa</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- SAKRAMEN SECTION -->
          <div class="space-y-6">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-12 h-12 rounded-full bg-[#5D181E] flex items-center justify-center text-[#FFF9E6]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <a href="/sakramen"
                class="text-3xl text-[#5D181E] font-serif tracking-wide uppercase border-b-2 border-[#5D181E]/20 pb-1 hover:text-[#b8860b] transition-colors">
                Sakramen
              </a>
            </div>

            <div class="space-y-4">
              <!-- Dynamic Card Item -->
              <a v-for="item in sakramenList" :key="item.uid" :href="`/sakramen/${item.uid}`"
                class="bg-white/40 backdrop-blur-md border border-white/50 rounded-xl p-4 flex justify-between items-center cursor-pointer group hover:bg-white/70 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl block">
                <div>
                  <h3
                    class="text-[#5D181E] font-bold uppercase tracking-wide mb-1 text-lg group-hover:text-[#b8860b] transition-colors">
                    {{ item.data?.nama_sakramen?.[0]?.text || 'Sakramen' }}
                  </h3>
                  <p class="text-[#5D181E]/70 text-sm font-medium">
                    Lihat Detail
                  </p>
                </div>
                <div
                  class="w-10 h-10 rounded-full bg-[#5D181E]/10 flex items-center justify-center group-hover:bg-[#5D181E] group-hover:text-[#FFF9E6] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </a>

              <div v-if="sakramenList.length === 0" class="text-center text-[#5D181E]/60 italic py-4">
                Loading sakramen...
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
