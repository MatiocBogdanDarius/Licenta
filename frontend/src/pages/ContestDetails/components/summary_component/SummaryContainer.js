import React from "react";
import SummaryView from "./SummaryView";

export function SummaryContainer(props) {
    return (
            <SummaryView
                selectedSport={props.selectedSport}
                fixtures={props.fixtures}
                league={props.league}
                season={props.season}
                favoriteButtonHandle={props.favoriteButtonHandle}
                checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                showMoreButtonHandle={props.changeView}
            />
    );
}
