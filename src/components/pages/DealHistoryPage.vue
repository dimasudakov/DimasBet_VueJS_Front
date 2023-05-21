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
                <h3>История ставок</h3>
            </v-chip>
        </div>

        <div v-if="deals && deals.length > 0" class="deals">
            <deal-element v-for="deal in deals" :key="deal.id" :deal="deal"></deal-element>
        </div>

        <div v-else class="no-outcomes">
            История пуста
        </div>
    </v-sheet>
</template>

<script>
    import DealElement from "@/components/elements/DealElement.vue";
    import axios from "axios";

    export default {
        name: 'DealHistory',
        components: {DealElement},

        data() {
            return {
                deals: [],
            }
        },

        created() {
            this.getDeals();
        },

        methods: {
            async getDeals() {
                const url = "http://localhost:8081/api/betting/user/deals";

                try {
                    const DealsResponse = await axios.get(url);
                    this.deals = DealsResponse.data;
                    console.log(this.deals);
                } catch (error) {
                    console.log("error");
                }
            }
        }
    }
</script>

<style scoped>
.no-outcomes {
    margin-top: 50px;
    color: #910606;
}
.deals {
    margin-top: 60px;
}
</style>