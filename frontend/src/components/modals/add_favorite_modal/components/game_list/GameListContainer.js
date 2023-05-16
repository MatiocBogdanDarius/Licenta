import React, {useState} from "react";
import GameListView from "./GameListView";


export function GameListContainer(props) {
    const [showGame, setShowGame] = useState(false);

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

    const handleCheck = (game) => {
        if(isChecked(game)){
            props.setSelectedGames(prevState => {
                return [...prevState]
                    .filter(currentGame => currentGame !== game)
            })
        } else {
            props.setSelectedGames(prevState => {
                return [...prevState, game];
            })
        }
    }

    const isChecked = (game) => {
        return props.selectedGames.includes(game)
    }


    const toggleMatchesListIconHandle = () => {
        setShowGame(prevState => !prevState)
    }

    return (
        <GameListView
            title={props.title}
            games={props.games}
            selectedGames={props.selectedGames}
            showGames={showGame}
            getDateTime={getDateTime}
            handleCheck={handleCheck}
            isChecked={isChecked}
            toggleMatchesListIconHandle={toggleMatchesListIconHandle}
        />);
}
