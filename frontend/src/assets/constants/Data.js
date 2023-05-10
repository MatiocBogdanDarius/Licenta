import {
    faBaseballBall,
    faBasketballBall,
    faSoccerBall
} from "@fortawesome/free-solid-svg-icons";
import handballIcon from 'assets/images/handball.svg';

export const GAME_STATUS_FILTERS_VALUES = {
    ALL: {
        name: 'ALL',
        value: undefined
    },
    LIVE: {
        name: 'LIVE',
        value: "1H-HT-2H-ET-BT-P-SUSP-INT-LIVE"
    },
    FINISHED: {
        name: 'FINISHED',
        value: "FT-AET-PEN-PST-CANC-ABD-AWD-WO"
    },
    SCHEDULED: {
        name: 'SCHEDULED',
        value: "TBD-NS"
    },
}

export const SPORTS = {
    FOOTBALL: {id: 1, name: "FOOTBALL", icon: faSoccerBall},
    HANDBALL: {id: 2, name: "HANDBALL", icon: handballIcon},
    BASKETBALL: {id: 3, name: "BASKETBALL", icon: faBasketballBall},
    BASEBALL: {id: 4, name: "BASEBALL", icon: faBaseballBall}
}

export const WISHLIST_ITEM_TYPE = {
    CONTEST: "CONTEST",
    GAME: "EVENT",
    TEAM: "TEAM",
    PLAYER: "PLAYER"
}

const EMPTY_WISHLIST_FOR_SOURCE = {
    CONTEST: [],
    EVENT: [],
    TEAM: [],
    PLAYER: [],
}

export const  EMPTY_WISHLIST = {
    1: {...EMPTY_WISHLIST_FOR_SOURCE},
    2: {...EMPTY_WISHLIST_FOR_SOURCE},
    3: {...EMPTY_WISHLIST_FOR_SOURCE},
    4: {...EMPTY_WISHLIST_FOR_SOURCE}
}

export const GAME_STATUS = {
    ALL: 'ALL',
    LIVE: 'LIVE',
    FINISHED: 'FINISHED',
    SCHEDULED: 'SCHEDULED',
}

export const CONTEST_MENU = {
    SUMMARY: 'SUMMARY',
    RESULTS: 'RESULTS',
    FIXTURES: 'FIXTURES',
    STANDINGS: 'STANDINGS',
}

export const TEAM_MENU = {
    'FOOTBALL' : {
        SUMMARY: 'SUMMARY',
        RESULTS: 'RESULTS',
        FIXTURES: 'FIXTURES',
        STANDINGS: 'STANDINGS',
        TRANSFERS: 'TRANSFERS',
        SQUAD: 'SQUAD',
    },
    'HANDBALL': {
        SUMMARY: 'SUMMARY',
        RESULTS: 'RESULTS',
        FIXTURES: 'FIXTURES',
        STANDINGS: 'STANDINGS',
    },
    'BASKETBALL': {
        SUMMARY: 'SUMMARY',
        RESULTS: 'RESULTS',
        FIXTURES: 'FIXTURES',
        STANDINGS: 'STANDINGS',
    },
    'BASEBALL': {
        SUMMARY: 'SUMMARY',
        RESULTS: 'RESULTS',
        FIXTURES: 'FIXTURES',
        STANDINGS: 'STANDINGS',
    },
}

export const GAME_MENU = {
    EVENTS: 'EVENTS',
    STATISTICS: 'STATISTICS',
    LINEUPS: 'LINEUPS',
    PLAYERS: 'PLAYERS',
}

export const NO_IMAGE = 'https://media.api-sports.io/handball/teams/2.png';