import axios from "axios";

// Instance Axios utilisée pour toutes les requêtes API
const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Ajoute automatiquement le token JWT dans les requêtes protégées
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;