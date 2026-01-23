import axios from "axios";

const api = axios.create({
    baseURL : "our url"
})

api.interceptors.request.use(config => {
    const auth = localStorage.getItem("auth");
    if (auth) {
        const { token } = JSON.parse(auth);
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default api