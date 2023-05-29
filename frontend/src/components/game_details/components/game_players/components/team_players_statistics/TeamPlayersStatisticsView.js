import * as React from 'react';
import style from "./TeamPlayersStatistics.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSoccerBall} from "@fortawesome/free-solid-svg-icons";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import PLAYER_ASSIST_ICON from 'assets/images/footballAssistIcon.png'
import PLAYER_POSITION_ICON from 'assets/images/player_position.png'

function TeamPlayersStatisticsView(props) {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.player_container}>
                    <div className={style.player_name_header}>NAME</div>
                </div>
                <div className={style.statistics_container}>
                    <div className={style.statistics_column}>RANK</div>
                    <div className={style.statistics_column}>
                        <FontAwesomeIcon icon={faClock}/>
                    </div>
                    <div className={style.statistics_column}>
                        <FontAwesomeIcon icon={faSoccerBall}/>
                    </div>
                    <div className={style.statistics_column}>
                        <div className={style.card_yellow}></div>
                    </div>
                    <div className={style.statistics_column}>
                        <div className={style.card_red}></div>
                    </div>
                    <div className={style.statistics_column}>
                        <img className={style.icon} alt=""
                             src={PLAYER_ASSIST_ICON}
                        />
                    </div>
                    <div className={style.statistics_column}>
                        <img className={style.icon} alt=""
                             src={PLAYER_POSITION_ICON}
                        />
                    </div>
                </div>
            </div>
            {props.players.map(member => {
                return (
                    <div className={style.row}>
                        <div className={style.player_container}>
                            <img
                                className={style.player_photo}
                                src={member.player.photo}
                                alt=""
                            />
                            <div className={style.player_name}>
                                {`${member.player.name}`}
                            </div>
                        </div>
                        <div className={style.statistics_container}>
                            <div className={style.statistics_column}>
                                {member.statistics[0].games.rating ?? '-'}
                            </div>
                            <div className={style.statistics_column}>
                                {member.statistics[0].games.minutes ?? 0}
                            </div>
                            <div className={style.statistics_column}>
                                {member.statistics[0].goals.total ?? 0}
                            </div>
                            <div className={style.statistics_column}>
                                {member.statistics[0].cards.yellow ?? 0}
                            </div>
                            <div className={style.statistics_column}>
                                {member.statistics[0].cards.red ?? 0}
                            </div>
                            <div className={style.statistics_column}>
                                {member.statistics[0].goals.assists ?? 0}
                            </div>
                            <div className={style.statistics_column}>
                                {member.statistics[0].games.position ?? '-'}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default TeamPlayersStatisticsView;