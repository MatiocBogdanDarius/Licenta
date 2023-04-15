import React from 'react';
import Footer from "components/footer";
import Copyright from "components/copyright";
import style from "./Home.module.css";
import Navbar from "components/navbar";
import {Container} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
    faBaseballBall,
    faBasketballBall, faCalendar,
    faFootballBall,
    faSoccerBall,
    faStar
} from "@fortawesome/free-solid-svg-icons";
import {SPORTS} from "assets/constants/Data";

const HomeView = (props) => {
    return (<div className={style.home}>
        <Navbar/>
        <div className={style.scrollable_area}>
            <div className={style.content}>
                <Container sx="lg" className={style.container}>
                    <div className={style.filters_container}>
                        <div className={style.countries_filter}>
                            <div className={style.header}>
                                <p>COUNTRIES</p>
                            </div>
                            {props.countries.map(country => {
                                return (<div  key={`contests-${country.name}`}>
                                    <div
                                        className={style.country_title}
                                        onClick={(e) => props.toggleCountryContestButtonsHandler(e, country.name)}
                                    >
                                        <p>{country.name}</p>
                                        <FontAwesomeIcon
                                            icon={country.isVisibleContests ? faAngleUp : faAngleDown}
                                            className={style.icon}
                                        />
                                    </div>
                                    {country.isVisibleContests && <div
                                        className={style.contests_list}>
                                        {country.contests.map(contest => {
                                            return <div
                                                key={`contests-${country.name}-${contest.league.id}`}
                                                className={style.contest_title}
                                                onClick={() => props.selectContestButtonsHandle(contest.league.id, contest.seasons[0].year)}
                                            >
                                                <p>{contest.league.name}</p>
                                            </div>
                                        })}
                                    </div>}
                                </div>)
                            })}
                            <div
                                className={style.show_more_countries_button}
                                onClick={props.showMoreCountriesButtonHandle}
                            >
                                <p>{`Show ${props.isVisibleAllCountries ? 'less' : 'more'}`}</p>
                                <FontAwesomeIcon
                                    icon={props.isVisibleAllCountries ? faAngleUp : faAngleDown}
                                    className={style.icon}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={style.schedules_and_sport_filter_container}>
                        <div className={style.sport_filter_container}>
                            <div className={style.sport_filter_buttons_list}>
                                <div
                                    className={`${style.sport_filter_button} ${props.selectedSport === SPORTS.FOOTBALL ? style.active_sport_filter_button : ''}`}
                                    onClick={(e) => props.selectSportButtonsHandler(e, SPORTS.FOOTBALL)}
                                >
                                    <FontAwesomeIcon
                                        icon={faSoccerBall}
                                        className={style.sport_filter_button_icon}
                                    />
                                    <p>FOOTBALL</p>
                                </div>
                                <div
                                    className={`${style.sport_filter_button} ${props.selectedSport === SPORTS.BASKETBALL ? style.active_sport_filter_button : ''}`}
                                    onClick={(e) => props.selectSportButtonsHandler(e, SPORTS.BASKETBALL)}
                                >
                                    <FontAwesomeIcon
                                        icon={faBasketballBall}
                                        className={style.sport_filter_button_icon}
                                    />
                                    <p>BASKETBALL</p>
                                </div>
                                <div
                                    className={`${style.sport_filter_button} ${props.selectedSport === SPORTS.BASEBALL ? style.active_sport_filter_button : ''}`}
                                    onClick={(e) => props.selectSportButtonsHandler(e, SPORTS.BASEBALL)}
                                >
                                    <FontAwesomeIcon
                                        icon={faBaseballBall}
                                        className={style.sport_filter_button_icon}
                                    />
                                    <p>BASEBALL</p>
                                </div>
                                <div
                                    className={`${style.sport_filter_button} ${props.selectedSport === SPORTS.RUGBY ? style.active_sport_filter_button : ''}`}
                                    onClick={(e) => props.selectSportButtonsHandler(e, SPORTS.RUGBY)}
                                >
                                    <FontAwesomeIcon
                                        icon={faFootballBall}
                                        className={style.sport_filter_button_icon}
                                    />
                                    <p>RUGBY</p>
                                </div>
                            </div>
                            <div className={style.sport_filter_more_option_button}>
                                <p>More</p>
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className={style.sport_filter_more_option_icon}
                                />
                            </div>
                        </div>
                        <div className={style.schedules_and_games_filters_container}>
                            <div className={style.games_filters_container}>
                                <div className={style.game_status_filters_container}>
                                    <div
                                        className={`${style.game_status_button} ${props.gameStatusFilterValue === 'ALL' ? style.active_game_status_button : ''}`}
                                        onClick={(e) => props.gameStatusFittersButtonsHandle(e, 'ALL')}
                                    >
                                        <p>ALL</p>
                                    </div>
                                    <div
                                        className={`${style.game_status_button} ${props.gameStatusFilterValue === 'LIVE' ? style.active_game_status_button : ''}`}
                                        onClick={(e) => props.gameStatusFittersButtonsHandle(e, 'LIVE')}
                                    >
                                        <p>LIVE</p>
                                    </div>
                                    <div
                                        className={`${style.game_status_button} ${props.gameStatusFilterValue === 'FINISHED' ? style.active_game_status_button : ''}`}
                                        onClick={(e) => props.gameStatusFittersButtonsHandle(e, 'FINISHED')}
                                    >
                                        <p>FINISHED</p>
                                    </div>
                                    <div
                                        className={`${style.game_status_button} ${props.gameStatusFilterValue === 'SCHEDULED' ? style.active_game_status_button : ''}`}
                                        onClick={(e) => props.gameStatusFittersButtonsHandle(e, 'SCHEDULED')}
                                    >
                                        <p>SCHEDULED</p>
                                    </div>
                                </div>
                                <div className={style.date_selector_container}>
                                    <div className={style.selected_date_container}>
                                        {props.selectedDate !== -7 ?
                                            <div
                                                className={style.previous_date_arrow_container}
                                                onClick={props.previousDateButtonHandle}
                                            >
                                                <FontAwesomeIcon icon={faAngleLeft} />
                                            </div>
                                            : <div className={style.disable_previous_next_button}></div>
                                        }
                                        <div
                                            className={style.date_container}
                                            onClick={props.toggleDatsOptionsList}
                                        >
                                            <FontAwesomeIcon icon={faCalendar} />
                                            <p>{props.datesList[props.selectedDate]}</p>
                                        </div>
                                        {props.selectedDate !== 7 ?
                                            <div
                                                className={style.next_date_arrow_container}
                                                onClick={props.nextDateButtonHandle}
                                            >
                                                <FontAwesomeIcon icon={faAngleRight} />
                                            </div>
                                            : <div className={style.disable_previous_next_button}></div>
                                        }
                                    </div>
                                    {props.isVisibleDateOptionsList &&
                                        <div className={style.date_options_list}>
                                            {Object.keys(props.datesList)
                                                .map(x => parseInt(x))
                                                .sort((x,y) => x - y)
                                                .map(selectedDate => {
                                                    return <div
                                                        key={`date-${selectedDate}`}
                                                        className={`${style.date_option_container} ${props.selectedDate === selectedDate ? style.active_date_option : ''}`}
                                                        onClick={(e) => props.selectDateOptionHandle(e, selectedDate)}
                                                    >
                                                        <p>{props.datesList[selectedDate]}</p>
                                                    </div>
                                                })}
                                        </div>
                                    }
                                </div>
                            </div>
                            {props.contests.map(contest => {
                                return <div
                                    key={`contest-${contest.id}`}
                                    className={style.contest_container}
                                >
                                    <div className={style.contest_container_header}>
                                        <div className={style.contest_infos_container}>
                                            <div className={style.star_icon_container}>
                                                <FontAwesomeIcon icon={faStar} className={style.star_icon}/>
                                            </div>
                                            <div className={style.contest_country_flag_container}>
                                                <img src={contest.flag} className={style.flag_image} alt=""  />
                                            </div>
                                            <div className={style.contest_title_container}>
                                                <p>{`${contest.country.toUpperCase()}: ${contest.name}`}</p>
                                            </div>
                                        </div>
                                        <div className={style.contest_header_buttons_container}>
                                            {props.visibleMatchesDictionary[contest.id] ?
                                                <div className={style.standings_button}>Standings</div> :
                                                <div className={style.display_all_contest_matches_button}
                                                     onClick={(e) => props.toggleMatchesListIconHandle(e, contest.id)}
                                                >
                                                    {`display matches (${contest.games.length})`}
                                                </div>}
                                            <div className={style.toggle_matches_list_icon_container}>
                                                <FontAwesomeIcon
                                                    icon={props.visibleMatchesDictionary[contest.id] ? faAngleDown : faAngleUp}
                                                    className={style.toggle_matches_list_icon}
                                                    onClick={(e) => props.toggleMatchesListIconHandle(e, contest.id)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {props.visibleMatchesDictionary[contest.id] &&
                                        <>
                                            {contest.games.map(game => {
                                                return <div
                                                    key={`game-${game.fixture.id}`}
                                                    className={style.game_container}
                                                >
                                                    <div className={style.fixture_date_and_teams_container}>
                                                        <div className={style.fixture_date_container}>
                                                            <p className={props.checkIfGameIsLive(game) ? style.red_font : ''}>
                                                                {props.formatDate(game)}
                                                            </p>
                                                        </div>
                                                        <div className={style.fixture_teams_container} >
                                                            <div className={style.fixture_team_container}>
                                                                <div className={style.team_logo_container}>
                                                                    <img
                                                                        src={game.teams.home.logo}
                                                                        className={style.team_logo}
                                                                        alt =""
                                                                    />
                                                                </div>
                                                                <div className={style.team_info_container}>
                                                                    <p>{game.teams.home.name}</p>
                                                                </div>
                                                            </div>
                                                            <div className={style.fixture_team_container}>
                                                                <div className={style.team_logo_container}>
                                                                    <img
                                                                        src={game.teams.away.logo}
                                                                        className={style.team_logo}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className={style.team_info_container}>
                                                                    <p>{game.teams.away.name}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={style.fixture_score_container}>
                                                        <div className={style.team_score_container}>
                                                            <p className={props.checkIfGameIsLive(game) ? style.red_font : ''}>
                                                                {props.getScore(game, 'home')}
                                                            </p>
                                                        </div>
                                                        <div className={style.team_score_container}>
                                                            <p className={props.checkIfGameIsLive(game) ? style.red_font : ''}>
                                                                {props.getScore(game, 'away')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                        </>
                                    }
                                </div>
                            })}
                        </div>
                    </div>
                </Container>
            </div>
            <Footer/>
            <Copyright/>
        </div>
    </div>)
}

export default HomeView
