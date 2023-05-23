import {useEffect, useState} from "react";
import SockJsClient from "react-stomp";
import * as USER_ACCOUNT_SERVICES from "services/api/user_account_service";

const NotificationReceiver = (props) => {
    const [socketTopics, setSocketTopics] = useState([]);
    const socketUrl =`http://localhost:8080/websocket`;
    const [userId, setUserId] = useState();

    useEffect(() => {
        setUserId( USER_ACCOUNT_SERVICES.getCurrentUserId())
    }, [])

    useEffect(() => {
        userId && setSocketTopics([`/topic/notification/${userId}`]);
    }, [userId])

    const socketHandler = (notification) => {
       console.log(notification);
       props.updateNotificationList(prevState => [...prevState, notification]);
    }

    const onConnectSocket = () => {
        console.log("Notification Receiver: Connected!!");
    }

    const onDisconnectSocket = () => {
        console.log("Notification Receiver: Disconnected!");
    }

    return(
        userId
            ? <SockJsClient
                url={socketUrl}
                topics={socketTopics}
                onConnect={onConnectSocket}
                onDisconnect={onDisconnectSocket}
                onMessage={socketHandler}
            />
            : <></>
    );
};

export default NotificationReceiver;
