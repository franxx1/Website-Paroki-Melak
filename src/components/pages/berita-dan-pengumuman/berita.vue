<script setup>
import { ref, onMounted } from "vue";
import { client } from "../../../prismic";

const berita = ref([]);
const loading = ref(true);

onMounted(async () => {
  const beritaRes = await client.getByType("beritapost", {
    orderings: [
      { field: "my.beritapost.tanggal_rilis_berita", direction: "desc" }
    ],
  });

  berita.value = beritaRes.results;


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
        <div class="flex flex-col items-center mb-16 mx-10">
          <span class="text-[#5D181E] tracking-[0.3em] uppercase text-sm mb-2 font-bold opacity-60">Paroki Santo Markus
            Melak</span>
          <h1 class="text-4xl md:text-6xl font-serif text-[#5D181E] mb-4 relative text-center">
            Berita
            <span class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#5D181E] rounded-full"></span>
          </h1>
        </div>

        <div v-if="loading" class="text-center p-10 text-[#5D181E]">
          Loading...
        </div>

        <div v-else class="space-y-20">
          <!-- BERITA SECTION -->
          <section>
            <div class="flex items-center space-x-4 mb-8">
              <div class="w-10 h-10 rounded-full bg-[#5D181E] flex items-center justify-center text-[#FFF9E6]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                </svg>
              </div>
              <h2
                class="text-3xl text-[#5D181E] font-serif tracking-wide uppercase border-b-2 border-[#5D181E]/20 pb-1">
                Berita Terkini
              </h2>
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
                      item.data?.tanggal_rilis_berita ||
                      "Tanggal tidak tersedia"
                    }}
                  </span>
                  <h3
                    class="text-xl font-serif text-[#5D181E] font-bold mb-3 leading-tight group-hover:text-[#b8860b] transition-colors">
                    {{ item.data?.judul_berita?.[0]?.text || "judul berita" }}
                  </h3>
                  <p class="text-[#5D181E]/80 text-sm line-clamp-3 mb-4 flex-grow">
                    {{
                      item.data?.["isi_berita"]?.[0]?.text ||
                      "Klik untuk membaca selengkapnya..."
                    }}
                  </p>
                  <RouterLink
                    :to="`/berita/${item.uid}`"
                    class="text-[#5D181E] font-bold text-sm uppercase tracking-wide flex items-center group-hover:underline decoration-2 underline-offset-4"
                  >
                    Baca Selengkapnya
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </RouterLink>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>