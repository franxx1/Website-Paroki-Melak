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
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
