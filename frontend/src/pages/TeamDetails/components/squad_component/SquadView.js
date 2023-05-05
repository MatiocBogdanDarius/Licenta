import React from 'react';
import style from "./Squad.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSoccerBall, faTShirt} from "@fortawesome/free-solid-svg-icons";

const SquadView = (props) => {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.player_container}>
                    <div className={style.player_name_header}>NAME</div>
                </div>
                <div className={style.statistics_and_nationality_container}>
                    <div className={style.statistics_container}>
                        <div className={style.statistics_column}>AGE</div>
                        <div className={style.statistics_column}>
                            <FontAwesomeIcon icon={faTShirt}/>
                        </div>
                        <div className={style.statistics_column}>
                            <FontAwesomeIcon icon={faSoccerBall}/>
                        </div>
                        <div className={style.statistics_column}>
                            <div className={`${style.card_yellow}`}></div>
                        </div>
                        <div className={style.statistics_column}>
                            <div className={`${style.card_red}`}></div>
                        </div>
                    </div>
                    <div className={style.nationality_column}>NATIONALITY</div>
                </div>
            </div>
            {props.squad.map(member => {
                return (
                    <div className={style.row}>
                        <div className={style.player_container}>
                            <img
                                className={style.player_logo}
                                src={member.player.photo}
                                alt=""
                            />
                            <div className={style.player_name}>
                                {`${member.player.firstname} ${member.player.lastname}`}
                            </div>
                        </div>
                        <div className={style.statistics_and_nationality_container}>
                            <div className={style.statistics_container}>
                                <div className={style.statistics_column}>
                                    {member.player.age}
                                </div>
                                <div className={style.statistics_column}>
                                    {member.statistics[0].games.appearences ?? 0}
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
                            </div>
                            <div className={style.nationality_column}>
                                {member.player.nationality}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default SquadView