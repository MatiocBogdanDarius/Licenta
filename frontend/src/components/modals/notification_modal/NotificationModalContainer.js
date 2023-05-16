import React from "react";
import NotificationModalView from "./NotificationModalView";


export function NotificationModalContainer(props) {
    return (
        <NotificationModalView
            isOpen={props.isOpen}
            toggle={props.toggle}
            contentType={props.contentType}
            
        />);
}
