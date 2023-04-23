import * as React from 'react';
import style from "./GameStatusFilter.module.css";
import {GAME_STATUS} from "assets/constants/Data";

function GameStatusFilterView(props) {
    const getButtonClassName = (buttonTargetStatus) => {
        return `${style.game_status_button} ${props.gameStatusFilterValue === buttonTargetStatus ? style.active_game_status_button : ''}`;
    }

    return (
        <div className={style.game_status_filters_container}>
            {Object.keys(GAME_STATUS).map(status => {
                return (
                    <div
                        key={`game-status-filter-${status}`}
                        className={getButtonClassName(status)}
                        onClick={() => props.gameStatusFittersButtonsHandle(status)}
                    >
                        <p>{status}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default GameStatusFilterView;