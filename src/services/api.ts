import axios from "axios";

export const api = axios.create({
    baseURL: 'http://111.111.1.111:3333', // API COM NODE.JS
    timeout: 900,
})