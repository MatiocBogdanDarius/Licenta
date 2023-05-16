import React from "react";
import GameDetailsModalView from "./GameDetailsModalView";

export function GameDetailsModalContainer(props) {
    return (
        <GameDetailsModalView
            isOpen={props.isOpen}
            sport={props.sport}
            gameId={props.gameId}
            toggle={props.toggle}
            favoriteButtonHandle={props.favoriteButtonHandle}
            checkIfItemIsFavorite={props.checkIfItemIsFavorite}
        />);
}
