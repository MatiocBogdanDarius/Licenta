import React from 'react';
import style from "./Transfers.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

const TransfersView = (props) => {
    return (
        <div className={style.container}>
            {props.transfers.slice(0, props.numberOfVisibleTransfers).map((transfer, index, _) => {
                return (
                    <div key={`transfer-${index}`}
                        className={style.transfer_container}
                    >
                        <div className={style.date_container}>
                            <p>{transfer.date}</p>
                        </div>
                        <div className={style.player_container}>
                            <p className={style.player_name}>{transfer.player.name}</p>
                        </div>
                        <div className={style.team_sub_container}>
                            <FontAwesomeIcon
                                icon={transfer.teams.in.id === props.teamId ? faArrowRight : faArrowLeft}
                                className={transfer.teams.in.id === props.teamId ? style.red_arrow : style.green_arrow}
                            >
                            </FontAwesomeIcon>
                            <img
                                className={style.logo}
                                src={transfer.teams[transfer.teams.in.id === props.teamId ? "out" : "in"].logo}
                                alt=""
                            />
                            <p className={style.team_name}>
                                {transfer.teams[transfer.teams.in.id === props.teamId ? "out" : "in"].name}
                            </p>
                        </div>
                        <div className={style.type_sub_container}>
                            <p>{transfer.type === "N/A" ? "" : transfer.type}</p>
                        </div>
                    </div>
                );
            })}
            {props.isVisibleShowMoreButton &&
                <p className={style.link} onClick={props.showMoreButtonHandle}>
                    Show more matches
                </p>
            }
        </div>
    )
}

export default TransfersView