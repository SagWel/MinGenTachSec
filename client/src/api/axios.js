import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true, //envoie automatiquement les cookies d'auth au serveur
  withCredentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
