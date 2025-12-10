<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { client } from "../../../prismic";
import { PrismicRichText } from "@prismicio/vue";

const route = useRoute();
const router = useRouter();
const sakramen = ref(null);
const allSakramen = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchAllSakramen = async () => {
    try {
        const response = await client.get({
            type: "sakramen",
            orderings: {
                field: "document.first_publication_date",
                direction: "asc",
            },
        });
        allSakramen.value = response.results;
    } catch (err) {
        console.error("Error fetching all sakramen:", err);
    }
};

const fetchSakramen = async (uid) => {
    loading.value = true;
    error.value = null;
    try {
        const response = await client.getByUID("sakramen", uid);
        sakramen.value = response;
    } catch (err) {
        console.error("Error fetching sakramen detail:", err);
        error.value = "Gagal memuat data sakramen.";
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    await fetchAllSakramen();
    if (route.params.uid) {
        fetchSakramen(route.params.uid);
    }
});

watch(() => route.params.uid, (newUid) => {
    if (newUid) {
        fetchSakramen(newUid);
    }
});

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const navigateTo = (uid) => {
    isMobileMenuOpen.value = false;
    router.push(`/sakramen/${uid}`);
};
</script>

<template>
    <section class="min-h-screen font-sans text-slate-800 bg-[#FFF9E6]/30 pb-20 pt-24 md:pt-32">

        <div class="container mx-auto max-w-6xl px-6 md:px-12">

            <div v-if="loading && !sakramen" class="min-h-[50vh] flex items-center justify-center text-[#5D181E]">
                Loading...
            </div>

            <div v-else-if="error" class="min-h-[50vh] flex items-center justify-center text-red-600">
                {{ error }}
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-12">

                <!-- SIDEBAR NAVIGATION -->
                <div class="md:col-span-1">
                    <div class="sticky top-32 z-30 w-full">

                        <!-- Mobile Dropdown Toggle (Styled like image) -->
                        <div class="md:hidden mb-6">
                            <button @click="toggleMobileMenu"
                                class="w-full flex items-center justify-between text-[#5D181E] font-serif tracking-widest uppercase py-3 border-y border-[#5D181E]/20 bg-transparent transition-all duration-300 hover:bg-[#5D181E]/5">
                                <span class="text-sm font-bold">Sakramen</span>
                                <span
                                    class="text-2xl leading-none font-light text-[#5D181E] transition-transform duration-300"
                                    :class="isMobileMenuOpen ? 'rotate-45' : ''">
                                    +
                                </span>
                            </button>

                            <div class="overflow-hidden transition-all duration-500 ease-in-out"
                                :style="{ maxHeight: isMobileMenuOpen ? '500px' : '0px', opacity: isMobileMenuOpen ? '1' : '0' }">
                                <ul class="py-2 space-y-1 bg-[#FFF9E6]/50 backdrop-blur-sm">
                                    <li v-for="item in allSakramen" :key="item.uid">
                                        <button @click="navigateTo(item.uid)"
                                            class="w-full text-left py-3 px-4 flex items-center justify-between group transition-all duration-300 hover:bg-[#5D181E]/5"
                                            :class="route.params.uid === item.uid ? 'text-[#b8860b] font-bold' : 'text-[#5D181E]'">
                                            <span class="uppercase text-xs tracking-wide font-sans">
                                                {{ item.data?.nama_sakramen?.[0]?.text }}
                                            </span>
                                            <span class="text-lg transition-transform duration-300"
                                                :class="route.params.uid === item.uid ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'">
                                                &rarr;
                                            </span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Desktop Sidebar -->
                        <ul class="hidden md:block space-y-1">
                            <li v-for="item in allSakramen" :key="item.uid">
                                <button @click="navigateTo(item.uid)"
                                    class="w-full text-left py-3 px-4 border-b border-[#5D181E]/10 flex items-center justify-between group transition-all duration-300"
                                    :class="route.params.uid === item.uid ? 'text-[#b8860b] font-bold bg-[#5D181E]/5' : 'text-[#5D181E] hover:text-[#b8860b] hover:bg-[#5D181E]/5'">
                                    <span class="uppercase text-sm tracking-wide font-serif">
                                        {{ item.data?.nama_sakramen?.[0]?.text }}
                                    </span>
                                    <span class="text-lg transition-transform duration-300"
                                        :class="route.params.uid === item.uid ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'">
                                        &rarr;
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- MAIN CONTENT -->
                <div class="md:col-span-3">
                    <div v-if="sakramen" class="animate-fade-in">

                        <!-- Title & Banner -->
                        <div class="mb-8">
                            <h1
                                class="text-3xl md:text-4xl font-serif text-[#5D181E] font-bold mb-6 uppercase tracking-wide">
                                {{ sakramen.data?.nama_sakramen?.[0]?.text }}
                            </h1>

                            <div class="w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg relative mb-8">
                                <img v-if="sakramen.data?.gambar_sakramen?.url" :src="sakramen.data.gambar_sakramen.url"
                                    :alt="sakramen.data.gambar_sakramen.alt || 'Sakramen Image'"
                                    class="w-full h-full object-cover" />
                                <div v-else
                                    class="w-full h-full bg-[#5D181E]/10 flex items-center justify-center text-[#5D181E]/30">
                                    <span class="text-6xl">✝</span>
                                </div>
                            </div>
                        </div>

                        <!-- SLICES CONTENT -->
                        <div v-if="sakramen.data?.body" class="space-y-12">
                            <div v-for="(slice, index) in sakramen.data.body" :key="index">

                                <!-- Keterangan Sakramen Slice -->
                                <div v-if="slice.slice_type === 'keterangan_sakramen'"
                                    class="prose prose-lg prose-slate max-w-none">
                                    <div v-for="(item, itemIndex) in slice.items" :key="itemIndex"
                                        class="mb-8 last:mb-0">
                                        <h3 v-if="item.keterangan_sakramen?.[0]?.text"
                                            class="text-xl font-serif text-[#5D181E] font-bold mb-3">
                                            {{ item.keterangan_sakramen[0].text }}
                                        </h3>
                                        <div class="text-slate-700 leading-relaxed text-justify">
                                            <PrismicRichText :field="item.keterangan_isi" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div v-else class="text-center text-slate-500 italic py-10">
                            Belum ada informasi detail untuk sakramen ini.
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Custom Prose Styles for Prismic Rich Text */
:deep(.prose h1),
:deep(.prose h2),
:deep(.prose h3) {
    color: #5D181E;
    font-family: serif;
}

:deep(.prose ul) {
    list-style-type: disc;
    padding-left: 1.5em;
}

:deep(.prose ol) {
    list-style-type: decimal;
    padding-left: 1.5em;
}

:deep(.prose a) {
    color: #b8860b;
    text-decoration: underline;
}
</style>
