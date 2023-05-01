import React from 'react';
import style from "./Summary.module.css"
import {CONTEST_MENU} from "assets/constants/Data";
import ContestFixtures from "components/contest_fixtures";
import StandingsComponent from "../../../../components/standings";


const SummaryView = (props) => {
    return (
        <div className={style.summary}>
            {props.fixtures?.today?.games?.length !== 0 &&
                <>
                    <h2 className={style.section_title}>Today's Matches</h2>
                    <div className={style.contests_container}>
                        <ContestFixtures
                            contest={props.fixtures.today}
                            selectedSport={props.selectedSport}
                            numberOfVisibleMatches={10}
                            favoriteButtonHandle={props.favoriteButtonHandle}
                            checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                        />
                    </div>
                </>
            }
            {props.fixtures?.before_today?.games?.length &&
                <>
                    <h2 className={style.section_title}>Latest Scores</h2>
                    <div className={style.contests_container}>
                        <ContestFixtures
                            contest={props.fixtures.before_today}
                            selectedSport={props.selectedSport}
                            numberOfVisibleMatches={10}
                            showOnlyDateTime={true}
                            favoriteButtonHandle={props.favoriteButtonHandle}
                            checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                        />
                    </div>
                    <p
                        className={style.link}
                        onClick={() => props.showMoreButtonHandle(CONTEST_MENU.RESULTS)}
                    >
                        Show more matches
                    </p>
                </>
            }
            {props.fixtures.after_today?.games?.length &&
                <>
                    <h2 className={style.section_title}>Scheduled</h2>
                    <div className={style.contests_container}>
                        <ContestFixtures
                            contest={props.fixtures.after_today}
                            selectedSport={props.selectedSport}
                            numberOfVisibleMatches={10}
                            showOnlyDateTime={true}
                            favoriteButtonHandle={props.favoriteButtonHandle}
                            checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                        />
                    </div>
                    <p
                        className={style.link}
                        onClick={() => props.showMoreButtonHandle(CONTEST_MENU.FIXTURES)}
                    >
                        Show more matches
                    </p>
                </>
            }
            <div>
                <h2 className={style.section_title}>Standing</h2>
                <StandingsComponent
                    league={props.league}
                    season={props.season}
                />
            </div>
        </div>
    )
}

export default SummaryView