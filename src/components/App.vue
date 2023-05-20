<script>

// import Header from "@/components/Header.vue";
import Footer from "@/components/elements/Footer.vue";
import Header2 from "@/components/elements/Header2.vue";

    export default {
        components: {
            // Header,
            Footer,
            Header2
        },


    }
</script>

<template>
    <v-app>
    <Header2></Header2>
    <router-view class="router"/>
    <Footer></Footer>
    </v-app>
</template>

<style scoped>
</style>