import * as React from 'react';
import style from "./GameDetails.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {GAME_MENU, WISHLIST_ITEM_TYPE} from "assets/constants/Data";

function GameDetailsView(props) {
    return (
        <div className={style.container}>
            {props.game &&
                <div className={style.header}>
                    <div className={style.info_container}>
                        <div className={style.home_team_container}>
                            <div
                                className={style.star_icon_container}
                                onClick={(event) => props.favoriteButtonHandle(event, props.game[0].teams.home.id, WISHLIST_ITEM_TYPE.TEAM)}
                            >
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className={`${style.star_icon} ${props.checkIfItemIsFavorite( props.game[0].teams.home.id, WISHLIST_ITEM_TYPE.TEAM) ? style.is_favorite : ""}`}
                                />
                            </div>
                            <div className={style.home_team_info}>
                                <div className={style.logo_container}>
                                    <img
                                        src={props.game[0].teams.home.logo}
                                        className={style.flag_image}
                                        alt=""
                                    />
                                </div>
                                <p className={style.team_title}>{props.game[0].teams.home.name}</p>
                            </div>

                        </div>
                        <div className={style.info}>
                            <p>31.04.2023 21:00</p>
                            <p className={style.score}>2-3</p>
                            <p>Live</p>
                        </div>
                        <div className={style.away_team_container}>
                            <div className={style.away_team_info}>
                                <div className={style.logo_container}>
                                    <img
                                        src={props.game[0].teams.away.logo}
                                        className={style.flag_image}
                                        alt=""
                                    />
                                </div>
                                <p className={style.team_title}>{props.game[0].teams.away.name}</p>
                            </div>
                            <div
                                className={style.star_icon_container}
                                onClick={(event) => props.favoriteButtonHandle(event, props.game[0].teams.home.id, WISHLIST_ITEM_TYPE.TEAM)}
                            >
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className={`${style.star_icon} ${props.checkIfItemIsFavorite( props.game[0].teams.home.id, WISHLIST_ITEM_TYPE.TEAM) ? style.is_favorite : ""}`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={style.menu_container}>
                        {Object.values(GAME_MENU).map(item => {
                            return (
                                <p
                                    key={`item-${item}`}
                                    className={`${style.menu_item} ${props.view === item ? style.active_menu_item : ""}`}
                                    onClick={(e) => props.changeView(e, item)}
                                >
                                    {item}
                                </p>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    );
}

export default GameDetailsView;