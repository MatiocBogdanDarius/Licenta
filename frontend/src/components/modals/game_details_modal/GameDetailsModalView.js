import * as React from 'react';
import style from './GameDetailsModal.module.css'
import Modal from "react-overlays/Modal";
import GameDetails from 'components/game_details'

function GameDetailsModalView(props) {
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
                {/*    <div className={style.contest_infos_container}>*/}
                {/*        {props.contest.flag &&*/}
                {/*            <div className={style.contest_country_flag_container}>*/}
                {/*                <img src={props.contest.flag} className={style.flag_image} alt=""/>*/}
                {/*            </div>*/}
                {/*        }*/}
                {/*        <div className={style.contest_title_container}>*/}
                {/*            <p>{`${props.contest.country.toUpperCase()}: ${props.contest.name}`}</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                    <div className={style.close_button} onClick={props.toggle}>x</div>
                </div>
                <div className={style.modal_body}>
                   <GameDetails
                       sport={props.sport}
                       gameId={props.gameId}
                       favoriteButtonHandle={props.favoriteButtonHandle}
                       checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                   />
                </div>
            </div>
        </Modal>
    );
}

export default GameDetailsModalView;