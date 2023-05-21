import axios from "axios";
import store from "@/vuex";


axios.interceptors.request.use(
    (config) => {
        const accessToken = store.getters.accessToken;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    function(response) {
        return response;
    },
    async function(error) {
        const originalRequest = error.config;
        if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = store.getters.refreshToken;
                const response = await axios.post('http://localhost:8080/api/auth/token', {
                    refreshToken: refreshToken,
                });

                const newAccessToken = response.data.accessToken;
                store.commit('setAccessToken', newAccessToken);

                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (error) {
                // await store.dispatch('logout');
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

