import styles from './LoginForm.module.css';

const LoginFormView = (props) => {
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
            <form className={styles.form} id="b-form" onSubmit={props.loginFormSubmitHandle}>
                <h2 className={styles.title}>Sign in to Website</h2>
                <input
                    className={styles.form__input}
                    placeholder="Email"
                    type="email"
                    id="email"
                    ref={props.emailInputRef}
                    onChange={(e) => props.emailInputChangeHandle(e.target.value)}
                    value={props.email}
                    required
                />
                <input
                    className={styles.form__input}
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={(e) => props.passwordInputChangeHandle(e.target.value)}
                    value={props.password}
                    required
                />
                <label className={styles.text_red}>{props.errorMessage}</label>
                <p className={styles.form__link}>Forgot your password?</p>
                <button className={["form__button", styles.button, "submit"].join(" ")}>SIGN IN</button>
            </form>
        </div>
    );
}

export default LoginFormView