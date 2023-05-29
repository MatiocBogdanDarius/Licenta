import React, {useEffect, useState} from "react";
import GameDetailsView from "./GameDetailsView";
import * as SPORT_EVENT_AGGREGATOR_SERVICE from "services/api/sport_event_aggregator";
import {GAME_MENU_OPTIONS, SPORTS} from "assets/constants/Data";

export function GameDetailsContainer(props) {
    const [game, setGame] = useState();
    const [view, setView] = useState(GAME_MENU_OPTIONS.EVENTS);

    useEffect(() => {
        getGame();
    }, []);

    useEffect(() => {
        if (props.sport) {
            const defaultView = props.sport === SPORTS.FOOTBALL.name
                ? GAME_MENU_OPTIONS.EVENTS
                : GAME_MENU_OPTIONS.SCORE_EVOLUTION

            setView(defaultView);
        }
    }, [props.sport]);

    const getGame = () => {
        SPORT_EVENT_AGGREGATOR_SERVICE
            .getGame(props.sport, props.gameId)
            .then(response => {
                setGame(response.data[0]);
                console.log(response.data[0]);
            })
    }

    return (
        <GameDetailsView
            game={game}
            view={view}
            season={game?.league.season}
            sport={props.sport}
            favoriteButtonHandle={props.favoriteButtonHandle}
            checkIfItemIsFavorite={props.checkIfItemIsFavorite}
            changeView={setView}
        />
    );
}
