import {sportEventAggregatorAxios} from "./axios";

const getContests = (filters) => {
    return sportEventAggregatorAxios
        .get(
            "football/fixtures?",
            {
                params: {
                    date: "2023-04-10",
                    status: filters.status
                }
            }
        )
}

export {
    getContests
};