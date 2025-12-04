import { defineStore } from "pinia";
import { client } from "../prismic";

export const useSakramenStore = defineStore("sakramen", {
    state: () => ({
        items: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchSakramen() {
            this.loading = true;
            this.error = null;

            try {
                const sakramenRes = await client.getByType("sakramenpost", {
                    orderings: [
                        {
                            field: "my.sakramenpost.tanggal_rilis_sakramen",
                            direction: "desc",
                        },
                    ],
                });

        
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
    },
});