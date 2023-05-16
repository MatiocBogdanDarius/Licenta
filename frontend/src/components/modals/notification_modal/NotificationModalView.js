import * as React from 'react';
import style from './NotificationModal.module.css'
import Modal from "react-overlays/Modal";
import {Button} from "reactstrap";
import {WISHLIST_ITEM_TYPE} from "assets/constants/Data";
import Contest from "./components/contest";

function NotificationModalView(props) {
    const renderBackdrop = (props) => <div className={style.backdrop} {...props} />;

    return (
        <Modal
            className={style.modal}
            show={props.isOpen}
            onHide={props.toggle}
            renderBackdrop={renderBackdrop}
            size="lg"
        >
            <div>
                <div className={style.modal_header}>
                    <div className={style.modal_title}>
                        Notification
                    </div>
                    <div>
                        <span className={style.close_button} onClick={props.toggle}>x</span>
                    </div>
                </div>

                <div className={style.modal_footer}>
                    <Button className={style.success_button}
                            onClick={props.submitButtonHandle}
                            disabled={!props.isFavorite && props.selectedGames.length === 0}
                    >
                        {props.isFavorite ?
                            "Yes"
                            : `Add Event${ props.selectedGames?.length > 1 ? 's': ''} In Calendar`
                        }
                    </Button>
                    <Button className={style.danger_button}
                            onClick={props.closeButtonHandle}
                    >
                        {props.isFavorite ? "No" : "Only Add Event In Wishlist"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default NotificationModalView;