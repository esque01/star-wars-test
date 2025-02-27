import axios from "axios";

const API_BASE_URL = "http://localhost:5283/api"    ;

const APIClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default APIClient;