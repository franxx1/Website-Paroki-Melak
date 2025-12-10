import { defineStore } from "pinia";
import { client } from "../prismic";
import { formatDate } from "../utils/formatDate";

export const useBeritaStore = defineStore("berita", {
  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchBerita() {
      this.loading = true;
      this.error = null;

      try {
        const beritaRes = await client.getByType("beritapost", {
          orderings: [
            {
              field: "my.beritapost.tanggal_rilis_berita",
              direction: "desc",
            },
          ],
        });

        this.items = beritaRes.results.map((item) => ({
          ...item,
          data: {
            ...item.data,
            tanggal_rilis_berita: formatDate(item.data.tanggal_rilis_berita),
          },
        }));

      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
 async fetchBeritaDetail(uid) {
  this.loading = true;
  this.error = null;

  try {
    const doc = await client.getByUID("beritapost", uid);

    return {
      ...doc,
      ...doc.data, // pindahkan semua isi data ke root
      judul_berita: doc.data.judul_berita,
      tanggal_rilis_berita: formatDate(doc.data.tanggal_rilis_berita),
    };

  } catch (err) {
    this.error = err.message;
    throw err;
  } finally {
    this.loading = false;
  }
},
  },
});
