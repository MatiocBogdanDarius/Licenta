import { useState, useEffect } from 'react';
import styles from "./RegisterForm.module.css";
import {FACEBOOK, INSTAGRAM, TWITTER} from 'assets/LOGIN_REGISTER_FORM_ICONS'
import axios from "services/api/axios";
import {useNavigate} from "react-router-dom";
import {LOGIN} from "navigation/CONSTANTS";

const RegisterFormView = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [role, setRole] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errMsg, setErrMsg] = useState('');


    useEffect(() => {
        setErrMsg('');
    }, [name, role, email, password, rePassword])

    const register = async (e) => {
        const newUser ={
            name: name,
            role: role,
            email: email,
            password: password,
            re_password: rePassword
        }

        await axios
            .post("/auth/users/", newUser)
            .then(() => {
                navigate(LOGIN, {replace: true});
                props.setIsLoginFormActive(true)
            })
            .catch(error => {
                console.log(error)
                setErrMsg('Incorrect Inputs')
            })

    }
    return (
        <div className={[styles.container, styles.aContainer, props.isActive ? "" : styles.isTxl ].join(" ") }
             id="a-container">
            <form className={styles.form} id="a-form" onSubmit={register}>
                <h2 className={["from_title", styles.title].join(" ")}>Create Account</h2>
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
                <span className={styles.form__span}>or use email for registration</span>
                <input
                    className={styles.form__input}
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <select
                    className={styles.form__input}
                    value={role}
                    onChange={e => setRole(e.target.value)}
                >
                    <option value={1}>Client</option>
                    <option value={2}>Real Estate Agent</option>
                </select>
                <input
                    className={styles.form__input}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    className={styles.form__input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <input
                    className={styles.form__input}
                    type="password"
                    placeholder="Re-password"
                    value={rePassword}
                    onChange={e => setRePassword(e.target.value)}
                    required
                />
                <label className={styles.text_red}>{errMsg}</label>
                <button type="submit" className={["form__button", styles.button, "submit"].join(" ")}>SIGN UP</button>
            </form>
        </div>
    );
}

export default RegisterFormView
