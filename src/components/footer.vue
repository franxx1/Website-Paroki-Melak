<template>
  <footer class="bg-accent text-[#5D181E] py-16 border-t border-[#5D181E]/10 font-sans">
    <div class="container mx-auto px-6 md:px-12">
      <div class="flex flex-col md:flex-row gap-12">
        <!-- COLUMN 1: MEDIA PAROKI -->
        <div class="w-full md:w-1/4 flex flex-col space-y-6 md:border-r md:border-[#5D181E]/20 md:pr-12">
          <h3 class="text-sm font-bold text-center tracking-widest uppercase border-b border-[#5D181E]/20 w-full">
            Kalender Liturgi Hari Ini
          </h3>
          <div class="flex space-x-4">
        

            <div class="flex flex-col items-center bg-[#FFFFCC] text-black p-4 rounded-lg shadow-sm w-full">
              <a href="http://www.imankatolik.or.id" target="_blank"
                class="font-bold text-sm hover:underline mb-3 text-[#5D181E]">
                imankatolik.or.id
              </a>
              <div class="flex flex-col gap-2 items-center">
                <a href="http://www.imankatolik.or.id/kal_tgl_link.php" target="_blank"
                  class="hover:opacity-80 transition-opacity">
                  <img src="http://www.imankatolik.or.id/kal_tgl_img.php" alt="Tanggal Liturgi" />
                </a>
                <a href="http://www.imankatolik.or.id/kal_tgl_link.php" target="_blank"
                  class="hover:opacity-80 transition-opacity">
                  <img src="http://www.imankatolik.or.id/kal_perayaan_img.php" alt="Perayaan Liturgi" />
                </a>
                <a href="http://www.imankatolik.or.id/kal_alkitab_link.php" target="_blank"
                  class="hover:opacity-80 transition-opacity">
                  <img src="http://www.imankatolik.or.id/kal_alkitab_img.php" alt="Bacaan Alkitab" />
                </a>
                <div class="pt-1">
                  <img src="http://www.imankatolik.or.id/kal_warna_img.php" alt="Warna Liturgi" />
                </div>
              </div>
              <a href="http://www.imankatolik.or.id/kalender.php" target="_blank"
                class="text-xs font-medium hover:underline mt-3 text-[#5D181E]">
                Kalender bulan ini
              </a>
            </div>
          </div>
        </div>

        <!-- COLUMN 2: JADWAL PELAYANAN -->
        <div class="w-full md:w-1/3 flex flex-col space-y-6">
          <h3 class="text-sm font-bold tracking-[0.2em] uppercase border-b border-[#5D181E]/20 pb-4 w-fit">
            Jadwal Pelayanan Sekretariat
          </h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="font-serif text-lg uppercase tracking-wide">Senin - Sabtu</span>
              <span class="font-medium">08.00 - 20.00 WIB</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-serif text-lg uppercase tracking-wide">Minggu</span>
              <span class="font-medium">08.00 - 15.00 WIB</span>
            </div>
            <p class="text-sm opacity-70 italic mt-2">
              Rabu & libur nasional tutup
            </p>
          </div>
        </div>

        <!-- COLUMN 3: ALAMAT -->
        <div class="w-full md:w-1/3 flex flex-col space-y-6 md:pl-12">
          <h3 class="text-sm font-bold tracking-[0.2em] uppercase border-b border-[#5D181E]/20 pb-4 w-fit">
            Alamat
          </h3>
          <div class="space-y-2 text-base leading-relaxed">
            <p class="font-medium">Sekretariat Paroki Katedral Jakarta</p>
            <p>Jl. Katedral No. 7B</p>
            <p>Pasar Baru</p>
            <p>Jakarta Pusat 10710</p>
          </div>
        </div>
      </div>

      <!-- BOTTOM: COPYRIGHT -->
      <div class="mt-16 pt-8 border-t border-[#5D181E]/10 text-center md:text-left">
        <p class="text-xs opacity-60">Designed by Designata Studio</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component
</script>
