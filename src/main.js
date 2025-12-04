import { createApp } from "vue";
import App from "./App.vue";

import { createPrismic } from "@prismicio/vue";
import { repositoryName } from "./prismic";

import { createPinia } from "pinia";
import router from "./router/index.js";

import "./style/main.css";

const app = createApp(App);

// install pinia
const pinia = createPinia();
app.use(pinia);

// install prismic
app.use(
  createPrismic({
    endpoint: `https://${repositoryName}.cdn.prismic.io/api/v2`,
  })
);

// install router
app.use(router);

// mount
app.mount("#app");
