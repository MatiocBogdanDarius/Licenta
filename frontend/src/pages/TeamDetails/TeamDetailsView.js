import React from 'react';
import style from "./TeamDetails.module.css";
import {Container} from "reactstrap";
import Navbar from "components/navbar";
import AddFavoriteModal from "components/modals/add_favorite_modal";
import Footer from "components/footer";
import Copyright from "components/copyright";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faArrowLeft, faStar} from "@fortawesome/free-solid-svg-icons";
import {TEAM_MENU, WISHLIST_ITEM_TYPE} from "assets/constants/Data";
import LoadingSpinner from "components/loading_spinner"
import StandingsComponent from "components/standings";
import Summary from "./components/summary_component";
import Results from "./components/results_component";
import Fixtures from "./components/fixtures_component";
import Transfers from "./components/transfers_component";
import Squad from "./components/squad_component";

const TeamDetailsView = (props) => {
    return (
        <div className={style.team_details}>
            <Navbar/>
            <div className={style.scrollable_area}>
                <div className={style.content} ref={props.topRef}>
                    <Container sx="lg" className={style.container}>
                        {!props.team ?
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
                        {props.team &&
                            <div className={style.header}>
                                <div className={style.path_container}>
                                    <FontAwesomeIcon icon={props.selectedSport.icon} className={style.icon}/>
                                    <p className={style.sport_link}>{props.selectedSport.name}</p>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    {props.team.country.flag &&
                                        <div className={style.team_country_flag_container}>
                                            <img src={props.team.country.flag} className={style.flag_image} alt=""/>
                                        </div>
                                    }
                                    <p className={style.country_link}>{props.team.country.name}</p>
                                </div>
                                <div className={style.info_container}>
                                    {props.team &&
                                        <div className={style.team_flag_container}>
                                            <img
                                                src={`https://media-3.api-sports.io/${props.selectedSport.name.toLowerCase()}/teams/${props.team.id}.png`}
                                                className={style.flag_image}
                                                alt=""
                                            />
                                        </div>
                                    }
                                    <h1 className={style.team_title}>{props.team.name}</h1>
                                    <div
                                        className={style.star_icon_container}
                                        onClick={(event) => props.favoriteButtonHandle(event, props.team.id, WISHLIST_ITEM_TYPE.TEAM)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className={`${style.star_icon} ${props.checkIfItemIsFavorite(props.team.id, WISHLIST_ITEM_TYPE.TEAM) ? style.is_favorite : ""}`}
                                        />
                                    </div>
                                </div>
                                <div className={style.menu_container}>
                                    {Object.values(TEAM_MENU[props.selectedSport.name]).map(item => {
                                        return (
                                            <p
                                                key={`item-${item}`}
                                                className={`${style.menu_item} ${props.view === item ? style.active_menu_item : ""}`}
                                                onClick={() => props.changeView(item)}
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
                                {props.view === TEAM_MENU[props.selectedSport.name].SUMMARY &&
                                    props.fixtures &&
                                    <Summary
                                        fixtures={props.fixtures}
                                        selectedSport={props.selectedSport}
                                        league={props.league}
                                        season={props.season}
                                        favoriteButtonHandle={props.favoriteButtonHandle}
                                        checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                                        changeView={props.changeView}
                                    />
                                }
                                {props.view === TEAM_MENU[props.selectedSport.name].RESULTS &&
                                    <Results
                                        fixtures={props.fixtures.before_today}
                                        selectedSport={props.selectedSport}
                                        favoriteButtonHandle={props.favoriteButtonHandle}
                                        checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                                        changeView={props.changeView}
                                    />
                                }
                                {props.view === TEAM_MENU[props.selectedSport.name].FIXTURES &&
                                    <Fixtures
                                        fixtures={props.fixtures.after_today}
                                        selectedSport={props.selectedSport}
                                        favoriteButtonHandle={props.favoriteButtonHandle}
                                        checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                                        changeView={props.changeView}
                                    />
                                }
                                {props.view === TEAM_MENU[props.selectedSport.name].STANDINGS &&
                                    <StandingsComponent
                                        league={props.league}
                                        season={props.season}
                                    />
                                }
                                {props.view === TEAM_MENU[props.selectedSport.name].TRANSFERS &&
                                    <Transfers
                                        transfers={props.transfers}
                                        teamId={props.team.id}
                                    />
                                }
                                {props.view === TEAM_MENU[props.selectedSport.name].SQUAD &&
                                    <Squad squad={props.squad}/>
                                }
                            </>
                        }
                    </Container>
                </div>
                <Footer/>
                <Copyright/>
            </div>
            <AddFavoriteModal
                wishlist={props.wishList}
                isOpen={props.isOpenAddFavoriteModal}
                itemId={props.addFavoriteModalContent}
                contentType={props.addFavoriteModalContentType}
                updateWishlist={props.updateWishlist}
                toggle={props.toggleAddFavoriteModal}
            />
        </div>
    )
}

export default TeamDetailsView