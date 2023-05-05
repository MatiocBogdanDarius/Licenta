import React from "react";
import GameEventsView from "./GameEventsView";

export function GameEventsContainer(props) {
    return (
        <GameEventsView events={props.events} homeTeamId={props.homeTeamId}/>
    );
}
