import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./style.css";
import { Toaster } from "vue-sonner";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.component("Toaster", Toaster);

app.mount("#app");
