import React, {useState} from "react";
import GameFixtureView from "./GameFixtureView";
import {GAME_STATUS_FILTERS_VALUES, SPORTS, WISHLIST_ITEM_TYPE} from "assets/constants/Data";
import {CONTEST_DETAILS, TEAM_DETAILS} from "navigation/CONSTANTS";
import {useNavigate} from "react-router-dom";

export function GameFixtureContainer(props) {
    const navigate = useNavigate();
    const [isOpenGameDetailsModal, setIsOpenGameDetailsModal] = useState(false);

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
        if (props.showOnlyDateTime){
            const timestamp = props.game.fixture.timestamp;
            const datetime = new Date(timestamp * 1000);
            const year = datetime.getFullYear();
            const month = ("0" + (datetime.getMonth() + 1)).slice(-2);
            const day = ("0" + datetime.getDate()).slice(-2);
            const hours = ("0" + datetime.getHours()).slice(-2);
            const minutes = ("0" + datetime.getMinutes()).slice(-2);
            return day + "/" + month + "/" + year + "\n" + hours + ":" + minutes;
        }

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

    const viewTeamDetails = (team, league) => {
        const path = `${TEAM_DETAILS}/${props.selectedSport.name}/${league.country}/${team.name}/${team.id}/${league.season}`;
        navigate(path, {replace: true});
    }

    const toggleGameDetailsModal = () => {
        setIsOpenGameDetailsModal(prevState => !prevState)
    }

    return (
        <GameFixtureView
            game={props.game}
            selectedSport={props.selectedSport}
            isOpenGameDetailsModal={isOpenGameDetailsModal}
            checkIfItemIsFavorite={checkIfItemIsFavorite}
            favoriteButtonHandle={favoriteButtonHandle}
            checkIfGameIsLive={checkIfGameIsLive}
            getFormattedDate={getFormattedDate}
            getScore={getScore}
            viewTeamDetails={viewTeamDetails}
            toggleGameDetailsModal={toggleGameDetailsModal}
        />
    );
}
