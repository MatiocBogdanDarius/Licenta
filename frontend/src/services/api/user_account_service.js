import {userAccountAxios, userAccountAxiosPrivate} from "./axios";
import {SPORTS} from "assets/constants/Data";

const register = (user) => {
    return userAccountAxios.post("auth/register",user)
}

const login = async (credentials) => {
    return await userAccountAxios.post("auth/authenticate", credentials);
}

const addItemToWishlist = (sport, itemId, type) => {
    const item = {
        itemId: itemId,
        itemType: type,
        sourceId: SPORTS[sport].id,
        userId: JSON.parse(localStorage.getItem("userDetails"))?.id
    }

    userAccountAxiosPrivate.post("wishlist", item)
        .catch(console.error)
}

const getUserWishlist = () => {
    const userId = JSON.parse(localStorage.getItem("userDetails"))?.id;

    return userAccountAxiosPrivate
        .get("wishlist/by_user_id", {params:{userId: userId}})
}

const removeItemFromWishlist = (sport, itemId, itemType) => {
    userAccountAxiosPrivate.delete(
        "wishlist",
        {params:
                {
                    itemId: itemId,
                    itemType: itemType,
                    userId: JSON.parse(localStorage.getItem("userDetails"))?.id,
                    sourceId: SPORTS[sport].id
                }
        })
}

const getUserCalendar = () => {
    const userId = JSON.parse(localStorage.getItem("userDetails"))?.id;

    return userAccountAxiosPrivate.get("schedule/by_user_id", {params:{userId}})
}

export {
    register, login,
    addItemToWishlist, getUserWishlist, removeItemFromWishlist,
    getUserCalendar,
};