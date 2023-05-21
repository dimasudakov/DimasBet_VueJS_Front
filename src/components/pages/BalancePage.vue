<template>
    <v-container>
        <h1>Баланс</h1>
        <v-row class="balance">
            <v-col cols="4">
                <v-card v-if="this.balance.rub" color="primary">
                    <v-card-text>
                        <v-row>
                            <v-col cols="3">
                                <h2>RUB:</h2>
                            </v-col>
                            <v-col cols="8">
                                <h3>{{ this.getRub() }}</h3>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card v-if="this.balance.usd" color="primary">
                    <v-card-text>
                        <v-row>
                            <v-col cols="3">
                                <h2>USD:</h2>
                            </v-col>
                            <v-col cols="8">
                                <h3>{{ this.getUsd() }}</h3>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card v-if="this.balance.eur" color="primary">
                    <v-card-text>
                        <v-row>
                            <v-col cols="3">
                                <h2>EUR:</h2>
                            </v-col>
                            <v-col cols="8">
                                <h3>{{ this.getEur() }}</h3>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'BalancePage',

        data() {
            return {
                balance: {}
            }
        },

        created() {
            this.loadBalance();
        },

        methods: {
            async loadBalance() {
                const url = "http://localhost:8081/api/betting/user/balance/currency";

                try {
                    const balanceResponse = await axios.get(url);
                    this.balance = balanceResponse.data;
                    console.log(this.balance);
                } catch (error) {
                    console.log("Ошибка");
                }
            },

            getRub() {
                return this.balance.rub.toFixed(2);
            },

            getUsd() {
                return this.balance.usd.toFixed(2);
            },

            getEur() {
                return this.balance.eur.toFixed(2);
            }
        }
    }
</script>

<style scoped>
.balance{
    margin-top: 30px;
}

</style>