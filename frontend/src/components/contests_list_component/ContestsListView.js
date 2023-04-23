import React from 'react';
import style from "./ContestsList.module.css";
import ContestFixtures from 'components/contest_fixtures';
import LoadingSpinner from 'components/loading_spinner';

const ContestsListView = (props) => {
    return (
        <div>
            {props.contests.map(contest => {
                return (
                <div className={style.contest_container} key={`contest-fixtures-${props.contests.id}`}>
                    <ContestFixtures
                        contest={contest}
                        selectedSport={props.selectedSport}
                        setSelectedDate={props.setSelectedDate}
                        favoriteButtonHandle={props.favoriteButtonHandle}
                        checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                    />
                </div>
                );
            })}
            {props.onLoading && <LoadingSpinner />}
        </div>
    )
}

export default ContestsListView