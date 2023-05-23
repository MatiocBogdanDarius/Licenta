import * as React from 'react';
import style from './NotificationDropdown.module.css'

function NotificationDropdownView(props) {
    return (
        <div className={style.dropdown}>
            <div className={style.triangle_container}>
                <div className={style.triangle_up}/>
            </div>
            <div className={style.content_container}>
                <div className={style.scrollable_area}>
                    {props.notifications.map(notification => {
                        return (
                            <div key={notification.id}
                                className={style.notifications_list_item}
                            >
                                <p>{`${notification.description} ${notification.id}`}</p>
                            </div>
                        );
                    })}
                </div>
                <div className={style.button_container}>
                    <div className={style.button}><p>View More</p></div>
                </div>
            </div>

        </div>
    );
}

export default NotificationDropdownView;