import React from "react";
import TeamPlayersStatisticsView from "./TeamPlayersStatisticsView";

export function TeamPlayersStatisticsContainer(props) {
    return (
        <TeamPlayersStatisticsView
            players={props.players}
        />
    );
}
