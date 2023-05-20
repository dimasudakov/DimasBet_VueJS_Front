<template>
    <div class="text-center">
        <v-btn
                color="primary"
                @click="dialog = true"
        >
            Изменить
        </v-btn>

        <v-dialog
                v-model="dialog"
                width="40%"
                min-width="500px"
        >
            <v-card>
                <v-card-title class="text-center">
                    <h3>Изменить исход</h3>
                </v-card-title>

                <v-chip v-if="message" class="ma-3" color="blue" text-color="white">
                    {{message}}
                </v-chip>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="coefficient" label="Коэффициент" type="number" step="0.01"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="updateOutcome">Изменить</v-btn>
                    <v-btn class="exit-button" @click="exit" >{{ this.exitButtonName }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'UpdateOutcomeDialog',

        props: {
            eventId: null,
            outcome: null
        },

        data () {
            return {
                dialog: false,
                message: null,
                betType: null,
                coefficient: null,
                exitButtonName: 'Отмена'
            }
        },

        methods: {
            exit() {
                this.$emit('update');
                this.exitButtonName = 'Отмена'
                this.dialog = false;
            },

            async updateOutcome() {
                if(!this.coefficient) {
                    this.message = "Введите данные"
                    return;
                }
                if(this.coefficient <= 1.01 || this.coefficient > 40.0) {
                    this.message = "Некорректный коэффициент"
                    return;
                }

                const url = `http://localhost:8081/api/betting/manager/event-outcomes/${this.outcome.id}`;
                const requestBody = {
                    eventId: this.eventId,
                    outcomeName: this.outcome.outcomeType,
                    coefficient: this.coefficient,
                };

                try {
                    await axios.put(url, requestBody);
                    this.message = "Исход изменен"
                    this.exitButtonName = "Ок"
                    document.querySelector('.exit-button').style.color = 'green';
                } catch (error) {
                    this.message = "Не получилось изменить"
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