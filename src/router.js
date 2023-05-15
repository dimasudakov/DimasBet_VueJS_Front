import {createRouter, createWebHistory} from "vue-router";


import HomePage from '@/components/pages/HomePage.vue'
import LoginForm from '@/components/pages/LoginPage.vue'
import RegistrationForm from "@/components/pages/RegistrationForm.vue";
import NotFoundPage from "@/components/NotFoundPage.vue";


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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
