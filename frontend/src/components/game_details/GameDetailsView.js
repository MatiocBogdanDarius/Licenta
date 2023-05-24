import * as React from 'react';
import style from "./GameDetails.module.css";
import {GAME_MENU} from "assets/constants/Data";
import GameEvents from "./components/game_events";
import GameStatistics from "./components/game_statistics";
import Header from "./components/header";
import LoadingSpinner from "components/loading_spinner";
import GameLineups from "./components/game_lineups";

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
                        <GameEvents
                            events={props.game.events}
                            homeTeamId={props.game.teams.home.id}
                        />
                    }
                    {props.view === GAME_MENU.STATISTICS &&
                        <GameStatistics statistics={props.game.statistics}/>
                    }
                    {props.view === GAME_MENU.LINEUPS &&
                        <GameLineups lineups={props.game.lineups}/>
                    }
                </>
                : <LoadingSpinner />
            }
        </div>
    );
}

export default GameDetailsView;