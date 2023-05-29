import {sportEventAggregatorAxios} from "./axios";

const getContestsMatches = (sport, filters) => {
    return sportEventAggregatorAxios
        .get(
            `${sport.toLowerCase()}/fixtures?`,
            {
                params: {
                  ...filters
                }
            }
        )
}

const getCurrentContestsOptions = (sport) => {
    return sportEventAggregatorAxios.get(
        `${sport.toLowerCase()}/contests/`,
        {
            params: {
                current: true
            }
        })
}

const getContestInfo = (sport, contestId, country) => {
    return sportEventAggregatorAxios.get(
        `${sport.toLowerCase()}/contest/`,
        {
            params: {
                country: country,
                id: contestId
            }
        })
}

const getCountryInfo = (sport, country) => {
    return sportEventAggregatorAxios.get(
        `${sport.toLowerCase()}/country/`,
        {
            params: {
                country: country
            }
        })
}

const getContestsMatchesGroupByStatusAndRound = (sport, filters) => {
    return sportEventAggregatorAxios.get(
        `${sport.toLowerCase()}/contest_fixtures/`,
        {
            params: {
                ...filters
            }
        })
}

const getTeamMatchesGroupByStatusAndRound = (sport, filters) => {
    return sportEventAggregatorAxios.get(
        `${sport.toLowerCase()}/team_fixtures/`,
        {
            params: {
                ...filters
            }
        })
}

const getStandings = (sport, league, season) => {
    return sportEventAggregatorAxios.get(
        `${sport.toLowerCase()}/standings/`,
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

const getGame = (sport,id) => {
    return sportEventAggregatorAxios.get(
        `${sport.toLowerCase()}/game/`,
        {params: {id: 868259}}
    )
}

const getGamesByItem = (sport, itemType, itemId, season) => {
    return sportEventAggregatorAxios.get(
        `${sport.toLowerCase()}/games_by_item/`,
        {
            params: {
                itemType: itemType,
                itemId: itemId,
                season: season
            }
        })
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
    getGame,
    getGamesByItem
};