<script setup>
import { ref, onMounted } from "vue";
import { client } from "../../prismic";

const pengumuman = ref([]);
const loading = ref(true);

onMounted(async () => {
  const response = await client.get({
    type: "pengumumanpost",
    pageSize: 100,
    orderings: {
      field: "my.pengumumanpost.tanggal_rilis_pengumuman",
      direction: "desc",
    },
  });

  pengumuman.value = response.results.filter(item => item.data?.judul_pengumuman?.[0]?.text);
  loading.value = false;
});
</script>

<template>
  <section class="min-h-screen font-sans text-slate-800 flex flex-col">
    <div
      class="w-full min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#fff0f0] to-[#fcef91] p-6 md:p-12 relative overflow-x-hidden">
      <!-- Watermark -->
      <div
        class="absolute top-0 right-0 -mt-10 -mr-20 text-[8rem] md:text-[10rem] font-serif text-[#5D181E] opacity-[0.03] pointer-events-none select-none leading-none">
        Pengumuman
      </div>

      <div class="container mx-auto max-w-6xl relative z-10">
        <!-- HEADER -->
        <div class="flex flex-col items-center mb-16">
          <span class="text-[#5D181E] tracking-[0.3em] uppercase text-sm mb-2 font-bold opacity-60">Paroki Katedral
            Jakarta</span>
          <h1 class="text-4xl md:text-6xl font-serif text-[#5D181E] mb-4 relative text-center">
            Pengumuman
            <span class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#5D181E] rounded-full"></span>
          </h1>
        </div>

        <div v-if="loading" class="text-center p-10 text-[#5D181E]">
          Loading...
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RouterLink v-for="(item, index) in pengumuman" :key="index" :to="`/pengumuman/${item.uid}`"
            class="bg-[#FFF9E6] border border-[#5D181E]/10 rounded-xl p-6 hover:bg-[#fcef91] transition-all duration-300 shadow-sm hover:shadow-md group cursor-pointer block">
            <div class="flex justify-between items-start mb-4">
              <span
                class="text-xs font-bold text-[#5D181E]/60 uppercase tracking-wider border border-[#5D181E]/20 px-2 py-1 rounded">
                {{ item.data?.tanggal_rilis_pengumuman || "Info" }}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5 text-[#5D181E] opacity-50 group-hover:opacity-100">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>

            <h3 class="text-lg font-serif text-[#5D181E] font-bold mb-2 leading-snug">
              {{ item.data?.judul_pengumuman?.[0]?.text }}
            </h3>
            <p class="text-[#5D181E]/80 text-sm line-clamp-4 mb-4">
              {{ item.data?.["isi-pengumuman"]?.[0]?.text }}
            </p>

            <!-- Download/View Link if available -->
            <div v-if="item.data?.['upload-pengumuman']?.url"
              class="inline-flex items-center text-xs font-bold text-[#5D181E] uppercase tracking-wide hover:underline mt-2"
              @click.stop>
              <a :href="item.data['upload-pengumuman'].url" target="_blank" class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-4 h-4 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Unduh / Lihat Dokumen
              </a>
            </div>

            <div class="w-full h-0.5 bg-[#5D181E]/10 group-hover:bg-[#5D181E]/30 transition-colors mt-4"></div>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>