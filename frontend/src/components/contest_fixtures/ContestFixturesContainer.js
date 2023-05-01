import React, {useState} from "react";
import ContestFixturesView from "./ContestFixturesView";

export function ContestFixturesContainer(props) {
    const [isVisibleGamesFixture, setIsVisibleGamesFixture] = useState(true);
    const [isOpenStandingModal, setIsOpenStandingModal] = useState(false);

    const toggleMatchesListIconHandle = () => {
        setIsVisibleGamesFixture(prevState => !prevState)
    }

    const toggleStandingModal = () => {
        setIsOpenStandingModal(prevState => !prevState)
    }

    return (
        <ContestFixturesView
            contest={props.contest}
            isVisibleGamesFixture={isVisibleGamesFixture}
            selectedSport={props.selectedSport}
            numberOfVisibleMatches={props.numberOfVisibleMatches}
            showOnlyDateTime={props.showOnlyDateTime}
            isOpenStandingModal={isOpenStandingModal}
            favoriteButtonHandle={props.favoriteButtonHandle}
            checkIfItemIsFavorite={props.checkIfItemIsFavorite}
            toggleMatchesListIconHandle={toggleMatchesListIconHandle}
            toggleStandingModal={toggleStandingModal}
        />
    );
}
