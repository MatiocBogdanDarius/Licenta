import {userAccountAxios, userAccountAxiosPrivate} from "./axios";
import useUserAccountAxiosPrivate from "services/hooks/useUserAccountAxiosPrivate";

const register = (user) => {
    return userAccountAxios.post("auth/register",user)
}

const login = async (credentials) => {
    return await userAccountAxios.post("auth/authenticate", credentials);
}

const addItemToWishlist = (itemId, type) => {
    const item = {
        itemId: itemId,
        itemType: type,
        sourceId: 1,
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

const removeItemFromWishlist = (itemId, itemType) => {
    userAccountAxiosPrivate.delete(
        "wishlist",
        {params:
                {
                    itemId: itemId,
                    itemType: itemType,
                    userId: JSON.parse(localStorage.getItem("userDetails"))?.id
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