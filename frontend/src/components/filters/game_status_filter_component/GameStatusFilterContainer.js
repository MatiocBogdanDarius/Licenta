import React from "react";
import GameStatusFilterView from "./GameStatusFilterView";

export function GameStatusFilterContainer(props) {
    return (
        <GameStatusFilterView
            gameStatusFilterValue={props.gameStatusFilterValue}
            gameStatusFittersButtonsHandle={props.gameStatusFittersButtonsHandle}
        />
    );
}
