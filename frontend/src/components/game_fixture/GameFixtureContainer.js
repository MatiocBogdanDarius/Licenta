import React, {useState} from "react";
import GameFixtureView from "./GameFixtureView";
import {GAME_STATUS_FILTERS_VALUES, SPORTS} from "assets/constants/Data";
import {TEAM_DETAILS} from "navigation/CONSTANTS";
import {useNavigate} from "react-router-dom";

export function GameFixtureContainer(props) {
    const navigate = useNavigate();
    const [isOpenGameDetailsModal, setIsOpenGameDetailsModal] = useState(false);

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

        switch (props.selectedSport){
            case SPORTS.FOOTBALL:
                const scoreHalftime = props.game.score?.halftime[contestant];
                return goals != null ? `${goals ?? ''} (${scoreHalftime ?? ''})` : "-";
            case SPORTS.HANDBALL:
                return `${goals ?? '-'}`
            case SPORTS.BASKETBALL:
                return `${goals?.total ?? "-"}`
            case SPORTS.BASEBALL:
                return `${goals?.total ?? "-"}`
            default:
                return "-"
        }
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
            checkIfItemIsFavorite={props.checkIfItemIsFavorite}
            favoriteButtonHandle={props.favoriteButtonHandle}
            checkIfGameIsLive={checkIfGameIsLive}
            getFormattedDate={getFormattedDate}
            getScore={getScore}
            viewTeamDetails={viewTeamDetails}
            toggleGameDetailsModal={toggleGameDetailsModal}
        />
    );
}
