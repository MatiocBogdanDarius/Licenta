import * as React from 'react';
import style from './GameList.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp, faCalendarPlus} from "@fortawesome/free-solid-svg-icons";

function GameListView(props) {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.header_left}>
                    {/*<FontAwesomeIcon*/}
                    {/*    icon={faCalendarPlus}*/}
                    {/*    type="checkbox"*/}
                    {/*    // onClick={() => props.handleCheck(game)}*/}
                    {/*    className={`${style.check_button} ${props.isCheckedAllAfterTodayGames ? style.checked : ''}`}*/}
                    {/*/>*/}
                    <h2 className={style.header_title}>{props.title}</h2>
                </div>
                <FontAwesomeIcon
                    icon={props.showGames ? faAngleUp : faAngleDown}
                    className={style.toggle_matches_list_icon}
                    onClick={props.toggleMatchesListIconHandle}
                />
            </div>
            {props.showGames && props.games?.map(game => {
                return (
                    <div
                        key={game.fixture.id}
                        className={style.game_container}
                    >
                        <div className={style.game_info_and_check_button}>
                            <FontAwesomeIcon
                                icon={faCalendarPlus}
                                type="checkbox"
                                onClick={() => props.handleCheck(game)}
                                className={props.isChecked(game) ? style.checked : ''}
                            />
                            <div className={style.game_info}>
                                <div className={style.home_team_container}>
                                    <div>{game.teams.home.name}</div>
                                    <img
                                        src={game.teams.home.logo}
                                        className={style.team_logo}
                                        alt=""
                                    />
                                </div>
                                {" - "}
                                <div className={style.away_team_container}>
                                    <img
                                        src={game.teams.away.logo}
                                        className={style.team_logo}
                                        alt=""
                                    />
                                    <div>{game.teams.away.name}</div>
                                </div>
                            </div>
                        </div>
                        <div>{props.getDateTime(game.fixture.timestamp)}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default GameListView;