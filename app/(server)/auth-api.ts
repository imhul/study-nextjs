import axios from "axios"
import Cookies from "js-cookie"

const AUTH_BASE_URL = "http://192.168.1.51:5000"

const api = axios.create({
    baseURL: AUTH_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    method: "POST",
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = Cookies.get("token")
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export default api
