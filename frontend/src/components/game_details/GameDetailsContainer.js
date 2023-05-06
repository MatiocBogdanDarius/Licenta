import React, {useEffect, useState} from "react";
import GameDetailsView from "./GameDetailsView";
import * as SPORT_EVENT_AGGREGATOR_SERVICE from "services/api/sport_event_aggregator";
import {GAME_MENU} from "assets/constants/Data";

export function GameDetailsContainer(props) {
    const [game, setGame] = useState();
    const [view, setView] = useState(GAME_MENU.EVENTS);

    useEffect(() => {
        getGame();
    }, []);

    const getGame = () => {
        SPORT_EVENT_AGGREGATOR_SERVICE
            .getGame(props.gameId)
            .then(response => {
                setGame(response.data[0]);
                console.log(response.data[0]);
            })
    }

    const changeView = (event, view) => {
        event.preventDefault();
        setView(view);
    }

    return (
        <GameDetailsView
            game={game}
            view={view}
            favoriteButtonHandle={props.favoriteButtonHandle}
            checkIfItemIsFavorite={props.checkIfItemIsFavorite}
            changeView={changeView}
        />
    );
}
