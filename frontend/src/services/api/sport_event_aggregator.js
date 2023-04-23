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

const getContestInfo = (contestId, country) => {
    return sportEventAggregatorAxios.get(
        "football/contest/",
        {
            params: {
                country: country,
                id: contestId
            }
        })
}


export {
    getContestsMatches,
    getCurrentContestsOptions,
    getContestInfo
};