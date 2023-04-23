import React from "react";
import SportFilterView from "./SportFilterView";

export function SportFilterContainer(props) {
    return (
        <SportFilterView
            selectedSport={props.selectedSport}
            selectSportButtonsHandler={props.selectSportButtonsHandler}
        />
    );
}
