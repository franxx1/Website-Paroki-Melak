import { createApp } from "vue";
import App from "./App.vue";

import { createPrismic } from "@prismicio/vue";
import { repositoryName } from "./prismic";
import "./style/main.css";


const app = createApp(App);

app.use(
  createPrismic({
    endpoint: `https://${repositoryName}.cdn.prismic.io/api/v2`,
  })
);

app.mount("#app");
