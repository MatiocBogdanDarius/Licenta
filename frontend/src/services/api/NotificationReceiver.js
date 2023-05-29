import {useEffect, useState} from "react";
import * as USER_ACCOUNT_SERVICES from "services/api/user_account_service";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const NotificationReceiver = (props) => {
    const socketUrl =`http://localhost:8080/websocket`;
    const [userId, setUserId] = useState();

    useEffect(() => {
        setUserId( USER_ACCOUNT_SERVICES.getCurrentUserId())
    }, [])

    useEffect(() => {
        if (userId) {
            const socket = new SockJS(socketUrl);

            const stompClient = new Client();
            stompClient.webSocketFactory = () => socket;

            const onNotificationReceived = (message) => {
                console.log('Received notification:', message.body);
                props.updateNotificationList(prevState => [...prevState, message.body]);
            };

            stompClient.onConnect = () => {
                stompClient.subscribe(`/topic/notification/${userId}`, onNotificationReceived);
            };

            stompClient.activate();

            return () => {
                stompClient.deactivate();
            };
        }
    }, [userId]);

    return <></>
};

export default NotificationReceiver;
