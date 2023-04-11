import { userAccountAxiosPrivate } from "services/api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

const useUserAccountAxiosPrivate = () => {
    const refreshToken = useRefreshToken();
    const accessToken = localStorage.getItem('accessToken') ?
        JSON.parse(localStorage.getItem('accessToken'))
        : undefined;

    useEffect(() => {

        const requestIntercept = userAccountAxiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `JWT ${accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = userAccountAxiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refreshToken();
                    prevRequest.headers['Authorization'] = `JWT ${newAccessToken}`;
                    return userAccountAxiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            userAccountAxiosPrivate.interceptors.request.eject(requestIntercept);
            userAccountAxiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken, refreshToken])

    return userAccountAxiosPrivate;
}

export default useUserAccountAxiosPrivate;