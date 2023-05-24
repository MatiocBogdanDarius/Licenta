import React from "react";
import GameLineupsView from "./GameLineupsView";

export function GameLineupsContainer(props) {
    return (
        <GameLineupsView events={props.lineups}/>
    );
}
