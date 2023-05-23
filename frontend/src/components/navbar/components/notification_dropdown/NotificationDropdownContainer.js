import React from "react";
import NotificationDropdownView from "./NotificationDropdownView";
import {useNavigate} from "react-router-dom";

export function NotificationDropdownContainer(props) {
    const navigate = useNavigate();

    const viewMoreButtonHandle = () => {
        console.log("View More Notifications Button Handle")
    }

    return (
        <NotificationDropdownView
            notifications={props.notifications}
            viewMoreButtonHandle={viewMoreButtonHandle}
        />
    );
}
