import React from "react";
import SquadView from "./SquadView";

export function SquadContainer(props) {
    return (
            <SquadView squad={props.squad}/>
    );
}
