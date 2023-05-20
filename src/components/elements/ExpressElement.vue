<template>
    <div class="list">
        <v-sheet elevation="12"
                 width="90%"
                 rounded="lg"
                 class="pa-4 text-center mx-auto"
                 color="rgba(248, 250, 252, 0.28)">
            <v-row align="center">
                <v-col v-if="event" cols="6">
                    <v-chip class="ma-2" color="#0027c4" text-color="white">
                        {{this.event.competitor1Name}} vs {{this.event.competitor2Name}}
                    </v-chip>
                </v-col>
            </v-row>
            <v-row align="center">
                <v-col v-if="outcome" cols="6">
                    <span class="label">
                        {{this.outcome.outcomeType}}
                        <v-chip class="ma-2" color="rgba(157, 1, 1, 0.97)">
                            {{this.outcome.coefficient}}
                        </v-chip>
                    </span>
                </v-col>
                <v-col cols="6" class="text-right">
                    <v-btn @click="handleDelete()" color="primary">Удалить</v-btn>
                </v-col>
            </v-row>
        </v-sheet>
    </div>
</template>

<script>

    import axios from "axios";

    export default {
        name: "ExpressElement",
        props: {
            outcomeId: null,
        },

        data() {
            return {
                outcome: null,
                event: null,
            }
        },

        created() {
            this.loadData();
        },

        methods: {
            async loadData() {
                await this.loadOutcome(this.outcomeId);
                await this.loadEventInfo(this.outcome.eventId);
            },

            handleDelete() {
                this.$store.dispatch('removeExpressOutcome', this.outcome);
                this.$emit('outcome-removed');
            },

            async loadOutcome(outcomeId) {
                try {
                    const outcomeResponse = await axios.get(`api/betting/manager/event-outcomes/${outcomeId}`, {
                        baseURL: "http://localhost:8081/",
                    })
                    this.outcome = outcomeResponse.data;
                } catch {
                    console.error("Ошибка получения исхода");
                }
            },

            async loadEventInfo(eventId) {
                try {
                    const eventResponse = await axios.get(`api/betting/manager/events/${eventId}`, {
                        baseURL: "http://localhost:8081/",
                    })
                    this.event = eventResponse.data;
                } catch {
                    console.error("Ошибка получения события");
                }
            }
        }
    }
</script>

<style scoped>
.list{
    margin-bottom: 12px;
    color: rgba(157, 1, 1, 0.97);
}
</style>