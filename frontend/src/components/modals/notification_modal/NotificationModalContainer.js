import React, {useEffect, useState} from "react";
import NotificationModalView from "./NotificationModalView";
import {STANDARD_ALARMS, TIME_UNIT} from "assets/constants/Data";
import * as USER_ACCOUNT_SERVICE from 'services/api/user_account_service';


export function NotificationModalContainer(props) {
    const [notifications, setNotifications] = useState(STANDARD_ALARMS);
    const [notificationId, setNotificationId] = useState(STANDARD_ALARMS.length);
    const [formVisibility, setFormVisibility] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(Object.keys(TIME_UNIT).at(0));
    const [numberOfUnits, setNumbersOfUnits] = useState(1);

    useEffect(() => {
        setNotifications(STANDARD_ALARMS);
        setNotificationId(STANDARD_ALARMS.length);
    }, [props.isOpen])

    const handleCheck = (selectedNotification) => {
        setNotifications(prevState => {
            return prevState.map(notification => {
                if (notification.id === selectedNotification.id){
                    return {...notification, selected: !notification.selected}
                }
                return notification;
            })
        })
    }

    const toggleFormVisibility = () => setFormVisibility(prevState => !prevState)

    const generateId = () => {
        setNotificationId(prevState => prevState + 1);
        return notificationId + 1;
    }

    const saveCustomNotification = () => {
        const unit = TIME_UNIT[selectedUnit]
        const newNotification = {
            id: generateId(),
            time: numberOfUnits * unit.milliseconds,
            name: `${numberOfUnits} ${numberOfUnits > 1 ? unit.plural : unit.singular} before`,
            selected: true
        }

        setNotifications(prevState => [...prevState, newNotification]);
        toggleFormVisibility();
    }

    const numberInputChangeHandle = (event) => {
        event.preventDefault();
        setNumbersOfUnits(event.target.value)
    }

    const unitInputChangeHandle = (event) => {
        event.preventDefault();
        setSelectedUnit(event.target.value)
    }

    const checkCanSubmit = () => {
        return notifications.some(notification => notification.selected)
    }

    const submitButtonHandle = () => {
        const selectedNotification = notifications
            .filter(notification => notification.selected);

        USER_ACCOUNT_SERVICE
            .addNotifications(props.sport, props.schedules, selectedNotification);

        props.toggle();
    }

    return (
        <NotificationModalView
            isOpen={props.isOpen}
            notifications={notifications}
            selectedUnit={selectedUnit}
            numberOfUnits={numberOfUnits}
            toggle={props.toggle}
            checkCanSubmit={checkCanSubmit}
            submitButtonHandle={submitButtonHandle}
            closeButtonHandle={props.toggle}
            handleCheck={handleCheck}
            addCustomNotificationFormVisibility={formVisibility}
            openAddCustomNotificationForm={toggleFormVisibility}
            saveCustomNotification={saveCustomNotification}
            numberInputChangeHandle={numberInputChangeHandle}
            unitInputChangeHandle={unitInputChangeHandle}
        />
    );
}
