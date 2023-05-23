import React, {useEffect, useState} from "react";
import NavbarView from "./NavbarView";
import {useNavigate} from "react-router-dom";
import NotificationReceiver from "services/api/NotificationReceiver";
import * as USER_ACCOUNT_SERVICES from "services/api/user_account_service";
import {NOTIFICATION_STATUS} from "../../assets/constants/Data";

export function NavbarContainer() {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [notifications, setNotifications] = useState([]);
    const [noOfUnreadNotifications, setNoOfUnreadNotifications] = useState(0);
    const [isVisibleNotificationDropdown, setIsVisibleNotificationDropdown] = useState(false);

    useEffect(() => {
        setUser(USER_ACCOUNT_SERVICES.getCurrentUser());
    }, [])

    useEffect(() => {
        if (user) {
            USER_ACCOUNT_SERVICES
                .getUserNotifications()
                .then(response => {
                    setNotifications(response.data);
                    console.log("Notifications: ", response.data);
                });
        }
    }, [user])

    useEffect(() => {
        const newNoOfNotifications = notifications
            .filter(notification => notification.status === NOTIFICATION_STATUS.UNREAD)
            .length;

        setNoOfUnreadNotifications(newNoOfNotifications);
    }, [notifications])



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
        toggleNotificationDropDown();
    }

    const settingsButtonHandle = () => {
        console.log("Search Button Handle")
    }

    const toggleNotificationDropDown = () => {
        setIsVisibleNotificationDropdown(prevState => !prevState);
    }

    return (
        <div>
            <NavbarView
                user={user}
                notifications={notifications}
                noOfUnreadNotifications={noOfUnreadNotifications}
                isVisibleNotificationDropdown={isVisibleNotificationDropdown}
                searchButtonHandle={searchButtonHandle}
                loginButtonHandle={loginButtonHandle}
                profileButtonHandle={profileButtonHandle}
                notificationButtonHandle={notificationButtonHandle}
                settingsButtonHandle={settingsButtonHandle}
            />
            <NotificationReceiver updateNotificationList={setNotifications}/>
        </div>
    );
}
