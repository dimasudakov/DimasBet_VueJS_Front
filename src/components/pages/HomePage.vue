
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
        <h3 v-if="user"> Hi, {{user.firstName}} {{user.lastName}}</h3>
        <h3 v-else> You are not logged in</h3>
        <SliderHome></SliderHome>
    </div>
</template>

<style scoped>

</style>