<template>
    <div>
    <v-list-item-title @click.stop="eventDialog = true">Добавить событие</v-list-item-title>

    <v-dialog
            v-model="eventDialog"
            width="50%"
            min-width="500px"
    >
        <v-card>
            <v-card-title class="text-center">
                <h3 class="mt-2">Добавить новое событие</h3>
            </v-card-title>

            <v-chip v-if="message" class="message" color="blue" text-color="white">
                {{message}}
            </v-chip>

            <v-card-text>
                <v-text-field v-model="discipline" label="Дисциплина"></v-text-field>
                <v-text-field v-model="country" label="Страна"></v-text-field>
                <v-text-field v-model="city" label="Город"></v-text-field>
                <v-text-field v-model="competitionName" label="Название соревнования"></v-text-field>
                <v-text-field v-model="startDate" label="Дата начала" type="datetime-local"></v-text-field>
                <v-text-field v-model="competitor1" label="Участник 1"></v-text-field>
                <v-text-field v-model="competitor2" label="Участник 2"></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="createEvent">Добавить</v-btn>
                <v-btn class="exit-button" @click="exit" >{{ this.exitButtonName }}</v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'AddEventDialog',

        props: {
            x: null,
        },

        data() {
            return {
                eventDialog: false,
                message: null,
                exitButtonName: 'Отмена',

                discipline: null,
                country: null,
                city: null,
                competitionName: null,
                startDate: null,
                competitor1: null,
                competitor2: null
            }
        },

        methods: {
            exit() {
                this.eventDialog = false;
            },

            async createEvent() {

                const url = 'http://localhost:8081/api/betting/manager/events';
                const requestBody = {
                    disciplineName: this.discipline,
                    country: this.country,
                    city: this.city,
                    competitionName: this.competitionName,
                    startDate: this.startDate,
                    competitor1Name: this.competitor1,
                    competitor2Name: this.competitor2
                };

                try {
                    await axios.post(url, requestBody);
                    this.message = "Исход добавлен";
                    this.exitButtonName = "Ок"
                    document.querySelector('.exit-button').style.color = 'green';
                } catch (error) {
                    this.message = "Не получилось добавить событие"
                }
            }
        }
    }
</script>

<style scoped>
.exit-button{
    color: red;
}
.message{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-left: 20%;
    width: 60%;
}

</style>