<template>
  <div class="list">
      <v-sheet elevation="12"
               width="90%"
               rounded="lg"
               class="pa-4 text-center mx-auto"
               color="rgba(248, 250, 252, 0.28)">
          <v-row align="center">
              <v-col cols="3">
                  <span class="label">{{this.outcome.outcomeType}}</span>
              </v-col>
              <v-spacer></v-spacer>
              <v-col class="text-right">
                  <dialog-element
                      :event-outcome="this.outcome"
                      :coefficient="this.outcome.coefficient">
                  </dialog-element>
              </v-col>
              <v-col v-if="isBettingManager">
                  <update-outcome-dialog
                      @update="updateOutcome"
                      class="add-outcome-btn"
                      :event-id="this.eventId"
                      :outcome="this.outcome"
                  >
                  </update-outcome-dialog>
              </v-col>
              <v-col v-if="isBettingManager">
                  <complete-outcome-dialog
                        :outcome_id="this.outcome.id"
                  ></complete-outcome-dialog>
              </v-col>
          </v-row>
      </v-sheet>
  </div>
</template>

<script>

  import DialogElement from "@/components/elements/dialogs/DialogElement.vue";
  import UpdateOutcomeDialog from "@/components/elements/dialogs/UpdateOutcomeDialog.vue";
  import CompleteOutcomeDialog from "@/components/elements/dialogs/CompleteOutcomeDialog.vue";

  export default {
      name: 'OutcomeElement',
      components: {CompleteOutcomeDialog, UpdateOutcomeDialog, DialogElement},
      props: {
          outcome: {
              type: Object,
              required: true
          },
          eventId: null
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
          updateOutcome() {
              this.$emit('update');
          }
      }
  }
</script>

<style scoped>
.list{
    margin-bottom: 12px;
}
</style>