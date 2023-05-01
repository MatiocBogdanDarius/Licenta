import React from 'react';
import style from "./ContestDetails.module.css";
import {Container} from "reactstrap";
import Navbar from "components/navbar";
import AddFavoriteModal from "components/modals/add_favorite_modal";
import Footer from "components/footer";
import Copyright from "components/copyright";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faArrowLeft, faStar} from "@fortawesome/free-solid-svg-icons";
import {CONTEST_MENU, WISHLIST_ITEM_TYPE} from "assets/constants/Data";
import LoadingSpinner from "components/loading_spinner"
import StandingsComponent from "components/standings"
import Summary from "./components/summary_component";
import Results from "./components/results_component";
import Fixtures from "./components/fixtures_component";

const ContestDetailsView = (props) => {
    return (
        <div className={style.contest_details}>
            <Navbar/>
            <div className={style.scrollable_area}>
                <div className={style.content}>
                    <Container sx="lg" className={style.container}>
                        {props.onLoadingInfo ?
                            <div>
                                <LoadingSpinner />
                            </div>
                            : <div
                                className={style.back_button}
                                onClick={props.goBackButtonHandle}
                            >
                                <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    className={style.back_button_icon}
                                />
                            </div>
                        }
                        {props.contest &&
                            <div className={style.header}>
                                <div className={style.path_container}>
                                    <FontAwesomeIcon icon={props.selectedSport.icon} className={style.icon}/>
                                    <p className={style.sport_link}>{props.selectedSport.name}</p>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    {props.contest.country.flag &&
                                        <div className={style.contest_country_flag_container}>
                                            <img src={props.contest.country.flag} className={style.flag_image} alt=""/>
                                        </div>
                                    }
                                    <p className={style.country_link}>{props.contest.country.name}</p>
                                </div>
                                <div className={style.info_container}>
                                    {props.contest.league.logo &&
                                        <div className={style.contest_league_flag_container}>
                                            <img src={props.contest.league.logo} className={style.flag_image} alt=""/>
                                        </div>
                                    }
                                    <h1 className={style.league_title}>{props.contest.league.name}</h1>
                                    <div
                                        className={style.star_icon_container}
                                        onClick={(event) => props.favoriteButtonHandle(event, props.contest.league.id, WISHLIST_ITEM_TYPE.CONTEST)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className={`${style.star_icon} ${props.checkIfItemIsFavorite(props.contest.league.id, WISHLIST_ITEM_TYPE.CONTEST) ? style.is_favorite : ""}`}
                                        />
                                    </div>
                                </div>
                                <div className={style.menu_container}>
                                    {Object.values(CONTEST_MENU).map(item => {
                                        return (
                                            <p
                                                key={`item-${item}`}
                                                className={`${style.menu_item} ${props.view === item ? style.active_menu_item : ""}`}
                                                onClick={(e) => props.changeView(e, item)}
                                            >
                                                {item}
                                            </p>
                                        )
                                    })}
                                </div>
                            </div>
                        }
                        {props.onLoadingFixtures ?
                            <LoadingSpinner />
                            : <>
                                {props.view === CONTEST_MENU.SUMMARY && props.fixtures &&
                                    <Summary
                                        fixtures={props.fixtures}
                                        selectedSport={props.selectedSport}
                                        league={props.contest.league.id}
                                        season={props.contest.seasons[0].year}
                                        favoriteButtonHandle={props.favoriteButtonHandle}
                                        checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                                        changeView={props.changeView}
                                    />
                                }
                                {props.view === CONTEST_MENU.RESULTS &&
                                    <Results
                                        fixtures={props.fixtures.before_today}
                                        selectedSport={props.selectedSport}
                                        favoriteButtonHandle={props.favoriteButtonHandle}
                                        checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                                        changeView={props.changeView}
                                    />
                                }
                                {props.view === CONTEST_MENU.FIXTURES &&
                                    <Fixtures
                                        fixtures={props.fixtures.after_today}
                                        selectedSport={props.selectedSport}
                                        favoriteButtonHandle={props.favoriteButtonHandle}
                                        checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                                        changeView={props.changeView}
                                    />
                                }
                                {props.view === CONTEST_MENU.STANDINGS &&
                                    <StandingsComponent
                                        league={props.contest.league.id}
                                        season={props.contest.seasons[0].year}
                                    />
                                }
                            </>
                        }
                    </Container>
                </div>
                <Footer/>
                <Copyright/>
            </div>
            <AddFavoriteModal
                isOpen={props.isOpenAddFavoriteModal}
                toggle={props.toggleAddFavoriteModal}
                contentType={props.addFavoriteModalContentType}
            />
        </div>
    )
}

export default ContestDetailsView