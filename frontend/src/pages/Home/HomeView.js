import React from 'react';
import style from "./Home.module.css";
import {Container} from "reactstrap";
import Navbar from "components/navbar";
import ContestFilter from "components/filters/contest_filter_component";
import SportFilter from "components/filters/sport_filter_component";
import GameStatusFilter from 'components/filters/game_status_filter_component';
import DateFilter from 'components/filters/date_filter_component';
import ContestsList from 'components/contests_list_component';
import AddFavoriteModal from "components/modals/add_favorite_modal";
import Footer from "components/footer";
import Copyright from "components/copyright";

const HomeView = (props) => {
    return (
        <div className={style.home}>
            <Navbar/>
            <div className={style.scrollable_area}>
                <Container sx="lg" className={style.container}>
                    <div className={style.filters_container}>
                        <ContestFilter />
                    </div>
                    <div className={style.schedules_and_sport_filter_container}>
                            <div className={style.sport_filter_container}>
                                <SportFilter
                                    selectedSport={props.selectedSport}
                                    selectSportButtonsHandler={props.selectSportButtonsHandler}
                                />
                            </div>
                            <div className={style.schedules_and_games_filters_container}>
                                <div className={style.games_filters_container}>
                                    <div className={style.game_status_filters_container}>
                                        <GameStatusFilter
                                            gameStatusFilterValue={props.gameStatusFilterValue}
                                            gameStatusFittersButtonsHandle={props.gameStatusFittersButtonsHandle}
                                        />
                                    </div>
                                    <div className={style.date_selector_container}>
                                        <DateFilter
                                            selectedDate={props.selectedDate}
                                            datesList={props.datesList}
                                            selectDateOptionHandle={props.selectDateOptionHandle}
                                        />
                                    </div>
                                </div>
                                <div className={style.contest_container}>
                                    <ContestsList
                                        gameStatusFilterValue={props.gameStatusFilterValue}
                                        selectedDate={props.selectedDate}
                                        selectedContest={props.selectedContest}
                                        selectedSeason={props.selectedSeason}
                                        setSelectedDate={props.setSelectedDate}
                                        favoriteButtonHandle={props.favoriteButtonHandle}
                                        checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                                    />
                                </div>
                            </div>
                        </div>
                </Container>
                <Footer/>
                <Copyright/>
            </div>
            <AddFavoriteModal
                wishlist={props.wishList}
                isOpen={props.isOpenAddFavoriteModal}
                itemId={props.addFavoriteModalContent}
                contentType={props.addFavoriteModalContentType}
                season={props.addFavoriteModalContentSeason}
                updateWishlist={props.updateWishlist}
                toggle={props.toggleAddFavoriteModal}
            />
        </div>
    )
}

export default HomeView