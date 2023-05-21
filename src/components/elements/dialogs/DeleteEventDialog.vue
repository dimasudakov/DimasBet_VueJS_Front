<template>
    <div>
        <v-btn @click="dialog = true" color="primary">Удалить</v-btn>

        <v-dialog
                v-model="dialog"
                width="300px"
        >
            <v-card>
                <v-card-title class="text-center">
                    <h2 class="mt-2">Вы уверены?</h2>
                </v-card-title>

                <v-chip v-if="message" class="ma-3" color="blue" text-color="white">
                    {{message}}
                </v-chip>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="deleteEvent">Удалить</v-btn>
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
        name: 'DeleteEventDialog',

        props: {
            event_id: null
        },

        data() {
            return {
                dialog: false,
                message: false,
            }
        },

        methods: {
            async deleteEvent() {
                const url = `http://localhost:8081/api/betting/manager/events/${this.event_id}`;

                try {
                    await axios.delete(url);
                    this.$emit('update');
                    this.dialog = false;
                } catch (error) {
                    this.message = "Нельзя удалить";
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