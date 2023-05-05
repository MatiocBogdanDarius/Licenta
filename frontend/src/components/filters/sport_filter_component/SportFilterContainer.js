import React from "react";
import SportFilterView from "./SportFilterView";
import {useNavigate, useParams} from "react-router-dom";
import {HOMEPAGE} from "navigation/CONSTANTS";

export function SportFilterContainer() {
    const {sport} = useParams();
    const navigate = useNavigate();

    const selectSportButtonsHandler = (selectedSport) => {
        navigate(`${HOMEPAGE}/${selectedSport}`)
    }

    return (
        <SportFilterView
            selectedSport={sport}
            selectSportButtonsHandler={selectSportButtonsHandler}
        />
    );
}
