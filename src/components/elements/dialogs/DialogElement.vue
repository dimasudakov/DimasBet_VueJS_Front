<template>
    <v-row justify="center">
        <v-dialog
                v-model="dialog"
                persistent
                width="40%"
                min-width="600px"
        >
            <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props">
                    {{ this.coefficient }}
                </v-btn>
            </template>
            <v-card v-if="user">
                <v-card-title class="text-h5">
                    Выберите вариант
                </v-card-title>
                <v-chip v-if="message" class="ma-2" color="#0027c4" text-color="white">
                    {{message}}
                </v-chip>
                <v-card-text>Коэффициент: {{this.coefficient}}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" variant="text" @click="addToExpress">
                        Добавить в экспресс
                    </v-btn>
                    <v-btn color="green darken-1" variant="text" @click="makeBet">
                        Сделать ставку
                    </v-btn>
                    <v-btn color="red darken-1" variant="text" @click="closeCard">
                        Закрыть
                    </v-btn>
                </v-card-actions>
            </v-card>
            <v-card v-else>
                <v-card-title class="text-h5">
                    Войдите в аккаунт
                    <v-btn color="green darken-1" variant="text" @click="closeCard">
                        Хорошо
                    </v-btn>
                </v-card-title>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
      name: 'DialogElement',
      props: {
          eventOutcome: null,
          coefficient: null,
      },

      data () {
          return {
              dialog: false,
              message: null,
          }
      },

      methods: {
          addToExpress() {
              this.$store.dispatch('addExpressOutcome', this.eventOutcome)
                  .then(() => {
                      this.message = 'Ставка добавлена в экспресс!';
                  })
                  .catch(() => {
                      this.message = 'Нельзя добавлять в экспресс ставки из одного и того же события';
                  });
          },

          makeBet() {},

          closeCard() {
              this.dialog = false;
          }
      },

      computed: {
          ...mapGetters(['user']),
          ...mapGetters(['expressOutcomes']),
      }
  }
</script>

<style scoped>

</style>