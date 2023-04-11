import React from "react";
import NavbarView from "./NavbarView";

const user = {
    lastname: "Bogdan",
    firstname: "Matioc"
}

const notifications = [
    {},
    {},
    {},
    {}
]

export function NavbarContainer() {
    const user = localStorage.getItem('userDetails')

    const searchButtonHandle = () => {
        console.log("Search Button Handle")
    }

    const loginButtonHandle = () => {
        console.log("Login Button Handle")
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
