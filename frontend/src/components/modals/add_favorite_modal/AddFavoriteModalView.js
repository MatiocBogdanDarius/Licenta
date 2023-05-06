import * as React from 'react';
import style from './AddFavoriteModal.module.css'
import Modal from "react-overlays/Modal";
import {Button} from "reactstrap";
import {WISHLIST_ITEM_TYPE} from "assets/constants/Data";

function AddFavoriteModalView(props) {
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
                        {props.isFavorite ?
                            "Do you want to remove the item from the favorites list?"
                            : "Do you want to add item in your calendar?"
                        }
                    </div>
                    <div>
                        <span className={style.close_button} onClick={props.toggle}>x</span>
                    </div>
                </div>
                {props.contentType === WISHLIST_ITEM_TYPE.CONTEST &&
                    <div className={style.modal_body}>
                        <p>Contest</p>
                    </div>
                }
                {props.contentType === WISHLIST_ITEM_TYPE.TEAM &&
                    <div className={style.modal_body}>
                        <p>Team</p>
                    </div>
                }
                {props.contentType === WISHLIST_ITEM_TYPE.PLAYER &&
                    <div className={style.modal_body}>
                        <p>Player</p>
                    </div>
                }
                <div className={style.modal_footer}>
                    <Button className={style.success_button}
                            onClick={props.submitButtonHandle}
                    >
                        {props.isFavorite ? "Yes" : "Add Event In Calendar"}
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

export default AddFavoriteModalView;