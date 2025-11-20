<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-primary shadow-lg">
    <div class="container mx-auto my-auto py-4 px-4">
      <div class="flex items-center justify-between h-18">
        <!-- Brand Logo -->
        <div class="flex items-center space-x-3">
          <img 
            src="/src/assets/logo/logo.png" 
            alt="Paroki Santo Markus Melak"
            class="w-20 h-20 object-contain"
          >
          <span class="text-accent text-xl font-bold whitespace-nowrap"> 
          </span>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class=" md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          @click="toggleMenu"
        >
          <span 
            class="bg-accent block w-6 h-0.5 bg-merino transition-all duration-300"
            :class="isOpen ? 'rotate-45 translate-y-2' : ''"
          ></span>
          <span 
            class=" bg-accent block w-6 h-0.5 bg-merino transition-all duration-300"
            :class="isOpen ? 'opacity-0' : 'opacity-100'"
          ></span>
          <span 
            class="bg-accent block w-6 h-0.5 bg-red transition-all duration-300"
            :class="isOpen ? '-rotate-45 -translate-y-2' : ''"
          ></span>
        </button>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center px-10 space-x-8 text-xl">
          <a 
            href="" 
            class="text-accent hover:text-accent transition-colors duration-300 font-medium"
          >
            Homepage
          </a>
          <a 
        
            href="#pelayanan"  
            class="text-accent hover:text-bright-sun transition-colors duration-300 font-medium"
          >
            Pelayanan
          </a>
          <!-- Paroki Dropdown -->
          <div class="relative group">
            <button class="flex items-center text-accent hover:text-bright-sun transition-colors duration-300 font-medium focus:outline-none">
              Paroki
              <svg class="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div class="absolute left-0 mt-2 w-48 bg-red-dark rounded-md shadow-lg py-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 border border-yellow-pastel transform origin-top scale-95 group-hover:scale-100">
              <a href="#dpp" class="block px-4 py-2 text-sm text-accent hover:bg-yellow-pastel hover:text-red-dark transition-colors">DPP</a>
              <a href="#sejarah" class="block px-4 py-2 text-sm text-accent hover:bg-yellow-pastel hover:text-red-dark transition-colors">Sejarah</a>
              <a href="#wilayah" class="block px-4 py-2 text-sm text-accent hover:bg-yellow-pastel hover:text-red-dark transition-colors">Wilayah Pelayanan</a>
              <a href="#fasilitas" class="block px-4 py-2 text-sm text-accent hover:bg-yellow-pastel hover:text-red-dark transition-colors">Fasilitas</a>
            </div>
          </div>
          <a 
            href="#jadwalmisa" 
            class="text-accent hover:text-bright-sun transition-colors duration-300 font-medium"
          >
            Jadwal Misa
          </a>
          <!-- Berita Dropdown -->
          <div class="relative group">
            <button class="flex items-center text-accent hover:text-bright-sun transition-colors duration-300 font-medium focus:outline-none">
              Berita & Pengumuman
              <svg class="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div class="absolute left-0 mt-2 w-56 bg-red-dark rounded-md shadow-lg py-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 border border-yellow-pastel transform origin-top scale-95 group-hover:scale-100">
              <a href="#berita" class="block px-4 py-2 text-sm text-accent hover:bg-yellow-pastel hover:text-red-dark transition-colors">Berita</a>
              <a href="#pengumuman" class="block px-4 py-2 text-sm text-accent hover:bg-yellow-pastel hover:text-red-dark transition-colors">Pengumuman</a>
            </div>
          </div>
          <a 
            href="#galeri" 
            class="text-accent hover:text-bright-sun transition-colors duration-300 font-medium"
          >
            Galeri
          </a>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        class="text-accent md:hidden overflow-hidden transition-all duration-300 my-2"
        :class="isOpen ? 'max-h-66 opacity-100' : 'max-h-0 opacity-0'"
      >
        <div class="py-6 space-y-4 border-t border-yellow-pastel">
          <a href="#hero" class="block text-merino hover:text-bright-sun transition-colors duration-300 font-medium" @click="closeMenu">Home</a>
          <a href="#pelayanan" class="block text-merino hover:text-bright-sun transition-colors duration-300 font-medium" @click="closeMenu">Pelayanan</a>
          
          <!-- Mobile Paroki -->
          <div>
            <button @click="toggleDropdown('paroki')" class="flex items-center justify-between w-full text-merino hover:text-bright-sun transition-colors duration-300 font-medium focus:outline-none">
              <span>Paroki</span>
              <svg class="w-4 h-4 transition-transform duration-300" :class="activeDropdown === 'paroki' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div v-show="activeDropdown === 'paroki'" class="mt-2 pl-4 space-y-2 border-l-2 border-yellow-pastel/30">
              <a href="#sejarah" class="block text-sm text-merino hover:text-bright-sun" @click="closeMenu">Sejarah</a>
              <a href="#dpp" class="block text-sm text-merino hover:text-bright-sun" @click="closeMenu">DPP</a>
              <a href="#wilayah" class="block text-sm text-merino hover:text-bright-sun" @click="closeMenu">Wilayah Pelayanan</a>
              <a href="#fasilitas" class="block text-sm text-merino hover:text-bright-sun" @click="closeMenu">Fasilitas</a>
            </div>
          </div>

          <a href="#jadwalmisa" class="block text-merino hover:text-bright-sun transition-colors duration-300 font-medium" @click="closeMenu">Jadwal Misa</a>

          <!-- Mobile Berita -->
          <div>
            <button @click="toggleDropdown('berita')" class="flex items-center justify-between w-full text-merino hover:text-bright-sun transition-colors duration-300 font-medium focus:outline-none">
              <span>Berita & Pengumuman</span>
              <svg class="w-4 h-4 transition-transform duration-300" :class="activeDropdown === 'berita' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div v-show="activeDropdown === 'berita'" class="mt-2 pl-4 space-y-2 border-l-2 border-yellow-pastel/30">
              <a href="#berita" class="block text-sm text-merino hover:text-bright-sun" @click="closeMenu">Berita</a>
              <a href="#pengumuman" class="block text-sm text-merino hover:text-bright-sun" @click="closeMenu">Pengumuman</a>
            </div>
          </div>

          <a href="#galeri" class="block text-merino hover:text-bright-sun transition-colors duration-300 font-medium" @click="closeMenu">Galeri</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isOpen: false,
      activeDropdown: null
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
      if (!this.isOpen) this.activeDropdown = null
    },
    closeMenu() {
      this.isOpen = false
      this.activeDropdown = null
    },
    toggleDropdown(name) {
      this.activeDropdown = this.activeDropdown === name ? null : name
    }
  }
}
</script>