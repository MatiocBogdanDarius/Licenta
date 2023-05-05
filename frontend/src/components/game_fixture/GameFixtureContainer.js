import React, {useState} from "react";
import GameFixtureView from "./GameFixtureView";
import {GAME_STATUS_FILTERS_VALUES, SPORTS, WISHLIST_ITEM_TYPE} from "assets/constants/Data";
import {TEAM_DETAILS} from "navigation/CONSTANTS";
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

    const getTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);

        return hours.substring(-2) + ":" + minutes;
    }

    const getDateTime = (timestamp) => {
        const datetime = new Date(timestamp * 1000);
        const year = datetime.getFullYear();
        const month = ("0" + (datetime.getMonth() + 1)).slice(-2);
        const day = ("0" + datetime.getDate()).slice(-2);
        const time = getTime(timestamp);

        return day + "/" + month + "/" + year + "\n" + time;
    }

    const getFormattedDate = () => {
        if (props.showOnlyDateTime){
            return getDateTime(props.game.fixture.timestamp);
        }

        switch (props.game.fixture.status.short) {
            case 'NS':
                return getTime(props.game.fixture.timestamp);
            case '1H':
            case '2H':
            case 'ET':
                if (props.game.fixture.status.elapsed)
                    return props.game.fixture.status.elapsed + "'";
                return getTime(props.game.fixture.timestamp);
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
                return props.game.fixture.status.long;
        }
    }

    const getScore = (contestant) => {
        const goals = props.game.goals[contestant];

        if (props.selectedSport === SPORTS.FOOTBALL) {
            const scoreHalftime = props.game.score?.halftime[contestant];
            if (goals != null) {
                return `${goals} (${scoreHalftime})`
            }
            return "-";
        } else if (props.selectedSport === SPORTS.HANDBALL){
            if (goals != null) {
                return `${goals}`
            }
            return "-";
        } else if (props.selectedSport === SPORTS.BASKETBALL){
            if (goals.total !== null) {
                return `${goals.total}`
            }
            return "-";
        } else if (props.selectedSport === SPORTS.BASEBALL){
            if (goals !== null) {
                return `${goals}`
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
