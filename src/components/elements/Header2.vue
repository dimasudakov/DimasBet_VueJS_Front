<template>
    <div class="header">
    <v-app-bar app color="primary">
        <v-toolbar-title>DimasBet</v-toolbar-title>
        <v-spacer></v-spacer>

        <router-link to="/"><v-btn> Главная </v-btn></router-link>
        <router-link to="/line"><v-btn> Линия </v-btn></router-link>
        <router-link v-if="!user" to="/login"><v-btn> Войти </v-btn></router-link>
        <router-link v-if="!user" to="/registration"><v-btn> Регистрация </v-btn></router-link>
        <a v-if="user" href="javascript:void(0)" @click="handleLogout"><v-btn> Выйти </v-btn></a>

        <v-btn v-if="user" color="white" width="205px" @click="loadBalance">
            Мой профиль
            <v-menu activator="parent">
                <v-list>
                    <v-list-item :key="0" :value="0">
                        <v-list-item-title v-if="balance" @click="() => myBalance()"> Баланс: <a class="balance">{{balance}}</a></v-list-item-title>
                    </v-list-item>
                    <v-list-item :key="1" :value="1">
                        <v-list-item-title @click="() => myDeals()">Мои ставки</v-list-item-title>
                    </v-list-item>
                    <v-list-item :key="2" :value="2">
                        <v-list-item-title @click="() => handleUpdateBalance()">Пополнить баланс</v-list-item-title>
                    </v-list-item>
                    <v-list-item :key="3" :value="3">
                        <v-list-item-title @click="() => handleExpress()">Экспресс</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="isBettingManager" :key="4" :value="4">
                        <add-event-dialog></add-event-dialog>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-btn>
    </v-app-bar>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";
import AddEventDialog from "@/components/elements/dialogs/CreateEventDialog.vue";

    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Header2',
        components: {AddEventDialog},

        data: () => ({
            balance: null,
            dialog: false
        }),

        methods: {
            async loadBalance() {
                let BalanceResponse;
                try {
                    BalanceResponse = await axios.get("api/betting/user/balance", {
                        baseURL: "http://localhost:8081/"
                    });
                    this.balance = BalanceResponse.data;
                } catch (error) {
                    console.log("error");
                }
            },

            handleLogout() {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                this.$store.dispatch('logout');

                this.$router.push('/');
            },

            myDeals() {
                this.$router.push('/account/history');
            },

            handleExpress() {
                this.$router.push('/account/express');
            },

            myBalance() {
                this.$router.push('/account/balance');
            },

            handleUpdateBalance() {

            }
        },

        computed: {
            ...mapGetters(['user']),

            isBettingManager() {
                if(this.$store.getters.user === null || this.$store.getters.user === undefined) {
                    return false;
                }
                const userRoles = this.$store.getters.user.roles;
                return userRoles.includes("ROLE_BETTING_MANAGER");
            }
        }
    }
</script>


<style scoped>
.header {
    margin-bottom: 200px;
}
.v-btn {
    color: white;
}
.balance {
    color: forestgreen;
}
</style>