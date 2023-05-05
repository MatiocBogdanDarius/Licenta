import React from "react";
import GameStatisticsView from "./GameStatisticsView";
export function GameStatisticsContainer(props) {
    return (
        <GameStatisticsView statistics={props.statistics}/>
    );
}
