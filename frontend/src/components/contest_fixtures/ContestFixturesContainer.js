import React, {useState} from "react";
import ContestFixturesView from "./ContestFixturesView";

export function ContestFixturesContainer(props) {
    const [isVisibleGamesFixture, setIsVisibleGamesFixture] = useState(true)

    const toggleMatchesListIconHandle = () => {
        setIsVisibleGamesFixture(prevState => !prevState)
    }

    return (
        <ContestFixturesView
            contest={props.contest}
            isVisibleGamesFixture={isVisibleGamesFixture}
            selectedSport={props.selectedSport}
            favoriteButtonHandle={props.favoriteButtonHandle}
            checkIfItemIsFavorite={props.checkIfItemIsFavorite}
            toggleMatchesListIconHandle={toggleMatchesListIconHandle}
        />
    );
}
