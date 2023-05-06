import React from 'react';
import style from "./GameFixture.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle, faStar} from "@fortawesome/free-solid-svg-icons";
import GameDetailsModal from "components/modals/game_details_modal";
import {WISHLIST_ITEM_TYPE} from "../../assets/constants/Data";

const GameFixtureView = (props) => {
    return (
        <>
            <div className={style.game_container}>
                <div className={style.fixture_date_and_teams_container}>
                    <div className={style.fixture_buttons_container}>
                        <div
                            className={`${style.fixture_button} ${props.checkIfItemIsFavorite(props.game.fixture.id, WISHLIST_ITEM_TYPE.GAME) ? style.is_favorite : ""}`}
                            onClick={(e) => props.favoriteButtonHandle(e, props.game.fixture.id, WISHLIST_ITEM_TYPE.GAME)}
                        >
                            <FontAwesomeIcon
                                icon={faStar}
                                className={style.fixture_favorite_button_icon}
                            />
                        </div>
                    </div>
                    <div className={style.fixture_date_container}>
                        <p className={props.checkIfGameIsLive() ? style.red_font : ''}>
                            {props.getFormattedDate()}
                        </p>
                    </div>
                    <div className={style.fixture_teams_container}>
                        <div className={style.fixture_team_container}>
                            <div className={style.team_logo_container}>
                                <img
                                    src={props.game.teams.home.logo}
                                    className={style.team_logo}
                                    alt=""
                                />
                            </div>
                            <div
                                className={style.team_info_container}
                                onClick={() => props.viewTeamDetails(props.game.teams.home, props.game.league)}
                            >
                                <p>{props.game.teams.home.name}</p>
                            </div>
                        </div>
                        <div className={style.fixture_team_container}>
                            <div className={style.team_logo_container}>
                                <img
                                    src={props.game.teams.away.logo}
                                    className={style.team_logo}
                                    alt=""
                                />
                            </div>
                            <div
                                className={style.team_info_container}
                                onClick={() => props.viewTeamDetails(props.game.teams.away, props.game.league)}
                            >
                                <p>{props.game.teams.away.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.fixture_score_more_details_button_container}>
                    <div className={style.fixture_score_container}>
                        <div className={style.team_score_container}>
                            <p className={props.checkIfGameIsLive(props.game) ? style.red_font : ''}>
                                {props.getScore('home')}
                            </p>
                        </div>
                        <div className={style.team_score_container}>
                            <p className={props.checkIfGameIsLive(props.game) ? style.red_font : ''}>
                                {props.getScore('away')}
                            </p>
                        </div>
                    </div>
                    <div>
                        <FontAwesomeIcon
                            icon={faInfoCircle}
                            className={style.game_details_button_icon}
                            onClick={props.toggleGameDetailsModal}
                        />
                    </div>
                </div>
            </div>
            <GameDetailsModal
                isOpen={props.isOpenGameDetailsModal}
                toggle={props.toggleGameDetailsModal}
                gameId={props.game?.fixture?.id}
                favoriteButtonHandle={props.favoriteButtonHandle}
                checkIfItemIsFavorite={props.checkIfItemIsFavorite}
            />
        </>
    )
}

export default GameFixtureView