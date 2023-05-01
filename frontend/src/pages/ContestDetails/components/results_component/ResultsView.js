import React from 'react';
import style from "./Results.module.css";
import ContestFixtures from "components/contest_fixtures";

const ResultsView = (props) => {
    return (
        <div className={style.results}>
            <ContestFixtures
                contest={props.fixtures}
                selectedSport={props.selectedSport}
                numberOfVisibleMatches={props.numberOfVisibleMatches}
                showOnlyDateTime={true}
                favoriteButtonHandle={props.favoriteButtonHandle}
                checkIfItemIsFavorite={props.checkIfItemIsFavorite}
            />
            {props.isVisibleShowMoreButton &&
                <p className={style.link} onClick={props.showMoreButtonHandle}>
                    Show more matches
                </p>
            }
        </div>
    )
}

export default ResultsView