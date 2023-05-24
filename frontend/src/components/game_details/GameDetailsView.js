import * as React from 'react';
import style from "./GameDetails.module.css";
import {GAME_MENU} from "assets/constants/Data";
import GameEvents from "./components/game_events";
import GameStatistics from "./components/game_statistics";
import Header from "./components/header";
import LoadingSpinner from "components/loading_spinner";

function GameDetailsView(props) {
    return (
        <div className={style.container}>
            {props.game ?
                <>
                    <Header
                        game={props.game}
                        view={props.view}
                        season={props.game?.league.season}
                        sport={props.sport}
                        changeView={props.changeView}
                        favoriteButtonHandle={props.favoriteButtonHandle}
                        checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                    />
                    {props.view === GAME_MENU.EVENTS &&
                        <div className={style.game_events_container}>
                            <GameEvents
                                events={props.game.events}
                                homeTeamId={props.game.teams.home.id}
                            />
                        </div>
                    }
                    {props.view === GAME_MENU.STATISTICS &&
                        <div className={style.game_events_container}>
                            <GameStatistics statistics={props.game.statistics}/>
                        </div>
                    }
                </>
                : <LoadingSpinner />
            }
        </div>
    );
}

export default GameDetailsView;