import React from "react";
import RegisterFormView from "./RegisterFormView";

export function RegisterFormContainer(props) {
    return (
        <div>
            <RegisterFormView isActive={props.isActive} setIsLoginFormActive={props.setIsLoginFormActive} />
        </div>
    );
}
