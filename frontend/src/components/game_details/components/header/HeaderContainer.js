import React from "react";
import HeaderView from "./HeaderView";

export function HeaderContainer(props) {
    const changeView = (event, view) => {
        event.preventDefault();
        props.changeView(view);
    }

    const getTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);

        return hours.substring(-2) + ":" + minutes;
    }

    const getDateTime = () => {
        const timestamp = props.game.fixture.timestamp
        const datetime = new Date(timestamp * 1000);
        const year = datetime.getFullYear();
        const month = ("0" + (datetime.getMonth() + 1)).slice(-2);
        const day = ("0" + datetime.getDate()).slice(-2);
        const time = getTime(timestamp);

        return day + "/" + month + "/" + year + "\n" + time;
    }

    const getStatus = () => {
        switch (props.game.fixture.status.short) {
            case 'NS':
                return '';
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

    return (
        <HeaderView
            game={props.game}
            view={props.view}
            season={props.game?.league.season}
            sport={props.sport}
            favoriteButtonHandle={props.favoriteButtonHandle}
            checkIfItemIsFavorite={props.checkIfItemIsFavorite}
            changeView={changeView}
            getDateTime={getDateTime}
            getStatus={getStatus}
        />
    );
}
