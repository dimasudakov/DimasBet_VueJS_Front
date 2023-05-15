<template>
    <title>DimasBet</title>

    <section class="ftco-section">

        <div class="container">
            <nav class="navbar navbar-expand-lg ftco_navbar ftco-navbar-light" id="ftco-navbar">
                <div class="container">
                    <router-link to="/" class="navbar-brand">DimasBet</router-link>

                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
                        aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="fa fa-bars"></span> Menu
                </button>
                <div class="collapse navbar-collapse" id="ftco-nav">
                    <ul class="navbar-nav ml-auto mr-md-3">
                        <li class="nav-item active"><router-link to="/" class="nav-link">Главная</router-link></li>
                        <li class="nav-item"><a href="#" class="nav-link">Линия</a></li>
                        <li v-if="!user" class="nav-item"><router-link to="/login" class="nav-link">Войти</router-link></li>
                        <li v-if="!user" class="nav-item"><router-link to="/registration" class="nav-link">Регистрация</router-link></li>
                        <li v-if="user"  class="nav-item"><a href="javascript:void(0)" @click="handleClick" class="nav-link">Выйти</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </section>


</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Header',

        methods: {
            handleClick() {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                this.$store.dispatch('user', null);

                this.$router.push('/');
            }
        },

        computed: {
            ...mapGetters(['user'])
        }
    }

</script>

<style scoped src="@/assets/css/header.css"></style>

<style>
    .ftco-section {
        background: linear-gradient(to bottom, #9cb1f5, #ffffff);
    }
</style>
