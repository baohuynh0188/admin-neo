import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    if (localStorage.getItem("token") !== null) {
        config.headers.authorization = "Bearer " + localStorage.getItem("token");
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response;
        }
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.clear();
        } else {
            throw error;
        }
    }
);

export default axiosClient;
