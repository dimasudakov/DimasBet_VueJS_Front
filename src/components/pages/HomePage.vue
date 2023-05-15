
<script>
    import SliderHome from "@/components/elements/SliderHome.vue";
    import {mapGetters} from "vuex";
    import axios from "axios";

    export default {
        name: 'HomePage',
        components: {SliderHome},

        computed: {
            ...mapGetters(['user']),
        },

        beforeRouteEnter(to, from, next) {
            axios.get("/api/user")
                .then((response) => {
                    next(vm => {
                        vm.$store.dispatch("user", response.data);
                    });
                })
                .catch((error) => {
                    console.error(error);
                    next();
                });
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