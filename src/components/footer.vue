<template>
  <footer
    class="bg-accent text-[#5D181E] py-16 border-t border-[#5D181E]/10 font-sans"
  >
    <div class="container mx-auto px-6 md:px-12">
      <div class="flex flex-col md:flex-row gap-12">
        <!-- COLUMN 1: MEDIA PAROKI -->
        <div
          class="w-full md:w-1/4 flex flex-col space-y-6 md:border-r md:border-[#5D181E]/20 md:pr-12"
        >
          <h3
            class="text-sm font-bold tracking-[0.2em] uppercase border-b border-[#5D181E]/20 pb-4 w-fit"
          >
            Media Paroki
          </h3>
          <div class="flex space-x-4">
            <!-- Instagram -->
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-[#5D181E]/10 flex items-center justify-center hover:bg-[#5D181E] hover:text-[#FFF9E6] transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path
                  d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                ></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <!-- Youtube -->
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-[#5D181E]/10 flex items-center justify-center hover:bg-[#5D181E] hover:text-[#FFF9E6] transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"
                ></path>
                <polygon
                  points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                ></polygon>
              </svg>
            </a>
            <!-- Facebook -->
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-[#5D181E]/10 flex items-center justify-center hover:bg-[#5D181E] hover:text-[#FFF9E6] transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                ></path>
              </svg>
            </a>
            <!-- Whatsapp -->
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-[#5D181E]/10 flex items-center justify-center hover:bg-[#5D181E] hover:text-[#FFF9E6] transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                ></path>
              </svg>
            </a>
            <!-- Tiktok -->
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-[#5D181E]/10 flex items-center justify-center hover:bg-[#5D181E] hover:text-[#FFF9E6] transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- COLUMN 2: JADWAL PELAYANAN -->
        <div class="w-full md:w-1/3 flex flex-col space-y-6">
          <h3
            class="text-sm font-bold tracking-[0.2em] uppercase border-b border-[#5D181E]/20 pb-4 w-fit"
          >
            Jadwal Pelayanan Sekretariat
          </h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="font-serif text-lg uppercase tracking-wide"
                >Senin - Sabtu</span
              >
              <span class="font-medium">08.00 - 20.00 WIB</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-serif text-lg uppercase tracking-wide"
                >Minggu</span
              >
              <span class="font-medium">08.00 - 15.00 WIB</span>
            </div>
            <p class="text-sm opacity-70 italic mt-2">
              Rabu & libur nasional tutup
            </p>
          </div>
        </div>

        <!-- COLUMN 3: ALAMAT -->
        <div class="w-full md:w-1/3 flex flex-col space-y-6 md:pl-12">
          <h3
            class="text-sm font-bold tracking-[0.2em] uppercase border-b border-[#5D181E]/20 pb-4 w-fit"
          >
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
      <div
        class="mt-16 pt-8 border-t border-[#5D181E]/10 text-center md:text-left"
      >
        <p class="text-xs opacity-60">Designed by Designata Studio</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component
</script>
