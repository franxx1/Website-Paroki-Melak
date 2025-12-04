import { defineStore } from "pinia";
import { client } from "../prismic";
import { formatDate } from "/src/utils/formatDate";

export const usePengumumanStore = defineStore("pengumuman", {
  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPengumuman() {
      this.loading = true;
      this.error = null;

      try {
        const pengumumanRes = await client.getByType("pengumumanpost", {
          orderings: [
            {
              field: "my.pengumumanpost.tanggal_rilis_pengumuman",
              direction: "desc",
            },
          ],
        });

        this.items = pengumumanRes.results;
        this.items.forEach((item) => {
          item.data.tanggal_rilis_pengumuman = formatDate(
            item.data.tanggal_rilis_pengumuman
          );
        });
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchPengumumanDetail(uid) {
      this.loading = true;
      this.error = null;

      try {
        const doc = await client.getByUID("pengumumanpost", uid);

        return {
          ...doc,
          data: {
            ...doc.data,
            tanggal_rilis_pengumuman: formatDate(
              doc.data.tanggal_rilis_pengumuman
            ),
          },
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
