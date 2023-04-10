import axios from 'axios';

export const SPORT_EVENT_AGGREGATOR_URL = "http://127.0.0.1:8000/"
export const URL = "http://127.0.0.1:8000/"


export default axios.create({
    baseURL: URL
});

export const sportEventAggregatorAxios = axios.create({
    baseURL: SPORT_EVENT_AGGREGATOR_URL
});

export const axiosPrivate = axios.create({
    baseURL: URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

