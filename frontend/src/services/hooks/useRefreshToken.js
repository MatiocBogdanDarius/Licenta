import {userAccountAxiosPrivate} from 'services/api/axios';

const useRefreshToken = () => {

    const refresh = async () => {
        const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
        const response = await userAccountAxiosPrivate
            .post('/auth/jwt/refresh/', {refresh: refreshToken});

        localStorage.setItem('accessToken', JSON.stringify(response.data.access))

        return response.data.access;
    }
    return refresh;
};

export default useRefreshToken;
