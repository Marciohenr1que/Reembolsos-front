import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { i18n } from "./i18n";
import "./style.css";
import { Toaster } from "vue-sonner";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(i18n);
app.use(Toaster);

app.mount("#app");
