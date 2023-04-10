import React, {useEffect, useState} from 'react';
import styles from './LoginAndRegister.module.css';
import LoginForm from "./components/login_form";
import RegisterForm from "./components/register_form";
import {useLocation} from "react-router-dom";
import {LOGIN} from "../../navigation/CONSTANTS";

const LoginAndRegisterView = () => {
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
        <div style={styles} className={styles.body}>
            <div className={styles.main}>
                <RegisterForm isActive={!isLoginFormActive} setIsLoginFormActive={setIsLoginFormActive} />
                <LoginForm isActive={isLoginFormActive} />
                <div id="switch-cnt"
                     className={[styles.switch, isGx ? styles.isGx: "", isLoginFormActive ? styles.isTxr : ""].join(" ")}
                >
                    <div className={[styles.switch__circle, isLoginFormActive ? styles.isTxr : ""].join(" ")} />
                    <div className={[styles.switch__circle, styles.switch__circleT].join()}  />
                    <div id="switch-c1"
                         className={[styles.switch__container,  isLoginFormActive ? styles.isHidden : ""].join(" ")}
                    >
                        <h2 className={["switch__title", styles.title].join(" ")}>Welcome Back !</h2>
                        <p className={["switch__description", styles.description].join(" ")}>
                            To keep connected with us please login with your personal info
                        </p>
                        <button
                            className={[styles.switch__button, styles.button, "switch-btn"].join(" ")}
                            onClick={changeForm}
                            >
                            SIGN IN
                        </button>
                    </div>
                    <div  id="switch-c2"
                          className={[styles.switch__container, isLoginFormActive ? "" : styles.isHidden].join(" ")}
                    >
                        <h2 className={["switch__title", styles.title, isLoginFormActive ? styles.isTxr : ""].join(" ")}>
                            Hello Friend !
                        </h2>
                        <p className={["switch__description", styles.description].join(" ")}>
                            Enter your personal details and start journey with us
                        </p>
                        <button
                            className={[styles.switch__button, styles.button, "switch-btn"].join(" ")}
                            onClick={changeForm}
                            >
                            SIGN UP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginAndRegisterView