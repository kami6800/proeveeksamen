import './assets/tailwind.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import store from "./store/index.js";
import MoodEmojis from "./components/MoodEmojis"

const app = createApp(App);

app.use(router);
app.use(store);

app.component("mood-emojis", MoodEmojis);

app.mount('#app');
