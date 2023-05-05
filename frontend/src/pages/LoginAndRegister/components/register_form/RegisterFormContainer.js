import React, {useEffect, useState} from "react";
import RegisterFormView from "./RegisterFormView";
import {LOGIN} from "navigation/CONSTANTS";
import {useNavigate} from "react-router-dom";
import * as USER_ACCOUNT_SERVICE from "services/api/user_account_service";

export function RegisterFormContainer(props) {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setErrorMessage('');
    }, [firstname, lastname, email, password, rePassword])

    const register = async (_) => {
        const newUser ={
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            re_password: rePassword
        }

        USER_ACCOUNT_SERVICE
            .register(newUser)
            .then(() => {
                navigate(LOGIN, {replace: true});
                props.changeForm()
            })
            .catch(error => {
                console.log(error)
                setErrorMessage('Incorrect Inputs')
            })
    }

    return (
        <div>
            <RegisterFormView
                isActive={props.isActive}
                firstname={firstname}
                lastname={lastname}
                email={email}
                password={password}
                rePassword={rePassword}
                errorMessage={errorMessage}
                registerButtonHandle={register}
                firstnameInputChangeHandle={setFirstname}
                lastnameInputChangeHandle={setLastname}
                emailInputChangeHandle={setEmail}
                passwordInputChangeHandle={setPassword}
                rePasswordInputChangeHandle={setRePassword}
            />
        </div>
    );
}
