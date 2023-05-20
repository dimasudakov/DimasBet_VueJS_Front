import {createRouter, createWebHistory} from "vue-router";


import HomePage from '@/components/pages/HomePage.vue'
import LoginForm from '@/components/pages/LoginPage.vue'
import RegistrationForm from "@/components/pages/RegistrationForm.vue";
import NotFoundPage from "@/components/NotFoundPage.vue";
import LinePage from "@/components/pages/LinePage.vue";
import EventPage from "@/components/pages/EventPage.vue";
import ExpressPage from "@/components/pages/ExpressPage.vue";


const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/registration',
        component: RegistrationForm
    },
    {
        path: '/login',
        component: LoginForm
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFoundPage
    },
    {
        path: '/line',
        component: LinePage
    },
    {
        path: '/line/event/:discipline_name/:event_id',
        name: 'Event',
        component: EventPage,
        props: true,
    },
    {
        path: '/account/express',
        component: ExpressPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
