import {defineStore} from "pinia";
import {client} from "../prismic";

export const useParokiStore = defineStore("paroki",{
    state:() =>({
        dppData :null,
        dppItems: [],
        pastorItems: [],
        sejarahItems: null,
        loading: false,
        error: null,
    }),
    actions:{
        async fetchDpp(){
            try{
                this.loading = true;
                this.error = null;

                const dppRes = await client.getByType("dpppost");
             
                const doc = dppRes.results[0];

                this.dppData = doc?.data || null;

                // ambil daftar pengurus dari field repeatable group
                this.dppItems = doc?.data?.tabel_pengurus || [];
            }catch(err){
                this.error = err.message;
            }finally{
                this.loading = false;
            }
        },
        async fetchPastor(){
            try{
                this.loading = true;
                this.error = null;

                const pastorRes = await client.getByType("pastor");
                this.pastorItems = pastorRes.results;
            }catch(err){
                this.error = err.message;
            }finally{
                this.loading = false;
            }
        },
        async fetchSejarah(){
            try{
                this.loading = true;
                this.error = null;

                const sejarahRes = await client.getByType("sejarahpost");
                this.sejarahItems = sejarahRes.results;
                this.sejarahData = sejarahRes.results[0];
                console.log(this.sejarahItems);

            }catch(err){
                this.error = err.message;
            }finally{
                this.loading = false;
            }
        },
    },
})