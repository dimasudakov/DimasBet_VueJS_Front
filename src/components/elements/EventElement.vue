<template>
    <div class="eventDisplay">
        <v-card class="mx-auto" color="rgba(98, 0, 236, 0.41)">
            <v-card-text>
                <v-chip class="ma-2" color="#0027c4" text-color="white">
                    {{ this.disciplineName }}
                </v-chip>
                <p class="text-h4 text--primary">
                    {{ this.event.competitor1Name }} vs {{this.event.competitor2Name}}
                </p>
                <p>{{this.event.country}}, {{this.event.city}}</p>
                <div class="competition-name">
                    {{this.event.competitionName}}
                </div>
                <div>
                    Начало {{this.formatDate(this.event.startDate)}}
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn variant="text" color="#2e0081" @click="redirectToEventPage(this.disciplineName, this.event.id)">
                    Подробнее
                </v-btn>
                <v-spacer></v-spacer>
                <delete-event-dialog v-if="isBettingManager"
                    :event_id="this.event.id"
                    @update="update"
                />
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>

import DeleteEventDialog from "@/components/elements/dialogs/DeleteEventDialog.vue";

export default {
    name: 'EventElement',
    components: {DeleteEventDialog},
    props: {
        event: {
            type: Object,
            required: true,
        },
        disciplineName: require
    },

    computed: {
        isBettingManager() {
            if(this.$store.getters.user === null || this.$store.getters.user === undefined) {
                return false;
            }
            const userRoles = this.$store.getters.user.roles;
            return userRoles.includes("ROLE_BETTING_MANAGER");
        }
    },

    methods: {
        formatDate(dateTime) {
            const date = new Date(dateTime);

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = String(date.getFullYear());

            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${day}.${month}.${year}, ${hours}:${minutes}`;
        },

        update() {
            this.$emit('update');
        },

        redirectToEventPage(discipline_name, event_id) {
            this.$router.push({ name: 'Event', params: { discipline_name, event_id } });
        }
    }
};
</script>

<style>
.eventDisplay {
    margin-bottom: 10px;
}
.mx-auto {
    width: 50%;
}
.competition-name {
    margin-bottom: 10px;
}
</style>

