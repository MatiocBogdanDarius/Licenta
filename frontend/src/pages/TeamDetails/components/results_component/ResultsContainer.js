import React, {useEffect, useState} from "react";
import ResultsView from "./ResultsView";

export function ResultsContainer(props) {
    const [numberOfVisibleMatches, setNumberOfVisibleMatches] =
        useState(Math.min(props.fixtures.games.length, 10));
    const [isVisibleShowMoreButton, setIsVisibleShowMoreButton] =
        useState(props.fixtures.games.length > 10)

    useEffect(() => {
        setIsVisibleShowMoreButton(numberOfVisibleMatches < props.fixtures.games.length)
    }, [numberOfVisibleMatches, props.fixtures.games.length])

    const showMoreButtonHandle = (event) => {
        event.preventDefault();

        setNumberOfVisibleMatches(prevState =>
            Math.min(props.fixtures.games.length, prevState + 5)
        );
    }

    return (
            <ResultsView
                fixtures={props.fixtures}
                selectedSport={props.selectedSport}
                numberOfVisibleMatches={numberOfVisibleMatches}
                isVisibleShowMoreButton={isVisibleShowMoreButton}
                favoriteButtonHandle={props.favoriteButtonHandle}
                checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                showMoreButtonHandle={showMoreButtonHandle}
            />
    );
}
