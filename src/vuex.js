import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    state: {
        user: null,
        accessToken: null,
        refreshToken: null,
        expressOutcomes: [],
    },
    plugins: [createPersistedState()],

    getters: {
        user: (state) => {
            return state.user;
        },
        accessToken: (state) => {
            return state.accessToken;
        },
        refreshToken: (state) => {
            return state.refreshToken;
        },
        expressOutcomes: (state) => {
            return state.expressOutcomes;
        },
    },

    actions: {
        user(context, user) {
            context.commit('user', user);
        },
        setAccessToken(context, accessToken) {
            context.commit('setAccessToken', accessToken);
        },
        setRefreshToken(context, refreshToken) {
            context.commit('setRefreshToken', refreshToken);
        },
        logout(context) {
            context.commit('logout');
        },
        addExpressOutcome(context, outcome) {
            const existingOutcome = context.state.expressOutcomes.find(
                (item) => item.eventId === outcome.eventId
            );

            if (!existingOutcome) {
                context.commit('addExpressOutcome', outcome);
            } else {
                return Promise.reject(new Error('Нельзя так('));
            }
        },
        removeExpressOutcome(context, outcome) {
            context.commit('removeExpressOutcome', outcome);
        },
    },

    mutations: {
        user(state, user) {
            state.user = user;
            console.log(user);
        },
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
        },
        setRefreshToken(state, refreshToken) {
            state.refreshToken = refreshToken;
        },
        logout(state) {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.expressOutcomes = [];
        },
        addExpressOutcome(state, outcome) {
            state.expressOutcomes.push(outcome);
        },

        removeExpressOutcome(state, outcome) {
            const index = state.expressOutcomes.findIndex(eventOutcome => eventOutcome.id === outcome.id);
            if (index !== -1) {
                state.expressOutcomes.splice(index, 1);
            }
        },
    }
});


export default store