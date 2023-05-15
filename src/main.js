import {createApp} from 'vue'
import App from "@/components/App.vue";
import './axios'
import store from './vuex'

import router from "@/router";

createApp(App).use(store).use(router).mount('#app')