<script setup>
import { ref, onMounted } from "vue";
import { client } from "../prismic";

const jadwal = ref(null);
const loading = ref(true);

onMounted(async () => {
  const doc = await client.getSingle("jadwal-misa");
  jadwal.value = doc;
  loading.value = false;
});
</script>

<template>
  <section
    class="min-h-screen font-sans text-slate-800 flex flex-col md:flex-row" id="jadwalmisa"
  >
    <!-- LEFT IMAGE SECTION -->
    <div
      class="w-full md:w-1/3 lg:w-1/2 bg-slate-200 relative min-h-[300px] md:min-h-screen"
    >
      <img
        src="/src/assets/image/gereja.png"
        alt="Church Interior"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <!-- Overlay (optional) -->
      <div class="absolute inset-0 bg-black/10"></div>
    </div>

    <!-- RIGHT CONTENT SECTION -->
    <div
      class="w-full md:w-2/3 lg:w-3/4 bg-primary p-6 md:p-12 overflow-y-auto"
    >
      <div v-if="loading" class="text-center p-10">Loading...</div>

      <div v-else class="container mx-auto max-w-5xl">
        <!-- HEADER -->
        <div class="flex justify-center mb-12">
          <h1 class="text-5xl font-serif text-accent">
            {{ jadwal.data["heading-jadwal-misa"][0].text }}
          </h1>
        </div>

        <div class="flex justify-center items-center">
          <!-- MAIN CONTENT (JADWAL) -->
          <div
            class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 border-acent"
          >
            <!-- LOOP SEMUA SLICE -->
            <div
              v-for="(slice, index) in jadwal.data.body"
              :key="index"
              class="mb-8"
            >
              <div v-if="slice.slice_type === 'jadwal_misa'">
                <!-- SECTION TITLE -->
                <h2
                  class="text-lg text-accent font-serif tracking-widest uppercase border-t border-b border-accent pb-2 mb-6 "
                >
                  {{ slice.primary["nama-misa"]?.[0]?.text }}
                </h2>

                <!-- ITEMS -->
                <div class="space-y-6">
                  <div
                    v-for="(item, i) in slice.items"
                    :key="i"
                    class="flex justify-between items-center border-yellow-pastel pb-2 last:border-0"
                  >
                    <!-- HARI (e.g. SABTU, MINGGU) -->
                    <h3
                      class="text-accent font-bold uppercase tracking-wide w-1/3"
                    >
                      {{ item["hari-misa"]?.[0]?.text }}
                    </h3>

                    <p class="text-accent font-bold w-2/3 text-right">
                      {{ item["waktu-misa"]?.[0]?.text }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
