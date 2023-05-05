import React, {useState} from "react";
import ContestFixturesView from "./ContestFixturesView";
import {useParams} from "react-router-dom";
import {SPORTS} from "assets/constants/Data";

export function ContestFixturesContainer(props) {
    const {sport} = useParams();
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
            selectedSport={SPORTS[sport]}
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
