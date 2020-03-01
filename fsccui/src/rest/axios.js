import axios from 'axios';

const instance = axios.create({
    baseURL: window.location.href.indexOf('localhost') >= 0 ? 'http://localhost:23456' : '',
    headers: {
        "Content-Type": "application/json",
    },
})

export default instance;