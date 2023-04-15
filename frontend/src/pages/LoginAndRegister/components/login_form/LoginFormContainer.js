import React, {useEffect, useRef, useState} from "react";
import LoginFormView from "./LoginFormView";
import {useLocation, useNavigate} from "react-router-dom";
import {HOMEPAGE} from "navigation/CONSTANTS";
import * as USER_ACCOUNT_SERVICE from "services/api/user_account_service";

export function LoginFormContainer(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname;

    const emailInputRef = useRef();
    const errorInputRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        emailInputRef.current.focus();
    }, [])

    const login = async (e) => {
        e.preventDefault();

        try {
            const {data: {accessToken, refreshToken, user}} = await USER_ACCOUNT_SERVICE
                .login({email: email, password: password})

            localStorage.setItem('accessToken', JSON.stringify(accessToken))
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
            localStorage.setItem('userDetails', JSON.stringify(user))

            redirect();
        } catch ({response: error}) {
            console.log(error)
            setErrorMessage(error.data.message);

            setPassword('');
            setEmail('');
        }
    }

    const redirect = () => navigate(from ?? HOMEPAGE, {replace: true});

    return (
        <div>
            <LoginFormView
                isActive={props.isActive}
                emailInputRef={emailInputRef}
                errorInputRef={errorInputRef}
                email={email}
                password={password}
                errorMessage={errorMessage}
                emailInputChangeHandle={setEmail}
                passwordInputChangeHandle={setPassword}
                loginFormSubmitHandle={login}
            />
        </div>
    );
}
