import React, {useState} from "react";
import LoginAndRegisterView from "./LoginAndRegisterView";
import {useLocation} from "react-router-dom";
import {LOGIN} from "../../navigation/CONSTANTS";

export function LoginAndRegisterContainer() {
    const pathname = useLocation()?.pathname;
    const [isGx, setIsGx] = useState(false)
    const [isLoginFormActive, setIsLoginFormActive] = useState(pathname.includes(LOGIN))

    const changeForm = () => {
        setIsGx(true);
        setTimeout(function(){
            setIsGx(false)
        }, 1500)

        setIsLoginFormActive(!isLoginFormActive)
    }

    return (
            <LoginAndRegisterView
                isLoginFormActive={isLoginFormActive}
                isGx={isGx}
                changeForm={changeForm}
            />
    );
}
