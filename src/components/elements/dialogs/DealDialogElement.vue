<template>
    <div class="text-center">
        <v-btn
                color="primary"
                @click="dialog = true"
        >
            Сделать ставку
        </v-btn>

        <v-dialog
                v-model="dialog"
                width="40%"
                min-width="500px"
        >
            <v-card>
                <v-card-text class="text-center">
                    <h3>Выберите сумму ставки </h3>
                </v-card-text>

                <v-chip v-if="message" class="ma-3" color="blue" text-color="white">
                    {{message}}
                </v-chip>

                <v-text-field v-model="betAmount" label="Сумма ставки (руб)" class="bet-field" type="number"></v-text-field>



                <v-card-actions>
                    <v-col cols="6">
                        <v-btn color="primary" block @click="makeDeal">Поставить</v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-btn color="primary" block @click="dialog = false">Закрыть</v-btn>
                    </v-col>
                </v-card-actions>

            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'DealDialogElement',

        props: {
            coefficient: null,
        },
        data () {
            return {
                dialog: false,
                message: null,
                betAmount: null
            }
        },

        methods: {
            async makeDeal() {
                if(this.betAmount < 50 || this.betAmount > 10000) {
                    this.message = "Сумма ставки должна быть от 50 до 10000 рублей";
                    return;
                }

                const expressOutcomes = this.$store.getters.expressOutcomes;
                const bets = expressOutcomes.map(outcome => outcome.id);

                const url = 'http://localhost:8081/api/betting/user/create-deal';
                const requestBody = {
                    dealType: 'EXPRESS',
                    money: this.betAmount,
                    coefficient: this.coefficient,
                    bets: bets,
                };

                try {
                    await axios.post(url, requestBody);
                    this.message = "Ставка сделана"
                } catch (error) {
                    this.message = "Не получилось сделать ставку"
                }
            }
        }
    }

</script>

<style scoped>
.bet-field {
    width: 70%;
    margin-top: 20px;
    margin-left: 15%;
}

</style>