<template>
    <div>
        <v-btn @click="dialog = true" color="primary">Рассчитать</v-btn>

        <v-dialog
                v-model="dialog"
                width="400px"
        >
            <v-card>
                <v-card-title class="text-center">
                    <h3 class="mt-2">Выберите результат</h3>
                </v-card-title>

                <v-chip v-if="message" class="ma-3" color="blue" text-color="white">
                    {{message}}
                </v-chip>

                <v-select v-model="selectedResult" :items="resultOptions" label="Результат"></v-select>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="completeOutcome">Готово</v-btn>
                    <v-btn class="exit-button" @click="dialog = false" >Отмена</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>

            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import axios from "axios";

export default {
    name: 'CompleteOutcomeDialog',

    props: {
        outcome_id: null
    },

    data() {
        return {
            dialog: false,
            message: false,
            selectedResult: null,
            resultOptions: [
                'Win',
                'Lose',
                'Return'
            ]
        }
    },

    methods: {
        completeOutcome: async function () {
            if(this.selectedResult == null) return;
            const url = `http://localhost:8081/api/betting/manager/event-outcomes/complete/${this.outcome_id}`;
            const requestBody = {
                result: this.selectedResult.toUpperCase()
            };

            try {
                await axios.put(url, requestBody);
            } catch (error) {
                this.message = "Не получилось рассчитать";
            }
        }
    }
}
</script>

<style scoped>
.exit-button{
    color: red;
}
</style>