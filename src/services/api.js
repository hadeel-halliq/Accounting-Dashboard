import axios from "axios";

const api = axios.create({
    baseURL : "https://mini-erp-system-eight.vercel.app/api/v1",
    withCredentials: true
})

export default api





