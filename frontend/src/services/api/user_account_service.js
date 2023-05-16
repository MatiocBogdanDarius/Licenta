import {userAccountAxios, userAccountAxiosPrivate} from "./axios";
import {SPORTS} from "assets/constants/Data";

const getCurrentUserId = () => {
    return JSON.parse(localStorage.getItem("userDetails"))?.id;
}

const register = (user) => {
    return userAccountAxios
        .post("auth/register",user)
}

const login = async (credentials) => {
    return await userAccountAxios
        .post("auth/authenticate", credentials);
}

const addItemToWishlist = (sport, itemId, type) => {
    const item = {
        itemId: itemId,
        itemType: type,
        sourceId: SPORTS[sport].id,
        userId: getCurrentUserId()
    }

    userAccountAxiosPrivate.post("wishlist", item)
}

const getUserWishlist = () => {
    const userId = getCurrentUserId();

    return userAccountAxiosPrivate
        .get(
            "wishlist/by_user_id",
            {params:{userId: userId}}
        )
}

const removeItemFromWishlist = (sport, itemId, itemType) => {
    userAccountAxiosPrivate.delete(
        "wishlist",
        {params:
                {
                    itemId: itemId,
                    itemType: itemType,
                    userId: getCurrentUserId(),
                    sourceId: SPORTS[sport].id
                }
        })
}

const getUserCalendar = () => {
    const userId = getCurrentUserId();

    return userAccountAxiosPrivate
        .get("schedule/by_user_id",
            {params:{userId}}
        )
}

const addEventsToCalendar = (sport, games) => {
    const gameDuration = 2;
    const userId = getCurrentUserId();

    const schedules = games.map(game => {
        return {
            itemId: game.fixture.id,
            start: new Date(game.fixture.timestamp * 1000).toUTCString(),
            end: new Date(game.fixture.timestamp * 1000 + gameDuration * 60 * 60 * 1000).toUTCString(),
            country: game.league.country,
            contest: game.league.name,
            player1: game.teams.home.name,
            player2: game.teams.away.name,
            sport: sport,
            userId: userId
        }
    })

    userAccountAxiosPrivate
        .post(
            "schedule",
            {schedules: schedules}
        )
}


export {
    register,
    login,
    addItemToWishlist,
    getUserWishlist,
    removeItemFromWishlist,
    getUserCalendar,
    addEventsToCalendar,
};