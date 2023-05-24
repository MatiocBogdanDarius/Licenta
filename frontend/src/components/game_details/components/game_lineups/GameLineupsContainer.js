import React from "react";
import GameLineupsView from "./GameLineupsView";

export function GameLineupsContainer(props) {
    return (
        <GameLineupsView lineups={props.lineups}/>
    );
}
