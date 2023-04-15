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

