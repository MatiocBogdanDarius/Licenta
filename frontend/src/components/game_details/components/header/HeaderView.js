import * as React from 'react';
import style from "./Header.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {GAME_MENU, WISHLIST_ITEM_TYPE} from "assets/constants/Data";

function HeaderView(props) {
    return (
        <div className={style.header}>
            <div className={style.info_container}>
                <div className={style.home_team_container}>
                    <div
                        className={style.star_icon_container}
                        onClick={(event) =>
                            props.favoriteButtonHandle(
                                event,
                                props.game.teams.home.id,
                                WISHLIST_ITEM_TYPE.TEAM,
                                props.season
                            )}
                    >
                        <FontAwesomeIcon
                            icon={faStar}
                            className={`${style.star_icon} ${props.checkIfItemIsFavorite( props.game.teams.home.id, WISHLIST_ITEM_TYPE.TEAM) ? style.is_favorite : ""}`}
                        />
                    </div>
                    <div className={style.home_team_info}>
                        <div className={style.logo_container}>
                            <img
                                src={props.game.teams.home.logo}
                                className={style.flag_image}
                                alt=""
                            />
                        </div>
                        <p className={style.team_title}>{props.game.teams.home.name}</p>
                    </div>

                </div>
                <div className={style.info}>
                    <p>{props.getDateTime()}</p>
                    <p className={style.score}>
                        {`${props.game.goals.home} - ${props.game.goals.away}`}
                    </p>
                    <p>{props.getStatus()}</p>
                </div>
                <div className={style.away_team_container}>
                    <div className={style.away_team_info}>
                        <div className={style.logo_container}>
                            <img
                                src={props.game.teams.away.logo}
                                className={style.flag_image}
                                alt=""
                            />
                        </div>
                        <p className={style.team_title}>{props.game.teams.away.name}</p>
                    </div>
                    <div
                        className={style.star_icon_container}
                        onClick={(event) => props.favoriteButtonHandle(event, props.game.teams.away.id, WISHLIST_ITEM_TYPE.TEAM)}
                    >
                        <FontAwesomeIcon
                            icon={faStar}
                            className={`${style.star_icon} ${props.checkIfItemIsFavorite( props.game.teams.away.id, WISHLIST_ITEM_TYPE.TEAM) ? style.is_favorite : ""}`}
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
    );
}

export default HeaderView;