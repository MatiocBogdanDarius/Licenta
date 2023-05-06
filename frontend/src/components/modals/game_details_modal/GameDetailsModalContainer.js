import React from "react";
import GameDetailsModalView from "./GameDetailsModalView";

export function GameDetailsModalContainer(props) {
    return (
        <GameDetailsModalView
            isOpen={props.isOpen}
            toggle={props.toggle}
            gameId={props.gameId}
            favoriteButtonHandle={props.favoriteButtonHandle}
            checkIfItemIsFavorite={props.checkIfItemIsFavorite}
        />);
}
