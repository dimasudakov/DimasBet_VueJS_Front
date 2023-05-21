
<script>
    import SliderHome from "@/components/elements/SliderHome.vue";
    import {mapGetters} from "vuex";

    export default {
        name: 'HomePage',
        components: {SliderHome},

        computed: {
            ...mapGetters(['user']),
        },

    }

</script>

<template>
    <div>
        <v-sheet
            v-if="user"
            elevation="12"
            width="60%"
            min-width="300px"
            rounded="lg"
            class="pa-4 mx-auto"
            color="primary"
        >
            <v-row class="justify-center">
                <h3>С возвращением, {{ user.firstName }} {{ user.lastName }}!</h3>
            </v-row>
        </v-sheet>
        <SliderHome></SliderHome>
    </div>
</template>

<style scoped>

</style>