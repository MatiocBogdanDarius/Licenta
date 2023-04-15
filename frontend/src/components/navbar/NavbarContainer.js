import React from "react";
import NavbarView from "./NavbarView";
import {useNavigate} from "react-router-dom";

const notifications = [
    {},
    {},
    {},
    {}
]

export function NavbarContainer() {
    const navigate = useNavigate();
    const userDetailsLocalStorage = localStorage.getItem('userDetails');
    const user = JSON.parse(userDetailsLocalStorage);

    const searchButtonHandle = () => {
        console.log("Search Button Handle")
    }

    const loginButtonHandle = () => {
        navigate('/login');
    }

    const profileButtonHandle = () => {
        console.log("Profile Button Handle")
    }

    const notificationButtonHandle = () => {
        console.log("Notification Button Handle")
    }

    const settingsButtonHandle = () => {
        console.log("Search Button Handle")
    }

    return (
        <div>
            <NavbarView
                user={user}
                notifications={notifications}
                searchButtonHandle={searchButtonHandle}
                loginButtonHandle={loginButtonHandle}
                profileButtonHandle={profileButtonHandle}
                notificationButtonHandle={notificationButtonHandle}
                settingsButtonHandle={settingsButtonHandle}
            />
        </div>
    );
}
