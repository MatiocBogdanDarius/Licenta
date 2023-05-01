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

const getCountryInfo = (country) => {
    return sportEventAggregatorAxios.get(
        "football/country/",
        {
            params: {
                country: country
            }
        })
}

const getContestsMatchesGroupByStatusAndRound = (filters) => {
    return sportEventAggregatorAxios.get(
        "football/contest_fixtures/",
        {
            params: {
                ...filters
            }
        })
}

const getTeamMatchesGroupByStatusAndRound = (filters) => {
    return sportEventAggregatorAxios.get(
        "football/team_fixtures/",
        {
            params: {
                ...filters
            }
        })
}

const getStandings = (league, season) => {
    return sportEventAggregatorAxios.get(
        "football/standings/",
        {
            params: {
                league: league,
                season: season,
            }
        })
}

const getTransfers = (team) => {
    return sportEventAggregatorAxios.get(
        "football/transfers/",
        {params: {team: team}}
    )
}

const getSquad = (league, season, team) => {
    return sportEventAggregatorAxios.get(
        "football/squad/",
        {
            params: {
                // league: league,
                season: season,
                team: team
            }
        }
    )
}

const getGame = (id) => {
    return sportEventAggregatorAxios.get(
        "football/game/",
        {params: {id: id}}
    )
}

export {
    getContestsMatches,
    getCurrentContestsOptions,
    getContestInfo,
    getContestsMatchesGroupByStatusAndRound,
    getTeamMatchesGroupByStatusAndRound,
    getCountryInfo,
    getStandings,
    getTransfers,
    getSquad,
    getGame
};