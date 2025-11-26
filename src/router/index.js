// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/home.vue";
import Berita from "../components/pages/berita.vue";
import Pengumuman from "../components/pages/pengumuman.vue";
import PengumumanDetail from "../components/pages/pengumuman_detail.vue";
import BeritaDetail from "../components/pages/berita_detail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
    {
    path: "/berita",
    name: "Berita",
    component: Berita,
  },
  {
    path: "/pengumuman",
    name: "Pengumuman",
    component: Pengumuman,
  },
  {
    path: "/pengumuman/:uid",
    name: "PengumumanDetail",
    component: PengumumanDetail,
  },
  {
    path: "/berita/:uid",
    name: "BeritaDetail",
    component: BeritaDetail,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
