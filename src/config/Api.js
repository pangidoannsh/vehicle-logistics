import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: { Authorization: `Bearer ${localStorage.getItem('access-token')}` }
})

