import React, {useEffect, useRef, useState} from "react";
import LoginFormView from "./LoginFormView";
import {useLocation, useNavigate} from "react-router-dom";
import {HOMEPAGE} from "navigation/CONSTANTS";
import * as USER_ACCOUNT_SERVICE from "services/api/user_account_service";

export function LoginFormContainer(props) {
    const navigate = useNavigate();
    const location = useLocation ();
    const from = location.state?.from?.pathname;

    const emailInputRef = useRef();
    const errorInputRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        emailInputRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [email, password])

    const login = async (e) => {
        e.preventDefault();

        try {
            const {data: tokens} = await USER_ACCOUNT_SERVICE
                .login({ email: email, password: password })

            localStorage.setItem('accessToken',  JSON.stringify(tokens.access))
            localStorage.setItem('refreshToken',  JSON.stringify(tokens.refresh))

            const {data: userDetails} = await USER_ACCOUNT_SERVICE.getUserDetails();

            localStorage.setItem('userDetails', JSON.stringify(userDetails))

            setEmail('');
            setPassword('');
            redirect();
        } catch (err) {
            if (!err?.response) {
                setErrorMessage('No Server Response');
            } else if (err.response?.status === 400) {
                setErrorMessage('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrorMessage(err.response.data.detail);
            } else {
                setErrorMessage('Login Failed');
            }
            console.log(setErrorMessage, err)
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
        <div>
            <LoginFormView
                isActive={props.isActive}
                emailInputRef={emailInputRef}
                errorInputRef={errorInputRef}
                email={email}
                password={password}
                emailInputChangeHandle={setEmail}
                passwordInputChangeHandle={setPassword}
                loginFormSubmitHandle={login}
            />
        </div>
    );
}
