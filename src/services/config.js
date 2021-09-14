import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/";

const API = axios.create({
    baseURL: BASE_URL,
    responseType: 'json',
    timeout: 10000
});


API.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // return Promise.reject(error);
    return { error };
});

const STORE_END_POINT = {
    LOGIN: 'auth/login',
    REGISTER: 'auth',
    GET_USER: 'auth',
    STORE_COLLECTIONS: 'store/collections',
};

export { API, STORE_END_POINT };
