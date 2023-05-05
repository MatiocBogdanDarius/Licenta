import * as React from 'react';
import style from "./GameEvents.module.css";
import playerSubstitutionIcon from 'assets/images/player_substitution.png'

function GameEventsView(props) {
    return (
        <div className={style.container}>
            {props.events?.length === 0 && <p>Events are not available</p>}
            {props.events.map((event, index, _) => {
                return (
                    <div key={`game-event-${index}`}
                        className={`${style.event_container} ${event.team.id !== props.homeTeamId ? style.display_reverse : ''}`}
                    >
                        <div className={style.event_time}>{event.time.elapsed}'</div>
                        <div className={style.event_type}>
                            {event.type === "Card" && event.detail === "Yellow Card" &&
                                <div className={`${style.card_yellow}`}></div>
                            }
                            {event.type === "Card" && event.detail === "Red Card" &&
                                <div className={`${style.card_red}`}></div>
                            }
                            {event.type === "subst" &&
                                <img
                                    className={`${style.player_substitution_icon}`}
                                    src={playerSubstitutionIcon}
                                    alt=""
                                />
                            }
                            {event.type === "Goal" &&
                                <div className={style.goal}>GOAL!</div>
                            }
                        </div>
                        <div className={style.event_player}>{event.player.name}</div>
                        {event.assist.name &&
                            <div className={style.event_assist}>({event.assist.name})</div>
                        }
                    </div>
                );
            })}
        </div>
    );
}

export default GameEventsView;