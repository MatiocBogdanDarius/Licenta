import React from 'react';
import styles from './LoginAndRegister.module.css';
import LoginForm from "./components/login_form";
import RegisterForm from "./components/register_form";

const LoginAndRegisterView = (props) => {
    return (
        <div style={styles} className={styles.body}>
            <div className={styles.main}>
                <RegisterForm isActive={!props.isLoginFormActive} changeForm={props.changeForm} />
                <LoginForm isActive={props.isLoginFormActive} />
                <div id="switch-cnt"
                     className={[styles.switch, props.isGx ? styles.isGx: "", props.isLoginFormActive ? styles.isTxr : ""].join(" ")}
                >
                    <div className={[styles.switch__circle, props.isLoginFormActive ? styles.isTxr : ""].join(" ")} />
                    <div className={[styles.switch__circle, styles.switch__circleT].join()}  />
                    <div id="switch-c1"
                         className={[styles.switch__container,  props.isLoginFormActive ? styles.isHidden : ""].join(" ")}
                    >
                        <h2 className={["switch__title", styles.title].join(" ")}>Welcome Back !</h2>
                        <p className={["switch__description", styles.description].join(" ")}>
                            To keep connected with us please login with your personal info
                        </p>
                        <button
                            className={[styles.switch__button, styles.button, "switch-btn"].join(" ")}
                            onClick={props.changeForm}
                            >
                            SIGN IN
                        </button>
                    </div>
                    <div  id="switch-c2"
                          className={[styles.switch__container, props.isLoginFormActive ? "" : styles.isHidden].join(" ")}
                    >
                        <h2 className={["switch__title", styles.title, props.isLoginFormActive ? styles.isTxr : ""].join(" ")}>
                            Hello Friend !
                        </h2>
                        <p className={["switch__description", styles.description].join(" ")}>
                            Enter your personal details and start journey with us
                        </p>
                        <button
                            className={[styles.switch__button, styles.button, "switch-btn"].join(" ")}
                            onClick={props.changeForm}
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