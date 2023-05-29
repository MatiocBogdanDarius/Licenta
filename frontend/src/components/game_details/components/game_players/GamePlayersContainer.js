import React from "react";
import GamePlayersView from "./GamePlayersView";

export function GamePlayersContainer(props) {
    return (
        <GamePlayersView teams={props.players}/>
    );
}
