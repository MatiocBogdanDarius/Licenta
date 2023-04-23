import React from 'react';
import style from "./LoadingSpinner.module.css";

const LoadingSpinnerView = () => {
    return (
        <div className={style.spinner_container}>
            <div className={style.loading_spinner}></div>
        </div>
    )
}

export default LoadingSpinnerView