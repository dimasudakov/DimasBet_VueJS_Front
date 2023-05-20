<template>
    <v-sheet
            elevation="12"
            max-width="50%"
            min-width="500px"
            rounded="lg"
            class="pa-4 text-center mx-auto"
            color="#d9e2ff"
        >
        <v-chip class="ma-2" color="#0027c4" text-color="white">
            {{ discipline_name }}
        </v-chip>
        <h1 v-if="this.event">{{ this.event.competitor1Name }} vs {{ this.event.competitor2Name }}</h1>

        <p v-if="this.event">
            {{this.event.country}}, {{this.event.city}}
        </p>

        <div v-if="this.event" class="competition-name">
            {{this.event.competitionName}}
        </div>

        <div v-if="this.event">
            Начало {{this.formatDate(this.event.startDate)}}
        </div>

        <div v-if="outcomes && this.outcomes.length > 0" class="outcomes">
            <outcome-element
                v-for="outcome in outcomes"
                @update="update"
                :key="outcome.id"
                :outcome="outcome"
                :eventId="this.event_id"
            />
        </div>

        <div v-else class="no-outcomes">
            {{this.exception}}
        </div>

        <v-row class="bottom-buttons" justify="center" align="center" gutter>
            <v-btn class="mr-4" @click="back" color="primary">
                Назад
            </v-btn>
            <add-outcome-dialog
                v-if="isBettingManager"
                :event-id="event_id"
            ></add-outcome-dialog>
        </v-row>
    </v-sheet>
</template>

<script>
  import axios from "axios";
  import OutcomeElement from "@/components/elements/OutcomeElement.vue";
  import AddOutcomeDialog from "@/components/elements/dialogs/CreateOutcomeDialog.vue";

  export default {
      name: 'EventPage',
      components: {AddOutcomeDialog, OutcomeElement},
      props: {
          event_id: null,
          discipline_name: null
      },
      data() {
          return {
              event: null,
              competitor1: null,
              competitor2: null,
              outcomes: [],
              exception: "",
          }
      },
      created() {
            this.loadData();
      },
      methods: {
          back() {
              this.$router.go(-1);
          },
          update() {
              this.loadOutcomes();
          },
          async loadData() {
              await this.loadEvent();
              await this.loadOutcomes();
          },
          async loadEvent() {
              try {
                  const EventResponse = await axios.get(`/api/betting/manager/events/${this.event_id}`, {
                      baseURL: 'http://localhost:8081/'
                  });

                  this.event = EventResponse.data;
                  console.log(this.event);
              } catch (error) {
                  console.error("Ошибка");
              }
          },

          async loadOutcomes() {
              try {
                  const outcomesResponse = await axios.get(`api/betting/manager/event/event-outcomes/${this.event.id}`, {
                      baseURL: "http://localhost:8081/",
                  });
                  this.outcomes = outcomesResponse.data;
              } catch (error) {
                  if(error.response.data.exceptionName) {
                      const name = error.response.data.exceptionName;
                      if(name === 'NotFoundException') {
                          this.exception = "Исходов пока нет";
                      }
                      if(name === 'EventBlockedException') {
                          this.exception = "Ставки на это событие недоступны";
                      }
                  } else {
                      this.exception = "Непредвиденная ошибка, попробуйте позже"
                  }
              }
              if(this.outcomes.length === 0) {
                  this.exception = "Исходов пока нет";
              }
          },

          formatDate(dateTime) {
              const date = new Date(dateTime);

              const day = String(date.getDate()).padStart(2, '0');
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const year = String(date.getFullYear());

              const hours = String(date.getHours()).padStart(2, '0');
              const minutes = String(date.getMinutes()).padStart(2, '0');

              return `${day}.${month}.${year}, ${hours}:${minutes}`;
          },
      },

      computed: {
          isBettingManager() {
              if(this.$store.getters.user === null || this.$store.getters.user === undefined) {
                  return false;
              }
              const userRoles = this.$store.getters.user.roles;
              return userRoles.includes("ROLE_BETTING_MANAGER");
          }
      }
  }
</script>


<style scoped>
.outcomes {
    margin-top: 60px;
}
.no-outcomes {
    margin-top: 50px;
    color: #910606;
}
.bottom-buttons{
    margin-top: 24px;
    margin-bottom: 6px;
}
</style>