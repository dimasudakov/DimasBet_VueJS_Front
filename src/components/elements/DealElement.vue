<template>
    <v-card
        class="mx-auto"
        width="90%"
    >
        <v-card-item :title="this.deal.dealType"></v-card-item>

        <v-card-text class="py-0">
            <v-row align="center" no-gutters>
                <v-col :class="profitClass" class="text-h3" cols="6">
                    {{ getProfit() }}
                </v-col>

                <v-col v-if="notStatus()" cols="5" class="text-right">
                    <v-icon color="grey" size="80">mdi-clock-outline</v-icon>
                </v-col>
                <v-col v-if="this.isWin()" cols="5" class="text-right">
                    <v-icon color="success" size="80">mdi-check-circle</v-icon>
                </v-col>
                <v-col v-if="this.isLose()" cols="5" class="text-right">
                    <v-icon color="error" size="80">mdi-close-circle</v-icon>
                </v-col>
            </v-row>
        </v-card-text>

        <div class="d-flex py-3 justify-space-between">
            <v-list-item density="compact">
                <template v-slot:prepend>
                    <span class="mr-1">Ставка:</span>
                </template>
                <v-list-item-subtitle class="ml-1">{{ deal.money }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item density="compact">
                <template v-slot:prepend>
                    <span class="mr-1">Дата:</span>
                </template>
                <v-list-item-subtitle class="ml-1">{{ this.formattedDate() }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item density="compact">
                <template v-slot:prepend>
                    <span class="mr-2">Кэф:</span>
                </template>
                <v-list-item-subtitle>{{ deal.coefficient }}</v-list-item-subtitle>
            </v-list-item>
        </div>

        <v-expand-transition>
            <div v-if="expand">
                <v-list class="bg-transparent">
                    <v-list-item v-for="bet in deal.bets" :key="bet.day">

                        <v-list-item-media class="text-left">
                            <v-list-item-title>{{ bet.eventOutcome.eventName }}</v-list-item-title>
                            <v-list-item-subtitle>Исход: {{bet.eventOutcome.outcomeType}}</v-list-item-subtitle>
                            <v-list-item-subtitle>Коэффициент: {{ bet.coefficient }}</v-list-item-subtitle>
                            <v-list-item-subtitle>Статус: {{ bet.eventOutcome.status }}</v-list-item-subtitle>
                        </v-list-item-media>

                    </v-list-item>
                </v-list>
            </div>
        </v-expand-transition>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn @click="expand = !expand" color="primary">
                {{ !expand ? 'Подробнее' : 'Спрятать' }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: 'DealElement',

        props: {
            deal: []
        },

        data() {
            return {
                expand: false,
            }
        },

        computed: {
            profitClass() {
                const profit = this.getProfit();
                if(profit > 0) return 'text-green'
                if(profit < 0) return 'text-red'
                return 'text-gray-500'
            },
        },

        methods: {
            formattedDate() {
                const datetime = new Date(this.deal.createdAt);

                const day = datetime.getDate();
                const month = datetime.getMonth() + 1;
                const year = datetime.getFullYear();
                const hours = datetime.getHours();
                const minutes = datetime.getMinutes();

                const formattedDate = `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year}`;
                const formattedTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;

                return `${formattedDate} ${formattedTime}`;
            },
            getProfit() {
                let profit;
                if(!this.deal.status) {
                    profit = 0;
                }
                else if(this.deal.status === "LOSE") {
                    profit = -this.deal.money;
                } else {
                    profit = Math.floor(this.deal.coefficient * this.deal.money);
                }
                return profit > 0 ? `+${profit}` : profit;
            },

            isWin() {
                return (this.deal && this.deal.status === "WIN");
            },

            isLose() {
                return (this.deal && this.deal.status === "LOSE");
            },

            notStatus() {
                return (!this.deal.status);
            }
        }
    }
</script>

<style>
.mx-auto {
    margin-bottom: 20px;
}


</style>