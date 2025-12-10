import { defineStore } from "pinia";
import { client } from "../prismic";

export const useSakramenStore = defineStore("sakramen", {
    state: () => ({
        sakramenItems: [],
        sakramenDetail: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchSakramen() {
            this.loading = true;
            this.error = null;

            try {
                const sakramenRes = await client.getByType("sakramen");
                this.sakramenItems = sakramenRes.results;
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
        async fetchSakramenDetail(uid) {
            this.loading = true;
            this.error = null;

            try {
                const doc = await client.getByUID("sakramen", uid);
                this.sakramenDetail = doc;
            } catch (err) {
                this.error = err.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },
    },
});