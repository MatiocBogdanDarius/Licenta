import {sportEventAggregatorAxios} from "./axios";

const getContestsMatches = (filters) => {
    return sportEventAggregatorAxios
        .get(
            "football/fixtures?",
            {
                params: {
                  ...filters
                }
            }
        )
}

const getCurrentContestsOptions = () => {
    return sportEventAggregatorAxios.get(
        "football/contests/",
        {
            params: {
                current: true
            }
        })
}


export {
    getContestsMatches,
    getCurrentContestsOptions
};