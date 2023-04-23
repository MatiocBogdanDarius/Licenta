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
                    <div className={style.modal_title}>Do you want to add item in your calendar?</div>
                    <div>
                        <span className={style.close_button} onClick={props.toggle}>x</span>
                    </div>
                </div>
                {props.contentType === WISHLIST_ITEM_TYPE.CONTEST &&
                    <div className={style.modal_desc}>
                        <p>Contest</p>
                    </div>
                }
                {props.contentType === WISHLIST_ITEM_TYPE.TEAM &&
                    <div className={style.modal_desc}>
                        <p>Team</p>
                    </div>
                }
                {props.contentType === WISHLIST_ITEM_TYPE.PLAYER &&
                    <div className={style.modal_desc}>
                        <p>Player</p>
                    </div>
                }
                <div className={style.modal_footer}>
                    {/*<button className="secondary-button" onClick={props.toggle}>*/}
                    {/*    Close*/}
                    {/*</button>*/}
                    {/*<button className="primary-button" onClick={props.toggle}>*/}
                    {/*    Save Changes*/}
                    {/*</button>*/}
                    <Button>
                        Add event in calendar
                    </Button>
                    <Button color="danger" onClick={props.toggle}>
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default AddFavoriteModalView;