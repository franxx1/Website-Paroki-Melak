<script setup>
import { ref, onMounted } from "vue";
import { client } from "../prismic";

const berita = ref([]);
const pengumuman = ref([]);
const loading = ref(true);

onMounted(async () => {
  const [beritaRes, pengumumanRes] = await Promise.all([
    client.get({
      type: "beritapost",
      pageSize: 3,
      orderings: {
        field: "my.beritapost.tanggal_rilis_berita",
        direction: "desc",
      },
    }),

    client.get({
      type: "pengumumanpost",
      pageSize: 3,
      orderings: {
        field: "my.pengumumanpost.tanggal_rilis_pengumuman",
        direction: "desc",
      },
    }),
  ]);

  berita.value = beritaRes.results.filter(item => item.data?.judul_berita?.[0]?.text);
  pengumuman.value = pengumumanRes.results.filter(item => item.data?.judul_pengumuman?.[0]?.text);

  loading.value = false;
});
</script>

<template>
  <section class="min-h-screen font-sans text-slate-800 flex flex-col" id="berita-pengumuman">
    <!-- CONTENT SECTION -->
    <div
      class="w-full min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#fff0f0] to-[#fcef91] p-6 md:p-12 relative overflow-x-hidden">
      <!-- Watermark Background -->
      <div
        class="absolute top-0 right-0 -mt-10 -mr-20 text-[8rem] md:text-[10rem] font-serif text-[#5D181E] opacity-[0.03] pointer-events-none select-none leading-none">
        Berita
      </div>

      <div class="container mx-auto max-w-6xl relative z-10">
        <!-- HEADER -->
        <div class="flex flex-col items-center mb-16">
          <span class="text-[#5D181E] tracking-[0.3em] uppercase text-sm mb-2 font-bold opacity-60">Paroki Katedral
            Jakarta</span>
          <h1 class="text-4xl md:text-6xl font-serif text-[#5D181E] mb-4 relative text-center">
            Berita & Pengumuman
            <span class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#5D181E] rounded-full"></span>
          </h1>
        </div>

        <div v-if="loading" class="text-center p-10 text-[#5D181E]">
          Loading...
        </div>

        <div v-else class="space-y-20">
          <!-- BERITA SECTION -->
          <section v-if="berita.length > 0">
            <div class="flex items-center space-x-4 mb-8">
              <div class="w-10 h-10 rounded-full bg-[#5D181E] flex items-center justify-center text-[#FFF9E6]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                </svg>
              </div>

              <a href="/berita"
                class="text-3xl text-[#5D181E] font-serif tracking-wide uppercase border-b-2 border-[#5D181E]/20 pb-1">Lihat
                Semua</a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div v-for="(item, index) in berita" :key="index"
                class="bg-white/40 backdrop-blur-md border border-white/50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                <!-- Image Placeholder if no image -->
                <div class="h-48 bg-[#5D181E]/10 relative overflow-hidden">
                  <img v-if="item.data?.['gambar_berita']?.url" :src="item.data['gambar_berita'].url"
                    :alt="item.data['gambar_berita'].alt || 'Berita Image'"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div v-else class="w-full h-full flex items-center justify-center text-[#5D181E]/30">
                    <span class="text-4xl">✝</span>
                  </div>
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-[#5D181E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
                </div>

                <div class="p-6 flex flex-col flex-grow">
                  <span class="text-xs font-bold text-[#5D181E]/60 uppercase tracking-wider mb-2">
                    {{
                      item.data?.["tanggal_rilis_berita"] || ""
                    }}
                  </span>
                  <h3
                    class="text-xl font-serif text-[#5D181E] font-bold mb-3 leading-tight group-hover:text-[#b8860b] transition-colors">
                    {{ item.data?.judul_berita?.[0]?.text }}
                  </h3>
                  <p class="text-[#5D181E]/80 text-sm line-clamp-3 mb-4 flex-grow">
                    {{
                      item.data?.["isi_berita"]?.[0]?.text
                    }}
                  </p>
                  <RouterLink :to="`/berita/${item.uid}`"
                    class="text-[#5D181E] font-bold text-sm uppercase tracking-wide flex items-center group-hover:underline decoration-2 underline-offset-4">
                    Baca Selengkapnya
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </RouterLink>
                </div>
              </div>
            </div>
          </section>

          <!-- PENGUMUMAN SECTION -->
          <section v-if="pengumuman.length > 0">
            <div class="flex items-center space-x-4 mb-8">
              <div class="w-10 h-10 rounded-full bg-[#5D181E] flex items-center justify-center text-[#FFF9E6]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.467a23.78 23.78 0 00-8.753 1.76" />
                </svg>
              </div>
              <h2
                class="text-3xl text-[#5D181E] font-serif tracking-wide uppercase border-b-2 border-[#5D181E]/20 pb-1">
                Pengumuman
              </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  {{
                    item.data?.judul_pengumuman?.[0]?.text
                  }}
                </h3>
                <p class="text-[#5D181E]/80 text-sm line-clamp-4 mb-4">
                  {{
                    item.data?.["isi-pengumuman"]?.[0]?.text
                  }}
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
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
