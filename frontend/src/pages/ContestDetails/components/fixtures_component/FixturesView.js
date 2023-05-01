import React from 'react';
import style from "./Fixtures.module.css"
import ContestFixtures from "components/contest_fixtures";


const FixturesView = (props) => {
    return (
        <div className={style.fixtures}>
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

export default FixturesView