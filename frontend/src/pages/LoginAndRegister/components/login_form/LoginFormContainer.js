import React from "react";
import LoginFormView from "./LoginFormView";

export function LoginFormContainer(props) {
    return (
        <div>
            <LoginFormView isActive={props.isActive} />
        </div>
    );
}
