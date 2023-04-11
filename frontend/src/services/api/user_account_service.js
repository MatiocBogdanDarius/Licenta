import {userAccountAxios} from "./axios";
import useUserAccountAxiosPrivate from "services/hooks/useUserAccountAxiosPrivate";

const register = (user) => {
    return userAccountAxios.post("register/",user)
}

const login = async (credentials) => {
    return await userAccountAxios.post("login/", JSON.stringify(credentials));
}

const getUserDetails = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userAccountAxiosPrivate = useUserAccountAxiosPrivate();
    return userAccountAxiosPrivate.get("/auth/users/me/")
}

export {
    register,
    login,
    getUserDetails
};