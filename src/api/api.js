import axios from "axios";

const instance = axios.create(
    {
        baseURL: import.meta.env.VITE_APP_MAIN_URL
    }
)

export default instance;