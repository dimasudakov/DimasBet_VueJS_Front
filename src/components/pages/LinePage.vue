<template>

    <div class="flex-container">
        <v-btn class="custom-button" color="primary">
            Дисциплина
            <v-menu activator="parent">
                <v-list>
                    <v-list-item :key="0" value="0">
                        <v-list-item-title @click="selectAllEvents">Все</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                        v-for="(discipline, index) in disciplines"
                        :key="index"
                        :value="index"
                    >
                        <v-list-item-title @click="() => handleDisciplineClick(discipline)">{{ discipline.name }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-btn>
        <v-btn class="custom-button" color="primary">
            Дата
            <v-menu activator="parent">
                <v-list>
                    <v-list-item
                        v-for="(date, index) in dates"
                        :key="index"
                        :value="index"
                    >
                        <v-list-item-title>{{ date.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-btn>
    </div>

    <div>
        <v-card v-for="event in events" :key="event.id">
            <event-element :event="event"
                           :discipline-name="getDisciplineName(event.disciplineId)"
                           @update="update"
            />
        </v-card>
    </div>

    <pagination-element
        :length="this.length"
        :page="this.page"
        @data-updated="paginationDataUpdated"
    ></pagination-element>

</template>

<style>
    .custom-button {
        width: 30%;
        font-size: 14px;
    }
    .flex-container {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 5%;
    }
</style>


<script>
import axios from "axios";
import EventElement from "@/components/elements/EventElement.vue";
import PaginationElement from "@/components/elements/PaginationElement.vue";

export default {
        name: 'LinePage',
        components: {
            PaginationElement,
            EventElement,

        },
        data: () => ({
            disciplines: [],
            dates: [
                {title: 'Сегодня'},
                {title: 'На этой неделе'},
                {title: 'В этом месяце'},
                {title: 'Все'},
            ],
            events: [],
            selectedDiscipline: "",
            selectedDisciplineId: "",

            eventsPerPage: 1,
            length: null,
            page: 1
        }),

        created() {
            this.getDisciplines();
            this.getEventsByPage();
        },
        methods: {
            async getDisciplines() {
                try {
                    const response = await axios.get('/api/betting/manager/disciplines', {
                        baseURL: 'http://localhost:8081/'
                    });
                    this.disciplines = response.data;
                } catch (error) {
                    console.error('Ошибка при получении данных с сервера:', error);
                }
            },

            async getEventsByPage() {
                try {
                    const response = await axios.get('/api/betting/manager/events', {
                        baseURL: 'http://localhost:8081/',
                        params: {
                            page: this.page,
                            eventsPerPage: this.eventsPerPage
                        }
                    });
                    this.events = response.data;
                    this.length = response.headers['x-total-pages'];
                }  catch (error) {
                    console.error("Ошибка при получении событий");
                }
            },

            async getEventsByDiscipline(discipline) {
                try {
                    const response = await axios.get('/api/betting/manager/events/by-discipline', {
                        params: {
                            disciplineId: discipline.id,
                            page: this.page,
                            eventsPerPage: this.eventsPerPage
                        },
                        baseURL: 'http://localhost:8081/',
                    });
                    this.events = response.data;
                    this.length = response.headers['x-total-pages'];

                } catch (error) {
                    console.error('Ошибка при получении ставок:', error);
                }
            },

            async handleDisciplineClick(discipline) {
                this.selectedDisciplineId = discipline.id;
                this.selectedDiscipline = discipline;
                this.page = 1;
                await this.getEventsByDiscipline(discipline);
            },

            getDisciplineName(disciplineId) {
                const discipline = this.disciplines.find((d) => d.id === disciplineId);
                return discipline ? discipline.name : '';
            },

            async paginationDataUpdated(newPage) {
                this.page = newPage;
                if(!this.selectedDiscipline) {
                    await this.getEventsByPage();
                } else {
                    await this.getEventsByDiscipline(this.selectedDiscipline);
                }
            },

            update() {
                this.page = 1;
                this.getEventsByPage();
            },

            async selectAllEvents() {
                this.page = 1;
                this.selectedDiscipline = null;
                this.selectedDisciplineId = null;
                await this.getEventsByPage();
            },
        },
    }

</script>

