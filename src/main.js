import {createApp} from 'vue'
import App from "@/components/App.vue";
import './axios'
import store from './vuex'
import router from "@/router";

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
    components,
    directives,
    ssr: true
})


createApp(App).use(store).use(router).use(vuetify).mount('#app')