import React from "react";
import GameFixtureView from "./GameFixtureView";
import {GAME_STATUS_FILTERS_VALUES, SPORTS, WISHLIST_ITEM_TYPE} from "assets/constants/Data";

export function GameFixtureContainer(props) {
    const checkIfItemIsFavorite = () => {
        return props.checkIfItemIsFavorite(props.game.fixture.id, WISHLIST_ITEM_TYPE.GAME);
    }

    const favoriteButtonHandle = (event) => {
        return props.favoriteButtonHandle(event, props.game.fixture.id, WISHLIST_ITEM_TYPE.GAME);
    }

    const checkIfGameIsLive = () => {
        return GAME_STATUS_FILTERS_VALUES.LIVE.value.includes(props.game.fixture.status.short);
    }

    const getFormattedDate = () => {
        switch (props.game.fixture.status.short) {
            case 'NS':
                const timestamp = props.game.fixture.timestamp
                const date = new Date(timestamp * 1000);
                const hours = ("0" + date.getHours()).slice(-2);
                const minutes = ("0" + date.getMinutes()).slice(-2);
                return hours.substring(-2) + ":" + minutes;
            case '1H':
            case '2H':
            case 'ET':
                return props.game.fixture.status.elapsed + "'"
            case 'FT':
            case 'AET':
            case 'PEN':
                return 'Finished'
            case 'TBD':
            case 'HT':
            case 'BT':
            case 'P':
            case 'SUSP':
            case 'INT':
            case 'PST':
            case 'CANC':
            case 'ABD':
            case 'WO':
            case 'AWD':
            case 'LIVE':
            default:
                return props.game.fixture.status.long
        }
    }

    const getScore = (contestant) => {
        const goals = props.game.goals[contestant];
        const scoreHalftime = props.game.score.halftime[contestant];

        if (props.selectedSport === SPORTS.FOOTBALL) {
            if (goals != null) {
                return `${goals} (${scoreHalftime})`
            }
            return "-";
        }
        return "-";
    }

    return (
        <GameFixtureView
            game={props.game}
            selectedSport={props.selectedSport}
            checkIfItemIsFavorite={checkIfItemIsFavorite}
            favoriteButtonHandle={favoriteButtonHandle}
            checkIfGameIsLive={checkIfGameIsLive}
            getFormattedDate={getFormattedDate}
            getScore={getScore}
        />
    );
}
