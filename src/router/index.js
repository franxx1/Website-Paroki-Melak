// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

// Lazy Loading Pages
const Home = () => import("../components/home.vue");
const Berita = () => import("../components/pages/berita-dan-pengumuman/berita.vue");
const BeritaDetail = () => import("../components/pages/berita-dan-pengumuman/berita_detail.vue");

const Pengumuman = () => import("../components/pages/berita-dan-pengumuman/pengumuman.vue");
const PengumumanDetail = () => import("../components/pages/berita-dan-pengumuman/pengumuman_detail.vue");

const Sakramen = () => import("../components/pages/sakramen/sakramen.vue");
const SakramenDetail = () => import("../components/pages/sakramen/sakramen_detail.vue");
const Sejarah = () => import("../components/pages/paroki/sejarah.vue");
const Dpp = () => import("../components/pages/paroki/dpp.vue");
const Pastor = () => import("../components/pages/paroki/pastor.vue");
const Jadwal_Misa = () => import("../components/jadwalMisa.vue");
const Pelayanan = () => import("../components/pelayanan.vue")
const Galeri = () => import("../components/pages/galeri/galeri.vue")
const GaleriDetail = () => import("../components/pages/galeri/galeri_detail.vue")


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/berita",
    name: "berita",
    component: Berita,
  },
  {
    path: "/berita/:uid",
    name: "beritaDetail",
    component: BeritaDetail,
  },
  {
    path: "/pengumuman",
    name: "pengumuman",
    component: Pengumuman,
  },
  {
    path: "/pengumuman/:uid",
    name: "pengumumanDetail",
    component: PengumumanDetail,
  },
  {
    path: "/sakramen",
    name: "sakramen",
    component: Sakramen,
  },
  {
    path: "/sakramen/:uid",
    name: "sakramenDetail",
    component: SakramenDetail,
  },
  {
    path: "/sejarah",
    name: "sejarah",
    component: Sejarah,
  },
  {
    path: "/dpp",
    name: "dpp",
    component: Dpp,
  },
  {
    path: "/pastor",
    name: "pastor",
    component: Pastor,
  },
  {
    path: "/jadwal-misa",
    name: "jadwalMisa",
    component: Jadwal_Misa,
  },
  {
    path: "/pelayanan",
    name: "pelayanan",
    component: Pelayanan,
  },
  {
    path: "/galeri",
    name: "galeri",
    component: Galeri,
  },
  {
    path: "/galeri/:uid",
    name: "galeriDetail",
    component: GaleriDetail,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
