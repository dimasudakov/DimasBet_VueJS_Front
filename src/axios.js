import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080/';

const accessToken = localStorage.getItem('accessToken')

if (accessToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
}