import * as React from 'react';
import style from './NotificationModal.module.css'
import Modal from "react-overlays/Modal";
import {Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faPlus} from "@fortawesome/free-solid-svg-icons";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
import {TIME_UNIT} from "assets/constants/Data";

function NotificationModalView(props) {
    const renderBackdrop = (props) => <div className={style.backdrop} {...props} />;

    const getCheckBoxClassName = (notification) => {
        return `${style.check_box} ${notification.selected ? style.checked : ''}`
    }

    return (<Modal
            className={style.modal}
            show={props.isOpen}
            onHide={props.toggle}
            renderBackdrop={renderBackdrop}
            size="lg"
        >
            <div>
                <div className={style.modal_header}>
                    <div className={style.modal_title}>Notification</div>
                    <div className={style.close_button} onClick={props.toggle}>x</div>
                </div>
                <div className={style.modal_body}>
                    {props.notifications.map(notification => {
                        return (<div key={notification.id} className={style.alert_container}>
                                <FontAwesomeIcon
                                    icon={notification.selected ? faCheckCircle : faCircle}
                                    type="checkbox"
                                    onClick={() => props.handleCheck(notification)}
                                    className={getCheckBoxClassName(notification)}
                                />
                                <div className={style.alert_info}>{notification.name}</div>
                            </div>);
                    })}
                    {props.addCustomNotificationFormVisibility ? <div className={style.form_container}>
                        <input
                            type="number"
                            min={1}
                            max={TIME_UNIT[props.selectedUnit].max_value}
                            value={props.numberOfUnits}
                            onChange={props.numberInputChangeHandle}
                            className={style.number_input}
                        />
                        <select
                            value={props.selectedUnit}
                            onChange={props.unitInputChangeHandle}
                            className={style.select_input}
                        >
                            {Object.entries(TIME_UNIT).map(([key, unit]) => {
                                return (
                                    <option key={key} value={key}>
                                        {props.numberOfUnits > 1 ? unit.plural : unit.singular}
                                    </option>
                                );
                            })}
                        </select>
                            <Button
                                className={style.save_custom_notification_button}
                                onClick={props.saveCustomNotification}
                            >
                                <p>Save</p>
                            </Button>
                    </div> : <div className={style.alert_container}
                                  onClick={props.openAddCustomNotificationForm}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            type="checkbox"
                            className={style.add_custom_alert_button}
                        />
                        <div className={style.alert_info}>
                            Custom
                        </div>
                    </div>}
                </div>
                <div className={style.modal_footer}>
                    <Button className={style.success_button}
                            onClick={props.submitButtonHandle}
                            disabled={props.addCustomNotificationFormVisibility || !props.checkCanSubmit()}
                    >
                        Add Notifications
                    </Button>
                    <Button className={style.danger_button}
                            onClick={props.closeButtonHandle}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </Modal>);
}

export default NotificationModalView;