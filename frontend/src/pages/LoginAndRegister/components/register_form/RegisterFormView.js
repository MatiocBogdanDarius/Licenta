import styles from "./RegisterForm.module.css";

const RegisterFormView = (props) => {
    return (
        <div className={[styles.container, styles.aContainer, props.isActive ? "" : styles.isTxl ].join(" ") }
             id="a-container">
            <form className={styles.form} id="a-form" onSubmit={props.register}>
                <h2 className={["from_title", styles.title].join(" ")}>Create Account</h2>
                <input
                    className={styles.form__input}
                    type="text"
                    placeholder="Firstname"
                    value={props.firstname}
                    onChange={e => props.firstnameInputChangeHandle(e.target.value)}
                    required
                />
                <input
                    className={styles.form__input}
                    type="text"
                    placeholder="Lastname"
                    value={props.lastname}
                    onChange={e => props.lastnameInputChangeHandle(e.target.value)}
                    required
                />
                <input
                    className={styles.form__input}
                    type="email"
                    placeholder="Email"
                    value={props.email}
                    onChange={e => props.emailInputChangeHandle(e.target.value)}
                    required
                />
                <input
                    className={styles.form__input}
                    type="password"
                    placeholder="Password"
                    value={props.password}
                    onChange={e => props.passwordInputChangeHandle(e.target.value)}
                    required
                />
                <input
                    className={styles.form__input}
                    type="password"
                    placeholder="Re-password"
                    value={props.rePassword}
                    onChange={e => props.rePasswordInputChangeHandle(e.target.value)}
                    required
                />
                <label className={styles.text_red}>{props.errorMessage}</label>
                <button type="submit" className={["form__button", styles.button, "submit"].join(" ")}>SIGN UP</button>
            </form>
        </div>
    );
}

export default RegisterFormView
