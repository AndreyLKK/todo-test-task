import { createApp } from "vue";
import { createPinia } from "pinia";
import "./styles/index.scss";
import "./assets/reset.css";
import App from "./App.vue";

const pinia = createPinia();

createApp(App).use(pinia).mount("#app");
