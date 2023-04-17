import axios from 'axios';

export const SPORT_EVENT_AGGREGATOR_URL = "http://127.0.0.1:8000/"
export const USER_ACCOUNT_URL = "http://127.0.0.1:8080/api/v1/"

export const sportEventAggregatorAxios = axios.create({
    baseURL: SPORT_EVENT_AGGREGATOR_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const userAccountAxios = axios.create({
    baseURL: USER_ACCOUNT_URL
});

export const userAccountAxiosPrivate = axios.create({
    baseURL: USER_ACCOUNT_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

userAccountAxiosPrivate.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

userAccountAxiosPrivate.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (!originalConfig.url.includes("auth/") && err.response) {
            if (err.response.status === 403 && !originalConfig._retry) {
                originalConfig._retry = true;

                const token = JSON.parse(localStorage.getItem("refreshToken"))
                const config = {headers:{}}
                config.headers.Authorization = 'Bearer ' + token;

                console.log(config)

                try {
                    const rs = await userAccountAxios.post("auth/refresh-token", null, config);
                    console.log(rs)
                    const { accessToken } = rs.data;
                    localStorage.setItem("accessToken", JSON.stringify(accessToken));
                    originalConfig.headers['Authorization'] = 'Bearer ' + accessToken;

                    return userAccountAxiosPrivate(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);