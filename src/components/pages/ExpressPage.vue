<template>
    <v-sheet
            elevation="12"
            max-width="50%"
            min-width="500px"
            rounded="lg"
            class="pa-4 text-center mx-auto"
            color="#d9e2ff"
    >
        <div class="current-express">
            <v-chip class="ma-2" color="#0027c4" text-color="white">
                Текущий экспресс
            </v-chip>
        </div>

        <div v-if="expressOutcomes && expressOutcomes.length > 0" class="outcomes">
            <express-element v-for="outcome in expressOutcomes" :key="outcome.id" :outcomeId="outcome.id"
                             @outcome-removed="calculateCoefficient"
            />

            <v-sheet elevation="12"
                    max-width="60%"
                    min-width="90%"
                    rounded="lg"
                    class="pa-4 text-left mx-auto"
                    color="rgba(170, 0, 255, 0.27)"
            >
                <v-row align="center">
                    <v-col cols="6">
                            Итоговый коэффициент:
                            <v-chip class="ma-2" color="rgba(157, 1, 1, 0.97)">
                                {{this.coefficient}}
                            </v-chip>
                    </v-col>
                    <v-col v-if="isUser" cols="6" class="text-right">
                        <deal-dialog-element v-if="isUser" :coefficient="this.coefficient"></deal-dialog-element>
                    </v-col>
                    <h5 v-if="!isUser">Вы не можете сделать ставку</h5>
                </v-row>
            </v-sheet>
        </div>

        <div v-else class="no-outcomes">
            {{this.exception}}
        </div>
    </v-sheet>
</template>

<script>
    import ExpressElement from "@/components/elements/ExpressElement.vue";
    import DealDialogElement from "@/components/elements/dialogs/DealDialogElement.vue";
    import {mapGetters} from "vuex";

    export default {
        name: 'ExpressPage',
        components: {DealDialogElement, ExpressElement},

        data() {
            return {
                exception: "Нет ставок",
                expressOutcomes: null,
                coefficient: null,
            }
        },

        created() {
            this.expressOutcomes = this.$store.getters.expressOutcomes;
            this.calculateCoefficient();
        },

        methods: {
            calculateCoefficient() {
                if (this.expressOutcomes && this.expressOutcomes.length > 0) {
                    const totalCoefficient = this.expressOutcomes.reduce((accumulator, outcome) => {
                        return accumulator * outcome.coefficient;
                    }, 1);
                    this.coefficient = totalCoefficient.toFixed(2);
                } else {
                    this.coefficient = null;
                }
            },
        },

        computed: {
            ...mapGetters['user'],

            isUser() {
                if(this.$store.getters.user === null || this.$store.getters.user === undefined) {
                    return false;
                }
                const userRoles = this.$store.getters.user.roles;
                return userRoles.includes("ROLE_USER");
            }
        }
    }

</script>


<style scoped>

.no-outcomes {
    margin-top: 50px;
    color: #910606;
}
.current-express {
    margin-bottom: 50px;
}

</style>