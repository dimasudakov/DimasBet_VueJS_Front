<template>
    <div class="text-center">
        <v-btn
                color="primary"
                @click="dialog = true"
        >
            Добавить исход
        </v-btn>

        <v-dialog
                v-model="dialog"
                width="40%"
                min-width="500px"
        >
            <v-card>
                <v-card-title class="text-center">
                    <h3 class="mt-2">Добавить новый исход</h3>
                </v-card-title>

                <v-chip v-if="message" class="ma-3" color="blue" text-color="white">
                    {{message}}
                </v-chip>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="betType" label="Тип ставки" :rules="[required]"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="coefficient" label="Коэффициент" type="number" step="0.01" :rules="[required]"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="addOutcome">Добавить</v-btn>
                    <v-btn color="red" @click="closeDialog" >Отмена</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'AddOutcomeDialog',
        props: {
            eventId: null
        },

        data () {
            return {
                dialog: false,
                message: null,
                betType: null,
                coefficient: null
            }
        },

        methods: {
            async addOutcome() {
                if(!this.betType || !this.coefficient) {
                    this.message = "Введите данные"
                    return;
                }
                if(this.coefficient <= 1.01 || this.coefficient > 40.0) {
                    this.message = "Некорректный коэффициент"
                    return;
                }

                const url = 'http://localhost:8081/api/betting/manager/event-outcomes';
                const requestBody = {
                    eventId: this.eventId,
                    outcomeName: this.betType,
                    coefficient: this.coefficient,
                };

                try {
                    await axios.post(url, requestBody);
                    this.message = "Исход добавлен"
                    this.$emit('updated');
                } catch (error) {
                    this.message = "Не получилось добавить ставку"
                }
            },

            closeDialog() {
                this.dialog = false;
            }
        }
    }
</script>

<style scoped>

</style>