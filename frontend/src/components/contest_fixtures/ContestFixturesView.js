import React from 'react';
import style from "./ContestFixtures.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp, faStar} from "@fortawesome/free-solid-svg-icons";
import GameFixture from "components/game_fixture";
import {WISHLIST_ITEM_TYPE} from "assets/constants/Data";
import StandingsModal from "components/modals/standingsModal";

const ContestFixturesView = (props) => {
    return (
        <div className={style.contest_container}>
            <div className={style.contest_container_header}>
                <div className={style.contest_infos_container}>
                    <div
                        className={style.star_icon_container}
                        onClick={(event) => props.favoriteButtonHandle(event, props.contest.id, WISHLIST_ITEM_TYPE.CONTEST)}
                    >
                        <FontAwesomeIcon
                            icon={faStar}
                            className={`${style.star_icon} ${props.checkIfItemIsFavorite(props.contest.id, WISHLIST_ITEM_TYPE.CONTEST) ? style.is_favorite : ""}`}
                        />
                    </div>
                    {props.contest.flag &&
                        <div className={style.contest_country_flag_container}>
                            <img src={props.contest.flag} className={style.flag_image} alt=""/>
                        </div>
                    }
                    <div className={style.contest_title_container}>
                        <p>{`${props.contest.country.toUpperCase()}: ${props.contest.name}`}</p>
                    </div>
                </div>
                <div className={style.contest_header_buttons_container}>
                    {props.isVisibleGamesFixture ?
                        <div
                            className={style.standings_button}
                            onClick={props.toggleStandingModal}
                        >
                            Standings
                        </div>
                        : <div className={style.display_all_contest_matches_button}
                             onClick={props.toggleMatchesListIconHandle}
                        >
                            {`display matches (${props.contest.games.length})`}
                        </div>}
                    <div className={style.toggle_matches_list_icon_container}>
                        <FontAwesomeIcon
                            icon={props.isVisibleGamesFixture ? faAngleDown : faAngleUp}
                            className={style.toggle_matches_list_icon}
                            onClick={props.toggleMatchesListIconHandle}
                        />
                    </div>
                </div>
            </div>
            {props.isVisibleGamesFixture &&
                <>
                    {props.contest.games.slice(0, props.numberOfVisibleMatches).map(game => {
                        return (
                            <div
                                key={`game-fixture-${game.fixture.id}`}
                                className={style.game_container}
                            >
                                <GameFixture
                                    game={game}
                                    selectedSport={props.selectedSport}
                                    showOnlyDateTime={props.showOnlyDateTime}
                                    checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                                    favoriteButtonHandle={props.favoriteButtonHandle}
                                />
                            </div>
                        )
                    })}
                </>
            }
            <StandingsModal
                isOpen={props.isOpenStandingModal}
                toggle={props.toggleStandingModal}
                contest={props.contest}
            />
        </div>
    )
}

export default ContestFixturesView