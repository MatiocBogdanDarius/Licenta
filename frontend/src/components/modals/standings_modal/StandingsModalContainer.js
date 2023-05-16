import React from "react";
import StandingsModalView from "./StandingsModalView";

export function StandingsModalContainer(props) {
    return (
        <StandingsModalView
            isOpen={props.isOpen}
            toggle={props.toggle}
            contest={props.contest}
        />);
}
