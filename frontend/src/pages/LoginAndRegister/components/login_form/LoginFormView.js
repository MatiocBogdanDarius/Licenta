import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './LoginForm.module.css';
import {FACEBOOK, INSTAGRAM, TWITTER} from "assets/LOGIN_REGISTER_FORM_ICONS";
import axios from "services/api/axios";
import {HOMEPAGE} from "navigation/CONSTANTS";
import useAxiosPrivate from "services/hooks/useAxiosPrivate";

const LOGIN_URL = '/auth/users/';
const CREATE_JWT = '/auth/jwt/create';

const LoginFormView = (props) => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation ();
    const from = location.state?.from?.pathname;

    const usernameRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const login = async (e) => {
        e.preventDefault();

        try {
            const {data: {access: accessToken, refresh: refreshToken}} = await axios.post(CREATE_JWT,
                JSON.stringify({ email: username, password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            localStorage.setItem('accessToken',  JSON.stringify(accessToken))
            localStorage.setItem('refreshToken',  JSON.stringify(refreshToken))

            const {data: userDetails} = await axiosPrivate.get("/auth/users/me/");

            localStorage.setItem('userDetails', JSON.stringify(userDetails))

            setUsername('');
            setPassword('');
            redirect();
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg(err.response.data.detail);
            } else {
                setErrMsg('Login Failed');
            }
            console.log(errMsg, err)
        }
    }

    const redirect = () => {
        console.log(from)
        if (from) {
            navigate(from, {replace: true});
        } else {
            navigate(HOMEPAGE, {replace: true});
        }
    }

    return (
        <div
            className={[
                styles.container,
                styles.bContainer,
                props.isActive ? styles.isTxl : "",
                props.isActive ? styles.isZ200 : ""
            ].join(" ")}
            id="b-container"
        >
            <form className={styles.form} id="b-form" onSubmit={login}>
                <h2 className={styles.title}>Sign in to Website</h2>
                <div className={"form__icons"}>
                    <img
                        className={styles.form__icon}
                        src={FACEBOOK}
                        alt=""
                    />
                    <img
                        className={styles.form__icon}
                        src={INSTAGRAM}
                    />
                    <img
                        className={styles.form__icon}
                        src={TWITTER}
                    />
                </div>
                <span className={styles.form__span}>or use your email account</span>
                <input
                    className={styles.form__input}
                    placeholder="Username"
                    type="email"
                    id="username"
                    ref={usernameRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                />
                <input
                    className={styles.form__input}
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <label className={styles.text_red}>{errMsg}</label>
                <a className={styles.form__link}>Forgot your password?</a>
                <button className={["form__button", styles.button, "submit"].join(" ")}>SIGN IN</button>
            </form>
        </div>
    );
}

export default LoginFormView