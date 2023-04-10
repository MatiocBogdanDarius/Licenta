import axios, {axiosPrivate} from '../api/axios';

const useRefreshToken = () => {

    const refresh = async () => {
        const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
        const response = await axios.post('/auth/jwt/refresh/',
            {refresh: refreshToken},
            {withCredentials: true}
        );

        localStorage.setItem('accessToken', JSON.stringify(response.data.access))

        return response.data.access;
    }
    return refresh;
};

export default useRefreshToken;
